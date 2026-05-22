import { generatedPosts } from '@/generated/content';
import { PAGINATION_OFFSET } from '@/lib/constants';
import { PostType } from '@/types/post';

type GeneratedPost = PostType & {
  rawMarkdown: string;
};

const posts = generatedPosts as GeneratedPost[];

const toPost = (generatedPost: GeneratedPost): PostType => {
  const { rawMarkdown, ...post } = generatedPost;
  void rawMarkdown;
  return post;
};

export const getPostSlugs = () => posts.map((post) => post.slug);

export const getTotalPages = () => {
  const postNum = getPostSlugs().length;
  return Math.ceil(postNum / PAGINATION_OFFSET);
};

export const getPostBySlug = (slug: string) => {
  return posts.find((post) => post.slug === slug);
};

export const getRawMarkdownBySlug = (slug: string): string => {
  return posts.find((post) => post.slug === slug)?.rawMarkdown ?? '';
};

export const getAllPosts = (): PostType[] => {
  const allPosts = posts.map(toPost);
  const fixCount = allPosts.filter((post) => post.fix).length;

  if (fixCount > 1) {
    throw new Error('Multiple posts with fix: true found');
  }

  allPosts.sort((post1, post2) => {
    if (post1.fix && !post2.fix) return -1;
    if (!post1.fix && post2.fix) return 1;
    return post1.date > post2.date ? -1 : 1;
  });

  return allPosts;
};
