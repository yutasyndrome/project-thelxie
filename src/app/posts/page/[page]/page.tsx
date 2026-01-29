import Container from '@/components/feature/container';
import PostCard from '@/components/feature/post-card';
import PostPagination from '@/components/feature/post-pagination';
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
    currentPage * PAGINATION_OFFSET,
  );

  if (!posts || posts.length === 0) {
    return notFound();
  }

  return (
    <Container>
      <h1 className="mt-10 text-center text-4xl font-bold">Posts</h1>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
      <PostPagination currentPage={currentPage} totalPages={totalPages} />
    </Container>
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
