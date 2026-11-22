import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

// /sitemap.xml: the page in each language, each one pointing at its translations
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}`]));

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: 'monthly',
    priority: 1,
    alternates: { languages },
  }));
}
