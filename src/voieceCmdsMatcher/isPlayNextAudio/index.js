import { nextAudioTextVariations } from './nextAudioTextVariations';

export const isPlayNextAudio = (text) => nextAudioTextVariations.indexOf(text.toLowerCase()) > -1;
