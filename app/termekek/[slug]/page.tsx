'use client';

import { useLocale } from '@/components/locale';
import { Footer, Header } from '@/components/site-shell';
import {
  getProductBySlug,
  productDetails,
  productSlug,
  productTechnicalData,
  products,
} from '@/lib/products';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  PackageCheck,
  Plus,
} from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const { locale } = useLocale();
  const en = locale === 'en';
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const product = getProductBySlug(decodeURIComponent(slug ?? ''));

  if (!product) {
    return (
      <>
        <Header />
        <main className="section min-h-[60vh]">
          <p className="eyebrow">404</p>
          <h1 className="section-title">
            {en ? 'Product not found.' : 'A termék nem található.'}
          </h1>
          <a href="/termekek" className="btn-primary mt-8">
            <ArrowLeft size={16} />{' '}
            {en ? 'Back to catalogue' : 'Vissza a katalógushoz'}
          </a>
        </main>
        <Footer />
      </>
    );
  }

  const details = productDetails(product, en);
  const technical = productTechnicalData(product, en);
  const title = en ? product.en : product.hu;
  const packaging = en
    ? 'IBC container (1000 L), 200 L drum'
    : 'IBC tartály (1000 L), 200 L-es hordó';
  const quoteUrl = `/kapcsolat?product=${encodeURIComponent(product.hu)}`;
  const related = products
    .filter(
      (item) => item.category === product.category && item.hu !== product.hu,
    )
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="bg-[#F8FAFC]">
        <section className="relative overflow-hidden bg-[#1E293B] py-14 text-white lg:py-20">
          <div className="chemical-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 lg:grid-cols-[1.25fr_.75fr] lg:items-center lg:px-10">
            <div>
              <a
                href="/termekek"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-200 hover:text-white"
              >
                <ArrowLeft size={15} />{' '}
                {en ? 'Back to catalogue' : 'Vissza a katalógushoz'}
              </a>
              <p className="eyebrow mt-8 text-blue-300">
                {en ? 'B2B product profile' : 'B2B termékadatlap'} ·{' '}
                {product.category}
              </p>
              <h1 className="mt-4 max-w-4xl text-[clamp(38px,5vw,64px)] font-semibold leading-[1.04] tracking-[-.04em]">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {details.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-200">
                <Badge>{en ? 'B2B supply' : 'Kizárólag B2B'}</Badge>
                <Badge>SDS / TDS / CoA</Badge>
                <Badge>{en ? 'European delivery' : 'Európai szállítás'}</Badge>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="btn-primary" href={quoteUrl}>
                  {en ? 'Request a quote' : 'Ajánlatkérés'}{' '}
                  <ArrowRight size={16} />
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3 text-sm font-bold hover:bg-white/10"
                  href={quoteUrl}
                >
                  <FileText size={17} />{' '}
                  {en ? 'Request documentation' : 'Dokumentáció kérése'}
                </a>
              </div>
            </div>
            <aside className="rounded-3xl bg-white p-7 text-[#1E293B] shadow-2xl sm:p-9">
              <p className="eyebrow">
                {en ? 'Procurement quick view' : 'Beszerzői gyorsnézet'}
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                {en ? 'At a glance' : 'Gyors áttekintés'}
              </h2>
              <dl className="mt-7 divide-y divide-slate-200">
                <QuickRow label="CAS" value={product.cas} />
                <QuickRow
                  label={en ? 'Formula' : 'Képlet'}
                  value={technical.formula}
                />
                <QuickRow
                  label={en ? 'Grade' : 'Minőség'}
                  value={product.spec}
                />
                <QuickRow
                  label={en ? 'Packaging' : 'Kiszerelés'}
                  value={packaging}
                />
                <QuickRow
                  label={en ? 'Delivery region' : 'Szállítási régió'}
                  value={en ? 'Hungary and Europe' : 'Magyarország és Európa'}
                />
              </dl>
              <p className="mt-6 text-xs leading-5 text-slate-500">
                {en
                  ? 'Final specification, packaging compatibility and availability are confirmed with every quotation.'
                  : 'A végleges specifikációt, a kiszerelés alkalmasságát és az elérhetőséget minden ajánlatnál egyedileg igazoljuk vissza.'}
              </p>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
            <div className="space-y-5">
              <Accordion
                title={en ? 'Technical identification' : 'Technikai azonosítás'}
                defaultOpen
              >
                <dl className="divide-y divide-slate-200">
                  <DataRow
                    label={en ? 'Commercial name' : 'Kereskedelmi név'}
                    value={title}
                  />
                  <DataRow
                    label={
                      en ? 'English name / synonym' : 'Angol név / szinonima'
                    }
                    value={technical.synonym}
                  />
                  <DataRow label="CAS" value={product.cas} />
                  <DataRow
                    label={en ? 'Chemical formula' : 'Kémiai képlet'}
                    value={technical.formula}
                  />
                  <DataRow
                    label={en ? 'Product category' : 'Termékkategória'}
                    value={product.category}
                  />
                  <DataRow
                    label={
                      en ? 'Grade / concentration' : 'Minőség / koncentráció'
                    }
                    value={product.spec}
                  />
                  <DataRow
                    label={en ? 'Product form' : 'Termékforma'}
                    value={technical.form}
                  />
                  <DataRow
                    label={en ? 'Packaging' : 'Kiszerelés'}
                    value={packaging}
                  />
                  <DataRow
                    label={en ? 'Storage note' : 'Tárolási megjegyzés'}
                    value={
                      en
                        ? 'Storage, handling and transport must follow the official SDS and supplier documentation.'
                        : 'A tárolás, kezelés és szállítás kizárólag a hivatalos SDS és beszállítói dokumentáció szerint történhet.'
                    }
                  />
                </dl>
              </Accordion>

              <Accordion
                title={
                  en ? 'Application intelligence' : 'Felhasználási információk'
                }
              >
                <p className="text-sm leading-7 text-slate-600">
                  {details.summary}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {details.uses.map((use) => (
                    <li
                      key={use}
                      className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"
                    >
                      <CheckCircle2
                        className="mt-1 shrink-0 text-[#2563EB]"
                        size={17}
                      />{' '}
                      {use}
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion
                title={
                  en
                    ? 'Documentation and compliance'
                    : 'Dokumentáció és megfelelőség'
                }
              >
                <dl className="divide-y divide-slate-200">
                  <DataRow
                    label="SDS"
                    value={
                      en
                        ? 'Available during the B2B quotation process'
                        : 'B2B ajánlatkérés során elérhető'
                    }
                  />
                  <DataRow
                    label="TDS"
                    value={
                      en
                        ? 'Confirmed for the selected manufacturer and grade'
                        : 'A kiválasztott gyártó és minőség szerint igazoljuk vissza'
                    }
                  />
                  <DataRow
                    label="CoA"
                    value={
                      en
                        ? 'Available subject to manufacturer and batch'
                        : 'Gyártó és gyártási tétel függvényében elérhető'
                    }
                  />
                  <DataRow
                    label="REACH / CLP"
                    value={
                      en
                        ? 'Final classification and regulatory suitability must be verified before purchase.'
                        : 'A végleges besorolást és szabályozási alkalmasságot vásárlás előtt igazolni kell.'
                    }
                  />
                </dl>
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
                  {en
                    ? 'This page provides preliminary B2B guidance. Final use, quality, handling, transport and compliance must be confirmed from current supplier documents.'
                    : 'Az oldal előzetes B2B tájékoztatást ad. A végleges felhasználást, minőséget, kezelést, szállítást és megfelelőséget az aktuális beszállítói dokumentumok alapján kell megerősíteni.'}
                </div>
              </Accordion>

              <Accordion
                title={en ? 'Procurement route' : 'Beszerzési útvonal'}
              >
                <dl className="divide-y divide-slate-200">
                  <DataRow
                    label={en ? 'Packaging' : 'Kiszerelés'}
                    value={packaging}
                  />
                  <DataRow
                    label={en ? 'Delivery region' : 'Szállítási régió'}
                    value={
                      en
                        ? 'Hungary and European destinations'
                        : 'Magyarország és európai célállomások'
                    }
                  />
                  <DataRow
                    label={en ? 'Availability' : 'Elérhetőség'}
                    value={
                      en
                        ? 'Confirmed by quantity, grade and requested delivery date'
                        : 'Mennyiség, minőség és szállítási határidő alapján egyedileg igazoljuk vissza'
                    }
                  />
                </dl>
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-bold">
                    {en
                      ? 'Recommended details for your RFQ'
                      : 'Az ajánlatkéréshez javasolt adatok'}
                  </h3>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                    <li>
                      {en
                        ? 'Product and required grade/concentration'
                        : 'Terméknév és kívánt minőség/koncentráció'}
                    </li>
                    <li>
                      {en
                        ? 'Quantity and packaging'
                        : 'Mennyiség és kiszerelés'}
                    </li>
                    <li>
                      {en
                        ? 'Delivery location and date'
                        : 'Szállítási hely és határidő'}
                    </li>
                    <li>
                      {en
                        ? 'Required SDS/TDS/CoA language'
                        : 'Szükséges SDS/TDS/CoA nyelv'}
                    </li>
                    <li>
                      {en
                        ? 'Industry and intended use'
                        : 'Iparág és tervezett felhasználás'}
                    </li>
                  </ul>
                </div>
              </Accordion>

              <Accordion
                title={
                  en
                    ? 'Request a quote for this material'
                    : 'Ajánlatkérés ehhez az alapanyaghoz'
                }
              >
                <p className="text-sm leading-7 text-slate-600">
                  {en
                    ? 'Send us the required specification, quantity, packaging and delivery location. We will confirm current availability and matching documentation.'
                    : 'Adja meg a kívánt specifikációt, mennyiséget, kiszerelést és szállítási helyet. Visszaigazoljuk az aktuális elérhetőséget és a kapcsolódó dokumentációt.'}
                </p>
                <a href={quoteUrl} className="btn-primary mt-5">
                  {en ? 'Start request' : 'Ajánlatkérés indítása'}{' '}
                  <ArrowRight size={16} />
                </a>
              </Accordion>

              <Accordion
                title={en ? 'Related raw materials' : 'Kapcsolódó alapanyagok'}
              >
                {related.length ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {related.map((item) => (
                      <a
                        key={item.hu}
                        href={`/termekek/${productSlug(item)}`}
                        className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                      >
                        <strong className="block text-sm text-[#1E293B]">
                          {en ? item.en : item.hu}
                        </strong>
                        <span className="mt-1 block text-xs text-slate-500">
                          CAS {item.cas} · {item.spec}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    {en
                      ? 'Browse the full catalogue for related materials.'
                      : 'Kapcsolódó termékekért tekintse meg a teljes katalógust.'}
                  </p>
                )}
              </Accordion>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <PackageCheck className="text-[#2563EB]" size={28} />
                <p className="eyebrow mt-5">
                  {en ? 'B2B quotation panel' : 'B2B ajánlatkérő panel'}
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  {en ? 'Request a quote' : 'Ajánlatkérés'}
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {en
                    ? 'We confirm quality, packaging, delivery terms and documentation individually.'
                    : 'A minőséget, kiszerelést, szállítási feltételeket és dokumentációt egyedileg igazoljuk vissza.'}
                </p>
                <div className="mt-6 grid gap-3">
                  <a href={quoteUrl} className="btn-primary justify-center">
                    {en ? 'Request a quote' : 'Ajánlatkérés'}{' '}
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href={quoteUrl}
                    className="inline-flex justify-center rounded-lg border border-[#2563EB] px-4 py-3 text-sm font-bold text-[#2563EB] hover:bg-blue-50"
                  >
                    SDS / TDS / CoA
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-600">
                <strong className="block text-[#1E293B]">
                  {en ? 'Packaging' : 'Kiszerelés'}
                </strong>
                <span className="mt-2 block">
                  {en ? 'IBC container (1000 L)' : 'IBC tartály (1000 L)'}
                </span>
                <span className="block">
                  {en ? '200 L drum' : '200 L-es hordó'}
                </span>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2">
      {children}
    </span>
  );
}

function QuickRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[120px_1fr]">
      <dt className="text-xs font-bold text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold">{value}</dd>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[220px_1fr]">
      <dt className="text-sm font-bold text-[#1E293B]">{label}</dt>
      <dd className="text-sm leading-6 text-slate-600">{value}</dd>
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-[#1E293B] transition hover:bg-slate-50 sm:px-7 [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-50 text-[#2563EB]">
          <Plus
            size={18}
            className="transition-transform group-open:rotate-45"
          />
        </span>
      </summary>
      <div className="border-t border-slate-200 px-5 py-6 sm:px-7">
        {children}
      </div>
    </details>
  );
}
