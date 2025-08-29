'use client';
import { APPBAR_HEIGHT, BORDER_RADIUS, DRAWER_WIDTH } from '@/lib/constants';
import { createTheme, PaletteColorOptions, Theme } from '@mui/material/styles';
import { M_PLUS_1p, Poppins } from 'next/font/google';

declare module '@mui/material/styles' {
  interface Palette {
    orange: PaletteColorOptions;
    dark: PaletteColorOptions;
  }
  interface PaletteOptions {
    '50'?: string;
    '100'?: string;
    '200'?: string;
    '300'?: string;
    '500'?: string;
    '600'?: string;
    '700'?: string;
    '800'?: string;
    '900'?: string;
  }
  interface PaletteOptions {
    orange?: PaletteColorOptions;
    dark?: PaletteColorOptions;
  }
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  preload: true,
  display: 'swap',
});

const mPlus1p = M_PLUS_1p({
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
  preload: true,
  display: 'swap',
});

export const getTheme = (isDarkMode: boolean) =>
  createTheme({
    typography: {
      fontFamily: `${poppins.style.fontFamily}, ${mPlus1p.style.fontFamily}`,
      h6: {
        fontSize: '0.75rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 700,
      },
      h1: {
        fontSize: '2.125rem',
        fontWeight: 700,
      },
      subtitle1: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: '0.75rem',
        fontWeight: 400,
        color: '#697586',
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        color: '#697586',
      },
      body1: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.334em',
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.5em',
      },
    },
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        light: '#e3f2fd',
        main: '#2196f3',
        dark: '#1e88e5',
        '200': '#90caf9',
        '800': '#1565c0',
      },
      secondary: {
        light: '#ede7f6',
        main: '#673ab7',
        dark: '#5e35b1',
        '200': '#b39ddb',
        '800': '#4527a0',
      },
      error: {
        light: '#ef9a9a',
        main: '#f44336',
        dark: '#c62828',
      },
      orange: {
        light: '#fbe9e7',
        main: '#ffab91',
        dark: '#d84315',
      },
      warning: {
        light: '#fff8e1',
        main: '#ffe57f',
        dark: '#ffc107',
      },
      success: {
        light: '#b9f6ca',
        '200': '#69f0ae',
        main: '#00e676',
        dark: '#00c853',
      },
      grey: {
        '50': '#f8fafc',
        '100': '#eef2f6',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '500': '#697586',
        '600': '#4b5565',
        '700': '#364152',
        '900': '#121926',
      },
      dark: {
        light: '#bdc8f0',
        main: '#29314f',
        dark: '#212946',
        '800': '#1a223f',
        '900': '#111936',
      },
      text: {
        primary: isDarkMode ? '#f5f5f5' : '#364152',
        secondary: isDarkMode ? '#b0b0b0' : '#697586',
        disabled: isDarkMode ? '#555' : '#eef2f6',
      },
      divider: isDarkMode ? '#4b5565' : '#e0e0e0',
      background: isDarkMode
        ? { default: '#1e2022', paper: '#1e1e1e' }
        : { default: '#eef2f6', paper: '#ffffff' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: `${poppins.style.fontFamily}, ${mPlus1p.style.fontFamily}`,
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: 25,
            paddingRight: 25,
            '@media (max-width:600px)': {
              paddingLeft: 25,
              paddingRight: 25,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }: { theme: Theme }) => ({
            position: 'fixed',
            height: APPBAR_HEIGHT,
            color: theme.palette.text.primary,
            backgroundColor: isDarkMode
              ? 'rgba(0, 0, 0, 0.5)'
              : 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(5px)',
            boxShadow: '0px 1px 4px #00bcd4',
            zIndex: theme.zIndex.drawer + 1,
          }),
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: APPBAR_HEIGHT,
            paddingLeft: 24,
            paddingRight: 24,
            '@media (max-width:600px)': {
              minHeight: APPBAR_HEIGHT,
              paddingLeft: 24,
              paddingRight: 24,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            border: isDarkMode ? '1px solid #4b5565' : '1px solid #e0e0e0',
            boxShadow: 'none',
          }),
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: theme.palette.background.paper,
            backgroundImage: 'none',
          }),
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '12px',
            paddingRight: '12px',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: `${BORDER_RADIUS}px`,
            '&:hover': {
              borderRadius: `${BORDER_RADIUS}px`,
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: '0.9rem',
          },
        },
      },
    },
  });

export default getTheme;
