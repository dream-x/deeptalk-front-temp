import {LessonController} from './lessonController';
import {lessons} from './lessons';
import {lessonsRu} from './lessonsRu';

export const LessonUtils = {
    getTrackControllers: (scenarioName, handlers) => {
        console.log('i18nextLng', localStorage.getItem('i18nextLng'))
        if (localStorage.getItem('i18nextLng') === 'ru') {
            return lessonsRu.map((track, index) => {
                track.id = index;
                return LessonController(scenarioName, track, handlers);
            })
        }
        return lessons.map((track, index) => {
            track.id = index;
            return LessonController(scenarioName, track, handlers);
        })
    },
    getTrackControllerByTrack: (controllers, track) => controllers[track.id],
    getNextTrackControllerByTrack: (controllers, track) => controllers[track.id + 1],
    isLastTrack: (track) => track.id === lessons.length - 1,
};
