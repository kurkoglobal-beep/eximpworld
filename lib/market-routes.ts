import { products, productSlug } from './products';
import { services } from './services';
import { markets } from '../config/markets';
import type { MarketId } from '../config/markets/types';
export const englishSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const pairs: [string, string][] = [
  ['/', '/'],
  ['/termekek', '/products'],
  ['/szolgaltatasok', '/services'],
  ['/rolunk', '/about'],
  ['/kapcsolat', '/contact'],
  ['/iparagak', '/industries'],
  ['/adatvedelem', '/privacy-policy'],
  ['/sutik', '/cookie-policy'],
  ['/aszf', '/terms-and-conditions'],
  ...products.map(
    (p) =>
      [`/termekek/${productSlug(p)}`, `/products/${englishSlug(p.en)}`] as [
        string,
        string,
      ],
  ),
  ...services.map(
    (s) =>
      [`/szolgaltatasok/${s.slug}`, `/services/${englishSlug(s.titleEn)}`] as [
        string,
        string,
      ],
  ),
];
export function marketPath(pathname: string, market: MarketId) {
  const clean = pathname.replace(/\/$/, '') || '/';
  const pair = pairs.find((p) => p.includes(clean));
  return pair ? pair[market === 'hu' ? 0 : 1] : clean;
}
export function marketUrl(path: string, market: MarketId) {
  return `https://${markets[market].domain}${marketPath(path, market)}`;
}
export const marketRoutePairs = pairs;
