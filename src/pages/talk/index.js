import {HomeScreen} from "../../components/HomeScreen";
import {Talk} from "../../components/Talk";

export function TalkPage() {
    return (
        <main className="main_content">
            <HomeScreen
                title={'PageEnglishTitle'}
                subtitle={'PageEnglishSubtitle'}
                description={'PageEnglishDescription'}
            />
            <div className="container_center">
                <Talk/>
            </div>
        </main>
    );
}
