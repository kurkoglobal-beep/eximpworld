// No network calls or email sending. Never print environment values.
import { configuration } from '../lib/contact/server.ts';
if (process.env.VERCEL_ENV === 'production') {
  const expected = { SMTP_HOST: 'mail.eximpworld.hu', SMTP_PORT: '465', SMTP_SECURE: 'true', SMTP_USER: 'info@eximpworld.hu', SMTP_FROM: 'info@eximpworld.hu', CONTACT_DELIVERY_VERIFIED: 'true', CONTACT_EMAIL_ENABLED: 'true' };
  const invalid = Object.keys(expected).filter(key => process.env[key] !== expected[key]);
  if (!configuration() || invalid.length) {
    console.error('[production-contact-config] BLOCKED: invalid configuration; mismatched field names:', invalid.join(',') || 'SMTP_PASSWORD / CONTACT_TOKEN_SECRET / Redis URL');
    process.exit(1);
  }
  console.log('[production-contact-config] PASS: required configuration valid, Redis TLS required; no messages sent');
}
