import {useTranslation} from "react-i18next";
import {useEffect, useRef} from "react";

export function ChangeLanguageSelect() {

    const {i18n} = useTranslation();

    const refSelect = useRef(null)

    useEffect(() => {
        refSelect.current.value = i18n.language;
    }, [i18n.language])

    const changeLanguage = () => {
        i18n.changeLanguage(refSelect.current.value);
    };

    return (
        <select
            onChange={changeLanguage}
            ref={refSelect}
            className="change__lang"
        >
            <option value="en">en</option>
            <option value="ru">ru</option>
        </select>
    );
}
