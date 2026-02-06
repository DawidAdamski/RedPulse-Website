import pl from './pl.json';
import en from './en.json';

export const translations = { pl, en } as const;

export type Locale = keyof typeof translations;

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.pl;
}

export const locales: Locale[] = ['pl', 'en'];
export const defaultLocale: Locale = 'pl';
