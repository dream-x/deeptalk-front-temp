import * as axios from 'axios';

const createRoute = () => (process.env.NODE_ENV === 'development' ? 'http://localhost' : '') + '/api/tts';
const createBody = (req) => JSON.stringify({data: req});
const createCfg = () => {
    return {
        responseType: 'arraybuffer',
        headers: {
            "Content-Type": "application/json",
        }
    }
}

export async function convertTextToSound(req) {
    try {
        return await axios.post(createRoute(), createBody(req), createCfg());
    } catch (err) {
        return null;
    }
}
