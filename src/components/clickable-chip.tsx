'use client';
import TagIcon from '@mui/icons-material/Tag';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/navigation';

export default function ClickableChip({ tag }: { tag: string }) {
  const router = useRouter();

  return (
    <Chip
      key={tag}
      icon={<TagIcon color="inherit" sx={{ color: 'primary.main' }} />}
      label={tag}
      size="small"
      clickable
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/posts/tag/${tag}/page/1`);
      }}
    />
  );
}
