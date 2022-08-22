import {Icons} from "../../Constants";
import {useEffect, useRef, useState} from "react";
import {watchForAudioStreamEvents} from "../../watchForAudioStreamEvents";
import ysFixWebmDuration from "fix-webm-duration";
import {CircleButton} from "../btns";

export const ListenMicrophone = ({updateStream = null, disabled = false, hidden = false}) => {

    const userAudioStreamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [icon, setIcon] = useState(Icons.ICON_HAND);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        setIsDisabled(disabled)
    }, [disabled])

    useEffect(() => {
        const getStreamPermission = async () => {
            userAudioStreamRef.current = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
        }
        getStreamPermission();

    }, []);


    const toggleButton = () => {
        if (!updateStream) {
            console.error('Не передана функция приема результата')
            return null;
        }

        if (disabled) {
            return null;
        }

        setIsDisabled(true)
        setIcon(Icons.ICON_MICROPHONE);

        const audioChunks = [];

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

        mediaRecorder.ondataavailable = function (event) {
            audioChunks.push(event.data);
        }

        mediaRecorder.onstop = function () {
            setIsDisabled(false)
            setIcon(Icons.ICON_HAND);
            let duration = Date.now() - startTime;
            ysFixWebmDuration(new Blob(audioChunks, {type: mediaRecorder.mimeType}), duration, (fixedBlob) => {
                updateStream(fixedBlob);
            });
        }
    }

    const buttonAnswer = {
        label: 'GiveAnswerQuestionButtonLabel',
        icon: icon,
        hide: false,
        disabled: isDisabled,
        onClick: toggleButton
    };

    return (
        <div className={hidden ? 'invisibility' : ''}>
            <CircleButton button={buttonAnswer}/>
        </div>
    );
}
