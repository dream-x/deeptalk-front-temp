import {LessonList} from "../../components/Lessons/LessonList";
import {HomeScreen} from "../../components/HomeScreen";
import {useTranslation} from "react-i18next";

export function English() {

    const {t} = useTranslation();

    return (
        <main className="main_content">
            <HomeScreen
                title={'PageEnglishTitle'}
                subtitle={'PageEnglishSubtitle'}
                description={'PageEnglishDescription'}
            />
            <section className="video-section" id="videoContainer">
                <div className="container_center">
                    <h1 className="homeScreen__title">
                        {t('AvailableLessons')}
                    </h1>
                    <LessonList />
                </div>
            </section>
        </main>
    );
}
