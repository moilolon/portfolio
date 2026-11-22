import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';
import { themeInitScript } from '@/lib/theme';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface LocaleParams {
  params: Promise<{ locale: string }>;
}

// One static page per language
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords: ['Salesforce Commerce Cloud', 'SFCC', 'SFRA', 'Salesforce developer', 'e-commerce', 'full stack', 'Node.js', 'JavaScript', 'Java', 'portfolio', 'A Coruña'],
    authors: [{ name: 'moilolon' }],
    creator: 'Moisés López López',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, `/${language}`])),
        // Without a language the proxy chooses one
        'x-default': '/',
      },
    },
    // The card of a shared link; its image is opengraph-image.tsx
    openGraph: {
      type: 'profile',
      url: `/${locale}`,
      siteName: 'moilolon',
      title: t('title'),
      description: t('description'),
      locale,
      alternateLocale: routing.locales.filter((language) => language !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
}> & LocaleParams) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Lets the pages of this language be rendered statically
  setRequestLocale(locale);

  return (
    // suppressHydrationWarning: data-theme is set by the inline script before React hydrates
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
        {/* Defines <moilolon-nav>, the site switcher shared by every moilolon.com site (used in Navbar) */}
        <Script src="https://moilolon.com/nav.js" strategy="afterInteractive" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
