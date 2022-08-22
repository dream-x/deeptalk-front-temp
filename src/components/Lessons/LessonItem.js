import {API} from "../../api";
import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Loader} from "../Loader";
import styles from './Item.module.css'
import {RaiseHand, StartBtn, StopBtn} from "../btns";
import ReactHowler from "react-howler";
import {watchForAudioStreamEvents} from "../../watchForAudioStreamEvents";
import ysFixWebmDuration from "fix-webm-duration";
import {MicrophoneBtn} from "../btns/microphoneBtn";

export function LessonItem({item = {}, questionsCB = null}) {

    const {t} = useTranslation();

    const audioRef = useRef(null);

    const [statistics, setStatistics] = useState([]);

    const addStatistic = (name, key, value) => {
        statistics.push({
            name: name,
            key: key,
            value: value
        })
    }

    const [audioSrc, setAudioSrc] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRaiseHand, setIsRaiseHand] = useState(false);
    const [APILaunched, setAPILaunched] = useState(false);

    const userAudioStreamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    const [description, setDescription] = useState(null);

    const getSoundName = () => {
        if (item.questions.length) {
            const idQuestion = Math.floor(Math.random() * item.questions.length);
            setAudioSrc(`/sounds/lessons/${item.id}.${idQuestion + 1}.mp3`)
            setDescription(item.questions[idQuestion])
        } else {
            setAudioSrc(`/sounds/lessons/${item.id}.mp3`)
            setDescription(item.description)
        }
    }

    useEffect(() => {
        getSoundName();
    }, [])

    const onClickPlayButton = () => {
        getSoundName();
        setIsPlaying(true)
    }
    const onClickStopButton = () => {
        setIsPlaying(false);
        audioRef.current.stop();
    }

    const onEndPlaying = () => {
        setIsPlaying(false);
    }

    useEffect(() => {
        const getStreamPermission = async () => {
            userAudioStreamRef.current = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
        }
        getStreamPermission();

    }, []);

    const buildChunksRecording = () => {
        const mediaRecorder = new MediaRecorder(userAudioStreamRef.current);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.start();
        const startTime = Date.now();
        setIsRaiseHand(true)
        watchForAudioStreamEvents(
            userAudioStreamRef.current,
            {
                emmitStopRecordEvent: () => {
                    mediaRecorder.stop();
                }
            }
        );
        const audioChunks = [];

        mediaRecorder.ondataavailable = function (event) {
            audioChunks.push(event.data);
        }

        mediaRecorder.onstop = function () {
            let duration = Date.now() - startTime;
            ysFixWebmDuration(new Blob(audioChunks, {type: mediaRecorder.mimeType}), duration, (fixedBlob) => {
                analyzingAnswer(fixedBlob);
            });
        }
    }

    const analyzingAnswer = async (answerAudio) => {
        setAPILaunched(true)
        setIsRaiseHand(false)
        try {
            let answerText = await API.convertVoiceToText({record: answerAudio});
            console.log('answerText', answerText)
            setStatistics([]);
            addStatistic(
                'count words',
                'countWords',
                answerText.data.toLowerCase().trim().split(' ').length
            )
            addStatistic(
                'count unique words',
                'countUniqueWords',
                [...new Set(answerText.data.toLowerCase().trim().split(' '))].length
            )

            let resultAnalyzing;
            switch (item.service) {
                case "rouge_summary":
                    resultAnalyzing = await APIAnalyzingSummary(answerText.data);
                    break;
                case "idea_development":
                    resultAnalyzing = await APIAnalyzingIdea(answerText.data);
                    break;
                default:
                    resultAnalyzing = await APIAnalyzingDifferenceWord(answerText.data);
                    break;
            }
            //difference_word
            console.log('resultAnalyzing', resultAnalyzing)
            if (questionsCB) {
                questionsCB({
                    name: item.name,
                    template: 'answerLesson',
                    time: new Date().toLocaleString(),
                    status: resultAnalyzing ? "PassedLabel" : "DidNotPassLabel",
                    stat: statistics
                })
            }
            console.log('statistics 456', statistics)
        } catch (e) {
            console.error(e)
        }
        setAPILaunched(false)
    }

    const APIAnalyzingIdea = async (data) => {
        const result = await API.getIdeaInfo({
            theme: description,
            answer: data
        })
        return parseAnalyzingResult(result)
    }

    const APIAnalyzingSummary = async (data) => {
        const result = await API.getRougeInfo({
            source_text: description,
            reference_text: data
        })
        return parseAnalyzingResult(result)
    }

    const APIAnalyzingDifferenceWord = async (data) => {
        const result = await API.DifferenceWord({
            text: data
        })
        return parseAnalyzingResult(result)
    }

    const parseAnalyzingResult = ({data}) => {
        console.log(item.service, data)
        if (item.service === "difference_word") {
            addStatistic('accuracy string', 'accuracyString', data.result)

            if (!data.result || data.result === "fail") {
                return 0;
            }
        } else {
            addStatistic('accuracy', 'accuracy', Number(data.rouge).toFixed(2))
            addStatistic('internal accuracy', 'internalAccuracy', 0.06)
            if (!data.rouge) {
                return 0;
            }
            if (item.service === 'idea_development') {
                addStatistic('internal count words', 'internalCountWords', 5)
                if (Number(data.words) < 5 || Number(data.rouge) < 0.06) {
                    return 0;
                }
            } else {
                addStatistic('accuracy string', 'accuracyString', data.result)
                if (Number(data.rouge) < 0.06) {
                    return 0;
                }
            }
        }
        return 1;
    }

    return (
        <div className="lesson__item" id={item.id}>
            <div className="title">
                {t(item.name)}
            </div>
            <div className="lesson__actions">
                <div className={isPlaying ? styles.hideButton : styles.showButton}>
                    <StartBtn onClick={onClickPlayButton} label="RunQuestionButtonLabel"/>
                </div>
                <div className={!isPlaying ? styles.hideButton : styles.showButton}>
                    <StopBtn onClick={onClickStopButton} label="StopQuestionButtonLabel"/>
                </div>
                <div className={!APILaunched ? styles.showLoader : styles.hideButton}>
                    <div className={!isRaiseHand ? styles.showButton : styles.hideButton}>
                        <RaiseHand
                            label="GiveAnswerQuestionButtonLabel"
                            onClick={buildChunksRecording}/>
                    </div>
                    <div className={isRaiseHand ? styles.showButton : styles.hideButton}>
                        <MicrophoneBtn label="GiveAnswerQuestionButtonLabel" isActive={false}/>
                    </div>
                </div>
                <div className={APILaunched ? styles.showLoader : styles.hideButton}>
                    <Loader hidden={false}/>
                </div>
                {
                    audioSrc &&
                    <ReactHowler
                        src={audioSrc}
                        ref={audioRef}
                        playing={isPlaying}
                        onEnd={onEndPlaying}
                    />
                }
            </div>
        </div>
    );
}
