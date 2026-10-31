# Hungarian About redesign - Preview

2026-10-31. Production deployment requires separate approval.

- Only the Hungarian `/rolunk` content branch was replaced. EnglishAbout and its styles, Header, Footer, navigation, routing and RFQ are unchanged.
- All supplied Hungarian history and partnership copy is preserved verbatim. The supplied "Két ország..." line serves as the gold hero subtitle, with the Hungarian company introduction directly below. The business-philosophy paragraph appears in its own section.
- Existing `/eximpworld-team.jpeg` retained, as requested, with its full aspect ratio. It is captioned as a brand illustration; no own manufacturing facility claim added.
- Budapest image added with visible source/author/license attribution and provenance at `/about/budapest-source.json`.
- Four service cards, business approach, company details from existing Hungarian footer, and RFQ links.
- Build and TypeScript pass. Playwright Chrome desktop 1440px, tablet 768px, small mobile 320px and iPhone 13 WebKit pass: approved content/history, retained hero image, loaded city image, four cards, internal links, RFQ navigation and no horizontal overflow or JavaScript errors.
- Full English main/header/footer text and Hungarian header/footer text compared against production: unchanged. English source and CSS remain byte-for-byte unchanged in Git.
- Desktop and mobile screenshots reviewed. iPhone testing uses WebKit emulation, not physical Safari hardware.
