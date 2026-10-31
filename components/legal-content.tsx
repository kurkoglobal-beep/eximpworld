'use client';
import { companies } from '@/config/companies';
import { markets } from '@/config/markets';
import { usePathname } from 'next/navigation';
import { useLocale } from './locale';
import { PageIntro } from './site-shell';
export function LegalPageContent() {
  const { market, locale } = useLocale();
  const en = locale === 'en';
  const company = companies[locale];
  const path = usePathname();
  const kind =
    path.includes('cookie') || path.includes('sutik')
      ? 'cookies'
      : path.includes('terms') || path.includes('aszf')
        ? 'terms'
        : 'privacy';
  const title = en
    ? {
        cookies: 'Cookie Policy',
        terms: 'General Terms & Conditions',
        privacy: 'Privacy Policy',
      }[kind]
    : {
        cookies: 'Sütitájékoztató',
        terms: 'Általános szerződési feltételek',
        privacy: 'Adatkezelési tájékoztató',
      }[kind];
  const approved = (en ? markets.uk : market).legal[kind];
  return (
    <>
      <PageIntro
        eyebrow={company.name}
        title={title}
        copy={
          en
            ? 'Company information for EXIM WORLD LTD.'
            : 'Tájékoztatás a magyar weboldal látogatóinak.'
        }
      />
      <section className="section">
        <article className="uk-card max-w-4xl mx-auto">
          <h2>{company.name}</h2>
          <p>{company.address}</p>
          {approved ? (
            approved.map((paragraph, i) => <p key={i}>{paragraph}</p>)
          ) : (
            <>
              {kind === 'cookies' ? (
                <>
                  <h3>{en ? 'Website storage' : 'A weboldal adattárolása'}</h3>
                  <p>
                    {en
                      ? 'This application stores your essential-only cookie preference in local storage under a market-specific key. This preference stays in your browser until you clear website data. The application does not enable optional advertising or analytics.'
                      : 'Az alkalmazás a kizárólag szükséges funkciókat engedélyező beállítást piaconként elkülönített kulccsal, a böngésző helyi tárhelyében tárolja. Ez a webhelyadatok törléséig megmarad. Az alkalmazás nem kapcsol be opcionális hirdetési vagy analitikai funkciókat.'}
                  </p>
                  <p>
                    {en
                      ? 'On the preview website only, an essential session cookie remembers the market being previewed. The hosting provider may also use cookies required to operate its service.'
                      : 'Kizárólag az előnézeti oldalon egy munkamenetsüti megjegyzi a kiválasztott piacot. A tárhelyszolgáltató a működéséhez szükséges saját sütiket is használhat.'}
                  </p>
                  <button
                    className="text-link mt-6"
                    onClick={() =>
                      window.dispatchEvent(new Event('eximp-cookie-settings'))
                    }
                  >
                    {en ? 'OPEN COOKIE SETTINGS' : 'SÜTIBEÁLLÍTÁSOK'}
                  </button>
                </>
              ) : kind === 'privacy' ? (
                <>
                  <h3>
                    {en
                      ? 'Quotation enquiry information'
                      : 'Ajánlatkérési információk'}
                  </h3>
                  <p>
                    {en
                      ? 'Until online submission is enabled, the RFQ form prepares a request in your browser. Preparing or downloading it does not send it to EximpWorld. If an email option is available, your email application sends the request only when you send that email.'
                      : 'Az online küldés bekötéséig az ajánlatkérő a böngészőjében állítja össze az adatokat. Az összeállítás vagy letöltés nem küldi el azokat az EximpWorld részére. A levelezős lehetőség használatakor az adatokat a saját levelezőalkalmazásából tudja elküldeni.'}
                  </p>
                  <p>
                    {en
                      ? 'The form asks for business and contact details, product requirements and delivery information. Do not include sensitive personal information in your enquiry.'
                      : 'Az űrlap üzleti és kapcsolattartási adatokat, termékigényeket és szállítási információkat kér. Kérjük, ne adjon meg különleges személyes adatokat.'}
                  </p>
                </>
              ) : (
                <>
                  <h3>{en ? 'Document awaiting approval' : 'Jóváhagyásra váró dokumentum'}</h3>
                  <p>{en ? 'The General Terms & Conditions of EXIM WORLD LTD are being prepared and require separate approval. No contractual terms are published on this page.' : 'Az EximpWorld Kft. Általános szerződési feltételei előkészítés alatt állnak, és külön jóváhagyást igényelnek. Ezen az oldalon nem teszünk közzé szerződéses feltételeket.'}</p>
                </>
              )}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <strong>
                  {en ? 'Publication status' : 'Közzétételi státusz'}
                </strong>
                <p>
                  {en
                    ? 'The company’s approved ' +
                      title.toLowerCase() +
                      ' has not yet been supplied. The information above describes the current website functionality and is not a complete legal document.'
                    : 'A cég jóváhagyott dokumentuma még nincs megadva. A fenti információk a weboldal jelenlegi működését írják le, és nem alkotnak teljes jogi dokumentumot.'}
                </p>
              </div>
            </>
          )}
        </article>
      </section>
    </>
  );
}
