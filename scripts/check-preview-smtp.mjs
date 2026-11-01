// Connection/authentication only: intentionally contains no sendMail call.
import nodemailer from 'nodemailer';
if (process.env.VERCEL_ENV !== 'preview') {
  console.log('[smtp-check] skipped: not Preview'); process.exit(0);
}
const e = process.env;
const result = { preview: true, passwordPresent: !!e.SMTP_PASSWORD, publicSendingDisabled: e.CONTACT_EMAIL_ENABLED !== 'true' && e.CONTACT_DELIVERY_VERIFIED !== 'true', tlsCertificateAndAuthenticationVerified: false, messagesSent: 0 };
let transport;
const deadline = setTimeout(() => { console.error('[smtp-check] timeout'); process.exit(1); }, 35000);
try {
  if (!result.passwordPresent || !result.publicSendingDisabled) throw Error('configuration');
  if ((e.SMTP_HOST && e.SMTP_HOST !== 'mail.eximpworld.hu') || (e.SMTP_PORT && e.SMTP_PORT !== '465') || (e.SMTP_SECURE && e.SMTP_SECURE !== 'true') || (e.SMTP_USER && e.SMTP_USER !== 'info@eximpworld.hu') || (e.SMTP_FROM && e.SMTP_FROM !== 'info@eximpworld.hu')) throw Error('configuration');
  transport = nodemailer.createTransport({
    host: 'mail.eximpworld.hu', port: 465, secure: true, requireTLS: true,
    auth: { user: 'info@eximpworld.hu', pass: e.SMTP_PASSWORD },
    tls: { servername: 'mail.eximpworld.hu', minVersion: 'TLSv1.2', rejectUnauthorized: true },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    logger: false, debug: false, disableFileAccess: true, disableUrlAccess: true,
  });
  result.tlsCertificateAndAuthenticationVerified = await transport.verify();
  if (!result.tlsCertificateAndAuthenticationVerified) throw Error('verification');
  console.log('[smtp-check] PASS', JSON.stringify(result));
} catch (error) {
  const allowed = new Set(['EAUTH','EDNS','ECONNECTION','ETIMEDOUT','ESOCKET','ETLS']);
  const code = allowed.has(error?.code) ? error.code : 'CHECK_FAILED';
  console.error('[smtp-check] FAIL', JSON.stringify({ ...result, code }));
  process.exitCode = 1;
} finally { transport?.close(); clearTimeout(deadline); }
