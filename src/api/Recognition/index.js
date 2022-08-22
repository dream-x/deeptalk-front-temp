import * as axios from 'axios';

const createRoute = () => (process.env.NODE_ENV === 'development' ? 'http://localhost' : '') + '/recognition/processing';
const createBody = (req) => req;
const createCfg = () => {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'image/png'
        }
    }
}

export async function recognition(req) {
    try {
        return await axios.post(createRoute(), createBody(req), createCfg());
    } catch (err) {
        return null;
    }
}
