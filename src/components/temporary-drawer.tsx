import AppVersionChip from '@/components/app-version-chip';
import { APPBAR_HEIGHT } from '@/lib/constants';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const pathname = usePathname();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Posts', icon: <ArticleOutlinedIcon />, to: '/posts/page/1' },
    { text: 'Interactive Map', icon: <MapOutlinedIcon />, to: '/map' },
    {
      text: 'Achievements',
      icon: <EmojiEventsOutlinedIcon />,
      to: '/achievements',
    },
  ];

  const infoItems = [
    { text: 'Information', icon: <InfoOutlinedIcon />, to: '/information' },
    { text: 'Privacy', icon: <VerifiedUserOutlinedIcon />, to: '/privacy' },
  ];

  const DrawerDivider = () => (
    <Divider sx={{ width: '95%', margin: '0 auto' }} />
  );

  function isActive(to: string, pathname: string) {
    if (to === '/posts/page/1') {
      return pathname.startsWith('/posts/');
    }
    return pathname === to;
  }

  function getBgColor(active: boolean, theme: any) {
    if (active) return theme.palette.primary.main;
    return 'transparent';
  }

  function getHoverBgColor(active: boolean, theme: any) {
    if (active) return theme.palette.primary.main;
    return theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.primary.light;
  }

  function getTextColor(active: boolean, theme: any) {
    return active ? 'white' : theme.palette.text.primary;
  }

  function getFontWeight(active: boolean) {
    return active ? 600 : 'normal';
  }

  return (
    <Box>
      <IconButton
        color="inherit"
        edge="start"
        onClick={toggleDrawer}
        sx={{ mr: 2 }}
      >
        {open ? <ClearIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            marginTop: `${APPBAR_HEIGHT}px`,
          },
        }}
      >
        <List>
          <ListItem>
            {(() => {
              const active = pathname === '/';
              return (
                <ListItemButton
                  component={NextLink}
                  href="/"
                  onClick={() => setOpen(false)}
                  sx={{
                    backgroundColor: getBgColor(active, theme),
                    '&:hover': {
                      backgroundColor: getHoverBgColor(active, theme),
                    },
                  }}
                >
                  <ListItemIcon>
                    <HomeOutlinedIcon
                      sx={{ color: getTextColor(active, theme) }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Home"
                    sx={{
                      '& .MuiTypography-root': {
                        color: getTextColor(active, theme),
                        fontWeight: getFontWeight(active),
                      },
                    }}
                  />
                </ListItemButton>
              );
            })()}
          </ListItem>
        </List>
        <DrawerDivider />
        <List>
          {menuItems.map((item) => {
            const active = isActive(item.to, pathname);
            return (
              <ListItem key={item.text}>
                <ListItemButton
                  component={NextLink}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  sx={{
                    backgroundColor: getBgColor(active, theme),
                    '&:hover': {
                      backgroundColor: getHoverBgColor(active, theme),
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: getTextColor(active, theme) }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        color: getTextColor(active, theme),
                        fontWeight: getFontWeight(active),
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <DrawerDivider />
        <List>
          {infoItems.map((item) => {
            const active = pathname === item.to;
            return (
              <ListItem key={item.text}>
                <ListItemButton
                  component={NextLink}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  sx={{
                    backgroundColor: getBgColor(active, theme),
                    '&:hover': {
                      backgroundColor: getHoverBgColor(active, theme),
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: getTextColor(active, theme) }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        color: getTextColor(active, theme),
                        fontWeight: getFontWeight(active),
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Stack direction="row" sx={{ justifyContent: 'center', mt: 1 }}>
          <AppVersionChip />
        </Stack>
      </Drawer>
    </Box>
  );
}
