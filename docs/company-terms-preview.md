# Company terms — Preview only

## Sources and limitation

User-supplied source Markdown is retained in data/legal/hu-terms.md and en-terms.md. The Hungarian source contains 16 chapters and a draft status note. The UK source ends mid-sentence in clause 11.2. After two follow-ups the user explicitly confirmed there is no further UK text. It is preserved exactly, with a clearly separate editorial note on the website and PDF cover identifying the incomplete final sentence. No legal wording was invented or completed.

Both source notices identify drafts for legal review; these notices remain. No effective date, version number, jurisdiction provision or company data was added. Implementation is not a legal compliance review; production publication remains subject to separate HU/UK legal checks and user authorization.

## Implementation

- Existing `/aszf` and `/en/terms-and-conditions` routes, same-page company switching, exact supplied headings.
- Navy/white/gold, responsive article layout with sticky desktop contents and mobile contents above text.
- Each chapter has an anchor. Source numbering and paragraphs unchanged.
- Separate company-identified downloadable PDFs (HU 5 pages, UK 4 pages), branded page headers/footers and linked contents. PDFs retain draft notices.
- Footer Legal / Jogi információk group, separate General Terms / ÁSZF link.
- Terms page titles updated; existing canonical/hreflang and noindex retained.
- Careers, catalogue, quote forms, email and DNS configurations untouched.

## Verification

- `scripts/build-company-terms.py` generates website JSON and PDFs from the preserved Markdown; source SHA-256 recorded in JSON.
- `scripts/verify-company-terms.py` confirms full normalized source wording equals rendered data, all clauses occur in PDF text, PDF bounds and contents links valid.
- All nine PDF pages rendered with Poppler and visually inspected for typography, wrapping and clipping.
- Desktop Chrome 1440px, tablet 768px, small mobile 320px, iPhone 13 WebKit emulation: routes 200, exact chapter/paragraph text, one correct title, contents navigation, company switch, no overflow, footer links, PDF download hashes and application/pdf all passed.
- Production build / TypeScript and whitespace checks passed.
- No physical iPhone Safari testing performed. Browser screenshots in outputs/terms; PDF page renders in tmp/pdfs/terms.

No production deployment authorized or performed.
