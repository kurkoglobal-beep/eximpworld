'use client';
import { Download, ArrowUp } from 'lucide-react';
import { useLocale } from './locale';
import { Header, Footer } from './site-shell';
import documents from '@/data/legal/terms.json';
import styles from './company-terms.module.css';
type Terms = {company:string;title:string;tagline:string;notice:string;status?:string;editorialNote?:string;pdf:string;sections:{id:string;heading:string;paragraphs:string[]}[]};
export function CompanyTerms() {
  const {locale} = useLocale(); const en=locale==='en';
  const doc=(documents as Partial<Record<'hu'|'en',Terms>>)[locale];
  return <><Header/><main className={styles.page} id="terms-top">
    <section className={styles.hero}><div className={styles.inner}><p className={styles.company}>{doc?.company || 'EXIMPWORLD LTD'}</p><h1>{doc?.title || 'General Terms & Conditions of Sale and Delivery'}</h1>{doc && <><p className={styles.tagline}>{doc.tagline}</p><p className={styles.notice}>{doc.notice}</p>{doc.editorialNote && <p className={styles.editorial}>{doc.editorialNote}</p>}<a className={styles.download} href={doc.pdf} download><Download size={18} aria-hidden="true"/>{en?'Download PDF draft':'Tervezet letöltése PDF-ben'}</a></>}</div></section>
    {doc ? <div className={`${styles.inner} ${styles.layout}`}><aside><nav className={styles.contents} aria-label={en?'Contents':'Tartalomjegyzék'}><h2>{en?'Contents':'Tartalomjegyzék'}</h2><ol>{doc.sections.map(section=><li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol></nav></aside><article className={styles.document} aria-label={doc.title}>{doc.sections.map(section=><section id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</section>)}{doc.status && <p className={styles.status}>{doc.status}</p>}<a href="#terms-top" className={styles.top}><ArrowUp size={16} aria-hidden="true"/>{en?'Back to top':'Vissza az oldal tetejére'}</a></article></div> : <div className={`${styles.inner} ${styles.pending}`}><h2>Complete source text required</h2><p>The supplied draft ends mid-sentence in clause 11.2. The complete document and its PDF will be available here after the remaining approved text has been provided. No incomplete terms are published on this page.</p></div>}
  </main><Footer/></>;
}
