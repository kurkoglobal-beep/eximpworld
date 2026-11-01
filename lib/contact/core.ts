import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export const recipients = { hu: 'info@eximpworld.hu', en: 'eximpworldltd@eximpworld.hu' } as const;
export type Language = keyof typeof recipients;
export const fields = ['company', 'taxNumber', 'contact', 'email', 'telephone', 'country', 'product', 'productName', 'specification', 'quantity', 'packaging', 'deliveryLocation', 'deliveryDate', 'additionalInformation', 'requestDocumentation'] as const;
export type Enquiry = Record<(typeof fields)[number], string> & { locale: Language };
export class ContactError extends Error {
  code: string;
  status: number;
  constructor(code: string, status = 400) { super(code); this.code = code; this.status = status; }
}
export function validate(input: unknown): Enquiry {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new ContactError('invalid');
  const obj = input as Record<string, unknown>;
  if (obj.locale !== 'hu' && obj.locale !== 'en') throw new ContactError('invalid');
  if (obj.website) throw new ContactError('invalid');
  const result = { locale: obj.locale } as Enquiry;
  for (const key of fields) {
    const value = obj[key] ?? '';
    if (typeof value !== 'string' || value.length > (key === 'additionalInformation' ? 5000 : 300) || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value)) throw new ContactError('invalid');
    result[key] = value.trim();
  }
  for (const key of ['company', 'contact', 'email', 'country', 'product', 'quantity', 'deliveryLocation'] as const) if (!result[key]) throw new ContactError('invalid');
  if (!/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(result.email) || result.email.length > 254) throw new ContactError('invalid');
  if (result.deliveryDate && (!/^\d{4}-\d{2}-\d{2}$/.test(result.deliveryDate) || !Number.isFinite(Date.parse(result.deliveryDate)))) throw new ContactError('invalid');
  if (result.requestDocumentation && result.requestDocumentation !== 'yes') throw new ContactError('invalid');
  return result;
}
export function digest(secret: string, value: string) { return createHmac('sha256', secret).update(value).digest('hex'); }
export function token(secret: string, locale: Language, client: string, now = Date.now()) {
  const body = Buffer.from(JSON.stringify({ id: randomUUID(), locale, client, time: now })).toString('base64url');
  return `${body}.${digest(secret, body)}`;
}
export function checkToken(secret: string, value: unknown, locale: Language, client: string, now = Date.now()) {
  if (typeof value !== 'string' || value.length > 1024) throw new ContactError('expired');
  const [body, mac] = value.split('.');
  const expected = digest(secret, body);
  if (!mac || mac.length !== expected.length || !timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) throw new ContactError('expired');
  let data;
  try { data = JSON.parse(Buffer.from(body, 'base64url').toString()); } catch { throw new ContactError('expired'); }
  if (data.locale !== locale || data.client !== client || typeof data.time !== 'number' || now - data.time < 2000 || now - data.time > 1800000 || typeof data.id !== 'string') throw new ContactError('expired');
  return data.id as string;
}
export type Mail = { from: string; to: string; replyTo: string; subject: string; text: string };
export function messages(data: Enquiry, from: string): [Mail, Mail] {
  const en = data.locale === 'en';
  const recipient = recipients[data.locale];
  return [{ from, to: recipient, replyTo: data.email,
    subject: en ? 'EximpWorld Ltd – Website enquiry' : 'EximpWorld Kft. – Weboldali megkeresés',
    text: fields.map(key => `${key}: ${data[key] || '—'}`).join('\n'),
  }, { from, to: data.email, replyTo: recipient,
    subject: en ? 'EximpWorld Ltd – Enquiry Confirmation' : 'EximpWorld Kft. – Megkeresésének visszaigazolása',
    text: en ? 'Dear Partner,\n\nThank you for contacting EximpWorld.\n\nWe have successfully received your enquiry. A member of our team will contact you shortly.\n\nKind regards,\n\nEximpWorld Ltd' : 'Tisztelt Partnerünk!\n\nKöszönjük, hogy felvette velünk a kapcsolatot.\n\nMegkeresését sikeresen fogadtuk, munkatársunk hamarosan felveszi Önnel a kapcsolatot.\n\nÜdvözlettel,\n\nEximpWorld Kft.',
  }];
}
export type Receipt = { accepted: true; confirmationSent: boolean };
export interface Store {
  limit(key: string, maximum: number): Promise<boolean>;
  claim(key: string, fingerprint: string): Promise<boolean>;
  read(key: string): Promise<{ fingerprint: string; receipt?: Receipt } | null>;
  finish(key: string, fingerprint: string, receipt: Receipt): Promise<void>;
}
export async function deliver(data: Enquiry, id: string, client: string, deps: {
  secret: string; from: string; store: Store; send: (mail: Mail) => Promise<boolean>;
  log: (event: string) => void;
}): Promise<Receipt> {
  const { store } = deps;
  const fingerprint = digest(deps.secret, JSON.stringify(data));
  const key = `request:${id}`;
  const previous = await store.read(key);
  if (previous) {
    if (previous.fingerprint !== fingerprint || !previous.receipt) throw new ContactError('pending', 409);
    return previous.receipt;
  }
  if (!await store.limit(`ip:${client}`, 5) || !await store.limit(`email:${digest(deps.secret, data.email.toLowerCase())}`, 3) || !await store.limit('global', 60)) throw new ContactError('rate', 429);
  if (!await store.claim(key, fingerprint)) throw new ContactError('pending', 409);
  // Keep the claim even after SMTP errors: a lost SMTP acknowledgement may still mean delivery.
  const [primary, confirmation] = messages(data, deps.from);
  try {
    if (!await deps.send(primary)) throw new Error('rejected');
  } catch {
    deps.log('primary_not_confirmed');
    throw new ContactError('send', 502);
  }
  let confirmationSent = false;
  try { confirmationSent = await deps.send(confirmation); } catch { /* primary was accepted */ }
  const receipt: Receipt = { accepted: true, confirmationSent };
  await store.finish(key, fingerprint, receipt);
  deps.log(confirmationSent ? 'smtp_accepted' : 'confirmation_not_confirmed');
  return receipt;
}
