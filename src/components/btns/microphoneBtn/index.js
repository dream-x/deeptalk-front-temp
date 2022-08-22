import {useTranslation} from "react-i18next";

export function MicrophoneBtn(props) {

    const {t} = useTranslation()

    const {
        onClick,
        isActive = true,
        label = 'StartButtonLabel',
    } = props;

    return (
        <button className="homeScreen__action" onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 1000 1000"
                fill={isActive ? "#74d414" : "#909090"}
                xmlSpace="preserve">

                <path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,
                        490-219.4,490-490C990,229.4,770.6,10,500,10z M387,277.9c0-64.7,50.6-117.1,
                        113.1-117.1c62.5,0,113.1,52.4,113.1,117.1v234.2c0,64.7-50.6,117.1-113.1,
                        117.1c-62.5,0-113.1-52.4-113.1-117.1V277.9z M631,838.7H369.5V801h111.9v-92.4l37.7,
                        0.1V801H631V838.7z M684.8,508.1c0,107.6-83.7,194.8-187,194.8c-103.3,
                        0-187-87.2-187-194.8V405.8h38.5v113.1c0,83.3,67.5,150.8,150.8,150.8c83.3,0,
                        150.8-67.5,150.8-150.8V405.8h34V508.1L684.8,508.1z"/>
            </svg>
            {t(label)}
        </button>
    );
}
