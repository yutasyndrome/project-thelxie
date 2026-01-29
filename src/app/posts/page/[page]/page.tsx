import { getAllPosts, getTotalPages } from '@/lib/api';
import { PAGINATION_OFFSET } from '@/lib/constants';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{
    page: string;
  }>;
};

export default async function Page(props: Params) {
  const params = await props.params;
  const currentPage = Number(params.page) || 1;
  const allPosts = getAllPosts();
  const totalPages = getTotalPages();
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
        <h1 style={{ margin: 0 }}>Posts - Page {currentPage}</h1>
        <p style={{ marginTop: 8 }}>This page is under development...</p>
      </header>
    </main>
  );
}

export async function generateMetadata(props: Params) {
  const params = await props.params;
  const currentPage = Number(params.page) || 1;
  const title = `Posts - Page ${currentPage}`;

  return {
    title,
    openGraph: {
      title,
      images: ['/assets/posts/cover.jpg'],
    },
  };
}

export async function generateStaticParams() {
  const totalPages = getTotalPages();

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}
