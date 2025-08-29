'use client';

import getTheme from '@/app/theme';
import ColorModeContext from '@/contexts/colorModeContext';
import { STORAGE_KEY } from '@/lib/constants';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { useEffect, useState } from 'react';

export default function ThemeClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);
  const colorMode = {
    toggleColorMode: () => {
      setIsDarkMode((prevMode) => {
        const nextMode = !prevMode;
        localStorage.setItem(STORAGE_KEY, nextMode ? 'dark' : 'light');
        return nextMode;
      });
    },
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') {
      setIsDarkMode(true);
    } else if (stored === 'light') {
      setIsDarkMode(false);
    } else {
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(dark);
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    }
  }, []);

  if (isDarkMode === undefined) return null;

  return (
    <AppRouterCacheProvider>
      <ColorModeContext.Provider value={{ ...colorMode, isDarkMode }}>
        <ThemeProvider theme={getTheme(isDarkMode)}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
