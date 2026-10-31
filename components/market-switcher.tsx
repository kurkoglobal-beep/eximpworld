'use client';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from './locale';
import { languageHref } from '@/lib/language';
import { companies } from '@/config/companies';
import styles from './company-switcher.module.css';
export function MarketSwitcher() {
  const { locale } = useLocale();
  const path = usePathname();
  const query = useSearchParams();
  const ref = useRef<HTMLDetailsElement>(null);
  const company = companies[locale];
  useEffect(() => {
    const outside = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) ref.current?.removeAttribute('open'); };
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape' && ref.current?.open) { ref.current.removeAttribute('open'); ref.current.querySelector('summary')?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, []);
  return <details ref={ref} className={styles.selector}>
    <summary aria-label={`${locale === 'hu' ? 'Vállalataink' : 'Our Companies'}: ${company.label}`}>
      <span className={styles.flag} aria-hidden="true">{company.flag}</span>
      <span><span className={styles.caption}>{locale === 'hu' ? 'Vállalataink' : 'Our Companies'}</span><strong>{company.label}</strong></span>
      <span className={styles.arrow} aria-hidden="true">⌄</span>
    </summary>
    <div className={styles.options}>
      <p>{locale === 'hu' ? 'Válasszon vállalatot' : 'Choose your company'}</p>
      {(['hu', 'en'] as const).map(id => <a key={id} href={languageHref(path + (query.toString() ? '?' + query : ''), id)} lang={id} aria-current={id === locale ? 'true' : undefined} onClick={e => { e.currentTarget.href = languageHref(window.location.pathname + window.location.search + window.location.hash, id); }}>
        <span className={styles.flag} aria-hidden="true">{companies[id].flag}</span><span><strong>{companies[id].label}</strong><small>{companies[id].country}</small></span><span aria-hidden="true">{id === locale ? '✓' : '↗'}</span>
      </a>)}
    </div>
  </details>;
}
