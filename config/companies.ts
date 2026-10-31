// Company identity is route-based; the legacy market remains the catalogue configuration.
export const companies = {
  hu: {
    id: 'hu', name: 'EximpWorld Kft.', label: 'EximpWorld Kft.', country: 'Hungary', flag: '🇭🇺',
    address: '1183 Budapest, Szegfű utca 9.', number: '01-09-471262',
    email: 'sales@eximpworld.hu', phone: '+36 30 998 0998', phoneHref: '+36309980998',
  },
  en: {
    id: 'uk', name: 'EXIM WORLD LTD', label: 'EximpWorld Ltd', country: 'United Kingdom', flag: '🇬🇧',
    address: 'BM Centre, 11 St. Martins Close, Winchester, SO23 0HD, United Kingdom', number: '16526371',
    email: 'eximpworldltd@eximpworld.hu', phone: '07479 946016', phoneHref: '+447479946016',
    contact: 'Ernő Demus', role: 'UK Business Manager', whatsapp: 'https://wa.me/447479946016',
  },
} as const;
