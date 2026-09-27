'use client';

import { useLocale } from '@/components/locale';
import { Footer, Header } from '@/components/site-shell';
import { getService } from '@/lib/services';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ServiceDetail() {
  const { locale } = useLocale();
  const en = locale === 'en';
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const service = getService(decodeURIComponent(slug ?? ''));

  if (!service) {
    return (
      <>
        <Header />
        <main className="section min-h-[60vh]">
          <p className="eyebrow">404</p>
          <h1 className="section-title">
            {en ? 'Service not found.' : 'A szolgáltatás nem található.'}
          </h1>
          <a href="/szolgaltatasok" className="btn-primary mt-8">
            <ArrowLeft size={16} />{' '}
            {en ? 'Back to services' : 'Vissza a szolgáltatásokhoz'}
          </a>
        </main>
        <Footer />
      </>
    );
  }

  const title = en ? service.titleEn : service.titleHu;
  const intro = en ? service.introEn : service.introHu;
  const benefits = en ? service.benefitsEn : service.benefitsHu;
  const steps = en ? service.stepsEn : service.stepsHu;

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#1E293B] py-20 text-white">
          <div className="chemical-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
            <a
              href="/szolgaltatasok"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-200 hover:text-white"
            >
              <ArrowLeft size={15} />{' '}
              {en ? 'All services' : 'Összes szolgáltatás'}
            </a>
            <p className="eyebrow mt-9 text-blue-300">
              {en ? 'EximpWorld service' : 'EximpWorld szolgáltatás'}
            </p>
            <h1 className="mt-4 max-w-4xl text-[clamp(40px,6vw,70px)] font-semibold leading-[1.04] tracking-[-.04em]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {intro}
            </p>
          </div>
        </section>
        <section className="section">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
              <p className="eyebrow">
                {en ? 'What you receive' : 'Amit biztosítunk'}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {en
                  ? 'A service built around your operation'
                  : 'Az Ön működésére szabott szolgáltatás'}
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 rounded-xl bg-slate-50 p-5 text-sm leading-6 text-slate-600"
                  >
                    <CheckCircle2
                      className="mt-1 shrink-0 text-[#2563EB]"
                      size={18}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl bg-[#1E293B] p-7 text-white sm:p-10">
              <p className="eyebrow text-blue-300">
                {en ? 'Process' : 'Folyamat'}
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                {en ? 'Four clear steps' : 'Négy átlátható lépés'}
              </h2>
              <ol className="mt-8 space-y-5">
                {steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-4 border-b border-white/10 pb-5"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-200">
                      0{index + 1}
                    </span>
                    <span className="text-sm text-slate-200">{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>
        <section className="cta-band">
          <div>
            <p className="eyebrow text-blue-300">RFQ</p>
            <h2>
              {en
                ? 'Discuss this service with us'
                : 'Egyeztessünk erről a szolgáltatásról'}
            </h2>
            <p>
              {en
                ? 'Describe your material, volume, delivery location and deadline. We will prepare a tailored solution.'
                : 'Írja meg az alapanyagot, mennyiséget, szállítási helyet és határidőt. Személyre szabott megoldást készítünk.'}
            </p>
          </div>
          <a
            href={`/kapcsolat?service=${encodeURIComponent(service.titleHu)}`}
            className="btn-primary shrink-0"
          >
            {en ? 'Request consultation' : 'Kapcsolatfelvétel'}{' '}
            <ArrowRight size={17} />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
