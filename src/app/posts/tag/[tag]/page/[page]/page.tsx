import { PostCard } from '@/components/post-card';
import TagPaginationClient from '@/components/tag-pagination';
import { getAllPosts } from '@/lib/api';
import { PAGINATION_OFFSET } from '@/lib/constants';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h1">Posts</Typography>
      <Typography variant="h3"># {tag}</Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={post.slug}>
            <PostCard posts={[post]} />
          </Grid>
        ))}
      </Grid>
      <TagPaginationClient
        tag={tag}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </Box>
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
