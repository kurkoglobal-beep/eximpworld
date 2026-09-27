import type { MarketConfig } from './types';
const companyName = 'EximpWorld Ltd';
const salesEmail = 'sales@eximpworld.co.uk';
export const uk: MarketConfig = {
  id: 'uk',
  domain: 'eximpworld.co.uk',
  name: 'United Kingdom',
  language: 'en',
  hreflang: 'en-GB',
  currencies: ['GBP'],
  compliance: 'UK REACH / applicable UK chemical regulations',
  company: {
    name: companyName,
    companyName,
    director: 'Erno Demus',
    salesEmail,
    emergencyPhone: '+44 7479 946016',
    address: [
      'BM Centre',
      '11 St. Martins Close',
      'Winchester',
      'SO23 0HD',
      'United Kingdom',
    ],
    email: salesEmail,
    phone: '+44 7479 946016',
    number: null,
    vat: null,
  },
  seo: {
    title: 'Industrial Chemicals & Raw Material Supply UK | EximpWorld',
    description:
      'B2B chemical sourcing and distribution for UK industry. Industrial solvents, IPA, raw materials, flexible packaging and supply solutions.',
  },
  rfq: { endpoint: null },
  legal: { privacy: null, cookies: null, terms: null },
};
