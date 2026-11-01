// Run only after separate user approval. Not included in any npm/build script.
import nodemailer from 'nodemailer';
import { createClient } from 'redis';
const e = process.env;
if (e.VERCEL_ENV !== 'preview' || process.argv[2] !== '--approved-two-mailbox-test-2026-11-01') {
  console.error('[smtp-delivery-test] blocked: explicit approval invocation and Preview required');
  process.exit(1);
}
let db, transport;
const deadline = setTimeout(() => { console.error('[smtp-delivery-test] timeout_no_automatic_retry'); process.exit(1); }, 60000);
try {
  const url = e.CONTACT_REDIS_URL || e.REDIS_URL;
  if (!e.SMTP_PASSWORD || e.CONTACT_EMAIL_ENABLED === 'true' || e.CONTACT_DELIVERY_VERIFIED === 'true' || !url?.startsWith('rediss://')) throw Error('configuration');
  db = createClient({ url, disableOfflineQueue: true, socket: { connectTimeout: 8000, reconnectStrategy: false } });
  db.on('error', () => {});
  await db.connect();
  transport = nodemailer.createTransport({ host: 'mail.eximpworld.hu', port: 465, secure: true,
    auth: { user: 'info@eximpworld.hu', pass: e.SMTP_PASSWORD },
    tls: { servername: 'mail.eximpworld.hu', minVersion: 'TLSv1.2', rejectUnauthorized: true },
    logger: false, debug: false, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  const tests = [
    { locale: 'hu', to: 'info@eximpworld.hu', subject: '[TESZT – Preview] EximpWorld SMTP kézbesítési próba', text: 'Ez egy egyszeri, jóváhagyott technikai teszt a Vercel Preview környezetből. Nem ügyfélmegkeresés. Kérjük, erősítse meg a levél beérkezését. Tesztazonosító: preview-smtp-2026-11-01-hu.' },
    { locale: 'en', to: 'eximpworldltd@eximpworld.hu', subject: '[TEST – Preview] EximpWorld SMTP delivery test', text: 'This is a one-time, approved technical test from Vercel Preview. This is not a customer enquiry. Please confirm receipt. Test ID: preview-smtp-2026-11-01-en.' },
  ];
  for (const test of tests) {
    // Persistent test-only latch: even an uncertain SMTP result must not cause a duplicate.
    const key = `eximp-contact:preview:smtp-test:2026-11-01:${test.locale}`;
    if (await db.set(key, 'attempted', { NX: true }) !== 'OK') {
      console.log('[smtp-delivery-test]', JSON.stringify({ locale: test.locale, skippedAlreadyAttempted: true })); continue;
    }
    const response = await transport.sendMail({ from: 'info@eximpworld.hu', to: test.to, replyTo: test.to, subject: test.subject, text: test.text });
    const accepted = response.accepted.some(address => String(address).toLowerCase() === test.to);
    console.log('[smtp-delivery-test]', JSON.stringify({ locale: test.locale, smtpAccepted: accepted, mailboxDeliveryVerified: false }));
    if (!accepted) throw Error('not_accepted');
  }
} catch {
  console.error('[smtp-delivery-test] failed_or_uncertain_no_automatic_retry'); process.exitCode = 1;
} finally { transport?.close(); if (db?.isReady) await db.quit().catch(() => {}); clearTimeout(deadline); }
