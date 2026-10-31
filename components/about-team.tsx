import Image from 'next/image';
import styles from './about-team.module.css';

const team = [
  { name: 'Ernő Demus', role: 'UK Business Manager', email: 'eximpworldltd@eximpworld.hu', image: 'erno-demus' },
  { name: 'Harper Wilson', role: 'Customer Service Representative', email: 'harper.uk@eximpworld.hu', image: 'harper-wilson' },
  { name: 'Oliver Patel', role: 'Customs & Compliance Administrator', email: 'oliver.uk@eximpworld.hu', image: 'oliver-patel' },
  { name: 'Thomas Taylor', role: 'Logistics & Supply Chain Specialist', email: 'thomas.uk@eximpworld.hu', image: 'thomas-taylor' },
];

export function AboutTeam() {
  return (
    <section className={styles.section} aria-labelledby="team-heading" id="team">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id="team-heading">Meet Our Team</h2>
          <p className={styles.subtitle}>The People Behind EximpWorld</p>
          <p className={styles.intro}>Our team combines commercial leadership, customer service, customs administration and logistics coordination to support our customers and business partners.</p>
        </div>
        <div className={styles.grid}>
          {team.map(member => (
            <article className={styles.card} key={member.email}>
              <div className={styles.portrait}>
                <Image src={`/team/${member.image}.png`} alt={member.name} fill sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 46vw" className={`${styles.image} ${member.image === 'erno-demus' ? styles.executive : ''}`} />
              </div>
              <div className={styles.details}>
                <h3>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <a className={styles.email} href={`mailto:${member.email}`}>{member.email}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
