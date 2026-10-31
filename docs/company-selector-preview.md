# Company selector — Preview only

## Scope

- Replaces both HU/EN header controls with one visible company selector, including flags, selected company, keyboard Escape handling and outside-click dismissal.
- Hungarian company keeps existing Hungarian routes; EXIM WORLD LTD uses existing `/en/...` routes on the same domain. Switching preserves the equivalent page, query and hash.
- Route-based company identity is separate from the existing catalogue market configuration, so the catalogue and navigation are preserved.
- UK contact page, footer, Ernő's team card and RFQ recipient use the supplied UK contact details: Ernő Demus, UK Business Manager, eximpworldltd@eximpworld.hu, 07479 946016, WhatsApp +447479946016.
- Existing approved registered company data is retained; no additional registration, tax, certification or commercial claims were introduced.
- Legal pages identify the correct company and registered address. Unapproved terms are explicitly unavailable, not invented.
- Careers scaffolding: `/karrier`, `/en/careers`. Terms scaffolding: `/aszf`, `/en/terms-and-conditions`. Footer links are company-specific. Placeholder pages are noindex.

## Approval boundary

User explicitly requested all work in Preview. Careers and General Terms content must not be published to production until separately approved. No production deployment performed. Approved final HU/UK terms and any actual job advertisements remain outstanding.

## Validation

- Production build / TypeScript and git diff whitespace checks pass.
- Chrome: 1440px desktop, 1024px tablet, 320px small mobile; iPhone 13 WebKit emulation passed. No physical iPhone test.
- Dropdown fits viewport; no horizontal overflow. Company labels, two same-domain destinations, Escape dismissal tested.
- Contact switch retains product query; product detail switches to matching Hungarian route.
- Four Careers/Terms URLs return 200 and display the correct company. Footer links remain company-specific.
- UK request preparation uses UK recipient and market; HU request retains sales@eximpworld.hu. No email sent.
- Main content of both product catalogues and HU Contact compared with production: unchanged.
- Existing quote fields, validation, downloads, PDFs, product data and site navigation preserved. Existing form still prepares downloads/mailto; no new submission backend.
- Screenshots saved locally in outputs/companies.
