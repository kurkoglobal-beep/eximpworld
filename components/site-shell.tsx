'use client';
import { englishContact } from '@/config/english-contact';
import { translatedTerm } from '@/lib/language';
import LocaleLink from '@/components/locale-link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Mail,
  MapPin,
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
  const { locale, toggle, market } = useLocale();
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
            {!uk && (
              <button
                onClick={toggle}
                className="hidden h-10 items-center gap-1 px-2 text-xs font-bold text-slate-600 sm:flex"
              >
                {locale.toUpperCase()} <ChevronDown size={13} />
              </button>
            )}
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
            {!uk && (
              <button
                onClick={toggle}
                className="mt-4 text-xs font-bold text-[#2563EB]"
              >
                HU / EN
              </button>
            )}
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
  const uk = market.id === 'uk';
  const footerLinks = uk
    ? ['/products', '/industries', '/services', '/about', '/contact']
    : links.slice(1);
  const footerLabels = uk
    ? ['Products', 'Industries', 'Services', 'About', 'Contact']
    : labels[locale].slice(1);
  return (
    <footer className="bg-[#1E293B] text-slate-300">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Brand inverted />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            {locale === 'hu'
              ? 'Megbízható vegyipari alapanyag-ellátás dokumentált minőséggel és pontos logisztikával.'
              : 'Reliable chemical raw material supply with documented quality and precise logistics.'}
          </p>
          <div className="mt-6 flex gap-2">
            <span className="cert">
              {uk ? 'UK REACH information' : 'REACH'}
            </span>
            <span className="cert">{uk ? 'ADR where applicable' : 'ADR'}</span>
            {!uk && <span className="cert">ISO</span>}
          </div>
        </div>
        <div>
          <h3 className="footer-title">
            {locale === 'hu' ? 'Gyorslinkek' : 'Quick links'}
          </h3>
          {footerLinks.map((x, i) => (
            <LocaleLink className="footer-link" href={x} key={x}>
              {footerLabels[i]}
            </LocaleLink>
          ))}
        </div>
        <div>
          <h3 className="footer-title">
            {locale === 'hu' ? 'Kapcsolat' : 'Contact'}
          </h3>
          <p className="footer-line">
            <MapPin size={15} />{' '}
            <span>
              {company.name}
              <br />
              {company.address.map(x => translatedTerm(x, locale === 'en')).join(', ')}
            </span>
          </p>
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
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-3 px-5 py-5 text-[11px] text-slate-500 lg:px-10">
          <span>
            © {new Date().getFullYear()} {company.name}.{' '}
            {locale === 'hu'
              ? 'Minden jog fenntartva.'
              : 'All rights reserved.'}
          </span>
          <div className="flex flex-wrap gap-4">
            {[
              ['/adatvedelem', locale === 'en' ? 'Privacy Policy' : 'Adatvédelem'],
              ['/sutik', locale === 'en' ? 'Cookie Policy' : 'Sütik'],
              ['/aszf', locale === 'en' ? 'Terms & Conditions' : 'ÁSZF'],
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
