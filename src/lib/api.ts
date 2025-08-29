import { PAGINATION_OFFSET } from '@/lib/constants';
import { PostType } from '@/types/post';
import fs from 'fs';
import matter from 'gray-matter';
import { resolve } from 'path';

const postsDirectory = resolve(process.cwd(), '_posts');

export const getPostSlugs = () => fs.readdirSync(postsDirectory);

export const getTotalPages = () => {
  const postNum = getPostSlugs().length;
  return Math.ceil(postNum / PAGINATION_OFFSET);
};

export const getPostBySlug = (slug: string) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = resolve(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as PostType;
};

export const getAllPosts = (): PostType[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};