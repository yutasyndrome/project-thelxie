import { TocItemType } from '@/types/toc';
import type { Element, Node, Root, Text } from 'hast';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

export default async function markdownToHtml(markdown: string) {
  const tocItems: TocItemType[] = [];
  function rehypeCollectToc() {
    return (tree: Root) => {
      visit(tree, 'element', (node: Element) => {
        if (
          (node.tagName === 'h2' || node.tagName === 'h3') &&
          node.properties &&
          typeof node.properties.id === 'string'
        ) {
          const text = node.children
            .filter((n: Node) => n.type === 'text' || n.type === 'element')
            .map((n: Node) =>
              n.type === 'text'
                ? (n as Text).value
                : (n.type === 'element' && (n as Element).children[0] && (n as Element).children[0].type === 'text'
                  ? ((n as Element).children[0] as Text).value
                  : '')
            )
            .join(' ');
          tocItems.push({
            id: node.properties.id,
            text,
            level: node.tagName === 'h2' ? 2 : 3,
          });
        }
      });
    };
  }

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeCollectToc)
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

  return {
    html: result.toString(),
    tocItems,
  };
}