'use client';
import { englishContact } from '@/config/english-contact';
import LocaleLink from '@/components/locale-link';
import { useState, useEffect, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from './locale';
import { products } from '@/lib/products';
import { ukProducts, ipaVariants } from '@/lib/uk-products';
import { marketPath } from '@/lib/market-routes';
export function RFQForm() {
  const { market, locale } = useLocale();
  const en = locale === 'en';
  const company = en ? englishContact : market.company;
  const uk = market.id === 'uk';
  const params = useSearchParams();
  const initial = params.get('product') || '';
  const match =
    ukProducts.find(
      (p, i) =>
        p.id === initial || p.name === initial || products[i].hu === initial,
    ) || (initial.toLowerCase().startsWith('ipa') ? ukProducts[0] : undefined);
  const [product, setProduct] = useState(match?.id || '');
  const requestedPackaging = params.get('packaging');
  const defaultPackaging =
    requestedPackaging?.toLowerCase() === 'ibc'
      ? '1000 L IBC'
      : requestedPackaging?.toLowerCase() === 'drum'
        ? '200 L Drum'
        : requestedPackaging?.toLowerCase() === 'bulk'
          ? 'Bulk'
          : '';
  const [packaging, setPackaging] = useState(defaultPackaging);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [download, setDownload] = useState('');
  const [mail, setMail] = useState('');
  const selected = ukProducts.find((p) => p.id === product);
  const requestedVariant = ipaVariants.find(
    (v) => v.id === params.get('variant'),
  );
  useEffect(
    () => () => {
      if (download) URL.revokeObjectURL(download);
    },
    [download],
  );
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setStatus('');
    const data = {
      ...Object.fromEntries(new FormData(form)),
      market: market.id,
      companyRecipient: company.name,
      productName: selected?.name || product,
    };
    try {
      if (market.rfq.endpoint) {
        const result = await fetch(market.rfq.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!result.ok) throw new Error('Request failed');
        const ack = await result.json();
        if (
          !ack ||
          typeof ack !== 'object' ||
          !('accepted' in ack) ||
          ack.accepted !== true
        )
          throw new Error('No acknowledgement');
        setStatus(
          en ? 'Your request has been received.' : 'Az ajánlatkérést fogadtuk.',
        );
      } else {
        const body = Object.entries(data)
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n');
        setDownload(
          URL.createObjectURL(
            new Blob([body], { type: 'text/plain;charset=utf-8' }),
          ),
        );
        if (company.email)
          setMail(
            `mailto:${company.email}?subject=${encodeURIComponent(`RFQ — ${selected?.name || 'Chemical supply'}`)}&body=${encodeURIComponent(body)}`,
          );
        setStatus(
          en
            ? 'Your request is prepared, but has not been sent. Download a copy' +
                (company.email
                  ? ' or open it in your email application to send.'
                  : '. Online submission is not yet available.')
            : 'Az ajánlatkérés elkészült, de még nincs elküldve. Töltse le, vagy nyissa meg levelezőjében az elküldéshez.',
        );
      }
    } catch {
      setStatus(
        en
          ? 'The request could not be sent. Your details remain in the form; please try again.'
          : 'Nem sikerült elküldeni. Az adatok megmaradtak az űrlapon; próbálja újra.',
      );
    } finally {
      setBusy(false);
    }
  }
  const field = (
    name: string,
    label: string,
    type = 'text',
    required = false,
    value?: string,
  ) => (
    <label className="field">
      <span>
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        className="input"
        name={name}
        type={type}
        required={required}
        defaultValue={value}
        min={
          type === 'date' ? new Date().toISOString().slice(0, 10) : undefined
        }
      />
    </label>
  );
  return (
    <form
      onSubmit={submit}
      onChange={() => {
        if (status) {
          setStatus('');
          setDownload('');
          setMail('');
        }
      }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
    >
      <p className="eyebrow">B2B / RFQ</p>
      <h2 className="mt-2 mb-8 text-3xl font-bold">
        {en ? 'Request a quote' : 'Kérjen egyedi ajánlatot'}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {field('company', en ? 'Company name' : 'Cégnév', 'text', true)}
        {!uk && field('taxNumber', en ? 'Tax number' : 'Adószám')}
        {field(
          'contact',
          en ? 'Contact person' : 'Kapcsolattartó neve',
          'text',
          true,
        )}
        {field('email', 'Email', 'email', true)}
        {field('telephone', en ? 'Telephone' : 'Telefonszám', 'tel')}
        {field(
          'country',
          en ? 'Country' : 'Ország',
          'text',
          true,
          uk ? 'United Kingdom' : en ? 'Hungary' : 'Magyarország',
        )}
        <label className="field">
          <span>{en ? 'Product' : 'Termék'} *</span>
          <select
            className="input"
            name="product"
            required
            value={product}
            onChange={(e) => {
              setProduct(e.target.value);
              setPackaging('');
            }}
          >
            <option value="">
              {en ? 'Select product' : 'Válasszon terméket'}
            </option>
            {ukProducts.map((p, i) => (
              <option key={p.id} value={p.id}>
                {en ? p.name : products[i].hu}
              </option>
            ))}
          </select>
        </label>
        {field(
          'specification',
          en ? 'Grade / specification' : 'Minőség / specifikáció',
          'text',
          false,
          requestedVariant?.name ||
            (!uk && initial.startsWith('IPA ') ? initial : undefined),
        )}
        {field(
          'quantity',
          en
            ? 'Required quantity (include unit)'
            : 'Szükséges mennyiség (mértékegységgel)',
          'text',
          true,
          params.get('annual')
            ? `${params.get('annual')} L / year`
            : params.get('weight') || undefined,
        )}
        <label className="field">
          <span>{en ? 'Packaging' : 'Kiszerelés'}</span>
          <select
            name="packaging"
            className="input"
            value={packaging}
            onChange={(e) => setPackaging(e.target.value)}
          >
            <option value="">
              {en ? 'Please advise' : 'Egyeztetést kérek'}
            </option>
            {(selected?.packaging || []).map((p) => (
              <option key={p}>{p}</option>
            ))}
            <option value="Other — specify in notes">
              {en
                ? 'Other — specify in notes'
                : 'Egyéb – adja meg a megjegyzésben'}
            </option>
          </select>
        </label>
        {field(
          'deliveryLocation',
          en
            ? 'Delivery postcode / location'
            : 'Szállítási irányítószám / hely',
          'text',
          true,
        )}
        {field(
          'deliveryDate',
          en ? 'Required delivery date' : 'Kívánt szállítási dátum',
          'date',
        )}
        <label className="field sm:col-span-2">
          <span>{en ? 'Additional information' : 'További információk'}</span>
          <textarea
            name="additionalInformation"
            className="input min-h-28"
            defaultValue={
              params.get('months') || params.get('period')
                ? `${en ? 'Contract horizon' : 'Tervezési időszak'}: ${params.get('months') || params.get('period')} ${en ? 'months' : 'hónap'}. ${en ? 'Requested packaging' : 'Kiszerelés'}: ${params.get('packaging') || '—'}.`
                : ''
            }
          />
        </label>
      </div>
      <label className="mt-5 flex items-start gap-3 text-sm">
        <input
          className="mt-1"
          type="checkbox"
          name="requestDocumentation"
          value="yes"
          defaultChecked={params.get('sds') === '1'}
        />
        {en
          ? 'Request SDS / technical documentation'
          : 'SDS / műszaki dokumentációt kérek'}
      </label>
      <p className="mt-5 text-xs leading-6 text-slate-500">
        {en
          ? 'Required fields are marked *. Delivery dates and specifications are requests, subject to confirmation.'
          : 'A * mezők kitöltése kötelező. A szállítási dátum és specifikáció visszaigazolást igényel.'}{' '}
        <LocaleLink className="underline" href={marketPath('/adatvedelem', market.id)}>
          {en ? 'Privacy information' : 'Adatkezelési információk'}
        </LocaleLink>
      </p>
      {!market.rfq.endpoint && (
        <p className="mt-3 text-xs text-slate-500">
          {en
            ? 'Online submission is not yet enabled. You can prepare and download your enquiry here.'
            : 'Az online küldés még nincs bekötve. Itt elkészítheti és letöltheti ajánlatkérését.'}
        </p>
      )}
      <button className="btn-primary mt-7" type="submit" disabled={busy}>
        {busy
          ? en
            ? 'Sending…'
            : 'Küldés…'
          : en
            ? 'REQUEST A QUOTE'
            : 'Ajánlatkérés elkészítése'}
      </button>
      {status && (
        <div
          role="status"
          className="mt-5 rounded-xl bg-blue-50 p-5 text-sm leading-6"
        >
          {status}
          {download && (
            <div className="mt-4 flex flex-wrap gap-5">
              <LocaleLink
                className="text-link"
                href={download}
                download={`EximpWorld-${market.id}-RFQ.txt`}
              >
                {en ? 'Download request' : 'Ajánlatkérés letöltése'}
              </LocaleLink>
              {mail && (
                <LocaleLink className="text-link" href={mail}>
                  {en ? 'Open email to send' : 'Megnyitás levelezőben'}
                </LocaleLink>
              )}
            </div>
          )}
        </div>
      )}
    </form>
  );
}
