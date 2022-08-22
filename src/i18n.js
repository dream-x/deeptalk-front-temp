import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'

import translationEN from './locales/en/translation.json';
import translationDE from './locales/ru/translation.json';

const getLang = () => {
    let langList = window.location.href.replace(`${window.location.origin}/`, '').split('/');
    return langList.includes('en') ? 'en' : 'ru';
}

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationDE
    }
};

i18n
    // Подключение бэкенда i18next
    .use(Backend)
    // Автоматическое определение языка
    .use(LanguageDetector)
    // модуль инициализации
    .use (initReactI18next)

    .init({
        resources,
        // Стандартный язык
        fallbackLng: getLang(),
        // Распознавание и кэширование языковых кук
        detection: {
            order: ['queryString', 'cookie'],
            cache: ['cookie']
        },
        interpolation: {
            escapeValue: false
        }
    })

export default i18n;
