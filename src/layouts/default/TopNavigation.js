import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ChangeLanguageSelect} from "./ChangeLanguageSelect";

export function TopNavigation({showMobileMenu = false, closeMobileMenuCB = null}) {

    const {t, i18n} = useTranslation();

    const clickLink = () => {
        if (closeMobileMenuCB) {
            closeMobileMenuCB();
        }
    }

    return (
        <nav className={showMobileMenu ? 'nav header__nav open' : 'nav header__nav'}>
            <ul className="navbar">
                <li className="navbar__item">
                    <NavLink
                        to={`/${i18n.language}`}
                        className="navbar__link"
                        onClick={clickLink}
                    >
                        {t('NavLinkLecture')}
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        to={`/english/${i18n.language}`}
                        className="navbar__link"
                        onClick={clickLink}
                    >
                        {t('NavLinkLessons')}
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        to={`/recognize/${i18n.language}`}
                        className="navbar__link"
                        onClick={clickLink}
                    >
                        {t('NavLinkRecognition')}
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        to={`/questions/${i18n.language}`}
                        className="navbar__link"
                        onClick={clickLink}
                    >
                        {t('NavLinkQuestionBook')}
                    </NavLink>
                </li>
{/*                <li className="navbar__item">
                    <NavLink
                        to={`/talk/${i18n.language}`}
                        className="navbar__link"
                        onClick={clickLink}
                    >
                        {t('NavLinkTalk')}
                    </NavLink>
                </li>*/}
                <li className="navbar__item">
                    <ChangeLanguageSelect/>
                </li>
            </ul>
        </nav>
    );
}
