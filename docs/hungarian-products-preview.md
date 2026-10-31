# Hungarian Products Preview

2026-10-31. Preview only; separate approval required for production.

- Existing English promotional video reused on `/termekek`: same optimized MP4 and poster, muted autoplay, loop, playsInline, offscreen pause and reduced-motion static fallback. Hungarian alternative text provided through an optional prop; English default unchanged.
- Six Hungarian-only full product cards added after explicit user confirmation, matching the English additions. Shared `lib/products.ts` and routing unchanged. All 33 products searchable; eight reviewed products have PDF downloads and RFQ links. Other cards retain their original profile links.
- Eight Hungarian PIS PDFs issued by EximpWorld Kft., contact sales@eximpworld.hu. Same verified CAS/EC and reference properties as English evidence manifest, translated scope disclaimer and supplier-confirmation language. No SDS/CoA substitution or unverified grade/packaging claims.
- Manifest: `data/product-information-hu.json`; generator: `scripts/generate-product-information-hu.py` (ReportLab and macOS Arial fonts, embedded subsets including Hungarian ő/ű). Outputs in `output/pdf/hu/`, deployable copies in `public/downloads/product-information/hu/`.
- Existing English source manifest and PDFs unchanged. New RFQ choices are localized and preserve submission flow. Current RFQ still prepares a downloadable request/mailto; no email was sent during testing.
- Build/typecheck pass. All eight PDFs rendered, visually inspected, accents and one-page text extraction validated.
- Chrome desktop, iPhone 13 WebKit and 320px mobile: eight successful PDF downloads, new RFQ preselection, video flags/play/pause/fallback, no overflow or JS errors; English main/header/footer content unchanged. HU header/footer unchanged.
- RFQ required validation, downloaded request product name and Hungarian mailto recipient tested. Hungarian desktop search layout repaired and category/search filtering checked.
- Physical iPhone Safari was not available; tests use WebKit emulation.
