'use client';
import { translatedTerm } from '@/lib/language';
import Link from '@/components/locale-link';
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
              <span className="status">{en ? 'Available from stock' : 'Raktárról elérhető'}</span>
              <h3 className="mt-5 text-3xl font-bold">Isopropyl Alcohol</h3>
              <p className="mt-2 text-slate-500">
                CAS 67-63-0 · Tech / Pharma grade
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {(en ? ['1000L IBC', '200L drum', '25L can', 'Road tanker'] : ['1000L IBC', '200L hordó', '25L kanna', 'Tartályautó']).map(
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
                <span>{translatedTerm(p.spec, en)}</span>
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

function HeroVisual() {
  const {locale} = useLocale();
  return (
    <div className="hero-data-visual relative mx-auto aspect-[6/5] w-full min-w-0 max-w-xl lg:aspect-auto lg:min-h-[520px]">
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-cyan-200/10 bg-[radial-gradient(circle_at_55%_55%,rgba(14,165,233,.14),transparent_58%)]">
        <div className="data-floor absolute inset-x-0 bottom-0 h-[48%]" />
        <img
          src="/logistics-data-hero.png"
          alt={locale === 'en' ? 'IPA containers with a real-time logistics data display' : 'IPA tartályok valós idejű logisztikai adatblokk előtt'}
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
