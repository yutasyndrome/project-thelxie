import Container from '@/components/feature/container';
import PostHeader from '@/components/feature/post-header';
import PostToc from '@/components/feature/post-toc';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || '');

  return (
    <Container>
      <div className="mx-auto max-w-7xl">
        <PostHeader {...post} />
        <div className="flex flex-row gap-5 pt-5">
          <main
            className="markdown min-w-0 flex-1"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <aside className="hidden w-64 lg:block">
            <PostToc content={post.content} />
          </aside>
        </div>
      </div>
    </Container>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
