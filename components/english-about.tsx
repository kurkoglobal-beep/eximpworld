import { Header, Footer } from './site-shell';
import { AboutTeam } from './about-team';
import Link from './locale-link';
import Image from 'next/image';
import { ArrowRight, Globe2, FlaskConical, Truck, FileCheck2 } from 'lucide-react';
import styles from './english-about.module.css';

export function EnglishAbout() {
  return <><Header /><main className={styles.page}>
<section className={styles.hero}>
  <div className={styles.heroImage} aria-hidden="true"><Image src="/about/chemical-sourcing.webp" alt="" fill priority sizes="(max-width: 767px) 100vw, 60vw" /></div>
  <div className={styles.inner}><div className={styles.heroCopy}><h1>About EXIM WORLD LTD</h1><p>International Chemical Sourcing. Personal Commitment.</p>
<p>EXIM WORLD LTD is a privately owned, UK-registered trading company specialising in the international sourcing and supply of chemical raw materials for industrial and manufacturing businesses.</p>
<p>Established in Winchester, England, in June 2025, the company operates through a business partnership between Ernő Demus and Tivadar Pálóczi.</p>
<p>Together with our Hungarian affiliate, EximpWorld Kft., we bring together UK and Central European market connections to support international procurement and industrial supply.</p>
<p>Our business philosophy is built on transparency, direct communication and personal accountability.</p></div></div></section>
<section className={`${styles.section} ${styles.partnership}`}><div className={`${styles.inner} ${styles.partnershipGrid}`}>
  <figure className={styles.city}>
    <div className={styles.cityImage}><Image src="/about/winchester.webp" alt="Winchester Cathedral and the surrounding city in England" fill sizes="(max-width: 767px) 100vw, 40vw" /></div>
    <figcaption><a href="https://commons.wikimedia.org/wiki/File:Winchester_Cathedral_-_geograph.org.uk_-_5612872.jpg" target="_blank" rel="noopener noreferrer">Winchester Cathedral — M J Richardson</a> · <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0</a> · resized &amp; cropped</figcaption>
  </figure>
  <div className={styles.partnershipCopy}><h2>A Partnership Built on Trust</h2><p>Two business families. Two markets. One shared commitment.</p>
<p>EXIM WORLD LTD was established through the business partnership of Ernő Demus and Tivadar Pálóczi, bringing together a shared vision for international trade and long-term business relationships.</p>
<p>Together with its Hungarian affiliate, EximpWorld Kft., the company forms part of a closely connected UK–Hungarian business structure focused on international chemical raw material sourcing and supply.</p>
<p>The UK company is led by Director Ernő Demus, while the Hungarian company is managed by Bence Pálóczi.</p>
<p>Our approach is built on personal accountability, transparent commercial practices and lasting partnerships with customers and suppliers.</p></div></div></section>
<section className={styles.section}><div className={styles.inner}><h2>What We Do</h2><div className={styles.cards}><article className={styles.card}><Globe2 className={styles.serviceIcon} size={34} strokeWidth={1.5} aria-hidden="true" /><h3>International Chemical Sourcing</h3><p>We identify and evaluate international supply opportunities for chemical raw materials, focusing on suitable specifications, competitive commercial terms and dependable supplier relationships.</p></article>
<article className={styles.card}><FlaskConical className={styles.serviceIcon} size={34} strokeWidth={1.5} aria-hidden="true" /><h3>Industrial Raw Material Supply</h3><p>Our commercial activities focus on solvents and other chemical raw materials used in coatings, cleaning products, manufacturing and industrial applications.</p></article>
<article className={styles.card}><Truck className={styles.serviceIcon} size={34} strokeWidth={1.5} aria-hidden="true" /><h3>Logistics & Delivery Coordination</h3><p>We coordinate transport arrangements with logistics partners, including ADR-compliant transportation where required and available.</p></article>
<article className={styles.card}><FileCheck2 className={styles.serviceIcon} size={34} strokeWidth={1.5} aria-hidden="true" /><h3>Product Documentation</h3><p>We support customers in obtaining relevant product documentation, including Safety Data Sheets (SDS), Certificates of Analysis (CoA) and applicable regulatory information.</p></article></div></div></section>
<section className={styles.section}><div className={styles.inner}><h2>Our Business Approach</h2><p>Understanding your requirements comes first.</p>
<p>Every industrial customer has different procurement needs.</p>
<p>We focus on understanding the required product, grade, quantity, packaging, delivery destination and commercial expectations before identifying suitable supply options.</p>
<p>Our objective is to establish clear, commercially sustainable relationships supported by responsive communication and practical solutions.</p></div></section>
<AboutTeam />
<section className={styles.section}><div className={styles.inner}><h2>Company Information</h2><div className={styles.company}><div><h3>EXIM WORLD LTD</h3><p>Company Registration Number: 16526371</p><p>Incorporated: 18 June 2025</p><p>Registered in England and Wales</p></div><div><h3>Registered Office:</h3><address>BM Centre, 11 St. Martins Close<br />Winchester, England<br />SO23 0HD<br />United Kingdom</address><p>Official registration:<br /><a href="https://find-and-update.company-information.service.gov.uk/company/16526371" target="_blank" rel="noopener noreferrer">https://find-and-update.company-information.service.gov.uk/company/16526371</a></p></div></div></div></section>
<section className={styles.section}><div className={styles.inner}><h2>Let's Build a Reliable Supply Relationship</h2><p>Looking for a chemical raw material supplier or an international sourcing partner?</p>
<p>Contact our team to discuss your product specifications, quantities, packaging requirements and delivery destination.</p><Link href="/kapcsolat" className="btn-primary">Request a Quote <ArrowRight size={16} /></Link></div></section></main><Footer hidePhone /></>;
}
