import * as React from 'react';
import {useState} from 'react';
import {ItemQuestion} from "./ItemQuestion";
import {ParsedRecordList} from "../parsedRecordList";
import styles from './ListQuestion.module.css'

export const ListQuestion = () => {

    const [answers, setAnswers] = useState([]);

    const addQuestionsItem = (question) => {
        console.log('addQuestionsItem', question)
        setAnswers(answers.concat(question))
    }

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <ItemQuestion questionsCB={addQuestionsItem}/>
            </div>

            <ParsedRecordList
                items={answers.reverse()}
                title={'ResultsQuestionsTitle'}
            />
        </div>
    );
};
