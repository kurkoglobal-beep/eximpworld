'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileCheck2,
  Gauge,
  Handshake,
  PackageCheck,
  Route,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { Footer, Header } from '@/components/site-shell';
import { useLocale } from '@/components/locale';
import { products } from '@/lib/products';

export default function Home() {
  const { locale } = useLocale();
  const en = locale === 'en';
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#1E293B] text-white">
          <div className="chemical-grid absolute inset-0 opacity-20" />
          <div className="absolute right-[-8%] top-[-25%] size-[520px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="home-hero-grid relative mx-auto grid w-full min-w-0 max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-12 sm:py-16 lg:min-h-[640px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-14 lg:px-10 lg:py-20">
            <div className="min-w-0 max-w-3xl">
              <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-2xl sm:rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1.5 text-[11px] font-bold tracking-[.14em] text-blue-200 uppercase">
                <span className="size-1.5 shrink-0 rounded-full bg-blue-300" />{' '}
                {en
                  ? 'Independent Hungarian B2B chemical trading'
                  : 'Független magyar B2B vegyipari kereskedelem'}
              </div>
              <h1 className="text-[clamp(32px,6vw,76px)] font-semibold leading-[1.02] tracking-[-.045em]">
                {en
                  ? 'Strategic raw material supply. Predictable industrial partnership.'
                  : 'Stratégiai alapanyag-ellátás. Kiszámítható ipari partnerség.'}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                {en
                  ? 'Agile sourcing through direct international manufacturer relationships for European industrial operators.'
                  : 'Agilis alapanyag-beszerzés közvetlen nemzetközi gyártói kapcsolatokkal az európai ipari szereplők számára.'}
              </p>
              <div
                className="hero-ticker mt-6"
                aria-label={
                  en
                    ? 'Current logistics information'
                    : 'Aktuális logisztikai információk'
                }
              >
                <div className="hero-ticker-track">
                  <span>
                    {en
                      ? 'Budapest · IPA delivery arriving in 2 hours'
                      : 'Budapest · IPA szállítmány 2 óra múlva érkezik'}
                  </span>
                  <span>
                    {en ? 'Hamburg · In stock' : 'Hamburg · Raktáron'}
                  </span>
                  <span>
                    {en
                      ? 'Exchange rate updated · 10:30'
                      : 'Árfolyam frissítve · 10:30'}
                  </span>
                  <span>
                    {en
                      ? 'Rotterdam · Next departure in 24h'
                      : 'Rotterdam · Következő indulás 24 órán belül'}
                  </span>
                  <span aria-hidden="true">
                    {en
                      ? 'Budapest · IPA delivery arriving in 2 hours'
                      : 'Budapest · IPA szállítmány 2 óra múlva érkezik'}
                  </span>
                  <span aria-hidden="true">
                    {en ? 'Hamburg · In stock' : 'Hamburg · Raktáron'}
                  </span>
                  <span aria-hidden="true">
                    {en
                      ? 'Exchange rate updated · 10:30'
                      : 'Árfolyam frissítve · 10:30'}
                  </span>
                  <span aria-hidden="true">
                    {en
                      ? 'Rotterdam · Next departure in 24h'
                      : 'Rotterdam · Következő indulás 24 órán belül'}
                  </span>
                </div>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link className="btn-primary" href="/termekek">
                  {en ? 'Product catalogue' : 'Termékkatalógus'}{' '}
                  <ArrowRight size={17} />
                </Link>
                <Link className="btn-ghost" href="/kapcsolat">
                  {en ? 'Quick RFQ' : 'Gyors ajánlatkérés'}
                </Link>
              </div>
              <div className="hero-signals mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-slate-400">
                {['REACH', 'CoA', 'EU logistics'].map((x) => (
                  <span className="hero-signal flex items-center gap-2" key={x}>
                    <CheckCircle2 className="text-blue-300" size={15} />
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <HeroVisual />
          </div>
        </section>
        <IpaPriceTicker en={en} />
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-[1400px] divide-y divide-slate-200 px-5 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
            {[
              [
                ShieldCheck,
                en ? 'Documented quality' : 'Dokumentált minőség',
                en
                  ? 'CoA, MSDS and specifications'
                  : 'CoA, MSDS és teljes specifikáció',
              ],
              [
                Truck,
                en ? 'Precise logistics' : 'Pontos logisztika',
                en
                  ? 'ADR transport, agreed windows'
                  : 'ADR szállítás, egyeztetett időablak',
              ],
              [
                PackageCheck,
                en ? 'Flexible quantities' : 'Rugalmas mennyiségek',
                en ? 'From cans to tankers' : 'Kannától a tartályautós tételig',
              ],
            ].map(([Icon, title, copy], i) => (
              <div
                className="flex items-center gap-4 py-7 md:px-7 first:pl-0"
                key={i}
              >
                <span className="icon-box">
                  <Icon size={21} />
                </span>
                <span>
                  <b className="block text-sm">{title as string}</b>
                  <small className="mt-1 block text-slate-500">
                    {copy as string}
                  </small>
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="section">
          <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl bg-[#1E293B] shadow-2xl">
              <video
                className="aspect-video h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={
                  en
                    ? 'EximpWorld Hungary company introduction film'
                    : 'EximpWorld Hungary vállalati bemutatkozó film'
                }
              >
                <source src="/eximpworld-intro.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-slate-950/45 px-3 py-1.5 text-[10px] font-bold tracking-[.14em] text-white backdrop-blur uppercase">
                EximpWorld Hungary
              </span>
            </div>
            <div>
              <p className="eyebrow">{en ? 'Who we are' : 'Kik vagyunk?'}</p>
              <h2 className="section-title">
                {en
                  ? 'A modern bridge between verified production and regional industry.'
                  : 'Modern híd az ellenőrzött gyártókapacitás és a regionális ipar között.'}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                <p>
                  {en
                    ? 'EximpWorld Hungary is an independent Hungarian B2B chemical trading company supplying European industrial operators through an agile approach and direct international manufacturer relationships.'
                    : 'Az EximpWorld Hungary független, magyar B2B vegyipari kereskedelmi vállalat, amely agilis szemlélettel és közvetlen nemzetközi gyártói kapcsolatokkal biztosítja az európai ipari szereplők alapanyag-ellátását.'}
                </p>
                <p>
                  {en
                    ? 'We serve chemical, feed, food and specialist manufacturing sectors. Our operation is built on guaranteed quality, fast decision-making and commercial discretion.'
                    : 'Hídként szolgálunk a szigorúan ellenőrzött gyártókapacitások és a regionális ipari felhasználók között a vegyipari, takarmányipari, élelmiszeripari és speciális gyártási szektorokban. Működésünk alapja a garantált minőség, a gyors döntéshozatal és az üzleti diszkréció.'}
                </p>
              </div>
              <Link href="/rolunk" className="mt-7 text-link">
                {en
                  ? 'Learn more about us'
                  : 'Tovább a részletes bemutatkozáshoz'}{' '}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                {en ? 'Featured product' : 'Kiemelt termék'}
              </p>
              <h2>
                {en
                  ? 'Isopropyl alcohol, ready for production.'
                  : 'Izopropil-alkohol, gyártásra készen.'}
              </h2>
            </div>
            <p>
              {en
                ? 'Stable European sourcing, documented 99.9% purity and packaging tailored to your operation.'
                : 'Stabil európai beszerzés, dokumentált 99,9%-os tisztaság és az Ön működéséhez igazított kiszerelés.'}
            </p>
          </div>
          <div className="mt-12 grid overflow-hidden rounded-3xl border border-slate-200 bg-white lg:grid-cols-2">
            <div className="relative min-h-[380px] overflow-hidden bg-[#071a34]">
              <video
                className="h-full min-h-[380px] w-full object-cover object-center"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/ipa-packaging-hero.png"
                aria-label={
                  en
                    ? 'Animated EximpWorld IPA packaging and logistics presentation'
                    : 'Animált EximpWorld IPA kiszerelési és logisztikai bemutató'
                }
              >
                <source src="/ipa-feature-video.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
            </div>
            <div className="p-7 sm:p-12">
              <span className="status">Raktárról elérhető</span>
              <h3 className="mt-5 text-3xl font-bold">Isopropyl Alcohol</h3>
              <p className="mt-2 text-slate-500">
                CAS 67-63-0 · Tech / Pharma grade
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {['1000L IBC', '200L hordó', '25L kanna', 'Tartályautó'].map(
                  (x) => (
                    <div
                      className="rounded-xl border border-slate-200 p-4 text-sm font-bold"
                      key={x}
                    >
                      {x}
                    </div>
                  ),
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/kapcsolat?product=ipa" className="btn-dark">
                  {en ? 'Request quote' : 'Ajánlatkérés'}{' '}
                  <ArrowRight size={16} />
                </Link>
                <button className="btn-light">
                  <Download size={16} /> TDS / MSDS
                </button>
              </div>
            </div>
          </div>
        </section>
        <SupplyCalculator en={en} />
        <section className="section bg-white">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                {en ? 'Core range' : 'Népszerű alapanyagok'}
              </p>
              <h2>
                {en
                  ? 'The materials production relies on.'
                  : 'Amire a gyártás nap mint nap épít.'}
              </h2>
            </div>
            <Link className="text-link" href="/termekek">
              {en ? 'All 27 products' : 'Mind a 27 termék'}{' '}
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((p, i) => (
              <Link
                href={`/kapcsolat?product=${encodeURIComponent(p.hu)}`}
                className="product-card"
                key={p.hu}
              >
                <div className="flex justify-between">
                  <span className="product-number">0{i + 1}</span>
                  <ArrowRight size={17} />
                </div>
                <h3>{en ? p.en : p.hu}</h3>
                <p>CAS {p.cas}</p>
                <span>{p.spec}</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="section">
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
              <span className="icon-box">
                <Gauge size={22} />
              </span>
              <p className="eyebrow mt-8">
                {en ? 'Modern alternative' : 'Modern alternatíva'}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {en
                  ? 'Less bureaucracy. More precise execution.'
                  : 'Kevesebb bürokrácia. Pontosabb kiszolgálás.'}
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                {en
                  ? 'EximpWorld Hungary was founded to provide a transparent and flexible alternative in chemical raw materials. We work through modern processes, direct manufacturer sources and a precise understanding of customer requirements. Our core range includes high-purity IPA, technical salts, glycols and specific industrial additives.'
                  : 'Az EximpWorld Hungary azzal a céllal jött létre, hogy modern, átlátható és rugalmas alternatívát nyújtson a vegyipari alapanyagok piacán. Korszerű folyamatszervezéssel, közvetlen gyártói forrásokkal és a vevői igények pontos kiszolgálásával dolgozunk. Kínálatunk gerincét a nagy tisztaságú IPA, technikai sók, glikolok és specifikus ipari adalékanyagok alkotják.'}
              </p>
            </article>
            <article className="rounded-3xl bg-[#1E293B] p-8 text-white sm:p-10">
              <span className="grid size-11 place-items-center rounded-xl bg-blue-500/15 text-blue-300">
                <ShieldCheck size={22} />
              </span>
              <p className="eyebrow mt-8 text-blue-300">
                {en
                  ? 'Discretion & partner security'
                  : 'Diszkréció és partneri biztonság'}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {en
                  ? 'Confidential by design. Accountable end to end.'
                  : 'Bizalmi rendszer. Teljes körű felelősség.'}
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                {en
                  ? 'We protect our reliable sources, supplier network and logistics routes within a closed, confidential system. EximpWorld Hungary assumes full quality responsibility toward its customers and ensures precise traceability throughout the transaction.'
                  : 'Megbízható forrásainkat, beszállítói hálózatunkat és logisztikai útvonalainkat zárt, bizalmi rendszerben kezeljük. Ügyfeleink felé az EximpWorld Hungary vállalja a teljes körű minőségi felelősséget és a pontos nyomon követhetőséget.'}
              </p>
            </article>
          </div>
        </section>
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                {en
                  ? 'Why EximpWorld Hungary?'
                  : 'Miért az EximpWorld Hungary?'}
              </p>
              <h2>
                {en
                  ? 'Five commitments behind every delivery.'
                  : 'Öt vállalás minden szállítás mögött.'}
              </h2>
            </div>
            <p>
              {en
                ? 'A flexible, documented and discreet supply model designed around the realities of industrial production.'
                : 'Rugalmas, dokumentált és diszkrét ellátási modell, amelyet az ipari termelés valós igényeire terveztünk.'}
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {[
              [
                PackageCheck,
                en
                  ? 'Maximum quantity and packaging flexibility'
                  : 'Maximális mennyiségi és kiszerelési rugalmasság',
                en
                  ? 'From road-tanker lots and IBCs to drums and palletised units, we adapt to your production rhythm.'
                  : 'Nincsenek merev korlátok: tartálykocsis tételtől az IBC-n, hordón és raklapos kiszerelésen át igazodunk az Ön termelési üteméhez.',
              ],
              [
                FileCheck2,
                en
                  ? 'Flawless QA & compliance documentation'
                  : 'Kifogástalan dokumentáció',
                en
                  ? 'Complete CoA, current SDS, TDS and REACH documentation for every relevant shipment.'
                  : 'Minden releváns szállítmányhoz teljes CoA, naprakész SDS, TDS és REACH dokumentációt biztosítunk.',
              ],
              [
                ShieldCheck,
                en
                  ? 'Commitment to certified systems'
                  : 'Tanúsított rendszerek iránti elkötelezettség',
                en
                  ? 'Our quality principles align with ISO 9001:2015 and feed-material handling with GMP+ FSA 2020 requirements.'
                  : 'Minőségirányítási elveinket az ISO 9001:2015, a takarmányipari anyagkezelést a GMP+ Feed Safety Assurance 2020 követelményei határozzák meg.',
              ],
              [
                Route,
                en
                  ? 'Multimodal and ADR logistics'
                  : 'Multimodális és ADR logisztika',
                en
                  ? 'Organised road, rail, river and sea freight for special and dangerous goods, delivered directly to your site.'
                  : 'Szervezett közúti, vasúti, folyami és tengeri partnerekkel juttatjuk célba a speciális és veszélyes árukat.',
              ],
              [
                Handshake,
                en
                  ? 'Agile, long-term partnership'
                  : 'Agilis, hosszú távú partnerség',
                en
                  ? 'Fast responses to market and transport challenges, with stable cooperation built on mutual trust.'
                  : 'Gyorsan reagálunk a piaci árváltozásokra és szállítási kihívásokra, miközben stabil, kölcsönös bizalmon alapuló kapcsolatot építünk.',
              ],
            ].map(([Icon, t, c], i) => (
              <article
                className={`usp-card ${i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
                key={t as string}
              >
                <div className="flex items-start justify-between">
                  <span className="icon-box">
                    <Icon size={22} />
                  </span>
                  <span className="text-5xl font-black text-slate-100">
                    0{i + 1}
                  </span>
                </div>
                <h3>{t as string}</h3>
                <p>{c as string}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="cta-band">
          <div>
            <p className="eyebrow text-blue-300">RFQ</p>
            <h2>
              {en
                ? 'Need a reliable supply partner?'
                : 'Stabil beszállítót keres?'}
            </h2>
            <p>
              {en
                ? 'Tell us what, how much and when. Our team will respond with a tailored offer.'
                : 'Írja meg, miből, mennyit és mikorra kér. Csapatunk egyedi ajánlattal jelentkezik.'}
            </p>
          </div>
          <Link className="btn-primary shrink-0" href="/kapcsolat">
            {en ? 'Start RFQ' : 'Ajánlatkérés indítása'}{' '}
            <ArrowRight size={17} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function IpaPriceTicker({ en }: { en: boolean }) {
  const quotes = [
    ['IPA 99.9% TECH', '€ 1.65 / kg', '+1.2%', 'up'],
    ['IPA 99.9% HIGH PURITY', '€ 1.82 / kg', '+0.6%', 'up'],
    ['IPA 70% SOLUTION', '€ 1.18 / kg', '-0.4%', 'down'],
    ['IPA REGENERATED', '€ 1.29 / kg', '+0.2%', 'up'],
    ['IBC · CENTRAL EU', '€ 1.58 / kg', '-0.3%', 'down'],
  ];
  const loop = [...quotes, ...quotes];
  return (
    <section
      className="market-ticker"
      aria-label={
        en ? 'Indicative IPA price monitor' : 'Indikatív IPA ármonitor'
      }
    >
      <div className="market-label">
        <span className="market-live-dot" />
        <span>
          <b>IPA MARKET</b>
          <small>{en ? 'INDICATIVE' : 'INDIKATÍV'}</small>
        </span>
      </div>
      <div className="market-viewport">
        <div className="market-track">
          {loop.map(([name, price, change, direction], index) => (
            <div
              className="market-quote"
              key={`${name}-${index}`}
              aria-hidden={index >= quotes.length}
            >
              <span className="market-code">{name}</span>
              <strong>{price}</strong>
              <span
                className={direction === 'up' ? 'market-up' : 'market-down'}
              >
                {direction === 'up' ? '▲' : '▼'} {change}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Link href="#beszerzesi-kalkulator" className="market-action">
        {en ? 'Calculate' : 'Kalkuláció'} <ArrowRight size={14} />
      </Link>
    </section>
  );
}

function SupplyCalculator({ en }: { en: boolean }) {
  const [volume, setVolume] = useState(20000);
  const [packaging, setPackaging] = useState<'ibc' | 'drum' | 'bulk'>('ibc');
  const [months, setMonths] = useState(6);
  const [product, setProduct] = useState('ipa-999-tech');
  const [unitPrice, setUnitPrice] = useState(1.65);
  const packageSize =
    packaging === 'ibc' ? 785 : packaging === 'drum' ? 160 : 20000;
  const deliveries = Math.max(1, Math.ceil(volume / packageSize));
  const monthlyVolume = Math.round(volume / 12);
  const estimatedValue = volume * unitPrice;
  const products: Array<[string, string]> = [
    [
      'ipa-999-tech',
      en ? 'IPA 99.9% · technical grade' : 'IPA 99,9% · technikai minőség',
    ],
    [
      'ipa-999-high',
      en ? 'IPA 99.9% · high-purity' : 'IPA 99,9% · nagy tisztaságú',
    ],
    ['ipa-70', en ? 'IPA 70% solution' : 'IPA 70%-os oldat'],
    [
      'ipa-regenerated',
      en ? 'IPA · regenerated technical' : 'IPA · regenerált technikai',
    ],
  ];
  const productName =
    products.find(([id]) => id === product)?.[1] ?? products[0][1];
  const packageName =
    packaging === 'ibc'
      ? en
        ? 'IBC · approx. 785 kg'
        : 'IBC · kb. 785 kg'
      : packaging === 'drum'
        ? en
          ? 'Drum · approx. 160 kg'
          : 'Hordó · kb. 160 kg'
        : en
          ? 'Road tanker · approx. 20,000 kg'
          : 'Tartálykocsi · kb. 20 000 kg';

  return (
    <section className="supply-calculator" id="beszerzesi-kalkulator">
      <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-blue-300">
            {en ? 'Supply planning' : 'Beszerzéstervezés'}
          </p>
          <h2 className="mt-3 text-[clamp(32px,4vw,52px)] font-semibold leading-tight tracking-[-.035em]">
            {en
              ? 'Plan your annual IPA supply framework.'
              : 'Tervezze meg éves IPA beszerzési keretét.'}
          </h2>
          <p className="mt-5 leading-7 text-slate-300">
            {en
              ? 'Select the IPA grade, expected mass, packaging and planning period to receive an instant sourcing overview in kilograms and euros.'
              : 'Válassza ki az IPA minőségét, a várható tömeget, a kiszerelést és a tervezési időszakot, hogy kilogrammban és euróban kapjon beszerzési áttekintést.'}
          </p>
          <div className="logistics-route" aria-hidden="true">
            <span className="route-origin">EU</span>
            <span className="route-line" />
            <Truck className="route-truck" size={30} />
            <span className="route-destination">HU</span>
          </div>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
          <div className="calculator-panel space-y-9">
            <div>
              <label
                htmlFor="ipa-product"
                className="mb-3 block text-sm font-bold text-slate-200"
              >
                {en ? 'IPA product type' : 'IPA terméktípus'}
              </label>
              <select
                id="ipa-product"
                value={product}
                onChange={(event) => setProduct(event.target.value)}
                className="calculator-select"
              >
                {products.map(([id, name]) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <label
                  htmlFor="annual-volume"
                  className="text-sm font-bold text-slate-200"
                >
                  {en ? 'Estimated annual volume' : 'Becsült éves mennyiség'}
                </label>
                <output className="calculator-value">
                  {volume.toLocaleString('hu-HU')} kg
                </output>
              </div>
              <input
                id="annual-volume"
                className="calculator-range"
                type="range"
                min="500"
                max="100000"
                step="500"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
              />
              <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                <span>500 kg</span>
                <span>50 000 kg</span>
                <span>100 000 kg</span>
              </div>
            </div>

            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
                <label
                  htmlFor="unit-price"
                  className="text-sm font-bold text-slate-200"
                >
                  {en ? 'Calculation unit price' : 'Kalkulációs egységár'}
                </label>
                <output className="calculator-value">
                  € {unitPrice.toFixed(2)} / kg
                </output>
              </div>
              <input
                id="unit-price"
                className="calculator-range"
                type="range"
                min="0.8"
                max="3.5"
                step="0.05"
                value={unitPrice}
                onChange={(event) => setUnitPrice(Number(event.target.value))}
              />
            </div>

            <CalculatorChoice
              label={en ? 'Packaging' : 'Kiszerelés'}
              options={[
                ['ibc', en ? 'IBC · ~785 kg' : 'IBC · ~785 kg'],
                ['drum', en ? 'Drum · ~160 kg' : 'Hordó · ~160 kg'],
                ['bulk', en ? 'Road tanker · ~20 t' : 'Tartálykocsi · ~20 t'],
              ]}
              selected={packaging}
              onSelect={(value) => setPackaging(value as typeof packaging)}
            />

            <CalculatorChoice
              label={en ? 'Planning period' : 'Tervezési időszak'}
              options={[
                [3, en ? '3 months' : '3 hónap'],
                [6, en ? '6 months · recommended' : '6 hónap · ajánlott'],
                [12, en ? '12 months' : '12 hónap'],
              ]}
              selected={months}
              onSelect={(value) => setMonths(Number(value))}
            />
          </div>

          <aside className="calculator-result">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <p className="text-[10px] font-bold tracking-[.18em] text-blue-600 uppercase">
                  {en ? 'Sourcing overview' : 'Beszerzési gyorsnézet'}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {en ? 'Recommended framework' : 'Javasolt ellátási keret'}
                </h3>
              </div>
              <span className="status">{en ? 'Indicative' : 'Indikatív'}</span>
            </div>
            <dl className="mt-6 space-y-1">
              <ResultRow
                label={en ? 'Selected product' : 'Választott termék'}
                value={productName}
              />
              <ResultRow
                label={en ? 'Average monthly demand' : 'Átlagos havi igény'}
                value={`${monthlyVolume.toLocaleString('hu-HU')} kg`}
              />
              <ResultRow
                label={en ? 'Selected packaging' : 'Választott kiszerelés'}
                value={packageName}
              />
              <ResultRow
                label={
                  en ? 'Annual packaging units' : 'Éves kiszerelési egység'
                }
                value={`${deliveries.toLocaleString('hu-HU')} db`}
              />
              <ResultRow
                label={en ? 'Planning horizon' : 'Tervezési horizont'}
                value={`${months} ${en ? 'months' : 'hónap'}`}
              />
              <ResultRow
                label={en ? 'Indicative annual value' : 'Indikatív éves érték'}
                value={`€ ${estimatedValue.toLocaleString('hu-HU', { maximumFractionDigits: 0 })}`}
              />
            </dl>
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-slate-600">
              {en
                ? 'Final pricing, delivery cadence and documentation are confirmed after a technical and logistics review.'
                : 'A végleges ár, szállítási ütemezés és dokumentáció műszaki és logisztikai egyeztetés után kerül meghatározásra.'}
            </div>
            <Link
              className="btn-primary mt-6 w-full justify-center"
              href={`/kapcsolat?product=${encodeURIComponent(productName)}&weight=${volume}kg&price=${unitPrice}EURkg&packaging=${packaging}&period=${months}`}
            >
              {en
                ? 'Request a tailored quote'
                : 'Személyre szabott ajánlatot kérek'}{' '}
              <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CalculatorChoice({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: Array<[string | number, string]>;
  selected: string | number;
  onSelect: (value: string | number) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-bold text-slate-200">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map(([value, text]) => (
          <button
            type="button"
            key={value}
            onClick={() => onSelect(value)}
            className={`calculator-option ${selected === value ? 'is-active' : ''}`}
          >
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-slate-100 py-3">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-bold text-slate-900">{value}</dd>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hero-data-visual relative mx-auto aspect-[6/5] w-full min-w-0 max-w-xl lg:aspect-auto lg:min-h-[520px]">
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-cyan-200/10 bg-[radial-gradient(circle_at_55%_55%,rgba(14,165,233,.14),transparent_58%)]">
        <div className="data-floor absolute inset-x-0 bottom-0 h-[48%]" />
        <img
          src="/logistics-data-hero.png"
          alt="IPA tartályok valós idejű logisztikai adatblokk előtt"
          className="hero-data-product absolute inset-0 h-full w-full object-contain object-center"
        />
        <div className="data-scan-line" />
        <div className="data-pulse data-pulse-one">
          EU-04 <b>98%</b>
        </div>
        <div className="data-pulse data-pulse-two">
          IPA <b>IN TRANSIT</b>
        </div>
        <div className="data-pulse data-pulse-three">
          ETA <b>02:00</b>
        </div>
      </div>
    </div>
  );
}
