import Image from 'next/image';
import { MessageCircle, FileText, Truck, Handshake, Mail, Users, MapPin, ExternalLink, Phone } from 'lucide-react';
import { Header, Footer } from './site-shell';
import { RFQForm } from './rfq-form';
import Link from './locale-link';
import styles from './english-contact.module.css';

const address = 'BM Centre, 11 St. Martins Close, Winchester, SO23 0HD, United Kingdom';
const mapQuery = encodeURIComponent('11 St Martins Close, Winchester SO23 0HD, United Kingdom');
export function EnglishContact() {
  return <><Header /><main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroImage} aria-hidden="true"><Image src="/about/chemical-sourcing.webp" alt="" fill priority sizes="(max-width: 767px) 100vw, 60vw" /></div>
      <div className={styles.inner}><div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Contact</p><h1>Get in Touch</h1>
        <p className={styles.subtitle}>Let's Build a Reliable Supply Relationship.</p>
        <p>Contact our team to discuss your product specifications, quantities, packaging requirements and delivery destination.</p>
      </div></div>
    </section>
    <section className={`${styles.inner} ${styles.trust}`} aria-label="Working with EximpWorld">
      {[{icon:MessageCircle,title:'Direct Communication'}, {icon:FileText,title:'Tailored Offers'}, {icon:Truck,title:'International Supply'}, {icon:Handshake,title:'Reliable Partnership'}].map(({icon:Icon,title})=><div key={title}><Icon size={30} strokeWidth={1.5} aria-hidden="true" /><span>{title}</span></div>)}
    </section>
    <div className={`${styles.inner} ${styles.content}`}>
      <section id="request-a-quote" className={styles.form} aria-label="Request a quote"><RFQForm /></section>
      <div className={styles.sidebar}>
        <div className={styles.companyGrid}>
          <section className={styles.company} aria-labelledby="company-heading">
            <p className={styles.eyebrow}>Company Information</p><h2 id="company-heading">EXIM WORLD LTD</h2>
            <p>Company No. 16526371<br />Registered in England and Wales</p>
            <h3>Registered Office</h3><address>{address}</address>
            <a href="https://find-and-update.company-information.service.gov.uk/company/16526371" target="_blank" rel="noopener noreferrer">Verify on Companies House <ExternalLink size={14} aria-hidden="true" /></a>
            <h3>Ernő Demus</h3><p>UK Business Manager</p>
            <a href="https://wa.me/447479946016" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            <a href="mailto:eximpworldltd@eximpworld.hu"><Mail size={16} aria-hidden="true" />eximpworldltd@eximpworld.hu</a>
            <a href="tel:+447479946016"><Phone size={16} aria-hidden="true" />07479 946016</a>
          </section>
          <figure className={styles.city}>
            <div className={styles.cityImage}><Image src="/about/winchester.webp" alt="Winchester Cathedral and surrounding city, England; city view, not company premises" fill sizes="(max-width: 767px) 100vw, 30vw" /><span><MapPin size={18} aria-hidden="true" />Winchester, England</span></div>
            <figcaption><a href="https://commons.wikimedia.org/wiki/File:Winchester_Cathedral_-_geograph.org.uk_-_5612872.jpg" target="_blank" rel="noopener noreferrer">M J Richardson</a> · <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0</a> · resized &amp; cropped</figcaption>
          </figure>
        </div>
        <section className={styles.location} aria-labelledby="location-heading"><div><h2 id="location-heading">Registered Office Location</h2><address>{address}</address><a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer">View on Google Maps <ExternalLink size={14} aria-hidden="true" /></a></div><iframe title="Map of the registered office at BM Centre, Winchester" src={`https://maps.google.com/maps?q=${mapQuery}&hl=en&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>
        <nav className={styles.cards} aria-label="Contact options">
          <a href="mailto:eximpworldltd@eximpworld.hu"><Mail aria-hidden="true" /><h3>General Inquiries</h3><p>eximpworldltd@eximpworld.hu</p></a>
          <a href="#request-a-quote"><FileText aria-hidden="true" /><h3>Request a Quote</h3><p>Tell us about your requirements.</p></a>
          <Link href="/rolunk#team"><Users aria-hidden="true" /><h3>Our Team</h3><p>Meet the people behind EximpWorld.</p></Link>
        </nav>
      </div>
    </div>
  </main><Footer /></>;
}
