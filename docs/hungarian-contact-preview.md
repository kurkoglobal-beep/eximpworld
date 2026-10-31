# Hungarian Contact preview

Redesign of `/kapcsolat` only, with a navy/gold industrial hero, four introductory icons, two-column quote/contact layout, clearly separated registered office, business office and depot, and direct email cards.

The existing RFQForm is reused without functional changes. Header, footer, English contact page, contact values and navigation are preserved.

## Validation

- Chrome desktop (1440px), tablet (768px), small mobile (320px), and iPhone 13 WebKit emulation passed.
- Hero image loads; no horizontal overflow; quote anchor works.
- All three email addresses, telephone link and three map links checked.
- Form fields, required flags, product options and text match production.
- Product preselection, required-field validation, downloadable request contents and sales mailto checked.
- English contact main content and both languages' header/footer text match production.
- Screenshots reviewed in `outputs/hu-contact/`.
- Production build and whitespace checks pass.

No physical iPhone Safari testing was performed. The existing form has no online sending endpoint: it prepares a downloadable request and opens the mail client. No test emails were sent.

Preview only; production deployment requires separate approval.
