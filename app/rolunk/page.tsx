'use client';

import { AboutTeam } from '@/components/about-team';
import { useLocale } from '@/components/locale';
import { Footer, Header, PageIntro } from '@/components/site-shell';
import { ArrowRight, Handshake, ShieldCheck, Sparkles } from 'lucide-react';
import Link from '@/components/locale-link';

const values = {
  hu: [
    { icon: Handshake, title: 'Családi gyökerek és személyes figyelem', copy: 'Bár a cég mára nagyszabású nemzetközi platformon mozog, megőrizte közvetlen, partnereire odafigyelő jellegét.' },
    { icon: ShieldCheck, title: 'Professzionalizmus és megbízhatóság', copy: 'Az Egyesült Királyságban megszerzett magas sztenderdek szerinti működés minden európai folyamatunk alappillére.' },
    { icon: Sparkles, title: 'Jövőorientált megoldások', copy: 'Folyamatosan kutatjuk az új kereskedelmi utakat, hogy a legfrissebb piaci kihívásokra is hatékony és értéknövelő válaszokat adhassunk.' },
  ],
  en: [
    { icon: Handshake, title: 'Family roots and personal attention', copy: 'Although the company now operates on a large international platform, it has retained its direct, partner-focused character.' },
    { icon: ShieldCheck, title: 'Professionalism and reliability', copy: 'The high standards established in the United Kingdom are the foundation of every European process we operate.' },
    { icon: Sparkles, title: 'Future-focused solutions', copy: 'We continuously explore new commercial routes to provide effective, value-creating answers to the latest market challenges.' },
  ],
};

export default function About() {
  const { locale } = useLocale();
  const en = locale === 'en';

  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow={en ? 'About us' : 'Rólunk'}
          title={en ? 'Eximpworld Kft. – Tradition, innovation and international commitment' : 'Eximpworld Kft. – Hagyomány, innováció és nemzetközi elkötelezettség'}
          copy={en ? 'A family business that grew from Winchester into a reliable bridge between international markets and European partners.' : 'Egy családi vállalkozás, amely Winchesterből indulva vált a nemzetközi piacok és európai partnerei megbízható hídjává.'}
        />

        <section className="section">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
            <img src="/eximpworld-team.jpeg" alt={en ? 'The EximpWorld team in an industrial facility' : 'Az EximpWorld csapata egy ipari üzemben'} className="mx-auto mt-6 aspect-[16/9] w-[calc(100%-3rem)] max-w-5xl rounded-2xl object-cover shadow-md sm:mt-8 sm:w-[calc(100%-4rem)]" />
            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.75fr_1.25fr] lg:p-14">
              <p className="eyebrow">{en ? 'Our beginnings' : 'A kezdetek'}</p>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-.03em] text-[#1E293B] sm:text-4xl">{en ? 'From Winchester to the global market' : 'Winchesterből a globális piac felé'}</h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                  <p>{en ? 'The EximpWorld story began in the historic heart of the United Kingdom, in the picturesque city of Winchester, England. Its foundations were laid by a dedicated family enterprise guided from the outset by personal commitment, uncompromising quality and a people-centred business ethic.' : 'Az Eximpworld története az Egyesült Királyság történelmi szívében, a festői Winchester városában (England, United Kingdom) vette kezdetét. A vállalat alapjait egy elhivatott családi vállalkozás fektette le, amelynek működését a kezdetektől fogva a személyes odaadás, a minőség iránti kompromisszummentes elkötelezettség, valamint az emberközpontú üzleti etika határozta meg.'}</p>
                  <p>{en ? 'Through values passed down across generations and a dedication to professional excellence, the locally focused business steadily became a significant market presence and a trusted bridge between its partners and clients.' : 'A generációkon átívelő értékek és a szakmai igényesség révén a kezdetben helyi szinten építkező vállalkozás lépésről lépésre vált egyre meghatározóbbá, megbízható hidat képezve partnerei és ügyfelei között.'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="section grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">{en ? 'Reliability' : 'Megbízhatóság'}</p>
              <h2 className="section-title">{en ? 'A defining presence in the United Kingdom' : 'Meghatározó pozíció az Egyesült Királyságban'}</h2>
            </div>
            <div className="space-y-8 text-lg leading-9 text-slate-600">
              <p>{en ? 'Years of persistent work, strategic foresight and rapid market adaptation brought tangible results: EximpWorld grew into one of the stable, defining players in the United Kingdom market. The experience gained in Britain, precise logistics and commercial processes, and a strong partner network guarantee the highest standard of service.' : 'Az évek során a kitartó munka, a stratégiai előrelátás és a gyors piaci alkalmazkodás meghozta gyümölcsét: az Eximpworld az Egyesült Királyság piacának egyik meghatározó, stabil szereplőjévé nőtte ki magát. A brit piacon megszerzett tapasztalat, a precíz logisztikai és kereskedelmi folyamatok, valamint a stabil partneri hálózat garanciát jelentenek a legmagasabb szintű szolgáltatásra.'}</p>
              <div className="h-px bg-slate-200" />
              <div>
                <p className="eyebrow">{en ? 'Vision' : 'Inspiráció és jövőkép'}</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-.03em] text-[#1E293B] sm:text-4xl">{en ? 'Expansion in the heart of Europe' : 'Terjeszkedés Európa szívében'}</h2>
              </div>
              <p>{en ? 'True strength comes not only from success, but from the opportunities and challenges ahead. The cohesion rooted in our family foundations, responsible thinking and Europe’s dynamically evolving economy inspired the leadership to set new goals: to carry the values and expertise born in Winchester beyond the United Kingdom and across Europe.' : 'Az igazi erőt azonban nemcsak a sikerek, hanem az előttünk álló lehetőségek és kihívások adják. A családi gyökerekből fakadó összetartás, a felelősségteljes gondolkodásmód, valamint a dinamikusan formálódó európai gazdasági környezet új célok kitűzésére inspirálta a vezetést. A kontinens piacai által támasztott komplex elvárásokra válaszul megszületett a döntés: a Winchesterből indult értékrendet és szakértelmet az Egyesült Királyság határain túl, egész Európára kiterjesztve képviseljük.'}</p>
              <p>{en ? 'EximpWorld Ltd.’s European presence reflects a fusion of traditional business values and modern, innovative commercial solutions. Expansion means more than geographical growth: it is a commitment to direct, flexible and sustainable long-term cooperation with our European partners.' : 'Az Eximpworld Kft. európai szintű jelenléte a hagyományos üzleti értékek és a modern, innovatív kereskedelmi megoldások fúzióját tükrözi. A terjeszkedés nem csupán földrajzi növekedést jelent, hanem elköteleződést arra, hogy az európai partnerek számára is közvetlen, rugalmas és hosszú távon fenntartható együttműködést biztosítsunk.'}</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div><p className="eyebrow">{en ? 'What guides us' : 'Ami vezérel minket'}</p><h2>{en ? 'Our values and mission' : 'Értékeink és küldetésünk'}</h2></div>
            <p>{en ? 'International scale, family-minded attention and future-ready commercial thinking.' : 'Nemzetközi lépték, családias figyelem és jövőbe mutató kereskedelmi gondolkodás.'}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values[locale].map(({ icon: Icon, title, copy }) => <article className="usp-card" key={title}><span className="icon-box"><Icon size={22} /></span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        {en && <AboutTeam />}

        <section className="cta-band">
          <div>
            <p className="eyebrow text-blue-300">{en ? 'A reliable foundation' : 'Stabil támasz'}</p>
            <h2>{en ? 'Building the future on values that endure.' : 'A múlt értékeire építve formáljuk a jövőt.'}</h2>
            <p>{en ? 'EximpWorld Ltd. is more than a commercial partner: it is a stable foundation shaping the present and future of international business.' : 'Az Eximpworld Kft. nem csupán egy kereskedelmi partner, hanem egy olyan stabil támasz, amely a múlt értékeire építve formálja a nemzetközi üzleti világ jelenét és jövőjét.'}</p>
          </div>
          <Link href="/kapcsolat" className="btn-primary shrink-0">{en ? 'Contact us' : 'Lépjen kapcsolatba velünk'} <ArrowRight size={16} /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
