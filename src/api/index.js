import {convertVoiceToText} from './voice';
import {processTextQuestion} from './predict';
import {convertTextToSound} from "./TextToSound";
import {getRougeInfo} from "./RougeSummary";
import {getIdeaInfo} from "./IdeaDevelopment/IdeaDevelopment";
import {recognition} from "./Recognition";
import {searchInText} from "./searchInText";
import {DifferenceWord} from "./differenceWord/DifferenceWord";
import {AnalyzeTalk} from "./AnalyzeTalk";

export const API = {
    DifferenceWord,
    convertVoiceToText,
    processTextQuestion,
    convertTextToSound,
    getRougeInfo,
    getIdeaInfo,
    recognition,
    searchInText,
    AnalyzeTalk
}
