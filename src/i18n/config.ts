import type en from "./dictionaries/en.json";

export const locales = ["en", "ja", "zh", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type Dictionary = typeof en;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  try {
    const dictionary = await import(`./dictionaries/${locale}.json`);
    return dictionary.default;
  } catch (error) {
    console.error(`Could not load dictionary for locale: ${locale}`, error);
    const fallback = await import(`./dictionaries/${defaultLocale}.json`);
    return fallback.default;
  }
};
