import * as axios from 'axios';

const createRoute = () => (process.env.NODE_ENV === 'development' ? 'http://localhost' : '') + '/api_search_in_text/';
const createBody = (req) => ({
    data: req.textQuestion
});
const createCfg = () => {
    return {
        headers: {
            "Language" : "ru"
        }
    }
}

export async function searchInText(req){
    try{
        const res = await axios.post(createRoute(), createBody(req), createCfg());
        return res;
    }
    catch(err){
        console.error(err)
        return null;
    }
}
