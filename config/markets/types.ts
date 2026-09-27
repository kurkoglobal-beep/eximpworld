export type MarketId = 'hu' | 'uk';
export type MarketConfig = {
  id: MarketId;
  domain: string;
  name: string;
  language: 'hu' | 'en';
  hreflang: string;
  currencies: string[];
  compliance: string;
  company: {
    name: string;
    companyName?: string;
    director?: string;
    salesEmail?: string;
    centralEmail?: string;
    depotEmail?: string;
    emergencyPhone?: string;
    address: string[];
    email: string | null;
    phone: string | null;
    number: string | null;
    vat: string | null;
  };
  seo: { title: string; description: string };
  rfq: { endpoint: string | null };
  legal: {
    privacy: string[] | null;
    cookies: string[] | null;
    terms: string[] | null;
  };
};
