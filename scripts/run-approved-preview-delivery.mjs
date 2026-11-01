// Temporary build hook for the user's explicitly approved two-message test.
if (process.env.VERCEL_ENV === 'preview') {
  process.argv[2] = '--approved-two-mailbox-test-2026-11-01';
  await import('./send-preview-smtp-test.mjs');
} else {
  console.log('[smtp-delivery-test] skipped: not Preview');
}
