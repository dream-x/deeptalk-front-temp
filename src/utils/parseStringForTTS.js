import {API} from "../api";

export const parseStringForTTS = async (text) => {
    const chunk = [];
    let tmpString = "";
    for (let item of text.toString().split(' ')) {
        if ((tmpString.length + `${item} `.length) > 249) {
            chunk.push(tmpString)
            tmpString = "";
        }
        tmpString += `${item} `
    }
    chunk.push(tmpString)
    return chunk;
}
