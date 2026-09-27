import type { MetadataRoute } from 'next';
import { marketRoutePairs } from '@/lib/market-routes';
export default function sitemap(): MetadataRoute.Sitemap {
  return marketRoutePairs
    .filter(([path]) => !['/adatvedelem', '/sutik', '/aszf'].includes(path))
    .map(([path]) => ({ url: `https://eximpworld.hu${path}` }));
}
