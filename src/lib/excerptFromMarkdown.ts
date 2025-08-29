export default function excerptFromMarkdown(markdown: string, length: number = 200): string {
  const cleaned = markdown.replace(/[#*\-`_~\[\]\(\)!>]/g, ' ');
  const normalized = cleaned.replace(/\s+/g, ' ').trim();
  if (normalized.length > length) {
    return normalized.slice(0, length) + '...';
  }
  return normalized;
}