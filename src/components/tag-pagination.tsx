'use client';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation';

type Props = {
  tag: string;
  totalPages: number;
  currentPage: number;
};

export default function TagPaginationClient({
  tag,
  totalPages,
  currentPage,
}: Props) {
  const router = useRouter();
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/posts/tag/${tag}/page/${value}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        pt: 2,
      }}
    >
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Pagination
          color="primary"
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
      <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <Pagination
          size="small"
          color="primary"
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
    </Box>
  );
}
