'use client';
import { Header, Footer, PageIntro } from '@/components/site-shell';
import { useLocale } from '@/components/locale';
import { companies } from '@/config/companies';
export default function Careers() {
  const { locale } = useLocale();
  const company = companies[locale];
  const en = locale === 'en';
  return <><Header /><main><PageIntro eyebrow={company.name} title={en ? 'Career Opportunities' : 'Karrierlehetőségek'} copy={en ? 'International trade. Personal commitment. Professional connections.' : 'Nemzetközi kereskedelem. Személyes elkötelezettség. Szakmai kapcsolatok.'} />
    <section className="section"><article className="uk-card max-w-4xl mx-auto">
      <h2>{company.name}</h2>
      <p>{en ? 'Explore the people and business behind EXIM WORLD LTD: international chemical sourcing, customer relationships and logistics coordination.' : 'Ismerje meg az EximpWorld Kft. világát: nemzetközi vegyipari alapanyag-beszerzés, ügyfélkapcsolatok és logisztikai koordináció.'}</p>
      <h3>{en ? 'Vacancy information' : 'Álláslehetőségekkel kapcsolatos információk'}</h3>
      <p>{en ? 'Approved vacancy information has not yet been provided for EXIM WORLD LTD. No vacancies or recruitment terms are published on this page.' : 'Az EximpWorld Kft. jóváhagyott álláshirdetései még nem állnak rendelkezésre. Ezen az oldalon nem teszünk közzé állásajánlatot vagy felvételi feltételeket.'}</p>
      <p>{en ? 'For general enquiries, contact' : 'Általános érdeklődéshez keresse vállalatunkat:'} <a className="underline break-words" href={`mailto:${company.email}`}>{company.email}</a></p>
    </article></section></main><Footer /></>;
}
