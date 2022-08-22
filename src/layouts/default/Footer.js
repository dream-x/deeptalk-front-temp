import {useTranslation} from "react-i18next";

export function Footer() {

    const {t} = useTranslation();

    const getCurrentDate = () => {
        return new Date().getFullYear()
    }

    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__content">
                    <div className="footer__logo">
                        <a className="logo" href="/">
                            <img src="/img/logo_footer.svg" alt=""/>
                        </a>
                    </div>
                    <div className="footer__descr">
                        {t('FooterDescription')}
                    </div>
                    <div className="footer__copyright">
                        &copy; {t('FooterCopyMessage')} {t('FooterCopyMessageDate', {date: getCurrentDate()})}
                     </div>
                </div>
            </div>
        </footer>
    );
}
