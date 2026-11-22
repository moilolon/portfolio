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
import { getPersonalInfo } from '@/lib/constants/information';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { isLocale } from '@/lib/lang';
import { SITE_URL } from '@/lib/site';

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = use(params);
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;

  // Lets this page be rendered statically (the layout already rejected unknown languages)
  setRequestLocale(locale);

  // Who the page is about, for search engines (schema.org), from the profile it shows
  const profile = getPersonalInfo(locale);
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': profile.name,
    'jobTitle': profile.title,
    'description': profile.description,
    'url': `${SITE_URL}/${locale}`,
    'image': `${SITE_URL}${profile.avatar}`,
    'email': `mailto:${profile.email}`,
    'address': { '@type': 'PostalAddress', 'addressLocality': 'A Coruña', 'addressCountry': 'ES' },
    'sameAs': [profile.github, profile.linkedin],
  };

  const t = useTranslations('footer');

  return (
    <div className="min-h-screen">
      {/* "<" is escaped so no text of the profile can close the script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
      />
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
