'use client';
import { usePathname } from 'next/navigation';
import { useLocale } from './locale';
import { marketUrl, marketPath } from '@/lib/market-routes';
export function MarketSwitcher() {
  const { market, preview } = useLocale();
  const path = usePathname();
  return (
    <div className="market-selector" aria-label="Country / market">
      <details>
        <summary aria-label={`Market: ${market.name}`}>
          {market.id === 'hu' ? '🇭🇺' : '🇬🇧'} <span>{market.name}</span>
          <span aria-hidden>⌄</span>
        </summary>
        <div className="market-options">
          {(['hu', 'uk'] as const).map((id) => (
            <a
              key={id}
              href={id === 'hu' ? marketPath(path, 'hu') : marketUrl(path, id)}
              aria-current={market.id === id ? 'true' : undefined}
              onClick={(e) => {
                const url = new URL(e.currentTarget.href, window.location.origin);
                const current = new URL(window.location.href);
                for (const key of [
                  'product',
                  'variant',
                  'sds',
                  'annual',
                  'packaging',
                  'months',
                ]) {
                  const value = current.searchParams.get(key);
                  if (value) url.searchParams.set(key, value);
                }
                url.hash = current.hash;
                e.currentTarget.href = url.href;
              }}
            >
              {id === 'hu' ? '🇭🇺 Hungary' : '🇬🇧 United Kingdom'}
            </a>
          ))}
          {preview && (
            <div className="preview-markets">
              <small>Market preview</small>
              {(['hu', 'uk'] as const).map((id) => (
                <a key={id} href={`${marketPath(path, id)}?market=${id}`}>
                  {id.toUpperCase()} preview
                </a>
              ))}
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
