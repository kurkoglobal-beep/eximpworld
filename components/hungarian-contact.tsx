import Image from 'next/image';
import { MessageCircle, FileText, Truck, Handshake, Mail, Building2, MapPin, ArrowUpRight, Phone, Warehouse } from 'lucide-react';
import { Header, Footer } from './site-shell';
import { RFQForm } from './rfq-form';
import Link from './locale-link';
import { hu } from '@/config/markets/hu';
import styles from './hungarian-contact.module.css';

const maps = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const locations = [
  { icon: Building2, title: 'Üzleti iroda', address: 'Andrássy Palace, 1061 Budapest, Andrássy út 9.' },
  { icon: Warehouse, title: 'Depo / raktári kapcsolattartás', address: '1097 Budapest, Kén utca 8.' },
];

export function HungarianContact() {
  return <><Header /><main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroImage} aria-hidden="true"><Image src="/about/chemical-sourcing.webp" alt="" fill priority sizes="(max-width: 767px) 100vw, 60vw" /></div>
      <div className={styles.inner}><div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Kapcsolat / Ajánlatkérés</p>
        <h1>Beszéljünk az Ön beszerzési igényeiről.</h1>
        <p className={styles.subtitle}>Közvetlen kapcsolat. Személyre szabott ajánlat.</p>
        <p>Írja meg a keresett terméket, a szükséges specifikációt, mennyiséget, kiszerelést és szállítási helyszínt. Segítünk összeállítani az egyedi alapanyag-beszerzési ajánlatkérését.</p>
        <a href="#ajanlatkeres" className={styles.heroLink}>Ajánlatkérés összeállítása <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div></div>
    </section>
    <section className={`${styles.inner} ${styles.trust}`} aria-label="Együttműködés az EximpWorlddel">
      {[{icon: MessageCircle,title:'Közvetlen kommunikáció'}, {icon:FileText,title:'Egyedi ajánlatok'}, {icon:Truck,title:'Nemzetközi beszerzés'}, {icon:Handshake,title:'Hosszú távú partnerség'}].map(({icon:Icon,title})=><div key={title}><Icon size={30} strokeWidth={1.5} aria-hidden="true" /><span>{title}</span></div>)}
    </section>
    <div className={`${styles.inner} ${styles.content}`}>
      <section id="ajanlatkeres" className={styles.form} aria-label="Ajánlatkérő űrlap"><RFQForm /></section>
      <aside className={styles.sidebar} aria-label="Cégadatok és elérhetőségek">
        <section className={styles.company} aria-labelledby="hu-company-heading">
          <p className={styles.eyebrow}>Vállalati információk</p><h2 id="hu-company-heading">EximpWorld Kft.</h2>
          <dl><div><dt>Cégjegyzékszám</dt><dd>01-09-471262</dd></div><div><dt>Adószám</dt><dd>33142777-2-43</dd></div><div><dt>Ügyvezető</dt><dd>Pálóczi Bence</dd></div></dl>
          <div className={styles.registered}><h3><MapPin size={18} aria-hidden="true" />Bejegyzett székhely</h3><address>1183 Budapest, Szegfű utca 9.</address><a href={maps('1183 Budapest, Szegfű utca 9.')} target="_blank" rel="noopener noreferrer">Megnyitás térképen <ArrowUpRight size={15} aria-hidden="true" /></a></div>
          <div className={styles.direct}><a href={`mailto:${hu.company.email}`}><Mail size={18} aria-hidden="true" />{hu.company.email}</a><a href={`tel:${hu.company.phone!.replace(/\s/g,'')}`}><Phone size={18} aria-hidden="true" />{hu.company.phone}</a></div>
        </section>
        <div className={styles.locations}>{locations.map(({icon:Icon,title,address})=><section key={title}><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><address>{address}</address><a href={maps(address)} target="_blank" rel="noopener noreferrer">Útvonaltervezés <ArrowUpRight size={15} aria-hidden="true" /></a></section>)}</div>
        <section className={styles.help}><p className={styles.eyebrow}>Miben segíthetünk?</p><h2>A pontos igény az első lépés.</h2><p>A termék neve mellett a mennyiség, a kívánt minőség és a szállítási helyszín megadásával segítheti az egyeztetést. Ha valamelyik adat még nem ismert, jelezze a megjegyzésben.</p><Link href="/termekek">Termékkatalógus és adatlapok <ArrowUpRight size={16} aria-hidden="true" /></Link></section>
      </aside>
    </div>
    <nav className={`${styles.inner} ${styles.contacts}`} aria-label="Közvetlen kapcsolattartás">
      <a href={`mailto:${hu.company.centralEmail}`}><MessageCircle size={28} strokeWidth={1.5} aria-hidden="true" /><div><h2>Általános megkeresések</h2><p>{hu.company.centralEmail}</p></div><ArrowUpRight size={18} aria-hidden="true" /></a>
      <a href={`mailto:${hu.company.email}`}><Mail size={28} strokeWidth={1.5} aria-hidden="true" /><div><h2>Értékesítés és ajánlatkérés</h2><p>{hu.company.email}</p></div><ArrowUpRight size={18} aria-hidden="true" /></a>
      <a href={`mailto:${hu.company.depotEmail}`}><Warehouse size={28} strokeWidth={1.5} aria-hidden="true" /><div><h2>Depo / raktári kapcsolattartás</h2><p>{hu.company.depotEmail}</p></div><ArrowUpRight size={18} aria-hidden="true" /></a>
    </nav>
  </main><Footer /></>;
}
