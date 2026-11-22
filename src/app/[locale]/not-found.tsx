import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl font-bold text-foreground/30">404</p>
      <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>
      <p className="text-lg text-foreground/70 max-w-md">{t('text')}</p>
      <Link
        href="/"
        className="mt-4 px-6 py-2.5 rounded-full text-sm font-medium text-background bg-foreground hover:bg-foreground/90 transition-colors"
      >
        {t('back')}
      </Link>
    </main>
  );
}
