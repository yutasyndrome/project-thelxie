'use client';

import PostMeta from '@/components/post-meta';
import { PostType } from '@/types/post';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';
import nextConfig from '../../next.config';
import ClickableChip from './clickable-chip';

const BASE_PATH = nextConfig.basePath || '';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  textDecoration: 'none',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

type Props = {
  posts: PostType[];
};

export const PostCard = ({ posts }: Props) => {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <>
      {posts.map((post, index) => (
        <Link
          href={`/posts/${post.slug}`}
          key={post.slug}
          style={{ textDecoration: 'none' }}
        >
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            className={focusedCardIndex === index ? 'Mui-focused' : ''}
            sx={{ textDecoration: 'none' }}
          >
            <CardMedia
              component="img"
              alt={`${post.slug}_coverImage`}
              image={`${BASE_PATH}${post.coverImage}`}
              sx={{
                aspectRatio: '16 / 9',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <StyledCardContent>
              <Stack
                display={{ xs: 'none', sm: 'flex' }}
                direction="row"
                spacing={2}
                sx={{
                  mb: 1,
                  overflow: 'auto',
                }}
              >
                {post.tags.map((tag) => (
                  <ClickableChip tag={tag} key={tag} />
                ))}
              </Stack>
              <Stack
                display={{ xs: 'flex', sm: 'none' }}
                direction="row"
                useFlexGap
                spacing={2}
                sx={{
                  mb: 1,
                  flexWrap: 'wrap',
                  rowGap: 1,
                }}
              >
                {post.tags.map((tag) => (
                  <ClickableChip tag={tag} key={tag} />
                ))}
              </Stack>
              <Typography gutterBottom variant="h4" component="div">
                {post.title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {post.excerpt}
              </StyledTypography>
            </StyledCardContent>
            <Box sx={{ padding: '16px' }}>
              <PostMeta
                author={{
                  name: post.author.name,
                  avatar: post.author.url,
                }}
                date={post.date}
                update={post.update ?? ''}
              />
            </Box>
          </StyledCard>
        </Link>
      ))}
    </>
  );
};
