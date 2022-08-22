import {HomeScreen} from "../../components/HomeScreen";
import {useTranslation} from "react-i18next";
import {Recognize} from "../../components/Recognize";

export function Recognition() {

    const {t} = useTranslation();

    return (
        <main className="main_content">
            <HomeScreen description="PageQuestionBookTitle" title="PageQuestionBookTitle" subtitle="PageQuestionBookTitle"/>
            <section className="video-section" id="videoContainer">
                <div className="container_center">
                    <h1 className="homeScreen__title">
                        {t('AvailableLessons')}
                    </h1>
                    <Recognize/>
                </div>
            </section>
        </main>
    );
}
