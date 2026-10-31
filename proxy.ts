import { NextRequest, NextResponse } from 'next/server';
import { languageHref, languageRoute } from './lib/language';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/');
  const lang = request.nextUrl.searchParams.get('lang');
  const locale = lang === 'en' || lang === 'hu' ? lang : isEnglish ? 'en' : 'hu';
  const route = languageRoute(pathname);
  const origin = new URL(request.url);
  const target = languageHref(pathname + request.nextUrl.search, locale);
  const host = (request.headers.get('host') || request.nextUrl.hostname).toLowerCase().replace(/:\d+$/, '');
  const preview = !['eximpworld.hu', 'www.eximpworld.hu'].includes(host) || process.env.VERCEL_ENV === 'preview';

  // One redirect removes the old language parameter, resolves aliases and
  // normalizes the trailing slash, retaining all RFQ/tracking parameters.
  // Vercel may normalize spaces in queries (%20 versus +). Compare paths
  // and the legacy parameter, never the serialized query, to avoid loops.
  if (new URL(target, origin).pathname !== pathname || request.nextUrl.searchParams.has('lang')) {
    const response = NextResponse.redirect(new URL(target, origin), 301);
    if (preview) response.headers.set('X-Robots-Tag', 'noindex, follow');
    return response;
  }

  const headers = new Headers(request.headers);
  headers.set('x-eximp-market', 'hu');
  headers.set('x-eximp-language', locale);
  headers.set('x-eximp-path', route?.hu || pathname);
  headers.set('x-eximp-preview', String(preview));

  // Render the existing pages in English without changing the visible URL.
  const url = new URL(origin);
  if (isEnglish && route) url.pathname = route.hu;
  const response = isEnglish && route
    ? NextResponse.rewrite(url, { request: { headers } })
    : NextResponse.next({ request: { headers } });
  if (preview) response.headers.set('X-Robots-Tag', 'noindex, follow');
  return response;
}
export const config = { matcher: ['/((?!api|_next|__|.*\\.).*)'] };
