import ClickableChip from '@/components/clickable-chip';
import PostMeta from '@/components/post-meta';
import Toc from '@/components/post-toc';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
    <>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {post.title}
      </Typography>
      <Stack
        direction="row"
        useFlexGap
        spacing={2}
        sx={{ mb: 1, flexWrap: 'wrap', rowGap: 1 }}
      >
        {post.tags.map((tag) => (
          <ClickableChip tag={tag} key={tag} />
        ))}
      </Stack>
      <Box sx={{ mt: 2, mb: 6 }}>
        <PostMeta
          author={{
            name: post.author.name,
            avatar: post.author.url,
          }}
          date={post.date}
          update={post.update ?? ''}
        />
      </Box>
      <div className="post" dangerouslySetInnerHTML={{ __html: html }} />
      <Toc tocItems={tocItems} />
    </>
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
