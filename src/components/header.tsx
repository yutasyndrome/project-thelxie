'use client';
import TemporaryDrawer from '@/components/temporary-drawer';
import ColorModeContext from '@/contexts/colorModeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import NextLink from 'next/link';
import { useContext } from 'react';

export default function Header() {
  const colorMode = useContext(ColorModeContext);

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <TemporaryDrawer />
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MuiLink
              component={NextLink}
              href="/"
              variant="h3"
              underline="none"
              color="inherit"
              sx={{
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                display: 'block',
              }}
            >
              Project Thelxie
            </MuiLink>
          </Box>
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {colorMode.isDarkMode ? (
              <DarkModeIcon sx={{ color: '#1565c0' }} />
            ) : (
              <LightModeIcon sx={{ color: '#ffd600' }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
