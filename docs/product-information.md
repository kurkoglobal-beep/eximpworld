# English Product Information Sheets

Version 1.0, issued 2026-10-31. Preview only; production requires approval.

## Scope

Eight PIS documents in `public/downloads/product-information/`, linked only from English catalogue cards. Six English-only full catalogue cards were added following user clarification: Ethyl Acetate, Acetone, n-Propanol, Xylene (Mixed Isomers), Monoethanolamine and Phosphoric Acid 75%. New cards include expandable general profiles, PDF download and preselected RFQ links. IPA and MPG retain existing profile links. English catalogue: 33 products; Hungarian: unchanged 27 products.

The six RFQ options are English-only. Submission, validation, recipient configuration and request generation remain unchanged. Current configuration has no online submission endpoint; the existing workflow prepares a downloadable request and a mailto draft. Tests do not send messages.

## Evidence and maintenance

`data/product-information.json` is the shared reviewed manifest, including source URLs, version and issue date. Identity and general physical data use ILO/WHO ICSC cards; industrial applications use original manufacturer literature. Xylene uses ITW Reagents identity and WHO IPCS EHC 190 mixture information; no single-isomer boiling point is assigned to the mixture. Phosphoric acid uses Innophos 75%-solution reference data and ICSC acid formula. Manufacturer references do not identify an EximpWorld supplier or transfer their grade/certification claims.

No supplier purity, impurity, packaging, origin, REACH registration or certification is inferred. Packaging requires quotation-stage confirmation. All PDFs carry the required disclaimer distinguishing them from SDS, supplier specifications and batch CoAs.

Regenerate with Python + ReportLab: `python3 scripts/generate-product-information.py`. This writes local review copies into `output/pdf/` and matching deployable files into `public/downloads/product-information/`. Fonts are embedded from ReportLab's bundled Vera family. Recheck source facts and update version/date before any substantive document revision. Render and inspect all eight final PDFs before release.

## Verification, 2026-10-31

- TypeScript and production build pass.
- All eight PDFs rendered and visually reviewed: one page, no clipping; embedded fonts, brand logo, source hyperlinks, email, version and disclaimer.
- Chrome desktop 1440px, tablet 768px, mobile 320px, WebKit iPhone 13 emulation: eight working downloads, 33 cards, search/CAS/category filters, expandable profiles, no horizontal overflow or nested anchors, no client errors.
- All six new product links preselect the correct RFQ option. Required field validation, downloadable RFQ contents and mailto product/recipient verified without sending.
- Hungarian catalogue main content and English header/footer match production text; Hungarian RFQ retains its original 27 product options.
- Physical iPhone Safari was not available; iPhone testing used Playwright WebKit emulation.
