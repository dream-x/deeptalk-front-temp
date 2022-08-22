import * as axios from 'axios';
import i18n from "i18next";

const createRoute = () => (process.env.NODE_ENV === 'development' ? 'http://localhost' : '') + '/api_predict';
const createBody = (req) => ({
  data: req.textQuestion,
  lang: i18n.language
});
const createCfg = () => {
  return {
    headers: {
      "Content-Type": "application/text",
    }
  }
}

export async function processTextQuestion(req){
  try{
    const res = await axios.post(createRoute(), createBody(req), createCfg());

    return res;
  }
  catch(err){
    return null;
  }
}
