import { randomUUID } from 'node:crypto';
import { ContactError, checkToken, deliver, digest, token, validate } from '@/lib/contact/core';
import { adapters, configuration } from '@/lib/contact/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
const json = (value: object, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '3600' } : {}) } });
function client(request: Request, secret: string) {
  // The platform overwrites this header. Outside Vercel all callers share a safe bucket.
  return digest(secret, process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for') || 'unknown' : 'local');
}
function originAllowed(request: Request) {
  const allowed = new Set(['https://eximpworld.hu', 'https://www.eximpworld.hu']);
  if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV === 'development') { allowed.add('http://localhost:3166'); allowed.add('http://127.0.0.1:3166'); }
  return allowed.has(request.headers.get('origin') || '');
}
export async function GET(request: Request) {
  const config = configuration();
  const locale = new URL(request.url).searchParams.get('locale');
  if (!config || (locale !== 'hu' && locale !== 'en')) return json({ enabled: false });
  try {
    const identity = client(request, config.secret);
    if (!await adapters(config).store.limit(`token:${identity}`, 30)) return json({ enabled: false }, 429);
    return json({ enabled: true, token: token(config.secret, locale, identity) });
  } catch { return json({ enabled: false }, 503); }
}
export async function POST(request: Request) {
  const config = configuration();
  if (!config) return json({ accepted: false, code: 'unavailable' }, 503);
  if (!originAllowed(request) || request.headers.get('content-type')?.split(';')[0] !== 'application/json') return json({ accepted: false, code: 'invalid' }, 403);
  const requestId = randomUUID();
  try {
    // Bound streamed bodies too, rather than trusting Content-Length.
    const reader = request.body?.getReader();
    if (!reader) throw new ContactError('invalid');
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.length;
      if (size > 24000) { await reader.cancel(); throw new ContactError('invalid', 413); }
      chunks.push(value);
    }
    let input;
    try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new ContactError('invalid'); }
    const data = validate(input);
    const identity = client(request, config.secret);
    const id = checkToken(config.secret, input.token, data.locale, identity);
    const receipt = await deliver(data, id, identity, { ...adapters(config), secret: config.secret, from: config.from,
      log: event => console.info('[contact]', { requestId, event }),
    });
    return json(receipt);
  } catch (error) {
    const known = error instanceof ContactError;
    console.warn('[contact]', { requestId, event: known ? error.code : 'service_unavailable' });
    return json({ accepted: false, code: known ? error.code : 'unavailable' }, known ? error.status : 503);
  }
}
