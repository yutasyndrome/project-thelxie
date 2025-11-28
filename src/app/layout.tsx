import Footer from '@/components/feature/footer';
import Header from '@/components/feature/header';
import ThemeProvider from '@/components/feature/theme-provider';
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
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex min-h-screen w-full flex-col pt-(--header-height)">
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
