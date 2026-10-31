// Fail closed: no parsing, logging, storage or forwarding of applicant data.
// Activation requires approved company-specific privacy notices AND an audited
// private upload, malware-scanning, anti-abuse and delivery implementation.
// This is intentionally not controlled by a single environment toggle.
export async function POST() {
  return Response.json(
    { accepted: false, code: 'CAREERS_NOT_ENABLED' },
    { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '86400' } },
  );
}
