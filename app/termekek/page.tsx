'use client';
import { EnglishProductCard } from '@/components/english-product-card';
import { englishCatalogueProducts } from '@/lib/product-information';
import { ProductsHeroVideo } from '@/components/products-hero-video';
import { translatedTerm } from '@/lib/language';
import LocaleLink from '@/components/locale-link';

import { useLocale } from '@/components/locale';
import { Footer, Header, PageIntro } from '@/components/site-shell';
import {
  categories,
  productDetails,
  productSlug,
  products,
} from '@/lib/products';
import { ArrowRight, FileText, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Products() {
  const { locale } = useLocale();
  const en = locale === 'en';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Mind');
  const shown = useMemo(
    () =>
      (en ? englishCatalogueProducts : products).filter(
        (product) =>
          (category === 'Mind' || product.category === category) &&
          `${product.hu} ${product.en} ${product.cas}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, category, en],
  );

  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow={en ? 'Product catalogue' : 'Termékkatalógus'}
          title={
            en
              ? 'Raw materials with dedicated technical profiles.'
              : 'Alapanyagok, külön műszaki adatlappal.'
          }
          copy={
            en
              ? 'Open any product card to review identifiers, available grades, typical uses, packaging and documentation.'
              : 'Nyissa meg bármelyik termékkártyát a műszaki azonosítók, elérhető minőségek, felhasználások, kiszerelések és dokumentáció áttekintéséhez.'
          }
        />

        <section className="mx-auto max-w-[1400px] px-5 pt-10 lg:px-10 lg:pt-14">
          <figure className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-[#0f2747] shadow-2xl">
            {en ? <ProductsHeroVideo /> : <img
              src="/products-logistics-facility.png"
              alt={
                en
                  ? 'EximpWorld Hungary chemical logistics facility and delivery fleet'
                  : 'Az EximpWorld Hungary vegyipari logisztikai központja és szállítójárművei'
              }
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/7] transition duration-700 group-hover:scale-[1.015]"
            />}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
            <figcaption className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <span className="text-[10px] font-bold tracking-[.2em] text-blue-200 uppercase">
                  {en
                    ? 'European chemical logistics'
                    : 'Európai vegyipari logisztika'}
                </span>
                <p className="mt-2 max-w-xl text-lg font-semibold sm:text-2xl">
                  {en
                    ? 'Reliable supply from source to production.'
                    : 'Megbízható ellátás a forrástól a gyártásig.'}
                </p>
              </div>
              <span className="rounded-full border border-white/20 bg-slate-950/45 px-4 py-2 text-[10px] font-bold tracking-[.14em] backdrop-blur uppercase">
                EximpWorld Hungary
              </span>
            </figcaption>
          </figure>
        </section>

        <section className="section">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
              <label className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="input pl-11"
                  placeholder={
                    en
                      ? 'Product name or CAS number'
                      : 'Terméknév vagy CAS-szám'
                  }
                />
              </label>
              <select
                className="input lg:max-w-[300px]"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>{translatedTerm(item, en)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="my-7 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              <b className="text-[#1E293B]">{shown.length}</b>{' '}
              {en ? 'products found' : 'termék található'}
            </p>
            <p className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
              <FileText size={15} />{' '}
              {en
                ? 'Product information and documentation'
                : 'Minden termékhez tartozik műszaki adatlap'}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((product) => {
              if (en) return <EnglishProductCard key={product.cas} product={product} />;
              const details = productDetails(product, en);
              return (
                <LocaleLink
                  key={product.hu}
                  href={`/termekek/${productSlug(product)}`}
                  className="group flex min-h-[270px] flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="status">
                      {en ? 'Available' : 'Elérhető'}
                    </span>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      {translatedTerm(product.category, en)}
                    </span>
                  </div>
                  <h2 className="mt-7 text-xl font-bold text-[#1E293B] transition group-hover:text-[#2563EB]">
                    {en ? product.en : product.hu}
                  </h2>
                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    CAS {product.cas}
                  </p>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                    {details.summary}
                  </p>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                    {en ? 'Packaging:' : 'Kiszerelés:'}{' '}
                    <span className="text-[#1E293B]">
                      {en
                        ? 'IBC (1000 L) · 200 L drum'
                        : 'IBC (1000 L) · 200 L-es hordó'}
                    </span>
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-6 text-xs font-bold text-[#2563EB]">
                    {en ? 'Open technical profile' : 'Termékadatlap megnyitása'}{' '}
                    <ArrowRight size={14} />
                  </span>
                </LocaleLink>
              );
            })}
          </div>

          {shown.length === 0 && (
            <div className="rounded-2xl border border-dashed p-14 text-center text-slate-500">
              {en
                ? 'No matching products. Try another search.'
                : 'Nincs megfelelő termék. Próbáljon más keresést.'}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
