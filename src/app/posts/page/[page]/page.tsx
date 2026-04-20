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
  const totalArticles = allPosts.length;
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
      <div className="mt-10 flex items-baseline justify-center gap-5 text-center">
        <h1 className="text-4xl font-bold">All Posts</h1>
        <span className="text-muted-foreground text-base font-normal">
          {totalArticles} {totalArticles === 1 ? 'article' : 'articles'}
        </span>
      </div>
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
      images: ['/assets/posts/cover.webp'],
    },
  };
}

export async function generateStaticParams() {
  const totalPages = getTotalPages();

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}
