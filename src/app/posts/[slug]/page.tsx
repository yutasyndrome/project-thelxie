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

  const { html, tocItems } = await markdownToHtml(post.content || '');

  return (
    <main
      style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}
    >
      <header>
        <h1 style={{ margin: 0 }}>Post</h1>
        <p style={{ marginTop: 8 }}>This page is under development...</p>
      </header>
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = post.title.replace(/#/g, '＃');

  return {
    title,
    openGraph: {
      title,
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
