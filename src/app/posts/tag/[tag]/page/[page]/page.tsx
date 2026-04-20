import Container from '@/components/feature/container';
import PostCard from '@/components/feature/post-card';
import TagPagination from '@/components/feature/tag-pagination';
import { getAllPosts } from '@/lib/api';
import { PAGINATION_OFFSET } from '@/lib/constants';
import { isTagPathSegment, normalizeTagPathSegment } from '@/lib/utils';
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
  const allPosts = getAllPosts().filter((post) =>
    post.tags?.some((postTag) => isTagPathSegment(postTag, tag)),
  );
  const displayTag =
    allPosts
      .flatMap((post) => post.tags || [])
      .find((postTag) => isTagPathSegment(postTag, tag)) || tag;
  const totalArticles = allPosts.length;
  const totalPages = Math.ceil(totalArticles / PAGINATION_OFFSET);
  const posts = allPosts.slice(
    (currentPage - 1) * PAGINATION_OFFSET,
    currentPage * PAGINATION_OFFSET,
  );

  if (!posts || posts.length === 0) {
    return notFound();
  }

  return (
    <main className="flex-1">
      <Container>
        <div className="mt-10 flex items-baseline justify-center gap-5 text-center">
          <h1 className="text-4xl font-bold"># {displayTag}</h1>
          <span className="text-muted-foreground text-base font-normal">
            {totalArticles} {totalArticles === 1 ? 'article' : 'articles'}
          </span>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
        <TagPagination
          currentPage={currentPage}
          totalPages={totalPages}
          tag={tag}
        />
      </Container>
    </main>
  );
}

export async function generateMetadata(props: Params) {
  const params = await props.params;
  const tag = params.tag;
  const currentPage = Number(params.page) || 1;
  const displayTag =
    getAllPosts()
      .flatMap((post) => post.tags || [])
      .find((postTag) => isTagPathSegment(postTag, tag)) || tag;
  const title = `Posts / ${displayTag} - Page ${currentPage}`;

  return {
    title,
    openGraph: {
      title,
      images: ['/assets/posts/cover.webp'],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const tags = Array.from(
    new Set(
      allPosts
        .flatMap((post) => post.tags || [])
        .map((tag) => normalizeTagPathSegment(tag)),
    ),
  );
  const params = [];

  for (const tag of tags) {
    const posts = allPosts.filter((post) =>
      post.tags?.some((postTag) => isTagPathSegment(postTag, tag)),
    );
    const totalPages = Math.ceil(posts.length / PAGINATION_OFFSET);
    for (let i = 1; i <= totalPages; i++) {
      params.push({ tag, page: i.toString() });
    }
  }
  return params;
}
