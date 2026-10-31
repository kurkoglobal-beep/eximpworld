'use client';
import footerStyles from './footer.module.css';
import { englishContact } from '@/config/english-contact';
import LocaleLink from '@/components/locale-link';
import { usePathname } from 'next/navigation';
import {
  Mail,
  Menu,
  Phone,
  Search,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useLocale } from './locale';
import { MarketSwitcher } from './market-switcher';
import { languageRoute } from '@/lib/language';
import { marketPath } from '@/lib/market-routes';

const labels = {
  hu: ['Főoldal', 'Rólunk', 'Szolgáltatások', 'Termékek', 'Kapcsolat'],
  en: ['Home', 'About us', 'Services', 'Products', 'Contact'],
};
const links = ['/', '/rolunk', '/szolgaltatasok', '/termekek', '/kapcsolat'];
export function Header() {
  const { locale, market } = useLocale();
  const uk = market.id === 'uk';
  const navLinks = uk
    ? ['/', '/products', '/industries', '/services', '/about', '/contact']
    : links;
  const navLabels = uk
    ? ['Home', 'Products', 'Industries', 'Services', 'About', 'Contact']
    : labels[locale];
  const pathname = usePathname();
  const path = languageRoute(pathname)?.hu || pathname;
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-[#1E293B] px-5 py-2 text-center text-[10px] font-semibold tracking-[0.11em] text-white/70 uppercase">
        {uk
          ? 'UK Nationwide Delivery • European & Global Sourcing • ADR Logistics where applicable'
          : locale === 'hu'
            ? 'EU-szintű beszerzés • ADR-kompatibilis szállítás • Dokumentált minőség'
            : 'EU sourcing • ADR-compliant delivery • Documented quality'}
      </div>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
          <Brand />
          <nav className="hidden items-center gap-4 text-xs font-semibold text-slate-500 lg:flex">
            {navLinks.map((l, i) => (
              <LocaleLink
                key={l}
                className={
                  path === l ? 'text-[#1E293B]' : 'hover:text-[#1E293B]'
                }
                href={l}
                aria-current={path === l ? 'page' : undefined}
              >
                {navLabels[i]}
              </LocaleLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LocaleLink
              href={marketPath('/termekek', market.id)}
              className="hidden size-10 place-items-center rounded-full text-slate-500 hover:bg-slate-100 sm:grid"
              aria-label="Search"
            >
              <Search size={18} />
            </LocaleLink>
            <MarketSwitcher />
            <LocaleLink
              href={marketPath('/kapcsolat', market.id)}
              className="hidden rounded-lg bg-[#2563EB] px-5 py-3 text-xs font-bold text-white sm:block"
            >
              {locale === 'hu' ? 'Kérjen ajánlatot' : 'Request a quote'}
            </LocaleLink>
            <button
              onClick={() => setOpen(!open)}
              className="grid size-10 place-items-center lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t bg-white px-5 py-5 lg:hidden">
            {navLinks.map((l, i) => (
              <LocaleLink
                onClick={() => setOpen(false)}
                className={`block border-b border-slate-100 py-3 text-sm font-bold ${path === l ? 'text-[#2563EB]' : 'text-[#1E293B]'}`}
                key={l}
                href={l}
                aria-current={path === l ? 'page' : undefined}
              >
                {navLabels[i]}
              </LocaleLink>
            ))}

          </nav>
        )}
      </header>
    </>
  );
}
export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <LocaleLink
      href="/"
      className={`brand-image-link ${inverted ? 'brand-image-link-dark' : ''}`}
      aria-label="EximpWorld – Home"
    >
      <img
        src="/eximpworld-globe-logo.png"
        alt="Eximpworld – Chemicals for a stronger tomorrow"
        className="brand-image"
      />
    </LocaleLink>
  );
}
export function Footer({ hidePhone = false }: { hidePhone?: boolean }) {
  const { locale, market } = useLocale();
  const company = locale === 'en' ? englishContact : market.company;
  const en = locale === 'en';
  const companyName = en ? 'EXIM WORLD LTD' : 'EximpWorld Kft.';
  const uk = market.id === 'uk';
  const footerLinks = uk
    ? ['/products', '/industries', '/services', '/about', '/contact']
    : links.slice(1);
  const footerLabels = uk
    ? ['Products', 'Industries', 'Services', 'About', 'Contact']
    : labels[locale].slice(1);
  return (
    <footer className={`bg-[#1E293B] text-slate-300 ${footerStyles.footer}`}>
      <div className={footerStyles.grid}>
        <div>
          <Brand inverted />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            {locale === 'hu'
              ? 'Megbízható vegyipari alapanyag-ellátás dokumentált minőséggel és pontos logisztikával.'
              : 'Reliable chemical raw material supply with documented quality and precise logistics.'}
          </p>
          <p className="mt-6 text-sm leading-6 text-slate-400">
            {en ? 'Support with applicable REACH documentation. ADR transport coordinated with logistics partners where required and available.' : 'Segítség a vonatkozó REACH-dokumentáció beszerzésében. ADR-szállítás szervezése logisztikai partnerekkel, szükség és elérhetőség szerint.'}
          </p>
        </div>
        {en && <>
          <div className="space-y-4 text-sm leading-6">
            <h3 className="footer-title">Company Information</h3>
            <p className="font-semibold text-white">EXIM WORLD LTD</p>
            <p>Company No. 16526371<br />Registered in England and Wales</p>
            <div><p className="font-medium text-white">Registered Office</p><address className="not-italic">BM Centre, 11 St. Martins Close, Winchester, SO23 0HD, United Kingdom</address></div>
            <a className="block underline underline-offset-4 hover:text-white" href="https://find-and-update.company-information.service.gov.uk/company/16526371" target="_blank" rel="noopener noreferrer">Verify on Companies House</a>
            <a className="block break-words hover:text-white" href="mailto:eximpworldltd@eximpworld.hu">eximpworldltd@eximpworld.hu</a>
          </div>
          <div className="space-y-5 text-sm leading-6">
            <h3 className="footer-title">Our Team / Direct Contacts</h3>
            <div><p className="font-semibold text-white">Ernő Demus</p><p>UK Business Manager</p><a className="block break-words" href="mailto:eximpworldltd@eximpworld.hu">eximpworldltd@eximpworld.hu</a><a className="block" href="tel:+447479946016">07479 946016</a><a className="block" href="https://wa.me/447479946016" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div>
            {[
              ['Harper Wilson', 'Customer Service Representative', 'harper.uk@eximpworld.hu'],
              ['Oliver Patel', 'Customs & Compliance Administrator', 'oliver.uk@eximpworld.hu'],
              ['Thomas Taylor', 'Logistics & Supply Chain Specialist', 'thomas.uk@eximpworld.hu'],
            ].map(([name, role, email]) => <div key={email}><p className="font-semibold text-white">{name}</p><p className="text-slate-400">{role}</p><a className="break-words hover:text-white" href={`mailto:${email}`}>{email}</a></div>)}
          </div>
        </>}
        {!en && <>
          <div className="space-y-3 text-sm leading-6">
            <h3 className="footer-title">Céginformációk</h3>
            <p className="font-semibold text-white">EximpWorld Kft.</p>
            <p>Cégjegyzékszám: 01-09-471262<br />Adószám: 33142777-2-43<br />Közösségi adószám: HU33142777</p>
            <p>Ügyvezető: Pálóczi Bence</p>
          </div>
          <div>
          <h3 className="footer-title">
            Címek és elérhetőségek
          </h3>
          <div className="space-y-3 text-sm leading-6">
            <div><p className="font-medium text-white">Bejegyzett székhely</p><address className="not-italic">1183 Budapest, Szegfű utca 9.</address></div>
            <div><p className="font-medium text-white">Üzleti iroda</p><address className="not-italic">Andrássy Palace, 1061 Budapest, Andrássy út 9.</address></div>
            <div><p className="font-medium text-white">Depo / raktári kapcsolattartás</p><address className="not-italic">1097 Budapest, Kén utca 8.</address></div>
          </div>
          {[
            [locale === 'hu' ? 'Központi e-mail' : 'Central email', company.centralEmail],
            [locale === 'hu' ? 'Depo/Raktár' : 'Depot/Warehouse', company.depotEmail],
          ].map(([label, email]) => email && (
            <p className="footer-line" key={email}>
              <Mail size={15} />
              <span>{label}: <LocaleLink href={`mailto:${email}`}>{email}</LocaleLink></span>
            </p>
          ))}
          {company.email && (
            <p className="footer-line">
              <Mail size={15} />
              <LocaleLink href={`mailto:${company.email}`}>
                {company.email}
              </LocaleLink>
            </p>
          )}
          {!hidePhone && company.phone && (
            <p className="footer-line">
              <Phone size={15} />
              <LocaleLink href={`tel:${company.phone.replace(/\s/g, '')}`}>
                {company.phone}
              </LocaleLink>
            </p>
          )}
          {company.number && (
            <p className="footer-line">
              Company number: {company.number}
            </p>
          )}
          {company.vat && (
            <p className="footer-line">VAT: {company.vat}</p>
          )}
        </div></>}
        <div>
          <h3 className="footer-title">
            {locale === 'hu' ? 'Gyorslinkek' : 'Quick links'}
          </h3>
          <LocaleLink className="footer-link" href="/karrier">{en ? 'Careers' : 'Karrier'}</LocaleLink>
          {footerLinks.map((x, i) => (
            <LocaleLink className="footer-link" href={x} key={x}>
              {footerLabels[i]}
            </LocaleLink>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-3 px-5 py-3 text-[11px] text-slate-500 lg:px-10">
          <span>
            © {new Date().getFullYear()} {companyName}{' '}
            {locale === 'hu'
              ? 'Minden jog fenntartva.'
              : 'All rights reserved.'}
          </span>
          <div className="flex flex-wrap gap-4">
            {[
              ['/adatvedelem', locale === 'en' ? 'Privacy Policy' : 'Adatvédelem'],
              ['/sutik', locale === 'en' ? 'Cookie Policy' : 'Sütik'],
              ['/aszf', locale === 'en' ? 'General Terms & Conditions' : 'ÁSZF'],
            ].map(([path, label]) => (
              <LocaleLink key={path} href={marketPath(path, market.id)}>
                {label}
              </LocaleLink>
            ))}
            <button
              onClick={() =>
                window.dispatchEvent(new Event('eximp-cookie-settings'))
              }
            >
              {locale === 'en' ? 'Cookie settings' : 'Sütibeállítások'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#1E293B] py-20 text-white">
      <div className="chemical-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <p className="eyebrow text-blue-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(38px,5vw,64px)] font-semibold leading-[1.04] tracking-[-.04em]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          {copy}
        </p>
      </div>
    </section>
  );
}
