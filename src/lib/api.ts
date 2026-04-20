import { PAGINATION_OFFSET } from '@/lib/constants';
import { PostType } from '@/types/post';
import fs from 'fs';
import matter from 'gray-matter';
import { resolve } from 'path';

const postsDirectory = resolve(process.cwd(), '_posts');

export const getPostSlugs = () =>
  fs.readdirSync(postsDirectory).filter((entry) => {
    const full = resolve(postsDirectory, entry);
    return fs.statSync(full).isDirectory();
  });

export const getTotalPages = () => {
  const postNum = getPostSlugs().length;
  return Math.ceil(postNum / PAGINATION_OFFSET);
};

export const getPostBySlug = (slug: string) => {
  const fullPath = resolve(postsDirectory, slug, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { ...data, slug, content } as PostType;
};

export const getRawMarkdownBySlug = (slug: string): string => {
  const fullPath = resolve(postsDirectory, slug, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);

  return content.replace(/^(?:\r?\n)+/, '');
};

export const getAllPosts = (): PostType[] => {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  const fixCount = posts.filter((post) => post.fix).length;

  if (fixCount > 1) {
    throw new Error('Multiple posts with fix: true found');
  }

  posts.sort((post1, post2) => {
    if (post1.fix && !post2.fix) return -1;
    if (!post1.fix && post2.fix) return 1;
    return post1.date > post2.date ? -1 : 1;
  });

  return posts;
};
