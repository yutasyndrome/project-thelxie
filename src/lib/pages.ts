import fs from 'fs';
import matter from 'gray-matter';
import { resolve } from 'path';

const pagesDirectory = resolve(process.cwd(), '_pages');

type PageData = {
  title?: string;
  description?: string;
  date?: string;
  update?: string;
};

export const getPageBySlug = (slug: string) => {
  const fullPath = resolve(pagesDirectory, slug, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    data: data as PageData,
  };
};

export const getPageRawMarkdownBySlug = (slug: string): string => {
  const fullPath = resolve(pagesDirectory, slug, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);

  return content.replace(/^(?:\r?\n)+/, '');
};
