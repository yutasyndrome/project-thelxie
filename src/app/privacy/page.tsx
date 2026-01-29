import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default function Privacy() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Privacy
        </Typography>
        <Typography>This page is under development...</Typography>
      </div>
    </Box>
  );
}
