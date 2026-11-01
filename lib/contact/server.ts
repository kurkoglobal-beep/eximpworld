import nodemailer from 'nodemailer';
import { createClient } from 'redis';
import type { Store, Mail } from './core';

export function configuration(e: NodeJS.ProcessEnv = process.env) {
  if (e.CONTACT_EMAIL_ENABLED !== 'true' || e.CONTACT_DELIVERY_VERIFIED !== 'true') return null;
  const redisURL = e.CONTACT_REDIS_URL || e.REDIS_URL;
  try {
    if (!redisURL || !redisURL.startsWith('rediss://') || !new URL(redisURL).hostname) return null;
  } catch { return null; }
  const host = e.SMTP_HOST || 'mail.eximpworld.hu';
  const port = e.SMTP_PORT || '465';
  const secure = e.SMTP_SECURE ?? 'true';
  const user = e.SMTP_USER || 'info@eximpworld.hu';
  const from = e.SMTP_FROM || 'info@eximpworld.hu';
  // Reject contradictory TLS settings rather than silently downgrading.
  if ((port === '465' && secure !== 'true') || (port === '587' && secure !== 'false')) return null;
  if (!host || !['465', '587'].includes(port) || !e.SMTP_PASSWORD || user !== 'info@eximpworld.hu' || from !== 'info@eximpworld.hu' || !e.CONTACT_TOKEN_SECRET || e.CONTACT_TOKEN_SECRET.length < 32) return null;
  return { host, port: Number(port), secure: secure === 'true', user, pass: e.SMTP_PASSWORD, from, secret: e.CONTACT_TOKEN_SECRET, redis: redisURL };
}
let connection: ReturnType<typeof createClient> | undefined;
let connecting: Promise<unknown> | undefined;
async function redis(url: string) {
  if (!connection) {
    connection = createClient({ url, disableOfflineQueue: true, socket: { connectTimeout: 5000, reconnectStrategy: false } });
    connection.on('error', () => console.warn('[contact] shared_store_unavailable'));
  }
  if (!connection.isReady) {
    if (!connecting) connecting = connection.connect().finally(() => { connecting = undefined; });
    await connecting;
  }
  return connection;
}
export function adapters(config: NonNullable<ReturnType<typeof configuration>>) {
  const prefix = `eximp-contact:${process.env.VERCEL_ENV || 'development'}:`;
  const store: Store = {
    async limit(key, maximum) {
      const db = await redis(config.redis);
      const count = await db.eval("local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], 3600) end; return n", { keys: [prefix + key], arguments: [] });
      return Number(count) <= maximum;
    },
    async claim(key, fingerprint) {
      return (await (await redis(config.redis)).set(prefix + key, JSON.stringify({ fingerprint }), { NX: true, EX: 86400 })) === 'OK';
    },
    async read(key) {
      const value = await (await redis(config.redis)).get(prefix + key);
      return value ? JSON.parse(value) : null;
    },
    async finish(key, fingerprint, receipt) {
      await (await redis(config.redis)).set(prefix + key, JSON.stringify({ fingerprint, receipt }), { EX: 86400 });
    },
  };
  const transport = nodemailer.createTransport({
    host: config.host, port: config.port, secure: config.secure, requireTLS: true,
    auth: { user: config.user, pass: config.pass }, tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  return { store, async send(mail: Mail) {
    const result = await transport.sendMail(mail);
    return result.accepted.some(address => String(address).toLowerCase() === mail.to.toLowerCase());
  } };
}
