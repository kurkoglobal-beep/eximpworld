import { products, productTechnicalData, productDetails } from './products';
import { englishSlug } from './market-routes';
export const ukCategories = [
  'Solvents',
  'Glycols',
  'Industrial Chemicals',
  'Technical Salts',
  'Speciality Chemicals',
];
const categoryMap: Record<string, string> = {
  Oldószerek: 'Solvents',
  Glikolok: 'Glycols',
  'Szervetlen sók': 'Technical Salts',
  Foszfátok: 'Technical Salts',
  Vízkezelés: 'Technical Salts',
  Kelátképzők: 'Speciality Chemicals',
  'Szerves anyagok': 'Speciality Chemicals',
};
const specs: Record<string, string> = {
  'Ipari minőség': 'Technical grade',
  'Por / granulátum': 'Powder / granules',
  Heptahidrát: 'Heptahydrate',
  Vízmentes: 'Anhydrous',
  'Nagy tisztaság': 'High purity — specification on request',
  'Ipari folyadék': 'Industrial liquid',
  'Trihidrát / vízmentes': 'Trihydrate / anhydrous',
  'Ipari / műtrágya': 'Industrial / fertiliser',
  'Folyamatos készlet': 'Specification on request',
};
export const ipaVariants = [
  {
    id: 'ipa-999-tech',
    name: 'IPA 99.9% TECH',
    grade: 'Technical',
    purity: '≥99.9%',
  },
  {
    id: 'ipa-999-high',
    name: 'IPA 99.9% HIGH PURITY',
    grade: 'High Purity',
    purity: '≥99.9%',
  },
  { id: 'ipa-70', name: 'IPA 70% SOLUTION', grade: 'Solution', purity: null },
  {
    id: 'ipa-regenerated',
    name: 'IPA REGENERATED',
    grade: 'Regenerated',
    purity: null,
  },
];
export const ukProducts = products.map((p) => {
  const ipa = p.cas === '67-63-0';
  const technical = productTechnicalData(p, true);
  return {
    id: englishSlug(p.en),
    name: p.en,
    cas: p.cas,
    ec: ipa ? '200-661-7' : null,
    formula: p.hu === 'Bentonit' ? null : technical.formula,
    category: categoryMap[p.category] || 'Industrial Chemicals',
    specification: ipa
      ? '≥99.9% — Technical / High Purity'
      : specs[p.spec] || p.spec,
    packaging: ipa ? ['25 L', '200 L Drum', '1000 L IBC', 'Bulk'] : [],
    variants: ipa ? ipaVariants : [],
    applications: productDetails(p, true).uses,
    seo: {
      title: `${p.en} UK | Chemical Supply | EximpWorld`,
      description: `Source ${p.en} for UK industry. CAS ${p.cas}. Request specifications, product documentation, packaging options and a current B2B quotation.`,
    },
  };
});
export const ipaProduct = ukProducts[0];
export type UKProduct = (typeof ukProducts)[number];
