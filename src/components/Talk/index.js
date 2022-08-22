import {StartBtn, StopBtn} from "../btns";
import style from './style.module.css'
import * as React from "react";
import {useEffect, useState} from "react";
import {API} from "../../api";
import {getMediaRecordStream} from "../../utils/mediaRecordStream";
import {parseStringForTTS} from "../../utils/parseStringForTTS";
import ReactHowler from "react-howler";

export const Talk = () => {

    const [currentState, setCurrentState] = useState("Выключено");

    const [lastSTTResult, setLastSTTResult] = useState("")
    const [lastTTSResult, setLastTTSResult] = useState([])
    const [currentTrack, setCurrentTrack] = useState("")
    const [currentTrackList, setCurrentTrackList] = useState([])
    const [isPlayingPreviewCurrentTrack, setIsPlayingPreviewCurrentTrack] = useState(false)

    const [startIsActive, setStartIsActive] = useState(false)

    const [chatItem, setChatItem] = useState([])

    useEffect(() => {
        const convertText = async () => {
            console.log("Установлен текст для перевода в звук")
            const linkList = [];
            for (let item of lastTTSResult) {
                const {data} = await API.convertTextToSound(item)
                linkList.push(URL.createObjectURL(new Blob([data], {type: 'audio/mpeg'})))
            }
            setCurrentTrackList(linkList)
        }
        if (lastTTSResult.length) {
            convertText()
        }
    }, [lastTTSResult])

    useEffect(() => {

        const AnalyzeTalk = async () => {
            setCurrentState("Система анализирует речь пользователя")
            const {data} = await API.AnalyzeTalk(lastSTTResult)
            setCurrentState("Система проанализировала речь пользователя")
            console.log("Речь пользователя проанализирована")
            switch (data.type) {
                case "question":
                    await startTextPlayback(data.data)
                    break;
                case "result":
                    addMessageChat(JSON.stringify(data.data), true, true)
                    break;
                default:
                    break;
            }
        }

        if (lastSTTResult !== "") {
            console.log("Установлен результат перевода звука в текст")
            console.log('lastSTTResult', lastSTTResult)
            addMessageChat(lastSTTResult)
            AnalyzeTalk()
        }
    }, [lastSTTResult])

    useEffect(() => {
        if (!isPlayingPreviewCurrentTrack && currentTrackList.length) {
            console.log("Добавлены дорожки для вопспроихведенеия")
            setNextTrack()
        }
    }, [currentTrackList])

    const runListener = async () => {
        setCurrentState("Система слушает микрофон")
        console.log("Включена запись микрофона")
        await getMediaRecordStream(async (answerAudio) => {
            setCurrentState("Система завершила слушать микрофон")
            let {data} = await API.convertVoiceToText({record: answerAudio}, 'ru');
            console.log("Получен результат перевода звука в текст")
            if (data !== "") {
                setCurrentState("Система перевела запись микрофона в текст")
                setLastSTTResult(data)
            } else {
                setCurrentState("Система перевела запись микрофона в текст но он пустой, завершение работы системы")
                console.log("Результат перевода звука в текст пусто перезапускается состояние")
                resetState()
            }
        })
    }

    const startTextPlayback = async (text) => {
        console.log("Говорит система")
        setCurrentState("Система говорит")
        addMessageChat(text, true)
        setLastTTSResult(await parseStringForTTS(text))
    }

    const onClickStart = async () => {
        setCurrentState("Система запущена")
        setChatItem([])
        console.log("Запущена работа сервиса")
        if (startIsActive) {
            return;
        }
        const helloText = "Добрый день, чем я могу вам помочь?";
        await startTextPlayback(helloText)
        setStartIsActive(true)
    }

    const onClickStop = () => {
        setCurrentState("Система остановлена")
        console.log("Остановлена работа сервиса")
        if (!startIsActive) {
            return;
        }
        resetState()
    }

    const setNextTrack = () => {
        if (currentTrackList.length) {
            console.log("Запуск дорожки из массива")
            setCurrentTrack(currentTrackList.shift())
            setIsPlayingPreviewCurrentTrack(true)
        } else {
            if (isPlayingPreviewCurrentTrack) {
                console.log("Все дорожки воспроизведены")
                setIsPlayingPreviewCurrentTrack(false)
                runListener()
            }
        }
    }

    const onEndPlaying = () => {
        console.log("Закончилось вопсроизведение дорожки")
        setNextTrack()
    }

    const addMessageChat = (message, system = false, end = false) => {
        console.log("Добавлено сообщение в чат")
        setChatItem(item => [...item, {
            system: system,
            message: message
        }])

        if (end) {
            setCurrentState("Система сформировала результат и заершила свою работу")
            setStartIsActive(false)
            setLastSTTResult("")
            setLastTTSResult([])
            setCurrentTrack("")
            setCurrentTrackList([])
            setIsPlayingPreviewCurrentTrack(false)
        }
    }

    const resetState = () => {
        setStartIsActive(false)
        setLastSTTResult("")
        setLastTTSResult([])
        setCurrentTrack("")
        setCurrentTrackList([])
        setIsPlayingPreviewCurrentTrack(false)
        console.log("Состояние сервиса обновлено")
    }

    return (
        <div>
            <div className={style.state}>Текущее состояние - <strong className={style.strongStrong}> {currentState}</strong></div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div>
                    <StartBtn onClick={onClickStart} isActive={!startIsActive}></StartBtn>
                    <StopBtn onClick={onClickStop} isActive={startIsActive}></StopBtn>
                </div>
                <div style={{display: 'none'}}>
                    {
                        currentTrack &&
                        <ReactHowler
                            src={currentTrack}
                            onEnd={onEndPlaying}
                            playing={isPlayingPreviewCurrentTrack}
                            format={['mp3']}
                        />
                    }
                </div>
                <div className={style.containerChat}>
                    {
                        chatItem.map((item, index) => {
                            return (
                                <div key={index} className={item.system ? style.chatItemOther : style.chatItemMe}>
                                    <span className={style.chatItemText}>
                                        {item.message}
                                    </span>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
        </div>
    )
}
