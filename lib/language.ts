export type Language = 'hu' | 'en';
export function languageHref(href: string, locale: Language): string {
  if (!href.startsWith('/') || href.startsWith('//') || /\.[a-z0-9]+(?:[?#]|$)/i.test(href.split('?')[0])) return href;
  const url = new URL(href, 'https://eximpworld.hu');
  if (locale === 'en') url.searchParams.set('lang', 'en');
  else url.searchParams.delete('lang');
  return url.pathname + url.search + url.hash;
}

const terms: Record<string,string> = {"Mind": "All", "Oldószerek": "Solvents", "Glikolok": "Glycols", "Tisztított vizek": "Purified water", "Ásványi anyagok": "Minerals", "Szervetlen sók": "Inorganic salts", "Vízkezelés": "Water treatment", "Foszfátok": "Phosphates", "Kelátképzők": "Chelating agents", "Szerves anyagok": "Organic materials", "Ipari minőség": "Industrial grade", "Por / granulátum": "Powder / granules", "Heptahidrát": "Heptahydrate", "Vízmentes": "Anhydrous", "Folyamatos készlet": "Regular stock", "Nagy tisztaság": "High purity", "Ipari folyadék": "Industrial liquid", "Trihidrát / vízmentes": "Trihydrate / anhydrous", "Ipari / műtrágya": "Industrial / fertiliser", "ADR Raktár / Depo": "ADR warehouse / depot", "Változó összetételű alumínium-filloszilikát": "Aluminium phyllosilicate of variable composition"};
export const translatedTerm = (text: string, en: boolean) => en ? (terms[text] || text) : text;
