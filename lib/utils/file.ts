export function detectMime(filePath: string) {
  const ext = filePath.split('.').pop();
  const m = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    pdf: 'application/pdf',
    txt: 'text/plain',
  };
  return m[ext as keyof typeof m] ?? 'application/octet-stream';
}
