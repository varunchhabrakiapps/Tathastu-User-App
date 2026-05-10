import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import en from './locales/en/translation.json';

/** Extend this array and add `locales/<code>/translation.json`. */
const supportedLanguages = ['en'] as const;

const resources = {
  en: { translation: en },
} as const;

function resolveInitialLanguage(): string {
  const code = getLocales()[0]?.languageCode;
  if (
    code &&
    (supportedLanguages as readonly string[]).includes(code)
  ) {
    return code;
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources,
  lng: resolveInitialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});

export default i18n;
