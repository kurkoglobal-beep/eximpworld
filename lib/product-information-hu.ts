import sheets from '@/data/product-information-hu.json';
import { products, type Product } from './products';
export const hungarianInformationSheetFor = (cas: string) => sheets.find(sheet => sheet.cas === cas);
export const hungarianInformationSheetHref = (slug: string) => `/downloads/product-information/hu/${slug}-adatlap.pdf`;
export const additionalHungarianProducts: Product[] = sheets.filter(sheet => sheet.additional).map(sheet => ({
  hu: sheet.name, en: sheet.name, cas: sheet.cas, category: sheet.category, spec: 'Beszállítói megerősítés alapján',
}));
export const hungarianCatalogueProducts = [...products, ...additionalHungarianProducts];
export const additionalHungarianQuoteOptions = sheets.filter(sheet => sheet.additional).map(sheet => ({
  id: sheet.slug, name: sheet.name, packaging: [] as string[],
}));
