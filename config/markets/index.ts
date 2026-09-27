import { hu } from './hu';
import { uk } from './uk';
import type { MarketId } from './types';
export const markets = { hu, uk };
export function marketFromHost(host: string): MarketId {
  const hostname = host.toLowerCase().replace(/:\d+$/, '').replace(/\.$/, '');
  return hostname === 'eximpworld.co.uk' || hostname === 'www.eximpworld.co.uk'
    ? 'uk'
    : 'hu';
}
export function isPreviewHost(host: string) {
  const hostname = host.toLowerCase().replace(/:\d+$/, '');
  return [
    'localhost',
    '127.0.0.1',
    'eximpworld-hungary.kurko-global.chatgpt.site',
  ].includes(hostname);
}
