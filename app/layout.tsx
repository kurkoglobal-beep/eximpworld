import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { LocaleProvider } from '@/components/locale';
import { CookieNotice } from '@/components/cookie-notice';
import { markets } from '@/config/markets';
import { marketUrl, marketPath } from '@/lib/market-routes';
import { ukProducts } from '@/lib/uk-products';
import { getProductBySlug } from '@/lib/products';
export const dynamic = 'force-dynamic';
async function context() {
  const h = await headers();
  const id = 'hu';
  return {
    market: markets[id],
    path: h.get('x-eximp-path') || '/',
    preview: h.get('x-eximp-preview') === 'true',
  };
}
export async function generateMetadata(): Promise<Metadata> {
  const { market, path, preview } = await context();
  const canonical = marketUrl(path, market.id);
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
  const title = product
    ? uk
      ? product.seo.title
      : `${huProduct?.hu || product.name} | EximpWorld Hungary`
    : uk && titles[path]
      ? `${titles[path]} | EximpWorld UK`
      : market.seo.title;
  const description = product
    ? uk
      ? product.seo.description
      : `${huProduct?.hu || product.name} – műszaki adatok, dokumentáció és egyedi B2B ajánlatkérés.`
    : market.seo.description;
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
        'hu-HU': marketUrl(path, 'hu'),
        'en-GB': marketUrl(path, 'uk'),
      },
    },
    robots:
      preview || incompleteLegal ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      locale: market.hreflang.replace('-', '_'),
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
  const { market, preview } = await context();
  return (
    <html lang={market.language}>
      <body className="antialiased">
        <LocaleProvider initialMarket={market.id} preview={false}>
          {children}
          <CookieNotice />
        </LocaleProvider>
      </body>
    </html>
  );
}
