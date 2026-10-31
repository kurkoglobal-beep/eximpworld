export const MAX_CV_BYTES = 5 * 1024 * 1024;
// Local preview checks only. A PDF header does not prove that a file is safe.
// No selected file is uploaded or marked malware-scanned.
export async function checkCareerFile(file: File): Promise<'size' | 'type' | 'read' | null> {
  if (!file.size || file.size > MAX_CV_BYTES) return 'size';
  if (!/\.pdf$/i.test(file.name) || (file.type && file.type !== 'application/pdf')) return 'type';
  try {
    const bytes = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    if (String.fromCharCode(...bytes) !== '%PDF-') return 'type';
  } catch { return 'read'; }
  return null;
}
