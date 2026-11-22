import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { LANG_COOKIE, sharedLanguagePath } from '@/lib/lang';

// Sends a URL without a language to /en or /es, after the browser's language
const handleI18n = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // The language chosen on any moilolon.com site wins over the browser's
  const path = sharedLanguagePath(request.nextUrl.pathname, request.cookies.get(LANG_COOKIE)?.value);

  if (path) {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url);
  }

  return handleI18n(request);
}

export const config = {
  // Everything but the API, Next.js and Vercel internals, and files (icon.svg, the CV, images)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
