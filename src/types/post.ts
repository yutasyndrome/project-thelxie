export type PostType = {
  slug: string;
  title: string;
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
  tags: string[];
  fix?: boolean;
  content: string;
};
