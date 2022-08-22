import {LessonItem} from "./LessonItem";
import {useState} from "react";
import {ParsedRecordList} from "../parsedRecordList";

export function LessonList() {

    const items = [
        {
            id: 3,
            name: 'Lesson3Name',
            // description: "Worms. A worm is a standalone program that can self-replicate and spread over a network. Unlike a virus, a worm spreads by exploiting a vulnerability in the infected system or through email as an attachment masquerading as a legitimate file. A graduate student created the first worm (the Morris Worm) in 1988 as an intellectual exercise. Unfortunately, it replicated itself quickly and soon spread across the internet. ",
            description: "Worms. A worm is a standalone program that can self-replicate and spread over a network. Unlike a virus, a worm spreads by exploiting a vulnerability in the infected system or through email as an attachment masquerading as a legitimate file.",
            questions: [],
            service: 'rouge_summary'
        },
        {
            id: 4,
            name: 'Lesson4Name',
            description: "Develop these idea.",
            questions: [
                'Basketball is a team sport.',
                'You don’t need much equipment for swimming.',
                'Some sports need very expensive equipment.',
                'Cycling isn’t always safety.'
            ],
            service: 'idea_development'
        },
        {
            id: 5,
            name: 'Lesson5Name',
            description: "What is common and different?",
            questions: [],
            service: 'difference_word'
        }
    ];

    const [questions, setQuestions] = useState([]);

    const addQuestionsItem = (question) => {
        setQuestions(questions.concat(question))
    }

    return (
        <div className="lesson__container">
            <div className="lesson__list">
                {
                    items.map((item) => {
                        return <LessonItem
                            key={item.id}
                            item={item}
                            questionsCB={addQuestionsItem}
                        />
                    })
                }
            </div>
            <ParsedRecordList
                items={questions.reverse()}
                title={'ResultsQuestionsTitle'}
            />
        </div>
    );
}
