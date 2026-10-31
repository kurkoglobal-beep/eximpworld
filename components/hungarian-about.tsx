import Image from 'next/image';
import { ArrowRight, Globe2, FlaskConical, Truck, FileCheck2 } from 'lucide-react';
import { Header, Footer } from './site-shell';
import Link from './locale-link';
import styles from './hungarian-about.module.css';

const services = [
  { icon: Globe2, title: 'Nemzetközi alapanyag-beszerzés', copy: 'Nemzetközi beszállítói kapcsolatok és az egyedi beszerzési igények összehangolása.' },
  { icon: FlaskConical, title: 'Ipari oldószerek és vegyipari alapanyagok', copy: 'Alapanyag-kereskedelem a magyar ipari és gyártóvállalatok számára.' },
  { icon: Truck, title: 'Logisztikai koordináció', copy: 'A szállítási igények és a logisztikai partnerekkel történő egyeztetés összehangolása.' },
  { icon: FileCheck2, title: 'Termékdokumentáció', copy: 'Egyeztetés a beszállítói biztonsági adatlapokról, specifikációkról és tételhez kapcsolódó dokumentumokról.' },
];

export function HungarianAbout() {
  return <><Header /><main className={styles.page}>
    <section className={styles.hero}>
      <div className={`${styles.inner} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Rólunk</span>
          <h1>Rólunk – EximpWorld Kft.</h1>
          <p className={styles.subtitle}>Két ország. Közös üzleti szemlélet. Hosszú távú partnerkapcsolatok.</p>
          <p>Az EximpWorld Kft. egy nemzetközi üzleti kapcsolatrendszerrel rendelkező, magyarországi vegyipari alapanyag-kereskedelmi vállalkozás.</p>
        </div>
        <figure className={styles.heroVisual}>
          <Image src="/eximpworld-team.jpeg" alt="EximpWorld arculati kép ipari környezetben" width={2740} height={1536} priority sizes="(max-width: 767px) 100vw, 56vw" />
          <figcaption>Arculati illusztráció.</figcaption>
        </figure>
      </div>
    </section>
    <section className={styles.section}>
      <div className={`${styles.inner} ${styles.partnership}`}>
        <figure className={styles.city}>
          <Image src="/about/budapest.webp" alt="Budapesti városkép: az Országház és a Duna" width={1200} height={798} sizes="(max-width: 767px) 100vw, 42vw" />
          <figcaption>Budapest, Magyarország · Fotó: <a href="https://commons.wikimedia.org/wiki/File:Budapest_Parliament_Building_on_the_Danube.JPG" target="_blank" rel="noopener noreferrer">Styli Camateros</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · Webre átméretezve.</figcaption>
        </figure>
        <div>
          <h2>Nemzetközi háttér, magyarországi jelenlét</h2>
          <p>A brit EXIM WORLD LTD és a magyar EximpWorld Kft. szoros együttműködésben dolgozik a nemzetközi vegyipari alapanyag-beszerzés és kereskedelem területén.</p>
          <p>A két vállalat együttműködése lehetővé teszi, hogy a nemzetközi beszállítói kapcsolatokat a magyar ipari és gyártóvállalatok egyedi beszerzési igényeivel kapcsoljuk össze.</p>
        </div>
      </div>
    </section>
    <section className={`${styles.section} ${styles.history}`}>
      <div className={`${styles.inner} ${styles.historyGrid}`}>
        <div><span className={styles.eyebrow}>A kezdetek</span><h2>Winchesterből a globális piac felé</h2></div>
        <div>
          <p>Az Eximpworld története az Egyesült Királyság történelmi szívében, a festői Winchester városában (England, United Kingdom) vette kezdetét. A vállalat alapjait egy elhivatott családi vállalkozás fektette le, amelynek működését a kezdetektől fogva a személyes odaadás, a minőség iránti kompromisszummentes elkötelezettség, valamint az emberközpontú üzleti etika határozta meg.</p>
          <p>A generációkon átívelő értékek és a szakmai igényesség révén a kezdetben helyi szinten építkező vállalkozás lépésről lépésre vált egyre meghatározóbbá, megbízható hidat képezve partnerei és ügyfelei között.</p>
        </div>
      </div>
    </section>
    <section className={styles.section}><div className={styles.inner}>
      <h2>Szolgáltatásaink</h2>
      <div className={styles.cards}>{services.map(({icon: Icon, title, copy}) => <article className={styles.card} key={title}><Icon size={34} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <Link className={styles.textLink} href="/szolgaltatasok">Szolgáltatásaink részletesen <ArrowRight size={17} aria-hidden="true" /></Link>
    </div></section>
    <section className={`${styles.section} ${styles.approach}`}><div className={styles.inner}>
      <h2>Üzleti szemléletünk</h2>
      <p>Üzleti szemléletünk alapja az átláthatóság, a közvetlen kommunikáció, a személyes felelősségvállalás és a hosszú távú partnerkapcsolatok kialakítása.</p>
    </div></section>
    <section className={styles.section}><div className={styles.inner}>
      <h2>Vállalati információk</h2>
      <div className={styles.company}>
        <div><h3>EximpWorld Kft.</h3><dl><div><dt>Cégjegyzékszám</dt><dd>01-09-471262</dd></div><div><dt>Adószám</dt><dd>33142777-2-43</dd></div><div><dt>Ügyvezető</dt><dd>Pálóczi Bence</dd></div></dl></div>
        <div><h3>Bejegyzett székhely</h3><address>1183 Budapest, Szegfű utca 9.</address><h3 className={styles.contactHeading}>Kapcsolat</h3><a href="mailto:sales@eximpworld.hu">sales@eximpworld.hu</a><p><Link href="/kapcsolat">További elérhetőségek <ArrowRight size={15} aria-hidden="true" /></Link></p></div>
      </div>
    </div></section>
    <section className={styles.cta}><div className={`${styles.inner} ${styles.ctaGrid}`}>
      <div><h2>Kérjen egyedi ajánlatot</h2><p>Egyeztessünk a szükséges termékről, specifikációról, mennyiségről, csomagolásról és szállítási igényekről.</p></div>
      <Link href="/kapcsolat" className="btn-primary">Ajánlatkérés <ArrowRight size={17} aria-hidden="true" /></Link>
    </div></section>
  </main><Footer /></>;
}
