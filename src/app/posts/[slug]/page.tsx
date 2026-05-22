import Container from '@/components/feature/container';
import PostActions from '@/components/feature/post-actions';
import PostAuthor from '@/components/feature/post-author';
import PostHeader from '@/components/feature/post-header';
import PostToc from '@/components/feature/post-toc';
import { getAllPosts, getPostBySlug, getRawMarkdownBySlug } from '@/lib/api';
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
  const rawMarkdown = getRawMarkdownBySlug(params.slug);
  const githubHistoryUrl = `https://github.com/yutasyndrome/project-thelxie-contents/commits/main/_posts/${encodeURIComponent(params.slug)}`;

  return (
    <Container>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        {/* 左カラム: PostHeader + Content */}
        <div className="w-full min-w-0 p-2 md:rounded-lg md:border md:p-5 lg:max-w-4xl lg:flex-1 lg:p-10">
          <PostHeader {...post} />
          {/* モバイル: Author + Actions */}
          <div className="mt-3 flex flex-col gap-4 lg:hidden">
            <PostAuthor author={post.author} variant="compact" />
            <PostActions
              rawMarkdown={rawMarkdown}
              githubHistoryUrl={githubHistoryUrl}
              variant="compact"
            />
          </div>
          <main
            className="markdown mt-3 min-w-0"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {/* 右カラム: aside（lg以上で表示） */}
        <aside className="hidden w-64 gap-8 lg:flex lg:flex-col">
          <PostAuthor author={post.author} />
          <PostActions
            rawMarkdown={rawMarkdown}
            githubHistoryUrl={githubHistoryUrl}
          />
          <PostToc content={post.content} />
        </aside>
      </div>
      {/* モバイル: フローティング目次ボタン */}
      <div className="lg:hidden">
        <PostToc content={post.content} variant="floating" />
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
