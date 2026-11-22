import { renderToBuffer } from '@react-pdf/renderer';
import cv from '@/content/cv.json';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import CvDocument from '@/lib/cv/CvDocument';
import { getExperiences } from '@/lib/constants/experience';
import { getPersonalInfo } from '@/lib/constants/information';
import { getTechnologies } from '@/lib/constants/technologies';
import { getLanguages, getTraining } from '@/lib/constants/training';
import { LOCALES, type Locale } from '@/lib/i18n';

// The CV as a PDF, one per language: /cv/curriculum_en.pdf and /cv/curriculum_es.pdf.
// They are written from the content of the site at build time and served as static files.
export const dynamic = 'force-static';
export const dynamicParams = false;

const labels: Record<Locale, typeof en.cv> = { en: en.cv, es: es.cv };

const fileName = (locale: Locale) => `curriculum_${locale}.pdf`;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ file: fileName(locale) }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const locale = LOCALES.find((candidate) => fileName(candidate) === file);

  if (!locale) {
    return new Response('Not found', { status: 404 });
  }

  const pdf = await renderToBuffer(
    <CvDocument
      locale={locale}
      labels={labels[locale]}
      personalInfo={getPersonalInfo(locale)}
      phone={cv.phone}
      birthDate={cv.birthDate}
      experiences={getExperiences(locale)}
      training={getTraining(locale)}
      technologies={getTechnologies(locale)}
      languages={getLanguages(locale)}
    />,
  );

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${file}"`,
    },
  });
}
