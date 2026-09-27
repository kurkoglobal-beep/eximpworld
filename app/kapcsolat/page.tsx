'use client';
import { Footer, Header, PageIntro } from '@/components/site-shell';
import { useLocale } from '@/components/locale';
import { RFQForm } from '@/components/rfq-form';
import { CompanyPanel } from '@/components/uk-site';
export default function Contact() {
  const { locale } = useLocale();
  const en = locale === 'en';
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow={en ? 'Contact / RFQ' : 'Kapcsolat / RFQ'}
          title={
            en
              ? 'Tell us what production needs.'
              : 'Mondja el, mire van szüksége a gyártásnak.'
          }
          copy={
            en
              ? 'Prepare your B2B chemical sourcing enquiry.'
              : 'Állítsa össze egyedi B2B alapanyag-beszerzési ajánlatkérését.'
          }
        />
        <section className="section">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
            <RFQForm />
            <div>
              <CompanyPanel />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
