import {useTranslation} from "react-i18next";

export function ParsedRecordItem(props) {

    const {t} = useTranslation();
    const {index, item} = props;

    return (
        <div className="questions__item">
            <div className="questions__item-descr">
                <div className="questions__item-title">
                    {t('QuestionFromAuditor')} {t('NumericSymbol')}{index}
                </div>
                <div className="questions__item-subtitile">{item.question}</div>
            </div>
            <div className="questions__item-devider"></div>
            <div className="questions__item-descr questions__item-descr--text-end">
                <div className="questions__item-title">{t('YourReply')}:</div>
                <div className="questions__item-subtitile">{item.answer}</div>
            </div>
        </div>
    )
}
