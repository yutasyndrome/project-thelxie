import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

type MarkdownToHtmlOptions = {
  enableAnchorLinks?: boolean;
};

export default async function markdownToHtml(
  markdown: string,
  { enableAnchorLinks = true }: MarkdownToHtmlOptions = {},
) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug);

  type HastNode = {
    type?: string;
    tagName?: string;
    properties?: Record<string, unknown> | undefined;
    children?: HastNode[] | undefined;
  };

  function rehypeTargetBlank() {
    return (tree: HastNode) => {
      const visitNode = (node: HastNode | undefined) => {
        if (!node) return;
        if (node.type === 'element' && node.tagName === 'a') {
          node.properties = node.properties || {};
          const props = node.properties as Record<string, unknown>;
          const href = typeof props.href === 'string' ? props.href : '';

          if (href.startsWith('#')) {
            if ('target' in props) delete props.target;
            if ('rel' in props) delete props.rel;
          } else {
            props.target = '_blank';
          const prevRel = props.rel ? String(props.rel) : '';
          const rels = prevRel ? prevRel.split(' ') : [];
          if (!rels.includes('noopener')) rels.push('noopener');
          if (!rels.includes('noreferrer')) rels.push('noreferrer');
          props.rel = rels.join(' ');
          }
        }
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach((child) => visitNode(child));
        }
      };

      visitNode(tree);
    };
  }

  if (enableAnchorLinks) {
    processor.use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['header-anchor-link'] },
      content: {
        type: 'text',
        value: '#',
      },
    });
  }

  const result = await processor
    .use(rehypeTargetBlank)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}
