import { TocItemType } from '@/types/toc';

export function extractTocFromHtml(html: string): TocItemType[] {
  const div = document.createElement('div');
  div.innerHTML = html;
  const headings = Array.from(div.querySelectorAll('h2, h3'));
  return headings.map((el) => ({
    id: el.id || '',
    text: el.textContent || '',
    level: el.tagName === 'H2' ? 2 : 3,
  }));
}
