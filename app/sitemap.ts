import type { MetadataRoute } from 'next';
import { languageRoutePairs } from '@/lib/language';

export default function sitemap(): MetadataRoute.Sitemap {
  return languageRoutePairs
    .filter(({ hu }) => !['/adatvedelem', '/sutik', '/aszf'].includes(hu))
    .flatMap(({ hu, en }) => {
      const languages = { hu: `https://eximpworld.hu${hu}`, en: `https://eximpworld.hu${en}` };
      return [hu, en].map(path => ({
        url: `https://eximpworld.hu${path}`,
        alternates: { languages },
      }));
    });
}
