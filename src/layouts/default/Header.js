import '../../App.css';
import {useTranslation} from "react-i18next";
import {TopNavigation} from "./TopNavigation";
import Parser from 'html-react-parser';
import {Icons} from "../../Constants";
import {useCallback, useState} from "react";

export function Header() {

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const {t} = useTranslation();
    const parentPage = 'http://deeptalk.tech';

    const showMenuMobile = () => {
        setShowMobileMenu(!showMobileMenu);
    }

    const closeMobileMenu = useCallback(() => {
        setShowMobileMenu(false)
    }, [])

    return (
        <header className="header">
            <div className="header__content">
                <a className="header__backlink" href={parentPage}>
                    {Parser(Icons.ICON_GET_BACK)}
                    {t('GetBackButtonLabel')}
                </a>
                <div className={showMobileMenu ? 'navbar__toggle active' : 'navbar__toggle'} onClick={showMenuMobile}></div>
                <TopNavigation showMobileMenu={showMobileMenu} closeMobileMenuCB={closeMobileMenu}/>
            </div>
        </header>
    );
}
