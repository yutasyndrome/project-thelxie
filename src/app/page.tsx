import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Home
        </Typography>
        <Typography>This page is under development...</Typography>
      </div>
    </Box>
  );
}
