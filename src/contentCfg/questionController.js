export function QuestionController(scenarioName, lesson, handlers) {
    const {
        id,
        src,
        title,
        isNeedRecording,
    } = lesson;
    const {
        startRecording,
        startRecognition,
        startPlayNextTrack,
        startPlayTrack,
    } = handlers;

    const log = (...payload) => {
        console.log(src, title, ...payload);
    }

    const afterTrackEnd = () => {
        log('afterTrackEnd', src, title);

        if (isNeedRecording) {
            startRecording(scenarioName, lesson, afterRecording);
            return;
        }

        startPlayNextTrack(scenarioName, lesson);
    }
    const afterRecording = (recordedBlob) => {
        log('afterRecording', src, title);

        startRecognition(scenarioName, lesson, recordedBlob, afterRecognition);
        // TODO change to flag
        // startPlayNextTrack(scenarioName, lesson);
    }
    const afterRecognition = (payload) => {
        log('afterRecognition', payload);
    }

    const startPlay = () => {
        log('startPlay');
        startPlayTrack(scenarioName, lesson);
    }

    return {
        id,
        afterTrackEnd,
        afterRecording,
        afterRecognition,
        startPlay,
    }
}
