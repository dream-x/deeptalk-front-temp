import Parser from 'html-react-parser';
import {useTranslation} from "react-i18next";

export const CircleButton = ({button = {}}) => {

    const {t} = useTranslation()

    return (
        <button
            className={button.hide ? 'hidden' : "circle_button"}
            onClick={button.onClick}
            disabled={button.disabled}
        >
            {Parser(button.icon)}
            {t(button.label)}
        </button>
    );
}
