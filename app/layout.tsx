import { languageHref } from '@/lib/language';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { LocaleProvider } from '@/components/locale';
import { CookieNotice } from '@/components/cookie-notice';
import { markets } from '@/config/markets';
import { marketPath } from '@/lib/market-routes';
import { ukProducts } from '@/lib/uk-products';
import { getProductBySlug } from '@/lib/products';
export const dynamic = 'force-dynamic';
async function context() {
  const h = await headers();
  const id = 'hu';
  return {
    market: markets[id],
    locale: h.get('x-eximp-language') === 'en' ? 'en' as const : 'hu' as const,
    path: h.get('x-eximp-path') || '/',
    preview: h.get('x-eximp-preview') === 'true',
  };
}
export async function generateMetadata(): Promise<Metadata> {
  const { market, path, preview, locale } = await context();
  const canonical = 'https://eximpworld.hu' + languageHref(path, locale);
  const uk = market.id === 'uk';
  const product = ukProducts.find(
    (p) => `/products/${p.id}` === marketPath(path, 'uk'),
  );
  const huProduct = getProductBySlug(path.split('/')[2] || '');
  const titles: Record<string, string> = {
    '/products': 'Industrial Chemicals & Raw Materials',
    '/industries': 'Industries We Support',
    '/services': 'Chemical Sourcing & Supply Services',
    '/about': 'About EximpWorld Ltd',
    '/contact': 'Request a Quote',
    '/privacy-policy': 'Privacy Policy',
    '/cookie-policy': 'Cookie Policy',
    '/terms-and-conditions': 'Terms & Conditions',
  };
  const originalTitle = product
    ? uk
      ? product.seo.title
      : `${huProduct?.hu || product.name} | EximpWorld Hungary`
    : uk && titles[path]
      ? `${titles[path]} | EximpWorld UK`
      : market.seo.title;
  const originalDescription = product
    ? uk
      ? product.seo.description
      : `${huProduct?.hu || product.name} – műszaki adatok, dokumentáció és egyedi B2B ajánlatkérés.`
    : market.seo.description;
  const englishTitles: Record<string, string> = {
    '/': 'Chemical Raw Materials', '/termekek': 'Product Catalogue', '/szolgaltatasok': 'Services', '/rolunk': 'About us', '/kapcsolat': 'Contact and Quotation', '/iparagak': 'Industries', '/adatvedelem': 'Privacy Policy', '/sutik': 'Cookie Policy', '/aszf': 'Terms & Conditions'
  };
  const title = locale === 'en' ? `${huProduct?.en || englishTitles[path] || 'Chemical Supply Services'} | EximpWorld Hungary` : originalTitle;
  const description = locale === 'en' ? (huProduct ? `${huProduct.en} – technical information, documentation and individual B2B quotations.` : 'Strategic raw material supply and reliable industrial partnerships through direct international manufacturer relationships.') : originalDescription;
  const incompleteLegal = [
    '/privacy-policy',
    '/cookie-policy',
    '/terms-and-conditions',
    '/adatvedelem',
    '/sutik',
    '/aszf',
  ].includes(path);
  return {
    metadataBase: new URL(`https://${market.domain}`),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        hu: 'https://eximpworld.hu' + languageHref(path, 'hu'),
        en: 'https://eximpworld.hu' + languageHref(path, 'en'),
      },
    },
    robots:
      preview || incompleteLegal ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      locale: locale === 'en' ? 'en_GB' : 'hu_HU',
      type: 'website',
      images: uk ? [] : ['/og.png'],
    },
    twitter: {
      card: uk ? 'summary' : 'summary_large_image',
      title,
      description,
      images: uk ? [] : ['/og.png'],
    },
    icons: { icon: '/favicon.svg' },
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { market, preview, locale } = await context();
  return (
    <html lang={locale}>
      <body className="antialiased">
        <LocaleProvider initialLocale={locale} initialMarket={market.id} preview={preview}>
          {children}
          <CookieNotice />
        </LocaleProvider>
      </body>
    </html>
  );
}
