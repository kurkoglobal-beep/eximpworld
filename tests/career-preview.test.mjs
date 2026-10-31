import test from 'node:test';
import assert from 'node:assert/strict';
import { checkCareerFile, MAX_CV_BYTES } from '../lib/career-file.ts';
import { POST } from '../app/api/careers/route.ts';

test('local PDF checks reject empty, oversized and disguised files', async () => {
  assert.equal(await checkCareerFile(new File([], 'empty.pdf', { type: 'application/pdf' })), 'size');
  assert.equal(await checkCareerFile(new File([new Uint8Array(MAX_CV_BYTES + 1)], 'large.pdf', { type: 'application/pdf' })), 'size');
  assert.equal(await checkCareerFile(new File(['not PDF'], 'fake.pdf', { type: 'application/pdf' })), 'type');
  assert.equal(await checkCareerFile(new File(['%PDF-1.7'], 'file.exe', { type: 'application/pdf' })), 'type');
  assert.equal(await checkCareerFile(new File(['%PDF-1.7'], 'file.pdf', { type: 'text/html' })), 'type');
});
test('valid PDF header and exact size boundary pass only the local precheck', async () => {
  const buffer = new Uint8Array(MAX_CV_BYTES);buffer.set(new TextEncoder().encode('%PDF-1.7'));
  assert.equal(await checkCareerFile(new File([buffer], 'CV.PDF', { type: 'application/pdf' })), null);
  assert.equal(await checkCareerFile(new File(['%PDF-1.7'], 'cv.pdf')), null);
});
test('submission stays closed without reading or processing the request', async () => {
  const response = await POST({ get body() { throw new Error('must not read applicant data'); }, formData() { throw new Error('must not parse files'); } });
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { accepted: false, code: 'CAREERS_NOT_ENABLED' });
});
