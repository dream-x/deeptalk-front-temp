import * as axios from 'axios';
//TODO change point
const createRoute = () => (process.env.NODE_ENV === 'development' ? 'http://localhost' : '') + '/idea_development/idea_development';
const createBody = (req) => req;
const createCfg = () => {
    return {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }
}

export async function getIdeaInfo(req) {
    try {
        return await axios.post(createRoute(), createBody(req), createCfg());
    } catch (err) {
        return null;
    }
}
