import {ParsedRecordItem} from './parsedRecordItem';
import {AnswerLessonItem} from "./AnswerLessonItem";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {AnswerQuestionBook} from "./AnswerQuestionBook";

// вопросы пушить - новые вверх
export function ParsedRecordList({items, title = 'VideoQuestionsTitle'}) {

    const {t} = useTranslation();
    return (
        <div className="questions">
            <div className="questions__header">
                {t(title)}
            </div>
            <div className="questions__body">
                <div className="questions__list">
                    {
                        items.map((item, i) => {
                            switch (item.template) {
                                case "answerLesson":
                                    return (<AnswerLessonItem key={i} item={item} i={i}/>);
                                case "answerQuestionBook":
                                    return (<AnswerQuestionBook key={i} item={item} i={i}/>);
                                default:
                                    return (<ParsedRecordItem key={i} index={items.length - i} item={item}></ParsedRecordItem>)
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

ParsedRecordList.propTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string
};

ParsedRecordList.defaultProps = {
    title: "VideoQuestionsTitle"
};
