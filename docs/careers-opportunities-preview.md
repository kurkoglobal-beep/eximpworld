# Careers & Opportunities — Preview delivery

## Implemented

- `/karrier`: EximpWorld Kft.; `/en/careers`: EximpWorld Ltd. Existing same-page company selector, canonical URLs and hreflang retained.
- All supplied HU/EN marketing copy, professional areas, UK benefits list, closing CTAs; no invented vacancies, salaries, headcount or guaranteed work.
- Navy/white/gold responsive hero using an existing illustrative chemical image; card hover respects reduced motion. CTAs navigate to the form and area cards select the appropriate interest.
- Footer Company / Vállalat group links to the corresponding page. Other navigation, product data, quote handling, DNS and mail configuration untouched.
- All required and optional fields present. Company is inherited/read-only and switched through the header. Required-field, email/URL constraints and length limits; accessible labels, field errors, focus states and reset.
- Optional PDF selection performs local extension, MIME, size (5 MiB maximum, rejects zero bytes), and PDF-header checks. No upload, persistent browser storage, object URL or external service.
- Company-specific current privacy link plus explicit notice that applicant privacy information is awaiting approval. Acknowledgement and submission disabled.
- `POST /api/careers` always returns 503 with `accepted: false`, no-store. Does not read/parse/log/store/forward request bodies. It cannot be enabled with an environment flag.
- Unique titles/descriptions and language metadata. Preview noindex retained; final approved Careers marketing pages can be indexed on production. No JobPosting structured data.

## Deliberately NOT active

This is a complete UI preview, not a production application pipeline. No applications can be submitted, no CVs stored, and no success/receipt confirmation is shown. Client PDF checks do not provide malware protection. Server file validation, private storage, random identifiers, malware scanning, anti-spam/rate limiting and email delivery are NOT implemented or claimed active. The endpoint rejects every request instead of accepting partially protected submissions.

The hosting platform may maintain its ordinary request metadata logs; application code does not log submitted content or send field values to analytics. No applicant data was used in tests.

## Required before activation

1. Separate approved applicant privacy notices for EximpWorld Kft. and EXIM WORLD LTD, including controller/contact details, purposes, lawful basis, access/recipients, retention and applicant rights. These decisions must be supplied and approved; none are inferred here.
2. Approved private storage (no public URLs), least-privilege credentials, random object identifiers and an authenticated reviewer access flow. Upload path must support 5 MiB within hosting limits.
3. Approved malware scanning/quarantine service; server-enforced extension, MIME, size and actual PDF validation. Files remain inaccessible until a clean result; failed/unknown scans must fail closed.
4. Approved server delivery/workflow configuration and credentials. Intended recipient mapping: HU `sales@eximpworld.hu` from existing corporate configuration; UK `eximpworldltd@eximpworld.hu`. Never accept a recipient supplied by the browser.
5. Server validation of company allowlist and all fields, trusted origin/CSRF controls, approved anti-automation protection and shared durable rate limiting across server instances. No personal data or file names/content in application logs or analytics.
6. Approved retention/deletion process including rejected/quarantined uploads; access audit policy. Server-side acknowledgement of the correct approved notice/version.
7. End-to-end accepted/rejected submissions, delivery failures, size boundaries, malicious PDFs, scan outages, unauthorized download and rate-limit tests before a separate explicit activation/deployment approval.

No new external service was selected, configured or contacted for application processing.

## Verification

- `npm run build`: passed including TypeScript. `git diff --check`: passed.
- `node --test tests/career-preview.test.mjs`: 3 tests passed (file rejection, size boundary and fail-closed endpoint without body reads).
- Chrome desktop 1440px, tablet 768px, small mobile 320px and iPhone 13 WebKit emulation: both languages passed; no horizontal overflow or page errors.
- Unique title, canonical, HTML language, company inheritance, correct privacy route, area preselection and selector route pairing checked.
- Missing required fields, malformed email/URL, invalid file headers, wrong extension/MIME, oversized files, valid local PDF preview and reset checked.
- Observed zero POST requests from all UI interactions. Direct HU/UK/tampered-company and multipart requests to the server returned 503.
- Screenshots reviewed, stored locally under outputs/careers.
- HU/EN catalogue and HU Contact main text match production; HU quote preparation and product-detail company switch passed.
- Physical iPhone Safari not tested; WebKit device emulation used.

Production site not modified. Preview approval does not activate applicant submission.
