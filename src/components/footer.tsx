import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Typography variant="caption">
        {'Powered by '}
        <MuiLink
          href="https://nextjs.org/"
          underline="hover"
          target="_blank"
          color="primary.main"
          variant="caption"
        >
          Next.js
        </MuiLink>
        {' and '}
        <MuiLink
          href="https://mui.com/"
          underline="hover"
          target="_blank"
          color="primary.main"
          variant="caption"
        >
          MUI
        </MuiLink>
        {'.'}
        <br />
        {
          '当サイト上において引用されているゲーム内コンテンツの著作権, 商標権, 及びその他の知的財産権は, 当該コンテンツの提供元である COGNOSPHERE PTE. LTD. に帰属します.'
        }
        <br />
        {'© ' + new Date().getFullYear() + ' Project Thelxie'}
      </Typography>
    </Box>
  );
}
