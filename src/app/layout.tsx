import Footer from '@/components/footer';
import Header from '@/components/header';
import ThemeClientProvider from '@/components/theme-client-provider';
import { APPBAR_HEIGHT } from '@/lib/constants';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Project Thelxie',
    template: '%s | Project Thelxie',
  },
  description:
    'Project Thelxie is a web application that shares information about exploration in Genshin Impact.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ThemeClientProvider>
          <Container
            maxWidth="lg"
            component="main"
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Header />
            <Box sx={{ marginTop: `${APPBAR_HEIGHT}px`, flex: 1 }}>
              {children}
            </Box>
            <Footer />
          </Container>
        </ThemeClientProvider>
      </body>
    </html>
  );
}
