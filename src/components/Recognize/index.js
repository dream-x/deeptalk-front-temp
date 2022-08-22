import {DragAndDrop} from "../DragAndDrop";
import {API} from "../../api";
import {useState} from "react";
import {Loader} from "../Loader";
import {useTranslation} from "react-i18next";

export function Recognize() {
    const {t} = useTranslation();
    const [isRunRecognition, setIsRunRecognition] = useState(false);
    const [resultRecognition, setResultRecognition] = useState('');

    const handleDragAndDropChange = (loadFiles) => {
        runRecognition(loadFiles[0])
    }

    const runRecognition = (file) => {
        setIsRunRecognition(true);
        API.recognition(file)
            .then(({data}) => {
                if (data.text) {
                    setResultRecognition(data.text)
                } else {
                    setResultRecognition("NothingRecognized")
                }
            })
            .catch(error => {
                console.error("RecognitionError", error)
            })
            .finally(() => {
                setIsRunRecognition(false);
            })
    }

    return (
        <div className="container-recognize">
            <div className="item">
                <DragAndDrop onFileChange={handleDragAndDropChange}/>
            </div>
            <div className="item">
                {
                    resultRecognition ? (
                        <div>
                            <span className="recognize-result-title">
                                {t("RecognitionResult")}
                            </span>
                            <div className="recognize-result">
                                {resultRecognition}
                            </div>
                        </div>
                    ) : ""
                }
                <div className="recognize-result-loader">
                    <Loader hidden={!isRunRecognition}/>
                </div>
            </div>
        </div>
    );
}
