import { getAllPosts } from '@/lib/api';
import { PAGINATION_OFFSET } from '@/lib/constants';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{
    tag: string;
    page: string;
  }>;
};

export default async function TagPage(props: Params) {
  const params = await props.params;
  const tag = params.tag;
  const currentPage = Number(params.page) || 1;
  const allPosts = getAllPosts().filter((post) => post.tags?.includes(tag));
  const totalPages = Math.ceil(allPosts.length / PAGINATION_OFFSET);
  const posts = allPosts.slice(
    (currentPage - 1) * PAGINATION_OFFSET,
    currentPage * PAGINATION_OFFSET
  );

  if (!posts || posts.length === 0) {
    return notFound();
  }

  return (
    <main
      style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}
    >
      <header>
        <h1 style={{ margin: 0 }}>
          Posts / {tag} - Page {currentPage}
        </h1>
        <p style={{ marginTop: 8 }}>This page is under development...</p>
      </header>
    </main>
  );
}

export async function generateMetadata(props: Params) {
  const params = await props.params;
  const tag = params.tag;
  const currentPage = Number(params.page) || 1;
  const title = `Posts / ${tag} - Page ${currentPage}`;

  return {
    title,
    openGraph: {
      title,
      images: ['/assets/posts/cover.jpg'],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags || [])));
  const params = [];

  for (const tag of tags) {
    const posts = allPosts.filter((post) => post.tags?.includes(tag));
    const totalPages = Math.ceil(posts.length / PAGINATION_OFFSET);
    for (let i = 1; i <= totalPages; i++) {
      params.push({ tag, page: i.toString() });
    }
  }
  return params;
}
