'use client';
import { useEffect, useState } from 'react';
import { useLocale } from './locale';
import { marketPath } from '@/lib/market-routes';
export function CookieNotice() {
  const { market } = useLocale();
  const en = market.id === 'uk';
  const [open, setOpen] = useState(false);
  const key = `eximp-cookie-choice-${market.id}-v1`;
  useEffect(() => {
    try {
      setOpen(!localStorage.getItem(key));
    } catch {
      setOpen(true);
    }
    const show = () => setOpen(true);
    window.addEventListener('eximp-cookie-settings', show);
    return () => window.removeEventListener('eximp-cookie-settings', show);
  }, [key]);
  function close() {
    try {
      localStorage.setItem(key, 'essential-only');
    } catch {}
    setOpen(false);
  }
  if (!open) return null;
  return (
    <aside
      className="cookie-notice"
      aria-label={en ? 'Cookie preferences' : 'Sütibeállítások'}
    >
      <div>
        <strong>
          {en ? 'Your privacy, your choice.' : 'Az Ön adatvédelme fontos.'}
        </strong>
        <p>
          {en
            ? 'This website uses essential functionality and stores your cookie preference in this browser. No optional analytics or advertising cookies are enabled by this application.'
            : 'Az oldal az alapvető működéshez szükséges funkciókat használja, és ebben a böngészőben tárolja a sütibeállítást. Az alkalmazás nem kapcsol be opcionális analitikai vagy hirdetési sütiket.'}{' '}
          <a href={marketPath('/sutik', market.id)}>
            {en ? 'Cookie policy' : 'Sütitájékoztató'}
          </a>
        </p>
      </div>
      <button className="btn-primary" onClick={close}>
        {en ? 'Essential only' : 'Csak a szükségesek'}
      </button>
    </aside>
  );
}
