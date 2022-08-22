import * as axios from 'axios';
//TODO change point
const createRoute = () => (process.env.NODE_ENV === 'development' ? 'http://localhost' : '') + '/api_difference_word/';
const createBody = (req) => req;
const createCfg = () => {
    return {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }
}

const mock = [
    {
        type: 'question',
        data: 'вопрос пользователю'
    },
    {
        type: 'question',
        data: 'вопрос пользователю 2'
    },
    {
        type: 'question',
        data: 'вопрос пользователю 3'
    },
    {
        type: 'question',
        data: 'вопрос пользователю 4'
    },
    {
        "type": "result",
        "data": {first_name: "Иван", middle_name: "Иванович", last_name: "Иванов", reason: 'fire'}
    },
    {
        "type": "result",
        "data": {first_name: "Петр", middle_name: "Петрович", last_name: "Петров", reason: 'died'}
    },
    {
        "type": "result",
        "data": {first_name: "Сергей", middle_name: "Сергеевич", last_name: "Сергеев", reason: 'wound'}
    }
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function AnalyzeTalk(req) {
    await sleep(2000)
    return {data: mock[Math.floor(Math.random() * mock.length)]};
    // try {
    //     return await axios.post(createRoute(), createBody(req), createCfg());
    // } catch (err) {
    //     return null;
    // }
}
