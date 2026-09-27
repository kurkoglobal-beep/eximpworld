import type { MarketConfig } from './types';
export const hu: MarketConfig = {
  id: 'hu',
  domain: 'eximpworld.hu',
  name: 'Hungary',
  language: 'hu',
  hreflang: 'hu-HU',
  currencies: ['HUF', 'EUR'],
  compliance: 'EU REACH',
  company: {
    name: 'Eximpworld Kft',
    address: [
      'Head Office',
      'Andrássy Palace',
      '1061 Budapest, Andrássy út 9.',
      'ADR Raktár / Depo',
      'H-1097 Budapest, Kén utca 8.',
    ],
    email: 'sales@eximpworld.hu',
    centralEmail: 'info@eximpworld.hu',
    depotEmail: 'depo@eximpworld.hu',
    phone: '+36 30 998 0998',
    number: null,
    vat: null,
  },
  seo: {
    title: 'EximpWorld Hungary | Vegyipari alapanyagok',
    description:
      'Stratégiai alapanyag-ellátás és kiszámítható ipari partnerség közvetlen nemzetközi gyártói kapcsolatokkal.',
  },
  rfq: { endpoint: null },
  legal: { privacy: null, cookies: null, terms: null },
};
