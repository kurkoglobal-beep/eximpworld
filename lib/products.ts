export type Product = {
  hu: string;
  en: string;
  cas: string;
  spec: string;
  category: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    hu: 'Izopropil-alkohol (IPA)',
    en: 'Isopropyl Alcohol (IPA)',
    cas: '67-63-0',
    spec: '99.9% Tech / Pharma',
    category: 'Oldószerek',
    featured: true,
  },
  {
    hu: 'Glicerin',
    en: 'Glycerol',
    cas: '56-81-5',
    spec: 'USP / Ph. Eur. / Tech',
    category: 'Glikolok',
  },
  {
    hu: 'Ioncserélt víz',
    en: 'Demineralized Water',
    cas: '7732-18-5',
    spec: 'Ipari minőség',
    category: 'Tisztított vizek',
  },
  {
    hu: 'Bentonit',
    en: 'Bentonite',
    cas: '1302-78-9',
    spec: 'Por / granulátum',
    category: 'Ásványi anyagok',
  },
  {
    hu: 'Magnézium-karbonát',
    en: 'Magnesium Carbonate',
    cas: '546-93-0',
    spec: 'Ipari minőség',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Magnézium-oxid',
    en: 'Magnesium Oxide',
    cas: '1309-48-4',
    spec: 'Ipari minőség',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Magnézium-szulfát',
    en: 'Magnesium Sulphate',
    cas: '7487-88-9',
    spec: 'Heptahidrát',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Nátrium-szulfát',
    en: 'Sodium Sulphate',
    cas: '7757-82-6',
    spec: 'Vízmentes',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Nátrium-hidrogén-karbonát',
    en: 'Sodium Bicarbonate',
    cas: '144-55-8',
    spec: 'Food / Tech',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Nátrium-karbonát könnyű',
    en: 'Sodium Carbonate Light',
    cas: '497-19-8',
    spec: 'Light grade',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Nátrium-karbonát nehéz',
    en: 'Sodium Carbonate Dense',
    cas: '497-19-8',
    spec: 'Dense grade',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Sótabletta vízlágyításhoz',
    en: 'Salt Tablets',
    cas: '7647-14-5',
    spec: 'Folyamatos készlet',
    category: 'Vízkezelés',
  },
  {
    hu: 'Vákuum só',
    en: 'Vacuum Salt',
    cas: '7647-14-5',
    spec: 'Nagy tisztaság',
    category: 'Vízkezelés',
  },
  {
    hu: 'Monopropilénglikol (MPG)',
    en: 'Monopropylene Glycol (MPG)',
    cas: '57-55-6',
    spec: 'USP / Tech',
    category: 'Glikolok',
    featured: true,
  },
  {
    hu: 'Trietilén-glikol (TEG)',
    en: 'Triethylene Glycol (TEG)',
    cas: '112-27-6',
    spec: 'Ipari folyadék',
    category: 'Glikolok',
  },
  {
    hu: 'Nátrium-acetát',
    en: 'Sodium Acetate',
    cas: '127-09-3',
    spec: 'Trihidrát / vízmentes',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Trinátrium-citrát',
    en: 'Trisodium Citrate',
    cas: '68-04-2',
    spec: 'Food / Tech',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Dinátrium-foszfát',
    en: 'Disodium Phosphate',
    cas: '7558-79-4',
    spec: 'Food / Tech',
    category: 'Foszfátok',
  },
  {
    hu: 'Mononátrium-foszfát',
    en: 'Monosodium Phosphate',
    cas: '7558-80-7',
    spec: 'Food / Tech',
    category: 'Foszfátok',
  },
  {
    hu: 'Monokálium-foszfát',
    en: 'Monopotassium Phosphate',
    cas: '7778-77-0',
    spec: 'Food / Tech',
    category: 'Foszfátok',
  },
  {
    hu: 'Na-hexametafoszfát',
    en: 'Sodium Hexametaphosphate',
    cas: '10124-56-8',
    spec: 'Ipari minőség',
    category: 'Foszfátok',
  },
  {
    hu: 'Nátrium-tripolifoszfát (STPP)',
    en: 'Sodium Tripolyphosphate',
    cas: '7758-29-4',
    spec: 'Ipari minőség',
    category: 'Foszfátok',
  },
  {
    hu: 'EDTA Na2 / Na4',
    en: 'EDTA Na2 / Na4',
    cas: '6381-92-6 / 64-02-8',
    spec: 'Nagy tisztaság',
    category: 'Kelátképzők',
  },
  {
    hu: 'Kálium-karbonát',
    en: 'Potassium Carbonate',
    cas: '584-08-7',
    spec: 'Ipari minőség',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Magnézium-klorid hexahidrát',
    en: 'Magnesium Chloride Hexahydrate',
    cas: '7791-18-6',
    spec: 'Ipari minőség',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Ammónium-szulfát',
    en: 'Ammonium Sulphate',
    cas: '7783-20-2',
    spec: 'Ipari / műtrágya',
    category: 'Szervetlen sók',
  },
  {
    hu: 'Glicin',
    en: 'Glycine',
    cas: '56-40-6',
    spec: 'Food / Tech',
    category: 'Szerves anyagok',
  },
];

export const categories = [
  'Mind',
  'Oldószerek',
  'Glikolok',
  'Tisztított vizek',
  'Ásványi anyagok',
  'Szervetlen sók',
  'Vízkezelés',
  'Foszfátok',
  'Kelátképzők',
  'Szerves anyagok',
];

export function productSlug(product: Product) {
  return product.hu
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getProductBySlug(slug: string) {
  return products.find((product) => productSlug(product) === slug);
}

const formulas: Record<string, string> = {
  'Izopropil-alkohol (IPA)': 'C₃H₈O',
  Glicerin: 'C₃H₈O₃',
  'Ioncserélt víz': 'H₂O',
  Bentonit: 'Változó összetételű alumínium-filloszilikát',
  'Magnézium-karbonát': 'MgCO₃',
  'Magnézium-oxid': 'MgO',
  'Magnézium-szulfát': 'MgSO₄ · 7H₂O',
  'Nátrium-szulfát': 'Na₂SO₄',
  'Nátrium-hidrogén-karbonát': 'NaHCO₃',
  'Nátrium-karbonát könnyű': 'Na₂CO₃',
  'Nátrium-karbonát nehéz': 'Na₂CO₃',
  'Sótabletta vízlágyításhoz': 'NaCl',
  'Vákuum só': 'NaCl',
  'Monopropilénglikol (MPG)': 'C₃H₈O₂',
  'Trietilén-glikol (TEG)': 'C₆H₁₄O₄',
  'Nátrium-acetát': 'C₂H₃NaO₂',
  'Trinátrium-citrát': 'Na₃C₆H₅O₇',
  'Dinátrium-foszfát': 'Na₂HPO₄',
  'Mononátrium-foszfát': 'NaH₂PO₄',
  'Monokálium-foszfát': 'KH₂PO₄',
  'Na-hexametafoszfát': '(NaPO₃)₆',
  'Nátrium-tripolifoszfát (STPP)': 'Na₅P₃O₁₀',
  'EDTA Na2 / Na4': 'C₁₀H₁₄N₂Na₂O₈ / C₁₀H₁₂N₂Na₄O₈',
  'Kálium-karbonát': 'K₂CO₃',
  'Magnézium-klorid hexahidrát': 'MgCl₂ · 6H₂O',
  'Ammónium-szulfát': '(NH₄)₂SO₄',
  Glicin: 'C₂H₅NO₂',
};

const liquidCategories = new Set([
  'Oldószerek',
  'Glikolok',
  'Tisztított vizek',
]);

export function productTechnicalData(product: Product, en = false) {
  const liquid = liquidCategories.has(product.category);
  return {
    formula:
      formulas[product.hu] ??
      (en ? 'Supplier specification' : 'Beszállítói specifikáció'),
    synonym: `${product.en} · ${product.hu}`,
    form: liquid
      ? en
        ? 'Liquid'
        : 'Folyadék'
      : en
        ? 'Solid, powder, granule or crystalline form depending on grade'
        : 'Szilárd, por, granulátum vagy kristályos forma a minőségtől függően',
  };
}

const categoryCopy: Record<
  string,
  { hu: string; en: string; usesHu: string[]; usesEn: string[] }
> = {
  Oldószerek: {
    hu: 'Sokoldalúan alkalmazható ipari oldószer, amelyet gyártási, tisztítási és formulázási folyamatokhoz használnak. A végleges minőséget mindig az alkalmazás és a beszállítói specifikáció alapján választjuk ki.',
    en: 'A versatile industrial solvent used in manufacturing, cleaning and formulation processes. Final grade selection is always matched to the application and supplier specification.',
    usesHu: [
      'Ipari tisztítás és zsírtalanítás',
      'Festék-, bevonat- és tintaformulázás',
      'Vegyipari gyártási segédanyag',
    ],
    usesEn: [
      'Industrial cleaning and degreasing',
      'Paint, coating and ink formulation',
      'Chemical processing aid',
    ],
  },
  Glikolok: {
    hu: 'Ipari és formulázási célokra használt, jól dokumentálható alapanyag. A megfelelő minőség kiválasztását a technológiai cél, a tisztasági követelmény és a végfelhasználás határozza meg.',
    en: 'A well-documented raw material used for industrial and formulation purposes. Grade selection depends on the process, purity requirement and end use.',
    usesHu: [
      'Hőátadó és fagyálló közegek',
      'Formulázási és hordozóanyag-feladatok',
      'Vegyipari köztes felhasználás',
    ],
    usesEn: [
      'Heat-transfer and antifreeze media',
      'Formulation and carrier applications',
      'Chemical intermediate use',
    ],
  },
  'Tisztított vizek': {
    hu: 'Ellenőrzött minőségű technológiai víz ipari gyártási és tisztítási folyamatokhoz. A vezetőképességi és mikrobiológiai elvárásokat felhasználásonként szükséges rögzíteni.',
    en: 'Controlled-quality process water for industrial manufacturing and cleaning. Conductivity and microbiological requirements must be specified for each application.',
    usesHu: [
      'Technológiai és öblítővíz',
      'Oldatkészítés és hígítás',
      'Kazán- és vízkezelési rendszerek',
    ],
    usesEn: [
      'Process and rinse water',
      'Solution preparation and dilution',
      'Boiler and water-treatment systems',
    ],
  },
  'Ásványi anyagok': {
    hu: 'Ásványi eredetű ipari alapanyag, amelynek szemcsemérete, nedvességtartalma és feldolgozottsága alkalmazásonként eltérhet.',
    en: 'A mineral-origin industrial raw material whose particle size, moisture and processing grade may vary by application.',
    usesHu: [
      'Abszorbens és hordozóanyag',
      'Töltőanyag és reológiai módosító',
      'Ipari keverékek és granulátumok',
    ],
    usesEn: [
      'Absorbent and carrier material',
      'Filler and rheology modifier',
      'Industrial blends and granulates',
    ],
  },
  'Szervetlen sók': {
    hu: 'Széles körben alkalmazott szervetlen ipari alapanyag. A hidratáltsági állapotot, tisztaságot, szemcseméretet és alkalmazási minőséget minden ajánlatnál pontosítjuk.',
    en: 'A widely used inorganic industrial raw material. Hydration state, purity, particle size and application grade are confirmed with each offer.',
    usesHu: [
      'Vegyipari gyártás és formulázás',
      'pH- és folyamatbeállítás',
      'Élelmiszer-, takarmány- vagy műszaki felhasználás megfelelő minőségben',
    ],
    usesEn: [
      'Chemical manufacturing and formulation',
      'pH and process adjustment',
      'Food, feed or technical use in the appropriate grade',
    ],
  },
  Vízkezelés: {
    hu: 'Vízkezelési és regenerálási folyamatokhoz használt alapanyag. A szemcseméretet, oldhatóságot és tisztasági követelményt a berendezés és az üzemeltetési cél alapján kell meghatározni.',
    en: 'A raw material used in water-treatment and regeneration processes. Particle size, solubility and purity requirements depend on the equipment and operating objective.',
    usesHu: [
      'Vízlágyító berendezések regenerálása',
      'Ipari vízkezelés',
      'Technológiai sófelhasználás',
    ],
    usesEn: [
      'Water-softener regeneration',
      'Industrial water treatment',
      'Process salt applications',
    ],
  },
  Foszfátok: {
    hu: 'Funkcionális foszfátalapú nyersanyag ipari, élelmiszeripari vagy vízkezelési alkalmazásokhoz. A minőséget és a szabályozási alkalmasságot felhasználásonként igazoljuk.',
    en: 'A functional phosphate raw material for industrial, food or water-treatment applications. Grade and regulatory suitability are confirmed per use case.',
    usesHu: [
      'Pufferelés és pH-szabályozás',
      'Vízkezelés és komplexképzés',
      'Élelmiszer- vagy műszaki formulázás',
    ],
    usesEn: [
      'Buffering and pH control',
      'Water treatment and complexing',
      'Food or technical formulation',
    ],
  },
  Kelátképzők: {
    hu: 'Fémionok megkötésére szolgáló funkcionális alapanyag. A megfelelő sóforma és koncentráció kiválasztása a közeg, a pH és az alkalmazási cél függvénye.',
    en: 'A functional raw material used to bind metal ions. Salt form and concentration depend on the medium, pH and intended application.',
    usesHu: [
      'Mosó- és tisztítószer-formulázás',
      'Vízkezelés és vízkőképződés-szabályozás',
      'Ipari folyamatstabilizálás',
    ],
    usesEn: [
      'Detergent and cleaner formulation',
      'Water treatment and scale control',
      'Industrial process stabilisation',
    ],
  },
  'Szerves anyagok': {
    hu: 'Szerves eredetű funkcionális alapanyag, többféle ipari és formulázási célra. A szükséges tisztaságot és szabályozási minőséget a végfelhasználás alapján kell meghatározni.',
    en: 'A functional organic raw material for a range of industrial and formulation uses. Required purity and regulatory grade depend on the end use.',
    usesHu: [
      'Élelmiszer- és takarmányipari formulázás megfelelő minőségben',
      'Vegyipari gyártás',
      'Funkcionális adalékanyag-felhasználás',
    ],
    usesEn: [
      'Food and feed formulation in the appropriate grade',
      'Chemical manufacturing',
      'Functional additive use',
    ],
  },
};

export function productDetails(product: Product, en = false) {
  const content =
    categoryCopy[product.category] ?? categoryCopy['Szervetlen sók'];
  return {
    summary: en ? content.en : content.hu,
    uses: en ? content.usesEn : content.usesHu,
    packaging: en
      ? [
          'IBC container (1000 L)',
          '200 L drum',
          'Exact packaging suitability is confirmed in the quotation',
        ]
      : [
          'IBC tartály (1000 L)',
          '200 L-es hordó',
          'A kiszerelés pontos alkalmasságát az ajánlatban igazoljuk vissza',
        ],
  };
}
