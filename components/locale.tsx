"use client";
import { createContext, useContext } from 'react';
import { markets } from '@/config/markets';
import type { MarketId } from '@/config/markets/types';
import { languageHref, type Language } from '@/lib/language';
const LocaleContext = createContext({ locale: 'hu' as Language, toggle: () => {}, market: markets.hu, preview: false });
export function LocaleProvider({children, initialLocale = 'hu', preview = false}: {children: React.ReactNode; initialLocale?: Language; initialMarket?: MarketId; preview?: boolean}) {
 const toggle = () => { window.location.assign(languageHref(window.location.pathname + window.location.search + window.location.hash, initialLocale === 'hu' ? 'en' : 'hu')); };
 return <LocaleContext.Provider value={{locale: initialLocale, toggle, market: markets.hu, preview}}>{children}</LocaleContext.Provider>;
}
export const useLocale = () => useContext(LocaleContext);
