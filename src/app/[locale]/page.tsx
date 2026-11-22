import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/layouts/Navbar';
import Information from '@/components/sections/Information';
import Technologies from '@/components/sections/Technologies';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Training from '@/components/sections/Training';
import AboutMe from '@/components/sections/AboutMe';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { isLocale } from '@/lib/lang';

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  // Lets this page be rendered statically (the layout already rejected unknown languages)
  setRequestLocale(isLocale(locale) ? locale : DEFAULT_LOCALE);

  const t = useTranslations('footer');

  return (
    <div className="min-h-screen">
      <Navbar />
      <Information />
      <Technologies />
      <Experience />
      <Projects />
      <Training />
      <AboutMe />

      <footer className="py-8 text-center text-foreground/60 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} <a href="https://moilolon.com">moilolon</a>. {t('rights')}</p>
        </div>
      </footer>
    </div>
  );
}
