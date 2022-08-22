import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

export function AnswerLessonItem({item = {}, i = 0}) {
    const {t} = useTranslation();

    const [showStatistic, setShowStatistic] = useState(false);

    useEffect(() => {
        console.log('item', item)
    }, [item]);

    const statisticShow = {
        display: "flex"
    };
    const statisticHidden = {
        display: "none"
    };

    return (
        <div className="questions__item">
            <div className="questions__item-descr questions__item-descr--text-end">
                <div className="questions__item-title">
                    {t(item.name)} - {item.time}

                </div>
                <div className="questions__item-subtitile" style={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: "end"
                }}>
                    <div style={{
                        marginRight: ".3rem",
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'baseline'
                    }}>
                        {t(item.status)}
                        {
                            item.stat.length
                                ? (<div
                                    style={{
                                        marginLeft: "1rem",
                                        fontSize: '10px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={
                                        () => setShowStatistic(!showStatistic)
                                    }
                                >
                                    Statistic
                                </div>)
                                : ""
                        }
                    </div>
                    <div style={showStatistic ? statisticShow : statisticHidden}>
                        <ul style={{listStyleType: "none"}}>
                            {
                                item.stat.map(item => <li><strong>{item.name}</strong> {item.value}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
