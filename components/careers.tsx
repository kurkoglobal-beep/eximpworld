'use client';
import Image from 'next/image';
import { ArrowUpRight, Globe2, Handshake, FlaskConical, Boxes, TrendingUp, Check, ArrowDown, LockKeyhole } from 'lucide-react';
import { useRef, useState } from 'react';
import { useLocale } from './locale';
import { Header, Footer } from './site-shell';
import Link from './locale-link';
import { companies } from '@/config/companies';
import { careerContent, interestAreas } from '@/config/careers';
import { checkCareerFile } from '@/lib/career-file';
import styles from './careers.module.css';

const icons = [TrendingUp, Boxes, FlaskConical, Handshake];
export function Careers() {
  const { locale } = useLocale();
  const en = locale === 'en';
  const content = careerContent[locale];
  const company = companies[locale];
  const [area, setArea] = useState('');
  return <><Header /><main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroImage} aria-hidden="true"><Image src="/about/chemical-sourcing.webp" alt="" fill preload sizes="(max-width: 767px) 100vw, 55vw" /></div>
      <div className={styles.inner}><div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{company.label} · {company.country}</p>
        <p className={styles.pageTitle}>{content.title}</p><h1>{content.heading}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
        <a className={styles.primary} href="#career-interest">{content.cta}<ArrowDown size={18} aria-hidden="true" /></a>
        <p className={styles.availability}>{en ? 'Online submissions are not yet open.' : 'Az online beküldés még nem érhető el.'}</p>
      </div></div>
    </section>
    <section className={`${styles.inner} ${styles.introduction}`} aria-label={en ? 'Introduction' : 'Bemutatkozás'}>
      <div className={styles.statement}><Globe2 size={36} strokeWidth={1.3} aria-hidden="true" /><p>{en ? 'Professional connections. International perspective.' : 'Szakmai kapcsolatok. Nemzetközi szemlélet.'}</p><span>{company.label}</span></div>
      <div>{content.intro.map(p => <p key={p}>{p}</p>)}</div>
    </section>
    <section className={`${styles.inner} ${styles.areas}`} aria-labelledby="professional-areas"><p className={styles.eyebrow}>{content.title}</p><h2 id="professional-areas">{content.areasTitle}</h2>
      <div className={styles.areaGrid}>{content.areas.map(([title, copy], i) => { const Icon = icons[i]; return <article key={title}>
        <Icon size={32} strokeWidth={1.4} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p>
        <a href="#career-interest" onClick={() => setArea(interestAreas[i].value)}>{en ? 'Express your interest' : 'Bemutatkozom'}<ArrowUpRight size={17} aria-hidden="true" /></a>
      </article>; })}</div>
    </section>
    {content.why.length > 0 && <section className={styles.why}><div className={styles.inner}><h2>{content.whyTitle}</h2><ul>{content.why.map(item => <li key={item}><Check size={19} aria-hidden="true" />{item}</li>)}</ul></div></section>}
    <section className={`${styles.inner} ${styles.application}`} id="career-interest">
      <div className={styles.closing}><p className={styles.eyebrow}>{company.label}</p><h2>{content.closing}</h2><p>{content.closingCopy}</p>
        <div className={styles.notice}><LockKeyhole size={23} aria-hidden="true" /><h3>{en ? 'Submissions are not yet open' : 'A beküldés még nem aktív'}</h3><p>{en ? 'This form is available for preview only. Your details and selected CV stay in your browser and are not submitted. Applications will open only after the secure submission service and the company’s applicant privacy notice have been approved.' : 'Ez az űrlap jelenleg csak előnézet. Az adatok és a kiválasztott önéletrajz a böngészőben maradnak, nem kerülnek beküldésre. A jelentkezés a biztonságos beküldési szolgáltatás és a vállalati jelentkezői adatkezelési tájékoztató jóváhagyása után indulhat el.'}</p></div>
      </div>
      <CareerForm key={locale} area={area} setArea={setArea} />
    </section>
  </main><Footer /></>;
}

function CareerForm({ area, setArea }: { area: string; setArea: (value: string) => void }) {
  const { locale } = useLocale();
  const en = locale === 'en';
  const company = companies[locale];
  const [resetVersion, setResetVersion] = useState(0);
  const [fileError, setFileError] = useState('');
  const [fileStatus, setFileStatus] = useState('');
  const fileCheckId = useRef(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const errorText = en ? 'Please complete this field with a valid value.' : 'Kérjük, adjon meg érvényes értéket ebben a mezőben.';
  const label = (hu: string, english: string) => en ? english : hu;
  return <form className={styles.form} action="/api/careers" method="post" encType="multipart/form-data" onSubmit={e => e.preventDefault()} autoComplete="off" aria-describedby="submission-status" onReset={() => { setResetVersion(v => v + 1); fileCheckId.current++; setFileError(''); setFileStatus(''); setArea(''); if (fileRef.current) fileRef.current.setCustomValidity(''); }}>
    <h2>{label('Szakmai bemutatkozás', 'Expression of Interest')}</h2><p className={styles.formLead}>{label('A *-gal jelölt mezők kötelezők. Előnézet: beküldés nem történik.', 'Fields marked * are required. Preview: no information is submitted.')}</p>
    <div className={styles.fields} key={resetVersion}>
      <label className={styles.full}><span>{label('Vállalat', 'Company')} *</span><input name="company" value={company.label} readOnly required /><small>{company.country} · {label('A fejléc vállalatválasztójával módosítható.', 'Change using the company selector in the header.')}</small></label>
      <Field name="fullName" label={label('Teljes név', 'Full Name')} required maxLength={120} errorText={errorText} />
      <Field name="email" label={label('E-mail-cím', 'Email Address')} type="email" required maxLength={254} errorText={errorText} />
      <Field name="country" label={label('Ország', 'Country')} required maxLength={100} errorText={errorText} />
      <Field name="phone" label={label('Telefonszám (opcionális)', 'Phone Number (optional)')} type="tel" maxLength={40} errorText={errorText} />
      <label className={styles.full}><span>{label('Érdeklődési terület', 'Area of Interest')} *</span><select name="area" value={area} onChange={e => setArea(e.target.value)} required><option value="">{label('Válasszon szakmai területet', 'Select a professional area')}</option>{interestAreas.map(item => <option key={item.value} value={item.value}>{item[locale]}</option>)}</select></label>
      <Field name="linkedin" label={label('LinkedIn-profil (opcionális)', 'LinkedIn Profile (optional)')} type="url" maxLength={300} errorText={errorText} full />
      <label className={styles.full}><span>{label('Rövid szakmai bemutatkozás', 'Short Introduction')} *</span><textarea name="introduction" rows={5} required maxLength={4000} /><small>{label('Legfeljebb 4000 karakter. Ne adjon meg különleges személyes adatokat.', 'Up to 4,000 characters. Please do not include sensitive personal information.')}</small></label>
      <label className={`${styles.full} ${styles.upload}`}><span>{label('Önéletrajz kiválasztása (opcionális)', 'Select CV (optional)')}</span><input ref={fileRef} type="file" name="cv" accept=".pdf,application/pdf" aria-invalid={!!fileError} aria-describedby="cv-help cv-feedback" onChange={async e => {
        const input = e.currentTarget; const file = input.files?.[0]; const id = ++fileCheckId.current;
        input.setCustomValidity(''); setFileError(''); setFileStatus(''); if (!file) return;
        const result = await checkCareerFile(file); if (id !== fileCheckId.current) return;
        const message = result === 'size' ? label('A PDF nem lehet üres, és legfeljebb 5 MB lehet.', 'The PDF must not be empty and must be no larger than 5 MB.') : result ? label('Kérjük, válasszon olvasható PDF-fájlt.', 'Please select a readable PDF file.') : '';
        input.setCustomValidity(message); setFileError(message); setFileStatus(message ? '' : label('Helyi formátum- és méretellenőrzés sikeres. Feltöltés és vírusellenőrzés nem történt.', 'Local format and size checks passed. No upload or malware scan has taken place.'));
      }} /><small id="cv-help">{label('PDF · maximum 5 MB. Csak helyi ellenőrzés, a fájlt nem töltjük fel.', 'PDF · maximum 5 MB. Local checks only; the file is not uploaded.')}</small><small id="cv-feedback" role="status" className={fileError ? styles.error : ''}>{fileError || fileStatus}</small></label>
    </div>
    <div className={styles.privacy} id="applicant-privacy"><strong>{label('Jelentkezői adatkezelési tájékoztató', 'Applicant privacy notice')} — {company.label}</strong><p>{label('A jelentkezők adatainak kezelésére vonatkozó végleges tájékoztató még jóváhagyásra vár. Ezért a visszaigazolás és a beküldés nem aktív.', 'The final notice covering applicant data is awaiting approval. Acknowledgement and submission are therefore disabled.')}</p><Link href="/adatvedelem">{label('A vállalat jelenlegi weboldali adatkezelési információi', 'Current company website privacy information')} <ArrowUpRight size={14} aria-hidden="true" /></Link><label className={styles.check}><input name="privacyAcknowledged" type="checkbox" required disabled /><span>{label('Megismertem a kiválasztott vállalat jelentkezői adatkezelési tájékoztatóját.', 'I acknowledge the selected company’s applicant privacy notice.')} *</span></label></div>
    <p id="submission-status" className={styles.submissionStatus}>{label('A beküldés jóváhagyásig zárolva van. A megadott adatokat nem küldjük el és nem mentjük.', 'Submission is locked pending approval. Your entries are not sent or saved.')}</p>
    <div className={styles.actions}><button type="submit" disabled>{careerContent[locale].cta}<LockKeyhole size={16} aria-hidden="true" /></button><button type="reset">{label('Mezők törlése', 'Clear form')}</button></div>
  </form>;
}

function Field({ name, label, errorText, full, ...props }: { name: string; label: string; errorText: string; full?: boolean; required?: boolean; type?: string; maxLength?: number }) {
  const [invalid, setInvalid] = useState(false);
  return <label className={full ? styles.full : undefined}><span>{label}{props.required ? ' *' : ''}</span><input name={name} {...props} aria-invalid={invalid} aria-describedby={invalid ? `${name}-error` : undefined} onBlur={e => setInvalid(!e.currentTarget.validity.valid)} onChange={() => setInvalid(false)} />{invalid && <small id={`${name}-error`} className={styles.error}>{errorText}</small>}</label>;
}
