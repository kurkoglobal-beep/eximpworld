// One-off Preview build check. No SMTP imports, secret output, or production writes.
import { createClient } from 'redis';
import { randomUUID } from 'node:crypto';
if (process.env.VERCEL_ENV !== 'preview') {
  console.log('[redis-check] skipped: not Preview');
  process.exit(0);
}
const result = { environment: 'preview', redisUrlPresent: !!process.env.REDIS_URL, tls: false, emailDisabled: process.env.CONTACT_EMAIL_ENABLED !== 'true', confirmationDisabled: process.env.CONTACT_DELIVERY_VERIFIED !== 'true', connected: false, write: false, read: false, delete: false };
let client;
const key = `eximp-contact:preview:connection-test:${randomUUID()}`;
const value = randomUUID();
const deadline = setTimeout(() => { console.error('[redis-check] timeout'); process.exit(1); }, 20000);
try {
  if (!result.emailDisabled || !result.confirmationDisabled || !result.redisUrlPresent) throw Error('configuration');
  const url = process.env.REDIS_URL;
  result.tls = url.startsWith('rediss://') && !!new URL(url).hostname;
  if (!result.tls) throw Error('tls');
  client = createClient({ url, disableOfflineQueue: true, socket: { connectTimeout: 8000, reconnectStrategy: false } });
  client.on('error', () => {}); // Never expose an error containing connection credentials.
  await client.connect(); result.connected = client.isReady;
  result.write = await client.set(key, value, { NX: true, EX: 60 }) === 'OK';
  result.read = await client.get(key) === value;
  result.delete = await client.del(key) === 1 && await client.get(key) === null;
  if (!result.connected || !result.write || !result.read || !result.delete) throw Error('check');
  console.log('[redis-check] PASS', JSON.stringify(result));
} catch {
  console.error('[redis-check] FAIL', JSON.stringify(result));
  process.exitCode = 1;
} finally {
  if (client?.isReady) {
    if (!result.delete) { try { await client.del(key); } catch {} }
    await client.quit().catch(() => {});
  }
  clearTimeout(deadline);
}
