import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { getPersonalInfo } from '@/lib/constants/information';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n';
import { isLocale } from '@/lib/lang';
import { SITE_URL } from '@/lib/site';

// The card shown when the site is shared (LinkedIn, WhatsApp, Slack…), one per language.
// Written at build time from the same profile the page shows.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Moisés López López';

// One image per language, written at build time: the avatar is read from disk,
// which is only there while building
export const dynamic = 'force-static';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const profile = getPersonalInfo(isLocale(locale) ? locale : DEFAULT_LOCALE);
  const avatar = await readFile(path.join(process.cwd(), 'public', profile.avatar), 'base64');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          padding: 80,
          backgroundColor: '#0a0a0a',
          color: '#ededed',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- an image inside an image, not a page */}
        <img
          src={`data:image/jpeg;base64,${avatar}`}
          alt=""
          width={280}
          height={280}
          style={{ borderRadius: 140, border: '6px solid #262626' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{profile.name}</div>
          <div style={{ fontSize: 38, marginTop: 20, color: '#a3a3a3' }}>{profile.title}</div>
          <div style={{ fontSize: 30, marginTop: 12, color: '#a3a3a3' }}>{profile.location}</div>
          <div style={{ fontSize: 28, marginTop: 56, color: '#60a5fa' }}>{new URL(SITE_URL).host}</div>
        </div>
      </div>
    ),
    size,
  );
}
