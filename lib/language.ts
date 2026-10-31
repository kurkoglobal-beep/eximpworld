import { marketRoutePairs } from './market-routes';
export { translatedTerm } from './translated-terms';

export type Language = 'hu' | 'en';

// Reuse the catalogue and service routes; keep the Hungarian URLs unchanged.
export const languageRoutePairs = marketRoutePairs.map(([hu, english]) => ({
  hu,
  en: english === '/' ? '/en' : `/en${english === '/products/isopropyl-alcohol-ipa' ? '/products/isopropyl-alcohol' : english}`,
  legacyEnglish: english,
}));

export function languageRoute(pathname: string) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const unprefixed = clean === '/en' ? '/' : clean.startsWith('/en/') ? clean.slice(3) : clean;
  return languageRoutePairs.find(route =>
    route.hu === unprefixed || route.legacyEnglish === unprefixed || route.en === clean,
  );
}

export function languageHref(href: string, locale: Language): string {
  if (!href.startsWith('/') || href.startsWith('//') || /\.[a-z0-9]+(?:[?#]|$)/i.test(href.split('?')[0])) return href;
  const url = new URL(href, 'https://eximpworld.hu');
  const route = languageRoute(url.pathname);
  if (route) url.pathname = route[locale];
  else {
    const path = url.pathname.replace(/\/+$/, '') || '/';
    const hu = path.startsWith('/en/') ? path.slice(3) : path;
    url.pathname = locale === 'en' ? `/en${hu === '/' ? '' : hu}` : hu;
  }
  url.searchParams.delete('lang');
  return url.pathname + url.search + url.hash;
}
