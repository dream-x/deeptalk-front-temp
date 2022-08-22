import {HomeScreen} from "../../components/HomeScreen";
import {API} from 'api';
import ysFixWebmDuration from 'fix-webm-duration';
import {useEffect, useRef, useState} from 'react';
import ReactHowler from 'react-howler';
import {StartBtn, StopBtn} from '../../components/btns';
import {ParsedRecordList} from '../../components/parsedRecordList';
import {LessonUtils, QuestionUtils} from '../../contentCfg';
import {voieceCmdsMatcher} from '../../voieceCmdsMatcher';
import {watchForAudioStreamEvents} from '../../watchForAudioStreamEvents';
import {Timeout} from "../../components/timeout";
import {useTranslation} from "react-i18next";
import {RaiseHandLecture} from "../../components/btns/raiseHandLecture";
import {QuestionList} from "../../components/QuestionCloud/QuestionList";

const ApplicationStatus = {
    Idle: 'Idle',
    RunScenario: 'RunScenario',
    WaitForAction: 'WaitForAction',
    Pause: 'Pause',
    Playing: 'Playing',
    Recording: 'Recording',
}

const ApplicationSideEffect = {
    Idle: 'Idle',
    NeedRecognize: 'NeedRecognize',
    RunRecognizing: 'RunRecognizing',
    CompleteRecognizing: 'CompleteRecognizing',
}

const buildParsedRecordProps = (question, answer) => ({question, answer});

const processSpeechToText = async (record) => {
    const res = await API.convertVoiceToText({record}, "ru");
    if (res !== null) {
        return res.data;
    }

    return '';
}
const processTextQuestion = async (textQuestion) => {
    const res = await API.processTextQuestion({textQuestion});
    if (!!res && !!res.data) {
        return res.data.data;
    }

    return '';
}

const screenObject = (data) => Object.entries(data).map(item => '\t' + item.join(': ')).join('\n');

export function Main() {

    const {t, i18n} = useTranslation();

    const userAudioStreamRef = useRef(null);

    const mediaRecorderRef = useRef(null);

    const scenarioTrackControllers = useRef([]);
    const applicationStatuses = useRef([]);

    const lastPlayed = useRef();
    const vidRef = useRef(null);
    const playerRef = useRef(null);

    const [applicationStatus, setApplicationStatus] = useState(ApplicationStatus.Idle);
    const [applicationSideEffect, setApplicationSideEffect] = useState(ApplicationSideEffect.Idle);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [parsedRecordList, setParsedRecordList] = useState([]);

    const [pauseTimeout, setPauseTimeout] = useState(undefined);

    const [currentScenario, setCurrentScenario] = useState();
    const [isActiveRaiseHand, setIsActiveRaiseHand] = useState(false);

    const [currentTrackSrc, setCurrentTrackSrc] = useState();

    const [questionTest, setQuestionTest] = useState([])

    const currentTrack = useRef(undefined);

    const [isRunPreview, setIsRunPreview] = useState(false)
    const [isRunRaiseHandMicro, setIsRunRaiseHandMicro] = useState(false)

    const initLessonRecognitionProcess = async (track, recordedBlob, afterRecognitionCB) => {
        let parsedAnswer;
        try {
            parsedAnswer = await processSpeechToText(recordedBlob);
            console.log('first voice to text')
        } catch (err) {
            console.error('processSpeechToText ERR', err);
            parsedAnswer = t('response processing error message', {message: err.status});
        }

        const parsedRecord = buildParsedRecordProps(track.question, parsedAnswer);

        setParsedRecordList((parsedRecords) => {
            return [
                parsedRecord,
                ...parsedRecords,
            ];
        });

        setApplicationSideEffect(ApplicationSideEffect.CompleteRecognizing);
        afterRecognitionCB(parsedAnswer);
    }
    const initQuestionRecognitionProcess = async (track, recordedBlob, afterRecognitionCB) => {

        let parsedAnswer = "";
        let response = "";
        const baseSoundPath = '/sounds/q1';
        try {
            parsedAnswer = await processSpeechToText(recordedBlob);

            if (voieceCmdsMatcher.isPlayNextAudio(parsedAnswer)) {
                console.warn(t('ConsoleCommandNotImplemented'));
            }

            if (voieceCmdsMatcher.isPause(parsedAnswer)) {

                if (lastPlayed.current) {
                    setApplicationSideEffect(ApplicationSideEffect.CompleteRecognizing);
                    afterRecognitionCB(parsedAnswer);
                    startPauseTimeout();
                    return;
                }

                console.warn(t('ConsoleCommandPauseCannotExecuted'));
            }

            response = await processTextQuestion(parsedAnswer);
        } catch (err) {
            console.error('processSpeechToText ERR', err);
            parsedAnswer = t('ResponseProcessingErrorMessage', {message: err.status});
            response = '';
        }

        response = response || 'wrong_question';
        setApplicationSideEffect(ApplicationSideEffect.CompleteRecognizing);
        afterRecognitionCB(parsedAnswer);
        startPlaySelectedTrack({
            id: -1,
            title: response,
            isNeedRecording: false,
            src: `${baseSoundPath}/${response}.mp3`,
        });
    }

    const scenarios = {
        lesson: 'lesson',
        topHand: 'topHand',
    }
    const scenarioHandlers = {
        [scenarios.lesson]: LessonUtils.getTrackControllers,
        [scenarios.topHand]: QuestionUtils.getTrackControllers,
    }
    const scenarioTrackHelpers = {
        [scenarios.lesson]: LessonUtils,
        [scenarios.topHand]: QuestionUtils,
    }
    const scenarioRecognitionProcess = {
        [scenarios.lesson]: initLessonRecognitionProcess,
        [scenarios.topHand]: initQuestionRecognitionProcess,
    }

    const startPlayVideo = () => {
        vidRef.current.play();
    }
    const pausePlayVideo = () => {
        vidRef.current.pause();
    }
    const stopPlayVideo = () => {
        vidRef.current.pause();
        vidRef.current.currentTime = 0;
        vidRef.current.load();
    }

    const startPlaySelectedTrack = (track) => {
        startPlayVideo();
        currentTrack.current = track;
        setCurrentTrackSrc(track.src);
        setApplicationStatus(ApplicationStatus.Playing);
        setIsPlaying(true);
    };

    const stopPlayTrack = (isComplete) => {
        pausePlayVideo();
        setIsPlaying(false);
        setApplicationStatus(isComplete ? ApplicationStatus.Idle : ApplicationStatus.Pause);
    };

    const runScenario = (scenario) => {
        setApplicationStatus(ApplicationStatus.RunScenario);
        setCurrentScenario(scenario);
    }

    const clearScenario = () => {
        lastPlayed.current = undefined;
        runScenario(undefined);
    }

    const buildScenario = (scenario) => {

        const startPlayNextTrack = (scenario, track) => {
            const trackUtils = scenarioTrackHelpers[scenario];

            if (!trackUtils.isLastTrack(track)) {
                const nextController = trackUtils.getNextTrackControllerByTrack(scenarioTrackControllers.current, track);
                nextController.startPlay();
            }
        }

        const startPlayTrack = (scenario, track) => {
            startPlaySelectedTrack(track);
        }

        const startRecording = async (scenario, track, afterRecordingCB) => {
            stopPlayTrack(false);

            setIsRecording(true);
            setApplicationStatus(ApplicationStatus.Recording);

            const audioChunks = [];

            const mediaRecorder = new MediaRecorder(userAudioStreamRef.current);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.start();
            const startTime = Date.now();

            // This code handle long silent signal for stop recording -> use only for send stop event
            // For event handling use "stop" event listener
            watchForAudioStreamEvents(
                userAudioStreamRef.current,
                {
                    emmitStopRecordEvent: () => setIsRecording(false)
                }
            );

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                let duration = Date.now() - startTime;
                const tmpBlob = new Blob(audioChunks, {type: mediaRecorder.mimeType});

                ysFixWebmDuration(tmpBlob, duration, (fixedBlob) => {
                    setApplicationSideEffect(ApplicationSideEffect.NeedRecognize);
                    setApplicationStatus(ApplicationStatus.WaitForAction);
                    afterRecordingCB(fixedBlob);
                });

            });
        }

        const startRecognition = (scenario, track, recordedBlob, afterRecognitionCB) => {
            setTimeout(() => {
                setApplicationSideEffect(ApplicationSideEffect.RunRecognizing);
                scenarioRecognitionProcess[currentScenario](track, recordedBlob, afterRecognitionCB);
            }, 1);
        }

        return scenarioHandlers[scenario](scenario, {
            runScenario,
            startPlayNextTrack,
            startPlayTrack,
            startRecording,
            startRecognition,
        });
    }

    const stopAndResetScenario = () => {
        stopPlayTrack(true);
        stopPlayVideo();
        currentTrack.current = undefined;
        scenarioTrackControllers.current = [];
        setParsedRecordList([]);
        setCurrentTrackSrc(undefined);
    }

    const temporarySwitchScenario = (scenario) => {
        if (currentScenario) {
            if (!playerRef.current) {
                console.error(new Error(t('ConsoleSomethingWrong', {
                    param1: currentScenario,
                    param2: currentTrack.current.src
                })));
                return;
            }

            lastPlayed.current = {
                scenario: currentScenario,
                parsedRecordList,
                trackId: currentTrack.current.id,
                seekTime: playerRef.current.seek(),
            }
        }

        // runScenario(scenario);
    }
    const startPauseTimeout = () => {
        const timestamp = Date.now();
        const finishTimestamp = timestamp + 5 * 60 * 1000; // + 5 min
        setPauseTimeout(finishTimestamp);
    }

    const runLastScenario = () => {
        const {
            scenario,
        } = lastPlayed.current;
        setPauseTimeout(undefined);
        setCurrentScenario(scenario);
    }

    const canRaiseHand = () => {
        const trackInfo = currentTrack.current;

        return currentScenario !== scenarios.topHand
            && !isRecording
            && (!trackInfo || !trackInfo.isNeedRecording);
    }

    useEffect(() => {
        const getStreamPermission = async () => {
            userAudioStreamRef.current = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
        }

        getStreamPermission();
    }, []);

    useEffect(() => {
        const snapshot = {
            currentScenario,
            currentTrack: JSON.stringify(currentTrack.current),
            currentTrackSrc,
            applicationStatus,
            applicationSideEffect,
            isPlaying,
            isRecording,
        };
        applicationStatuses.current.push({
            action: 'Status',
            ...snapshot,
        })
    }, [applicationStatus]);

    useEffect(() => {
        const snapshot = {
            currentScenario,
            currentTrack: JSON.stringify(currentTrack.current),
            currentTrackSrc,
            applicationStatus,
            applicationSideEffect,
            isPlaying,
            isRecording,
        };
        applicationStatuses.current.push({
            action: 'SideEffect',
            ...snapshot,
        })

        if (applicationSideEffect === ApplicationSideEffect.CompleteRecognizing) {
            setApplicationSideEffect(ApplicationSideEffect.Idle);
        }
    }, [applicationSideEffect]);

    useEffect(() => {
        stopAndResetScenario();

        if (currentScenario) {
            scenarioTrackControllers.current = buildScenario(currentScenario);

            let initialTrackId = 0;

            if (!!lastPlayed.current && lastPlayed.current.scenario === currentScenario) {
                setParsedRecordList(lastPlayed.current.parsedRecordList);
                initialTrackId = lastPlayed.current.trackId;
            }

            scenarioTrackControllers.current[initialTrackId].startPlay();
        }
    }, [currentScenario]);

    useEffect(() => {
        const isRecordingFinished = !isRecording && mediaRecorderRef.current !== null;

        if (isRecordingFinished && mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = null;
        }
    }, [isRecording]);

    const onTrackEnd = () => {
        const trackUtils = scenarioTrackHelpers[currentScenario];
        const controllers = scenarioTrackControllers.current;
        const track = currentTrack.current;
        const trackController = trackUtils.getTrackControllerByTrack(controllers, track);

        if (!trackController) {
            console.warn(t('ConsoleNoTrackController'), currentScenario, track.title, track.src)
            // TODO Dirty hook. We have only one point like this. When raiseHand scenario is finished, so we can do like this :)
            lastPlayed.current ? runLastScenario() : runScenario(undefined);
            return;
        }

        trackController.afterTrackEnd();
    }

    const onTrackLoad = () => {
        checkSeek();
    }

    const onTrackPlay = () => {
        checkSeek();
    }

    const checkSeek = () => {
        if (lastPlayed.current && lastPlayed.current.scenario === currentScenario) {
            playerRef.current.seek(Math.floor(lastPlayed.current.seekTime));
            lastPlayed.current = undefined;
        }
    }

    const howlerActionHandlers = {
        onEnd: onTrackEnd,
        onLoad: onTrackLoad,
        onPlay: onTrackPlay,
    }

    const onReactHowlerAction = (name, payload) => {
        if (currentTrackSrc && i18n.language === "ru" && currentTrackSrc.search('/ru/') < 0) {
            let tmp = currentTrackSrc.toString().split('/sounds/');
            setCurrentTrackSrc(`/sounds/ru/${tmp[1]}`)
        }
        typeof howlerActionHandlers[name] === 'function' && howlerActionHandlers[name](payload);
    }

    const getCurrentAction = () => {

        if (isRunPreview) {
            return t('PleaseListenLecturer');
        }

        if (isRunRaiseHandMicro) {
            return t('PleaseAskQuestion');
        }

        if (!currentScenario) {
            return ''
        }

        if (isPlaying) {
            return t('PleaseListenLecturer');
        }

        if (isRecording) {
            return currentScenario === scenarios.lesson ? t('PleaseAnswerQuestion') : t('PleaseAskQuestion');
        }
    }

    return (
        <main className="main_content">
            <HomeScreen/>
            <section className="homeScreen section">
                <QuestionList newQuestion={questionTest}/>
            </section>
            <section className="video-section" id="videoContainer">
                <div className="container_center">
                    <h1 className="homeScreen__title">
                        {t('DemoLessonName')}
                    </h1>
                    <div className="video-container">
                        <div className="video-wrapper">
                            <video ref={vidRef} src="/video/AI-video.mp4" muted={true} loop="" playsInline></video>
                            <div className="homeScreen__btm">
                                <div>
                                    {!pauseTimeout &&
                                        <StartBtn isActive={currentScenario !== scenarios.lesson && !isActiveRaiseHand}
                                                  onClick={() => currentScenario !== scenarios.lesson && runScenario(scenarios.lesson)}/>}

                                    {pauseTimeout &&
                                        <StartBtn label={t('ContinueButtonLabel')} onClick={() => runLastScenario()}/>}
                                    <RaiseHandLecture
                                        isActive={canRaiseHand()}
                                        onClickCB={() => {
                                            setIsRunPreview(true)
                                            setIsActiveRaiseHand(true)
                                            stopPlayTrack(false);
                                            temporarySwitchScenario(scenarios.topHand)
                                        }}
                                        onEndPlayCB={() => {
                                            setIsActiveRaiseHand(false)
                                            if (typeof lastPlayed.current !== "undefined") {
                                                startPlayVideo()
                                                setIsPlaying(true)
                                            }
                                        }}
                                        onEndPreview={() => {
                                            setIsRunPreview(false)
                                            setIsRunRaiseHandMicro(true)
                                        }}
                                        onEndListenMicro={() => {
                                            setIsRunRaiseHandMicro(false)
                                        }}
                                        questionTestCB={(answerText) => {
                                            setQuestionTest(item => [...item, answerText])
                                        }}
                                    />
                                    {/*<RaiseHand isActive={canRaiseHand()} onClick={() => !isRecording && temporarySwitchScenario(scenarios.topHand)} />*/}

                                    <StopBtn isActive={!!currentScenario}
                                             onClick={() => currentScenario && clearScenario()}/>


                                    <div>
                                        {pauseTimeout &&
                                            <Timeout timeout={pauseTimeout} onEnd={() => runLastScenario()}/>}

                                        {getCurrentAction()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {currentTrackSrc && <ReactHowler
                            src={currentTrackSrc}
                            playing={isPlaying}
                            ref={playerRef}
                            onPlay={() => onReactHowlerAction('onPlay')}
                            onPlayError={() => onReactHowlerAction('onPlayError')}
                            onPause={() => onReactHowlerAction('onPause')}
                            onStop={() => onReactHowlerAction('onStop')}
                            onLoad={() => onReactHowlerAction('onLoad')}
                            onLoadError={() => onReactHowlerAction('onLoadError')}
                            onSeek={() => onReactHowlerAction('onSeek')}
                            onEnd={() => onReactHowlerAction('onEnd')}
                        />}

                        <ParsedRecordList
                            items={parsedRecordList}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
