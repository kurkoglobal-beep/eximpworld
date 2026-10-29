"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale } from './locale';
import { languageHref } from '@/lib/language';
export function MarketSwitcher() {
 const {locale} = useLocale(); const path = usePathname(); const query = useSearchParams();
 return <div className="market-selector" aria-label="Language"><details><summary aria-label={locale === 'hu' ? 'Nyelv: Magyar' : 'Language: English'}>{locale === 'hu' ? '🇭🇺' : '🇬🇧'} <span>{locale === 'hu' ? 'Magyar' : 'English'}</span><span aria-hidden>⌄</span></summary><div className="market-options">{(['hu','en'] as const).map(id => <a key={id} href={languageHref(path + (query.toString() ? '?' + query : ''), id)} lang={id} aria-current={id === locale ? 'true' : undefined} onClick={e => {e.currentTarget.href = languageHref(window.location.pathname + window.location.search + window.location.hash, id);}}>{id === 'hu' ? '🇭🇺 Magyar' : '🇬🇧 English'}</a>)}</div></details></div>;
}
