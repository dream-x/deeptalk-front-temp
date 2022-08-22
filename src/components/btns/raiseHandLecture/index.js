import {useTranslation} from "react-i18next";
import {watchForAudioStreamEvents} from "../../../watchForAudioStreamEvents";
import ysFixWebmDuration from "fix-webm-duration";
import {Fragment, useEffect, useRef, useState} from "react";
import {API} from "../../../api";
import ReactHowler from "react-howler";
import * as React from "react";

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
        responseAudio.push(URL.createObjectURL(new Blob([tts.data], {type: 'audio/mpeg'})))
    }
    console.log('chunksTTS', chunksTTS)
    return responseAudio;
}

export function RaiseHandLecture({
                                     label = 'RaiseHandButtonLabel',
                                     onEndPlayCB = undefined,
                                     onClickCB = undefined,
                                     questionTestCB = undefined,
                                     onEndPreview = undefined,
                                     onEndListenMicro = undefined
                                 }) {

    const {t, i18n} = useTranslation()

    const [isPlaying, setIsPlaying] = useState(false)
    const [isPlayingPreview, setIsPlayingPreview] = useState(false)
    const [currentTrackSrc, setCurrentTrackSrc] = useState();
    const [previewTrackSrc, setPreviewTrackSrc] = useState();
    const [currentTrackSrcList, setCurrentTrackSrcList] = useState([]);
    const [isActive, setIsActive] = useState(true);

    const audioRef = useRef(null);
    const userAudioStreamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    useEffect(() => {
        if (i18n.language === "ru") {
            setPreviewTrackSrc("/sounds/ru/q1/get_question.mp3")
        } else {
            setPreviewTrackSrc("/sounds/q1/get_question.mp3")
        }
    }, [i18n])

    useEffect(() => {
        const getStreamPermission = async () => {
            userAudioStreamRef.current = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
        }
        getStreamPermission();
    }, []);

    const playingPreview = () => {
        if (isPlayingPreview) {

        }
    }

    const onClick = () => {
        if (typeof onClickCB !== "undefined") {
            onClickCB()
        }
        setIsActive(false)
        setIsPlayingPreview(true)
    }

    const buildChunksRecording = () => {

        const mediaRecorder = new MediaRecorder(userAudioStreamRef.current);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.start();
        const startTime = Date.now();
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
        try {
            if (onEndListenMicro !== undefined) {
                onEndListenMicro()
            }
            let answerText = await API.convertVoiceToText({record: answerAudio}, 'ru');
            if (questionTestCB !== undefined) {
                questionTestCB(answerText.data)
            }
            console.log('answerText', answerText)
            const searchInText = await API.searchInText({textQuestion: answerText.data});
            const _parseStingToChunkTTS = await parseStingToChunkTTS(searchInText.data.data)
            for (let item of _parseStingToChunkTTS) {
                currentTrackSrcList.push(item)
            }

            onEndPlaying();
        } catch (e) {
            console.error(e)
        }
    }

    const onEndPlayingPreview = () => {
        if (onEndPreview !== undefined) {
            onEndPreview()
        }
        setIsPlayingPreview(false)
        buildChunksRecording()
    }

    const onEndPlaying = () => {
        if (currentTrackSrcList.length) {
            setCurrentTrackSrc(currentTrackSrcList.shift());
            setIsPlaying(true)
        } else {
            setIsActive(true)
            setIsPlaying(false)
            if (typeof onEndPlayCB !== "undefined") {
                onEndPlayCB()
            }
        }
    }

    return (
        <Fragment>
            <div style={{display: 'none'}}>
                {
                    currentTrackSrc &&
                    <ReactHowler
                        src={currentTrackSrc}
                        ref={audioRef}
                        html5={true}
                        onEnd={onEndPlaying}
                        playing={isPlaying}
                        format={['mp3']}
                    />
                }
            </div>
            <div style={{display: 'none'}}>
                {
                    previewTrackSrc &&
                    <ReactHowler
                        src={previewTrackSrc}
                        onEnd={onEndPlayingPreview}
                        playing={isPlayingPreview}
                        format={['mp3']}
                    />
                }
            </div>

            <button className="homeScreen__action" onClick={onClick}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill={isActive ? "#74d414" : "#909090"}/>
                    <path
                        d="M13.9917 31.1169C13.9764 30.2514 13.8458 29.3923 13.6028 28.5608C13.3652 27.7479 13.2447 26.9064
                    13.2447 26.0595L13.2448 14.9867C13.2447 14.7264 13.346 14.4819 13.5298 14.298C13.718 14.1102
                    13.9682 14.0089 14.2341 14.0131C14.7623 14.0214 15.192 14.4719 15.1921 15.0176L15.1923
                    19.6129C15.1923 19.7242 15.2374 19.8251 15.3103 19.898C15.3833 19.971 15.4841 20.0161 15.5954
                    20.0161C15.8181 20.0161 15.9986 19.8356 15.9985 19.6129L15.9985 10.1334C15.9985 9.81629 16.122
                    9.51824 16.3462 9.29408C16.5704 9.06989 16.8684 8.94639 17.1855 8.94643C17.5025 8.94639 17.8006
                    9.06989 18.0247 9.29404C18.2489 9.51819 18.3723 9.81629 18.3723 10.1333L18.3723 18.7868C18.3724
                    19.0095 18.5529 19.1899 18.7755 19.1899C18.9982 19.1899 19.1786 19.0094 19.1786 18.7868L19.1788
                    8.49479C19.1788 7.84028 19.7112 7.30781 20.3657 7.30785C21.0201 7.30781 21.5527 7.84032 21.5527
                    8.4948L21.5525 18.117C21.5524 18.2004 21.5778 18.278 21.6213 18.3424C21.6937 18.4497 21.8165
                    18.5203 21.9557 18.5203C22.1784 18.5203 22.3589 18.3399 22.3589 18.1172L22.3589 9.8612C22.3609
                    9.20852 22.8924 8.67812 23.5456 8.67812C23.8625 8.67807 24.1608 8.80153 24.3854 9.02564C24.6094
                    9.24966 24.7329 9.54784 24.7329 9.86493L24.7329 19.5757L24.7329 23.9055C24.7329 24.0168 24.778
                    24.1176 24.8509 24.1905C24.9239 24.2635 25.0247 24.3086 25.136 24.3086C25.3587 24.3086 25.5392
                    24.1281 25.5391 23.9055L25.5391 19.5757C25.5391 19.1929 25.6883 18.833 25.9589 18.5623C26.2296
                    18.2916 26.5896 18.1425 26.9724 18.1425C27.4171 18.1425 27.7788 18.5043 27.7788 18.9489L27.7788
                    24.1844C27.7788 25.7503 25.1543 29.5733 23.9949 31.1169L13.9917 31.1169Z"
                        fill="white"/>
                </svg>
                {t(label)}
            </button>
        </Fragment>
    );
}
