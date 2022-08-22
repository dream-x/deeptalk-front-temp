import {watchForAudioStreamEvents} from "../watchForAudioStreamEvents";
import ysFixWebmDuration from "fix-webm-duration";

export const getMediaRecordStream = async (onStopCB = undefined) => {

    let _audioStream;

    _audioStream = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
    try {
        const mediaRecorder = new MediaRecorder(_audioStream);
        const startTime = Date.now();
        const audioChunks = [];
        mediaRecorder.start();
        watchForAudioStreamEvents(
            _audioStream,
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
                if (onStopCB !== undefined) {
                    onStopCB(fixedBlob)
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
}
