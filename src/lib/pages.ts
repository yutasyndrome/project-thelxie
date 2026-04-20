import { generatedPages } from '@/generated/content';

type PageData = {
  title?: string;
  description?: string;
  date?: string;
  update?: string;
};

type GeneratedPage = {
  slug: string;
  content: string;
  rawMarkdown: string;
  data: PageData;
};

const pages = generatedPages as Record<string, GeneratedPage>;

export const getPageBySlug = (slug: string) => {
  return pages[slug];
};

export const getPageRawMarkdownBySlug = (slug: string): string => {
  return pages[slug]?.rawMarkdown ?? '';
};
