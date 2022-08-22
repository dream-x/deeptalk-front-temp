import * as React from 'react';
import {HomeScreen} from "../../components/HomeScreen";
import {useTranslation} from "react-i18next";
import {ListQuestion} from "../../components/questionBook/ListQuestion";

export function QuestionBook() {

    const {t} = useTranslation();

    return (
        <main className="main_content">
            <HomeScreen
                title=""
                subtitle=""
                description=""
            />
            <section className="video-section" id="videoContainer">
                <div className="container_center">
                    <h1 className="homeScreen__title">
                        {/*{t('PageQuestionBookComponentTitle')}*/}
                    </h1>
                    <ListQuestion/>
                </div>
            </section>
        </main>
    );
}
