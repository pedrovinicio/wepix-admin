import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import en from './en';
import pt from './pt';

const messages: Record<string, any> = {
  en: { ...englishMessages, ...en },
  pt: { ...pt },
};

export const i18nProvider = polyglotI18nProvider(
  (locale: string) => messages[locale] || messages.en,
  'en',
  [
    { locale: 'en', name: 'English' },
    { locale: 'pt', name: 'Português' },
  ]
);
