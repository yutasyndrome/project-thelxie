import { PostCard } from '@/components/post-card';
import PostPaginationClient from '@/components/post-pagination';
import { getAllPosts, getTotalPages } from '@/lib/api';
import { PAGINATION_OFFSET } from '@/lib/constants';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h1">Posts</Typography>
      <Typography variant="h3"># All</Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, md: 6 }} key={post.slug}>
            <PostCard posts={[post]} />
          </Grid>
        ))}
      </Grid>
      <PostPaginationClient totalPages={totalPages} currentPage={currentPage} />
    </Box>
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
