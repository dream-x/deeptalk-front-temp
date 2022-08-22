import {Header} from "./layouts/default/Header";
import {Main} from "./pages/main";
import {Footer} from "./layouts/default/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {English} from "./pages/english";
import {Recognition} from "./pages/recognition";
import {QuestionBook} from "./pages/questionBook";
import {TalkPage} from "./pages/talk";

export default function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Main/>}>
                    <Route path=":lang" element={<Main/>}/>
                </Route>
                <Route path="/english/" element={<English/>}>
                    <Route path=":lang" element={<English/>}/>
                </Route>
                <Route path="/recognize/" element={<Recognition/>}>
                    <Route path=":lang" element={<Recognition/>}/>
                </Route>
                <Route path="/questions/" element={<QuestionBook/>}>
                    <Route path=":lang" element={<QuestionBook/>}/>
                </Route>
                <Route path="/talk/" element={<TalkPage/>}>
                    <Route path=":lang" element={<TalkPage/>}/>
                </Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}
