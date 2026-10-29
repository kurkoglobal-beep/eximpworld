import { NextRequest, NextResponse } from 'next/server';
import { marketPath } from './lib/market-routes';

export function proxy(request: NextRequest) {
  const path = marketPath(request.nextUrl.pathname, 'hu');
  if (path !== request.nextUrl.pathname.replace(/\/$/, '') && request.nextUrl.pathname !== '/') {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url, 308);
  }
  const headers = new Headers(request.headers);
  headers.set('x-eximp-market', 'hu');
  headers.set('x-eximp-language', request.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'hu');
  headers.set('x-eximp-path', path);
  const host = (request.headers.get('host') || request.nextUrl.hostname).toLowerCase().replace(/:\d+$/, '');
  const preview = !['eximpworld.hu', 'www.eximpworld.hu'].includes(host) || process.env.VERCEL_ENV === 'preview';
  headers.set('x-eximp-preview', String(preview));
  const response = NextResponse.next({ request: { headers } });
  if (preview) response.headers.set('X-Robots-Tag', 'noindex, follow');
  return response;
}
export const config = { matcher: ['/((?!api|_next|__|.*\\.).*)'] };
