// The languages of the site. Every text of src/content/ comes in all of them,
// as an object with one string per language: { "en": "…", "es": "…" }.
export const LOCALES = ['en', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export type Localized = Record<Locale, string>;

// The same content with every localized text replaced by its string in one language
export type Localize<T>
  = T extends Localized ? string
    : T extends (infer Item)[] ? Localize<Item>[]
    : T extends object ? { [Key in keyof T]: Localize<T[Key]> }
    : T;

const isLocalized = (value: object): value is Localized => {
  const keys = Object.keys(value);
  return keys.length === LOCALES.length && LOCALES.every((locale) => typeof (value as Localized)[locale] === 'string');
};

// Picks one language out of a piece of content, at any depth
export function localize<T>(content: T, locale: Locale): Localize<T> {
  if (Array.isArray(content)) {
    return content.map((item) => localize(item, locale)) as Localize<T>;
  }
  if (typeof content === 'object' && content !== null) {
    if (isLocalized(content)) {
      return content[locale] as Localize<T>;
    }
    return Object.fromEntries(
      Object.entries(content).map(([key, value]) => [key, localize(value, locale)]),
    ) as Localize<T>;
  }
  return content as Localize<T>;
}
