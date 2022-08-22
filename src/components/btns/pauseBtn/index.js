import {useTranslation} from "react-i18next";

export function PauseBtn(props) {

    const {t} = useTranslation()

    const {
        onClick,
        isActive = true,
        label = t('PauseButtonLabel'),
    } = props;

    return (
        <button className="homeScreen__action" onClick={onClick}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill={isActive ? "#74d414" : "#909090"}/>
                <rect x="12.5714" y="12.5714" width="4.9523" height="14.8571" fill="white"/>
                <rect x="22.4763" y="12.5714" width="4.9523" height="14.8571" fill="white"/>
            </svg>
            {t(label)}
        </button>
    );
}
