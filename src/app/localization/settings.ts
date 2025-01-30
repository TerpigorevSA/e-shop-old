import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import * as resources from './resources/';

export enum Languages {
  en = 'en',
  ru = 'ru',
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: resources.en },
      ru: { translation: resources.ru },
    },
    fallbackLng: Languages.ru,
    interpolation: {
      format: (value, format, lng) => {
        if (format === 'currency') {
          const options: Intl.NumberFormatOptions = { style: 'currency', currency: 'RUB', currencyDisplay: 'symbol' };
          return new Intl.NumberFormat(lng, options).format(value).replace('RUB', '₽');
        }
        if (format === 'date') {
          const date = typeof value === 'string' ? new Date(value) : value;
          return new Intl.DateTimeFormat(lng).format(date);
        }
        return value;
      },
      escapeValue: false,
    },
  });

export default i18n;
