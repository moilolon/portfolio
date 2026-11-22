'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { LOCALES, type Locale } from '@/lib/i18n';
import { saveLang } from '@/lib/lang';

export default function LanguageSwitcher() {
  const t = useTranslations('nav');
  const current = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (locale: Locale) => {
    if (locale === current) {
      return;
    }
    // Remembered for this site and, on the published domain, for the other moilolon.com sites
    saveLang(locale);
    router.replace(pathname, { locale, scroll: false });
  };

  return (
    <div role="group" aria-label={t('language')} className="flex items-center rounded-md text-sm font-medium">
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          lang={locale}
          onClick={() => switchTo(locale)}
          aria-pressed={locale === current}
          title={t('languageName', { locale })}
          className={`px-2 py-1 rounded-md uppercase transition-colors cursor-pointer ${
            locale === current ? 'bg-foreground/10' : 'text-foreground/60 hover:bg-foreground/10'
          }`}
        >
          <span aria-hidden="true">{locale}</span>
          <span className="sr-only">{t('languageName', { locale })}</span>
        </button>
      ))}
    </div>
  );
}
