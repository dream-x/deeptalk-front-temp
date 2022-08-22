import * as axios from 'axios';

const createRoute = () => (process.env.NODE_ENV === 'development' ? 'http://localhost' : '') + '/api/stt';
const createBody = (req) => req.record;
const createCfg = (lang) => {
    return {
        headers: {
            "Content-Type": "video/webm",
            "Language": lang
        }
    }
}

export async function convertVoiceToText(req, lang = "en") {
    try {
        const res = await axios.post(createRoute(), createBody(req), createCfg(lang));

        return res;
    } catch (err) {
        return null;
    }
}
