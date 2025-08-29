export type PostType = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  update?: string;
  author: {
    name: string;
    url: string;
  };
  ogImage: {
    url: string;
  };
  content: string;
  tags: string[];
};