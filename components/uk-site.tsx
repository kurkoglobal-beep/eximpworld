'use client';
import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  PackageCheck,
  Truck,
  FileCheck2,
  Globe2,
} from 'lucide-react';
import { Header, Footer, PageIntro } from './site-shell';
import { RFQForm } from './rfq-form';
import { SupplyPlanner } from './supply-planner';
import { useLocale } from './locale';
import {
  ukCategories,
  ukProducts,
  ipaProduct,
  type UKProduct,
} from '@/lib/uk-products';
import { industries } from '@/config/industries';
import { services } from '@/lib/services';
import { englishSlug, marketPath } from '@/lib/market-routes';
import { LegalPageContent } from './legal-content';
const rfq = (p: UKProduct = ipaProduct, sds = false) =>
  `/contact?product=${p.id}${sds ? '&sds=1' : ''}`;
export function MarketBoundary({ children }: { children: React.ReactNode }) {
  const { market } = useLocale();
  return market.id === 'uk' ? <UKSite /> : children;
}
function UKSite() {
  const path = marketPath(usePathname(), 'uk').replace(/\/$/, '') || '/';
  let content;
  if (path === '/') content = <Home />;
  else if (path === '/products') content = <Catalogue />;
  else if (path.startsWith('/products/')) {
    const p = ukProducts.find((p) => p.id === path.split('/')[2]);
    content = p ? <ProductPage product={p} /> : <Missing />;
  } else if (path === '/industries') content = <IndustryPage />;
  else if (path === '/about') content = <About />;
  else if (path === '/contact') content = <Contact />;
  else if (path === '/services' || path.startsWith('/services/'))
    content = <Services slug={path.split('/')[2]} />;
  else if (
    ['/privacy-policy', '/cookie-policy', '/terms-and-conditions'].includes(
      path,
    )
  )
    content = <LegalPageContent />;
  else content = <Missing />;
  return (
    <>
      <Header />
      <main>{content}</main>
      <Footer />
    </>
  );
}
function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#1E293B] text-white">
        <div className="chemical-grid absolute inset-0 opacity-20" />
        <div className="uk-hero relative">
          <div>
            <p className="eyebrow text-blue-200">
              UK CHEMICAL SOURCING & DISTRIBUTION
            </p>
            <h1 className="uk-hero-title mt-7">
              INDUSTRIAL
              <br />
              CHEMICAL SUPPLY.
              <br />
              <span className="text-blue-300">
                BUILT AROUND
                <br />
                YOUR PRODUCTION.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Reliable sourcing, documented quality and flexible chemical
              distribution across the United Kingdom.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="btn-primary" href="/products">
                EXPLORE PRODUCTS <ArrowRight size={16} />
              </a>
              <a className="btn-ghost" href="/contact">
                REQUEST A QUOTE
              </a>
            </div>
            <p className="mt-9 text-xs tracking-widest text-slate-400">
              EUROPEAN SUPPLY CAPABILITIES · UK INDUSTRIAL FOCUS
            </p>
          </div>
          <div className="uk-hero-visual">
            <img
              src="/products-logistics-facility.png"
              alt="Illustration of industrial chemical drum and IBC packaging"
            />
            <div className="uk-hero-label">
              <span>SUPPLY / 01</span>
              <strong>
                From sourcing.
                <br />
                To your production.
              </strong>
              <small>SMALL PACKS → DRUMS → IBC → BULK</small>
            </div>
          </div>
        </div>
      </section>
      <section className="uk-market-strip">
        <div>
          <span className="eyebrow">IPA MARKET INDICATOR</span>
          <strong>European IPA 99.9%</strong>
          <span>Current market information and pricing on request.</span>
        </div>
        <a className="text-link" href={rfq()}>
          REQUEST CURRENT PRICE →
        </a>
      </section>
      <section className="section">
        <div className="uk-feature">
          <div className="uk-feature-image">
            <img
              src="/ipa-liquid-texture.png"
              alt="Liquid texture illustrating isopropyl alcohol"
            />
            <div>
              <span className="eyebrow text-blue-200">
                FEATURED RAW MATERIAL
              </span>
              <strong>
                IPA<span>99.9%</span>
              </strong>
              <small>ISOPROPYL ALCOHOL</small>
            </div>
          </div>
          <div className="py-3">
            <p className="eyebrow">SOLVENTS / ISOPROPYL ALCOHOL</p>
            <h2 className="section-title mt-3">
              Purity specified.
              <br />
              Supply considered.
            </h2>
            <p className="mt-5 text-slate-500 leading-7">
              Isopropyl alcohol for industrial cleaning, formulation and
              processing. Choose the grade and supply format that match your
              application.
            </p>
            <Facts product={ipaProduct} />
            <div className="mt-6 flex flex-wrap gap-2">
              {ipaProduct.packaging.map((p) => (
                <span className="uk-chip" key={p}>
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-500">
              Request SDS, TDS, CoA and applicable REACH information for the
              selected grade and supplier.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a className="btn-primary" href={`/products/${ipaProduct.id}`}>
                VIEW PRODUCT →
              </a>
              <a className="text-link" href={rfq()}>
                REQUEST A QUOTE
              </a>
              <a className="text-link" href={rfq(ipaProduct, true)}>
                REQUEST SDS
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="section">
          <div className="flex flex-wrap justify-between items-end gap-5">
            <div>
              <p className="eyebrow">ONE PARTNER. YOUR REQUIREMENTS.</p>
              <h2 className="section-title mt-3">Chemistry for industry.</h2>
            </div>
            <a className="text-link" href="/industries">
              EXPLORE INDUSTRIES →
            </a>
          </div>
          <div className="uk-card-grid mt-9">
            {industries.slice(0, 3).map((i, n) => (
              <a
                href={`/industries#${englishSlug(i.name)}`}
                className="uk-card"
                key={i.name}
              >
                <span className="eyebrow">0{n + 1} / INDUSTRIES</span>
                <h3>{i.name}</h3>
                <p>{i.copy}</p>
                <ArrowRight className="mt-6 text-blue-600" size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>
      <SupplyBlock />
      <SupplyPlanner />
      <QuoteBand />
    </>
  );
}
function Facts({
  product: p,
  specification,
}: {
  product: UKProduct;
  specification?: string;
}) {
  return (
    <dl className="uk-data mt-6">
      <div>
        <dt>CAS number</dt>
        <dd>{p.cas}</dd>
      </div>
      {p.ec && (
        <div>
          <dt>EC number</dt>
          <dd>{p.ec}</dd>
        </div>
      )}
      {p.formula && (
        <div>
          <dt>Chemical formula</dt>
          <dd>{p.formula}</dd>
        </div>
      )}
      <div>
        <dt>Grade / specification</dt>
        <dd>{specification || p.specification}</dd>
      </div>
    </dl>
  );
}
function ProductCard({ product: p }: { product: UKProduct }) {
  return (
    <a className="uk-card uk-product-card" href={`/products/${p.id}`}>
      <span className="eyebrow">{p.category}</span>
      <span className="uk-formula">{p.formula || 'RAW MATERIAL'}</span>
      <h2>{p.name}</h2>
      <p>CAS {p.cas}</p>
      <p>{p.specification}</p>
      <span className="text-link mt-6">
        VIEW PRODUCT <ArrowRight size={16} />
      </span>
    </a>
  );
}
function Catalogue() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = ukProducts.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      `${p.name} ${p.cas} ${p.formula}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow="PRODUCTS / INDUSTRIAL RAW MATERIALS"
        title="Source what your production needs."
        copy="Explore our chemical catalogue. Define your specification, packaging and delivery requirements for an individual quotation."
      />
      <section className="section">
        <label className="field max-w-xl">
          <span>Search by product, CAS number or formula</span>
          <input
            type="search"
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Isopropyl Alcohol or 67-63-0"
          />
        </label>
        <div className="uk-filters" aria-label="Product categories">
          {['All', ...ukCategories].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-500 mb-6" role="status">
          {filtered.length} products
        </p>
        <div className="uk-card-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {!filtered.length && (
          <div className="uk-card">
            <h2>No matching products.</h2>
            <p>Try another name or CAS number, or tell us what you need.</p>
            <a className="text-link mt-4" href="/contact">
              REQUEST SOURCING SUPPORT →
            </a>
          </div>
        )}
      </section>
      <QuoteBand />
    </>
  );
}
function ProductPage({ product: p }: { product: UKProduct }) {
  const params = useSearchParams();
  const variant = p.variants.find((v) => v.id === params.get('variant'));
  return (
    <>
      <PageIntro
        eyebrow={`${p.category.toUpperCase()} / CAS ${p.cas}`}
        title={variant?.name || p.name}
        copy="Technical information for your sourcing review. Final specification, availability and application suitability are confirmed with your quotation."
      />
      <section className="section">
        <a className="text-link" href="/products">
          ← ALL PRODUCTS
        </a>
        <div className="uk-product-layout mt-8">
          <div>
            <div className="uk-card">
              <h2>Technical identification</h2>
              <Facts
                product={p}
                specification={
                  variant
                    ? `${variant.grade} · ${variant.purity || 'Specification on request'}`
                    : undefined
                }
              />
              {variant && (
                <p className="mt-5">
                  Selected grade: {variant.grade}
                  {variant.purity
                    ? ` · ${variant.purity}`
                    : ' · specification on request'}
                </p>
              )}
            </div>
            {p.variants.length > 0 && (
              <div className="uk-card mt-6">
                <h2>IPA product variants</h2>
                <p>
                  Select a grade to include it in your enquiry. IPA 70%
                  concentration basis and regenerated material specifications
                  require confirmation.
                </p>
                <div className="uk-variants">
                  {p.variants.map((v) => (
                    <a
                      aria-current={variant?.id === v.id ? 'true' : undefined}
                      key={v.id}
                      href={`/products/${p.id}?variant=${v.id}`}
                    >
                      <strong>{v.name}</strong>
                      <small>{v.purity || 'Specification on request'}</small>
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div className="uk-card mt-6">
              <h2>Applications</h2>
              <ul className="uk-list">
                {p.applications.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p>Suitability depends on the selected grade and intended use.</p>
            </div>
            <div className="uk-card mt-6">
              <h2>Packaging options</h2>
              {p.packaging.length ? (
                <>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {p.packaging.map((x) => (
                      <span className="uk-chip" key={x}>
                        {x}
                      </span>
                    ))}
                  </div>
                  <p>
                    Options are confirmed for the selected grade, quantity and
                    delivery location. Bulk / tanker supply where applicable.
                  </p>
                </>
              ) : (
                <p>
                  Product-specific packaging is confirmed during quotation. Tell
                  us your preferred format and handling requirements.
                </p>
              )}
            </div>
            <div className="uk-card mt-6">
              <h2>Documentation</h2>
              <dl className="uk-data">
                {[
                  [
                    'SDS',
                    'Request the current safety data sheet for the selected material.',
                  ],
                  [
                    'TDS',
                    'Technical specification subject to supplier and grade.',
                  ],
                  [
                    'CoA',
                    'Batch-specific analysis subject to supplier confirmation.',
                  ],
                  [
                    'UK REACH',
                    'Request applicable REACH information and UK chemical regulatory documentation.',
                  ],
                ].map(([a, b]) => (
                  <div key={a}>
                    <dt>{a}</dt>
                    <dd>{b}</dd>
                  </div>
                ))}
              </dl>
              <a
                className="text-link mt-5"
                href={`${rfq(p, true)}${variant ? `&variant=${variant.id}` : ''}`}
              >
                REQUEST SDS →
              </a>
            </div>
            <div className="uk-card mt-6">
              <h2>Logistics</h2>
              <p>
                UK nationwide delivery coordination, with ADR logistics where
                applicable. Delivery terms are confirmed against your postcode,
                order size and site requirements. European and global sourcing
                routes are assessed for each enquiry.
              </p>
            </div>
          </div>
          <aside className="uk-product-aside">
            <div className="uk-card bg-slate-900 text-white">
              <PackageCheck className="text-blue-300" size={32} />
              <h2>Build your supply enquiry.</h2>
              <p className="!text-slate-300">
                Share your grade, quantity and delivery location. Request a
                current price in GBP and supporting documentation.
              </p>
              <a
                className="btn-primary mt-6"
                href={`${rfq(p)}${variant ? `&variant=${variant.id}` : ''}`}
              >
                REQUEST A QUOTE →
              </a>
              <a
                className="btn-ghost mt-3"
                href={`${rfq(p, true)}${variant ? `&variant=${variant.id}` : ''}`}
              >
                REQUEST SDS
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
export function IndustryPage() {
  const { market } = useLocale();
  const en = market.id === 'uk';
  return (
    <>
      <PageIntro
        eyebrow={en ? 'INDUSTRIES' : 'IPARÁGAK'}
        title={
          en ? 'Built around your process.' : 'Az Ön technológiájához igazítva.'
        }
        copy={
          en
            ? 'Chemical sourcing shaped by your application, quality requirements and production schedule.'
            : 'Vegyipari beszerzés a felhasználás, minőségi követelmények és gyártási ütemezés alapján.'
        }
      />
      <section className="section">
        <div className="uk-card-grid">
          {industries.map((i, n) => (
            <article
              id={englishSlug(i.name)}
              className="uk-card scroll-mt-28"
              key={i.name}
            >
              <span className="eyebrow">
                0{n + 1} / {en ? 'SECTOR' : 'IPARÁG'}
              </span>
              <h2>{en ? i.name : i.hu}</h2>
              <p>{en ? i.copy : i.huCopy}</p>
              <a
                className="text-link mt-6"
                href={marketPath('/contact', market.id)}
              >
                {en ? 'DISCUSS YOUR REQUIREMENTS' : 'IGÉNYEK EGYEZTETÉSE'} →
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
function SupplyBlock() {
  return (
    <section className="section">
      <p className="eyebrow">PACKAGING & SUPPLY</p>
      <h2 className="section-title mt-3">Small packs → Drums → IBC → Bulk</h2>
      <p className="mt-5 max-w-3xl text-slate-500 leading-7">
        From 25 L packs to 200 L drums, 1000 L IBCs and bulk / tanker supply
        where applicable. Availability is product-specific and confirmed in your
        quotation.
      </p>
      <div className="uk-card-grid mt-9">
        {[
          [
            Truck,
            'UK Nationwide Delivery',
            'ADR logistics where applicable. Receiving-site requirements and delivery terms agreed with your quotation.',
          ],
          [
            Globe2,
            'European & Global Sourcing',
            'Chemical sourcing with European supply capabilities and a focus on your required specification.',
          ],
          [
            FileCheck2,
            'Flexible Supply Solutions',
            'Packaging, documentation and logistics coordination for one-off or recurring B2B requirements.',
          ],
        ].map(([Icon, title, copy]) => {
          const I = Icon as typeof Truck;
          return (
            <div className="uk-card" key={String(title)}>
              <I className="text-blue-600" size={27} />
              <h3>{String(title)}</h3>
              <p>{String(copy)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
function Services({ slug }: { slug?: string }) {
  const service = slug
    ? services.find((s) => englishSlug(s.titleEn) === slug || s.slug === slug)
    : null;
  if (slug && !service) return <Missing />;
  return (
    <>
      <PageIntro
        eyebrow="SERVICES / SOURCING TO DELIVERY"
        title={service?.titleEn || 'Make supply work for you.'}
        copy="Chemical sourcing, flexible packaging, documentation and logistics coordination for UK industrial buyers."
      />
      {service ? (
        <section className="section">
          <div className="uk-card max-w-4xl">
            <h2>{service.titleEn}</h2>
            <p>{service.introEn}</p>
            <ul className="uk-list">
              {service.benefitsEn.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <a className="btn-primary mt-7" href="/contact">
              DISCUSS YOUR REQUIREMENTS →
            </a>
          </div>
        </section>
      ) : (
        <>
          <SupplyBlock />
          <section className="section !pt-0">
            <div className="uk-card-grid">
              {services.map((s) => (
                <a
                  className="uk-card"
                  href={`/services/${englishSlug(s.titleEn)}`}
                  key={s.slug}
                >
                  <h2>{s.titleEn}</h2>
                  <p>{s.shortEn}</p>
                  <span className="text-link mt-6">EXPLORE SERVICE →</span>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
      <QuoteBand />
    </>
  );
}
function About() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT / EXIMPWORLD LTD"
        title="A sourcing partner for UK industry."
        copy="EximpWorld Ltd is a UK-based B2B chemical sourcing and distribution company focused on industrial raw materials and flexible supply solutions."
      />
      <section className="section">
        <div className="uk-feature">
          <div>
            <p className="eyebrow">EUROPEAN SUPPLY CAPABILITIES</p>
            <h2 className="section-title mt-4">
              Your requirements.
              <br />A coordinated response.
            </h2>
            <p className="mt-6 leading-8 text-slate-500">
              We focus on chemical sourcing through a European supplier network,
              matching industrial raw materials to your specification and
              coordinating the supporting documentation, packaging and
              logistics.
            </p>
            <p className="mt-5 leading-8 text-slate-500">
              From a defined spot requirement to a recurring B2B supply enquiry,
              the starting point is your application, quantity and delivery
              location.
            </p>
            <a className="btn-primary mt-7" href="/contact">
              TALK TO US →
            </a>
          </div>
          <CompanyPanel />
        </div>
      </section>
      <SupplyBlock />
    </>
  );
}
export function CompanyPanel() {
  const { market, locale } = useLocale();
  const en = locale === 'en';
  const c = market.company;
  const uk = market.id === 'uk';
  if (!uk)
    return (
      <aside className="rounded-3xl bg-[#1E293B] p-8 text-white">
        <p className="eyebrow text-blue-300">
          {en ? 'COMPANY INFORMATION' : 'CÉGES ADATOK'}
        </p>
        <h2 className="mt-4 text-3xl font-bold">{c.name}</h2>
        <p className="mt-7 text-xs text-slate-400">
          {en ? 'Registered office' : 'Cím'}
        </p>
        <address className="mt-3 not-italic leading-7 text-slate-200">
          {c.address.map((x) => (
            <div key={x}>{x}</div>
          ))}
        </address>
        {[
          [en ? 'Central email' : 'Központi e-mail', c.centralEmail],
          [en ? 'Depot/Warehouse' : 'Depo/Raktár', c.depotEmail],
        ].map(([label, email]) => email && (
          <a className="block mt-6 text-blue-200" href={`mailto:${email}`} key={email}>
            {label}: {email}
          </a>
        ))}
        {c.email && (
          <a className="block mt-6 text-blue-200" href={`mailto:${c.email}`}>
            {c.email}
          </a>
        )}
        {c.phone && (
          <a
            className="block mt-3 text-blue-200"
            href={`tel:${c.phone.replace(/\s/g, '')}`}
          >
            {c.phone}
          </a>
        )}
        {c.number && <p className="mt-5">Company number: {c.number}</p>}
        {c.vat && <p className="mt-3">VAT: {c.vat}</p>}
      </aside>
    );
  return (
    <aside className="rounded-3xl bg-[#1E293B] p-8 text-white">
      <p className="eyebrow text-blue-300">
        {en ? 'COMPANY INFORMATION' : 'CÉGES ADATOK'}
      </p>
      <h2 className="mt-4 text-3xl font-bold">{c.companyName || c.name}</h2>
      <dl className="company-contact-details">
        {uk && c.director && (
          <div>
            <dt>Director</dt>
            <dd>{c.director}</dd>
          </div>
        )}
        {(c.salesEmail || c.email) && (
          <div>
            <dt>{uk ? 'Sales & Enquiries' : en ? 'Email' : 'E-mail'}</dt>
            <dd>
              <a href={`mailto:${c.salesEmail || c.email}`}>
                {c.salesEmail || c.email}
              </a>
            </dd>
          </div>
        )}
        {c.phone && (
          <div>
            <dt>{en ? 'Telephone' : 'Telefonszám'}</dt>
            <dd>
              <a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>
            </dd>
          </div>
        )}
        <div>
          <dt>{en ? 'Registered Office' : 'Cím'}</dt>
          <dd>
            <address className="not-italic leading-7">
              {c.address.map((x) => (
                <div key={x}>{x}</div>
              ))}
            </address>
          </dd>
        </div>
        {uk && c.emergencyPhone && (
          <div className="company-emergency">
            <dt>Chemical / Transport Emergency Contact</dt>
            <dd>
              <a href={`tel:${c.emergencyPhone.replace(/\s/g, '')}`}>
                {c.emergencyPhone}
              </a>
            </dd>
            <dd className="mt-2 text-xs !text-slate-400">
              EximpWorld Ltd chemical / transport contact
            </dd>
          </div>
        )}
        {c.number && (
          <div>
            <dt>Company number</dt>
            <dd>{c.number}</dd>
          </div>
        )}
        {c.vat && (
          <div>
            <dt>VAT</dt>
            <dd>{c.vat}</dd>
          </div>
        )}
      </dl>
    </aside>
  );
}

function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="CONTACT / REQUEST FOR QUOTE"
        title="Tell us what production needs."
        copy="Specify your material, grade, quantity and delivery location. Prepare your quotation or technical documentation enquiry."
      />
      <section className="section">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
          <RFQForm />
          <div>
            <CompanyPanel />
            <div className="uk-card mt-6">
              <h2>What to include</h2>
              <p>
                Product and specification. Quantity and packaging. Delivery
                postcode and required date. The technical documentation your
                team needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function QuoteBand() {
  return (
    <section className="uk-quote-band">
      <div>
        <p className="eyebrow text-blue-200">LET’S PLAN YOUR NEXT SUPPLY</p>
        <h2>Start with your requirements.</h2>
      </div>
      <a className="btn-primary" href="/contact">
        REQUEST A QUOTE <ArrowRight size={16} />
      </a>
    </section>
  );
}
function Missing() {
  return (
    <section className="section min-h-[60vh]">
      <p className="eyebrow">404</p>
      <h1 className="section-title mt-4">Page not found.</h1>
      <a className="btn-primary mt-7" href="/products">
        EXPLORE PRODUCTS →
      </a>
    </section>
  );
}
