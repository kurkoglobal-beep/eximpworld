export type Service = {
  slug: string;
  titleHu: string;
  titleEn: string;
  shortHu: string;
  shortEn: string;
  introHu: string;
  introEn: string;
  benefitsHu: string[];
  benefitsEn: string[];
  stepsHu: string[];
  stepsEn: string[];
};

export const services: Service[] = [
  {
    slug: 'nagykereskedelmi-alapanyag-ertekesites',
    titleHu: 'Nagykereskedelmi alapanyag-értékesítés',
    titleEn: 'Wholesale raw material supply',
    shortHu:
      'Ipari mennyiségek beszállítása egyedi szerződéses keretek között.',
    shortEn: 'Industrial quantities under flexible contractual frameworks.',
    introHu:
      'Nemzetközi gyártói és beszállítói kapcsolatainkra támaszkodva stabil, dokumentált alapanyag-ellátást szervezünk európai ipari vállalatok számára.',
    introEn:
      'Through international manufacturer and supplier relationships, we organise stable, documented raw material supply for European industrial companies.',
    benefitsHu: [
      'Egyedi mennyiségi és szerződéses konstrukciók',
      'Előre tervezhető ütemezett szállítások',
      'Gyártói specifikáció és tételszintű dokumentáció',
      'Európai beszerzési és ellátási koordináció',
    ],
    benefitsEn: [
      'Flexible volume and contract structures',
      'Predictable scheduled deliveries',
      'Manufacturer specification and batch documentation',
      'European sourcing and supply coordination',
    ],
    stepsHu: [
      'Igény és specifikáció felmérése',
      'Beszerzési forrás és feltételek egyeztetése',
      'Ajánlat és dokumentáció jóváhagyása',
      'Szállítás és utánkövetés',
    ],
    stepsEn: [
      'Requirement and specification review',
      'Source and terms confirmation',
      'Quotation and document approval',
      'Delivery and follow-up',
    ],
  },
  {
    slug: 'adr-vegyipari-logisztika',
    titleHu: 'ADR & vegyipari logisztika',
    titleEn: 'ADR & chemical logistics',
    shortHu:
      'Veszélyes áruk belföldi és nemzetközi szállítása közvetlenül a telephelyre.',
    shortEn:
      'Domestic and international delivery of dangerous goods directly to your site.',
    introHu:
      'A vegyipari szállításokat az anyag besorolásához, kiszereléséhez és a fogadóhely követelményeihez igazítva koordináljuk, ADR-kompatibilis partnerekkel.',
    introEn:
      'We coordinate chemical deliveries around classification, packaging and receiving-site requirements with ADR-capable partners.',
    benefitsHu: [
      'ADR-kompatibilis közúti szállítás',
      'Belföldi és nemzetközi útvonaltervezés',
      'Egyeztetett rakodási és érkezési időablak',
      'Fuvar- és termékdokumentáció összehangolása',
    ],
    benefitsEn: [
      'ADR-compliant road transport',
      'Domestic and international route planning',
      'Agreed loading and arrival windows',
      'Aligned freight and product documentation',
    ],
    stepsHu: [
      'Anyag és veszélyességi besorolás ellenőrzése',
      'Útvonal és fuvareszköz kiválasztása',
      'Dokumentáció és időablak egyeztetése',
      'Kézbesítés és státuszkövetés',
    ],
    stepsEn: [
      'Material and hazard classification check',
      'Route and vehicle selection',
      'Documents and time-window coordination',
      'Delivery and status tracking',
    ],
  },
  {
    slug: 'egyedi-kiszereles-attoltes',
    titleHu: 'Egyedi kiszerelés & áttöltés',
    titleEn: 'Custom packaging & transfer',
    shortHu:
      'IBC tartályok és 200 literes hordók az Ön folyamataihoz igazítva.',
    shortEn: 'IBC containers and 200-litre drums matched to your processes.',
    introHu:
      'A kiválasztott alapanyaghoz és felhasználáshoz illeszkedő kiszerelést szervezünk, különös tekintettel az IBC tartályos és hordós ellátásra.',
    introEn:
      'We organise packaging matched to the selected material and application, with a focus on IBC and drum supply.',
    benefitsHu: [
      'IBC tartály (1000 L)',
      '200 literes hordó',
      'Tételazonosítás és címkézés',
      'Beszállítói dokumentációval összehangolt kiszerelés',
    ],
    benefitsEn: [
      'IBC container (1000 L)',
      '200-litre drum',
      'Batch identification and labelling',
      'Packaging aligned with supplier documentation',
    ],
    stepsHu: [
      'Anyagkompatibilitás ellenőrzése',
      'Kiszerelés és mennyiség kiválasztása',
      'Címkézés és dokumentáció egyeztetése',
      'Átadás vagy kiszállítás',
    ],
    stepsEn: [
      'Material compatibility check',
      'Packaging and volume selection',
      'Labelling and document confirmation',
      'Handover or delivery',
    ],
  },
  {
    slug: 'szabalyozasi-dokumentacios-tamogatas',
    titleHu: 'Szabályozási & dokumentációs támogatás',
    titleEn: 'Regulatory & documentation support',
    shortHu:
      'SDS, TDS, CoA és műszaki specifikáció a kiválasztott szállítmányhoz.',
    shortEn:
      'SDS, TDS, CoA and technical specifications for the selected shipment.',
    introHu:
      'A termékhez, gyártóhoz, minőséghez és gyártási tételhez tartozó dokumentumokat az ajánlati és beszerzési folyamat részeként egyeztetjük.',
    introEn:
      'We coordinate documents linked to the product, manufacturer, grade and batch as part of the quotation and procurement process.',
    benefitsHu: [
      'Aktuális biztonsági adatlap (SDS)',
      'Műszaki adatlap és specifikáció (TDS)',
      'Analízistanúsítvány (CoA)',
      'REACH- és CLP-információ, ahol alkalmazandó',
    ],
    benefitsEn: [
      'Current Safety Data Sheet (SDS)',
      'Technical data and specification (TDS)',
      'Certificate of Analysis (CoA)',
      'REACH and CLP information where applicable',
    ],
    stepsHu: [
      'Termék és felhasználási cél azonosítása',
      'Szükséges dokumentumok meghatározása',
      'Gyártói dokumentáció ellenőrzése',
      'Dokumentumcsomag átadása',
    ],
    stepsEn: [
      'Identify product and intended use',
      'Define required documents',
      'Verify manufacturer documentation',
      'Deliver the document package',
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
