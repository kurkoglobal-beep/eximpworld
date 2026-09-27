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
    name: 'EximpWorld Kft.',
    address: ['Budapest, Magyarország'],
    email: 'sales@eximpworld.hu',
    phone: '+36 1 555 0123',
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
