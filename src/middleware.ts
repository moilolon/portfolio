import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { isLocale, LANG_COOKIE } from '@/lib/lang';

// Sends a URL without a language to /en or /es, after the browser's language
const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLanguage = routing.locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  const shared = request.cookies.get(LANG_COOKIE)?.value;

  // The language chosen on any moilolon.com site wins over the browser's
  if (!hasLanguage && isLocale(shared)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${shared}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  return handleI18n(request);
}

export const config = {
  // Everything but the API, Next.js and Vercel internals, and files (icon.svg, the CV, images)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
