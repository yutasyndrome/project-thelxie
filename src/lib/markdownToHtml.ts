import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['header-anchor-link'] },
      content: {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['icon-header-link']
        },
        children: [{
          type: 'text',
          value: '#'
        }]
      }
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}