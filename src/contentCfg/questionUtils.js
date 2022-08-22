import { QuestionController } from './questionController';
import { questions } from './questions';

export const QuestionUtils = {
    getTrackControllers: (scenarioName, handlers) => questions.map((track, index) => {
        track.id = index;
        return QuestionController(scenarioName, track, handlers);
    }),
    getTrackControllerByTrack: (controllers, track) => controllers[track.id],
    getNextTrackControllerByTrack: (controllers, track) => controllers[track.id + 1],
    isLastTrack: (track) => true,
};
