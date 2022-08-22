import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import styles from './ItemQuestion.module.css'
import {RaiseHand} from "../btns";
import ReactHowler from 'react-howler';
import {MicrophoneBtn} from "../btns/microphoneBtn";
import {watchForAudioStreamEvents} from "../../watchForAudioStreamEvents";
import ysFixWebmDuration from "fix-webm-duration";
import {API} from "../../api";
import {useTranslation} from "react-i18next";

export const ItemQuestion = ({questionsCB = null}) => {

    const {t, i18n} = useTranslation();

    const userAudioStreamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    const [srcDefaultAudio, setSrcDefaultAudio] = useState("/sounds/ru/q1/get_question.mp3");

    const [activeButtonRaiseHand, setActiveButtonRaiseHand] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showMicrophoneBtn, setShowMicrophoneBtn] = useState(false);

    useEffect(() => {
        const getStreamPermission = async () => {
            userAudioStreamRef.current = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
        }
        getStreamPermission().then();
    }, []);

    useEffect(() => {
        if (i18n.language === 'ru') {
            setSrcDefaultAudio("/sounds/ru/q1/get_question.mp3");
        } else {
            setSrcDefaultAudio("/sounds/q1/get_question.mp3");
        }
    }, [i18n.language])

    const onClickRaiseHand = () => {
        setIsPlaying(true);
        setActiveButtonRaiseHand(false)
    }

    const onEndPlayingAudio = () => {
        setIsPlaying(false)
        setActiveButtonRaiseHand(true)
        setShowMicrophoneBtn(true)
        getRecordStream()
    }

    const onEndConvertSoundToText = () => {
        setActiveButtonRaiseHand(true)
        setShowMicrophoneBtn(false)
    }

    const getRecordStream = () => {
        try {
            const mediaRecorder = new MediaRecorder(userAudioStreamRef.current);
            const startTime = Date.now();
            const audioChunks = [];
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            watchForAudioStreamEvents(
                userAudioStreamRef.current,
                {
                    emmitStopRecordEvent: () => {
                        mediaRecorder.stop();
                    }
                }
            );
            mediaRecorder.ondataavailable = function (event) {
                audioChunks.push(event.data);
            }
            mediaRecorder.onstop = function () {
                let duration = Date.now() - startTime;
                ysFixWebmDuration(new Blob(audioChunks, {type: mediaRecorder.mimeType}), duration, (fixedBlob) => {
                    convertSoundToText(fixedBlob);
                });
            }
        } catch (e) {
            console.error(e);
            onEndConvertSoundToText()
        }
    }

    const parseStingToChunkTTS = async (data) => {
        console.log('parseStingToChunkTTS data', data)

        const chunksTTS = [];
        const responseAudio = [];
        let tmpString = "";
        for (let item of data.toString().split(' ')) {
            if ((tmpString.length + `${item} `.length) > 249) {
                chunksTTS.push(tmpString)
                tmpString = "";
            }
            tmpString += `${item} `
        }
        chunksTTS.push(tmpString)

        for (let item of chunksTTS) {
            const tts = await API.convertTextToSound(item);
            responseAudio.push(URL.createObjectURL(new Blob([tts.data], { type: 'audio/mpeg' })))
        }
        console.log('chunksTTS', chunksTTS)
        return responseAudio;
    }

    const convertSoundToText = async (record) => {
        //Результат распознавания вопроса
        try {
            const convertVoiceToText = await API.convertVoiceToText({record}, "ru");
            console.log('convertVoiceToText', convertVoiceToText.data)
            const searchInText = await API.searchInText({textQuestion: convertVoiceToText.data})
            //
            console.log('searchInText', searchInText.data.data);
            if (questionsCB) {
                questionsCB({
                    template: 'answerQuestionBook',
                    question: convertVoiceToText.data,
                    answer: searchInText.data.data,
                    responseAudio: await parseStingToChunkTTS(searchInText.data.data)
                })
            }
        } catch (e) {
            console.error(e)
        }

        onEndConvertSoundToText()

    }

    return (
        <div className={styles.item}>
            <div className={styles.title}>
                Задайте свой вопрос
            </div>
            <div className={styles.actions}>
                <div className={!showMicrophoneBtn ? styles.raiseHandShow : styles.invisible}>
                    <RaiseHand onClick={onClickRaiseHand} label="" isActive={activeButtonRaiseHand}/>
                </div>
                <div className={showMicrophoneBtn ? styles.microphoneShow : styles.invisible}>
                    <MicrophoneBtn label=""/>
                </div>
                <ReactHowler src={srcDefaultAudio} playing={isPlaying} onEnd={onEndPlayingAudio}/>
            </div>
        </div>
    );
};
