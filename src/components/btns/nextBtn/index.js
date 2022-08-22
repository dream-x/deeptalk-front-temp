import {useTranslation} from "react-i18next";

export function NextBtn(props) {

    const {t} = useTranslation()

    const {
              onClick,
              isActive = true,
              label = 'SkipButtonLabel',
          } = props;

    return (
        <button className="homeScreen__action" onClick={onClick}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill={isActive ? "#74d414" : "#909090"}/>
                <path d="M27 20L16 29.4L16 10.6L27 20Z" fill="white"/>
                <rect x="27" y="10.6" width="2" height="18.8" fill="white"/>
            </svg>
            {t(label)}
        </button>
    );
}
