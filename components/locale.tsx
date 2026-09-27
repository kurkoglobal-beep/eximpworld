'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { markets } from '@/config/markets';
import type { MarketId } from '@/config/markets/types';
type Locale = 'hu' | 'en';
const LocaleContext = createContext({
  locale: 'hu' as Locale,
  toggle: () => {},
  market: markets.hu,
  preview: false,
});
export function LocaleProvider({
  children,
  initialMarket = 'hu',
  preview = false,
}: {
  children: React.ReactNode;
  initialMarket?: MarketId;
  preview?: boolean;
}) {
  const market = markets.hu;
  const [locale, setLocale] = useState<Locale>(market.language);
  useEffect(() => {
    if (market.id !== 'hu') return;
    try {
      if (localStorage.getItem('eximp-locale') === 'en') {
        setLocale('en');
        document.documentElement.lang = 'en';
      }
    } catch {
      /* Storage can be disabled. */
    }
  }, [market.id]);
  const toggle = () => {
    if (market.id !== 'hu') return;
    const next = locale === 'hu' ? 'en' : 'hu';
    setLocale(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem('eximp-locale', next);
    } catch {
      /* The toggle still works without persistence. */
    }
  };
  return (
    <LocaleContext.Provider value={{ locale, toggle, market, preview }}>
      {children}
    </LocaleContext.Provider>
  );
}
export const useLocale = () => useContext(LocaleContext);
