import sheets from '@/data/product-information.json';
import { products, type Product } from './products';

export const productInformationSheets = sheets;
export const informationSheetFor = (cas: string) => sheets.find((sheet) => sheet.cas === cas);
export const informationSheetHref = (slug: string) => `/downloads/product-information/${slug}-pis.pdf`;
// Separate English catalogue additions: the shared Hungarian catalogue stays intact.
export const additionalEnglishProducts: Product[] = sheets.filter((sheet) => sheet.additional).map((sheet) => ({
  hu: sheet.name,
  en: sheet.name,
  cas: sheet.cas,
  category: sheet.category,
  spec: 'Specification subject to supplier confirmation',
}));
export const englishCatalogueProducts = [...products, ...additionalEnglishProducts];
export const additionalEnglishQuoteOptions = sheets.filter((sheet) => sheet.additional).map((sheet) => ({
  id: sheet.slug, name: sheet.name, packaging: [] as string[],
}));
