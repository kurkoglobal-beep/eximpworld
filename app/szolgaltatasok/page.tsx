'use client';
import { LogisticsAnimation } from '@/components/logistics-animation';
import LocaleLink from '@/components/locale-link';

import { useLocale } from '@/components/locale';
import { Footer, Header } from '@/components/site-shell';
import { services } from '@/lib/services';
import {
  ArrowRight,
  Boxes,
  FileCheck2,
  PackageOpen,
  Truck,
} from 'lucide-react';

const icons = [Boxes, Truck, PackageOpen, FileCheck2];

export default function Services() {
  const { locale } = useLocale();
  const en = locale === 'en';
  return (
    <>
      <Header />
      <main>
        <section className="services-image-hero" aria-label={en ? 'Our services' : 'Szolgáltatásaink'}>
          <img
            src={en ? "/services-logistics-hero-en.png" : "/services-logistics-hero.png"}
            alt={
              en
                ? 'Eximpworld chemical logistics centre, truck and industrial packaging'
                : 'Eximpworld vegyipari logisztikai központ, kamion és ipari kiszerelések'
            }
          />
          <LocaleLink className="services-image-hero-link" href="#szolgaltatasaink">
            <span className="sr-only">
              {en ? 'View our services' : 'Szolgáltatásaink megtekintése'}
            </span>
          </LocaleLink>
        </section>
        <section className="section">
          <div id="szolgaltatasaink" className="scroll-mt-28 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = icons[index];
              return (
                <LocaleLink
                  href={`/szolgaltatasok/${service.slug}`}
                  className="service-card group block transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                  key={service.slug}
                >
                  <span className="service-num">0{index + 1}</span>
                  <span className="icon-box">
                    <Icon size={24} />
                  </span>
                  <h2 className="transition group-hover:text-[#2563EB]">
                    {en ? service.titleEn : service.titleHu}
                  </h2>
                  <p>{en ? service.shortEn : service.shortHu}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-[#2563EB]">
                    {en ? 'View service' : 'Szolgáltatás megnyitása'}{' '}
                    <ArrowRight size={15} />
                  </span>
                </LocaleLink>
              );
            })}
          </div>
        </section>
        <LogisticsAnimation en={en} />
        <section className="section">
          <div className="mt-12 rounded-3xl bg-[#1E293B] p-8 text-white sm:flex sm:items-center sm:justify-between sm:p-12">
            <div>
              <h2 className="text-3xl font-bold">
                {en ? 'Talk to our specialist.' : 'Beszéljen szakértőnkkel.'}
              </h2>
              <p className="mt-3 text-slate-300">
                {en
                  ? 'We will map the best supply model for your operation.'
                  : 'Felmérjük az Ön működéséhez illő beszállítási modellt.'}
              </p>
            </div>
            <LocaleLink className="btn-primary mt-6 sm:mt-0" href="/kapcsolat">
              {en ? 'Contact us' : 'Kapcsolatfelvétel'} <ArrowRight size={16} />
            </LocaleLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
