import AppSidebar from '@/components/feature/app-sidebar';
import Footer from '@/components/feature/footer';
import Header from '@/components/feature/header';
import ThemeProvider from '@/components/feature/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { M_PLUS_1p, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-en',
  display: 'swap',
});

const mplus = M_PLUS_1p({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ja',
  display: 'swap',
});

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
    <html
      lang="ja"
      className={`${poppins.variable} ${mplus.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <Header />
            <div className="flex min-h-screen w-full flex-col pt-(--header-height)">
              {children}
              <Footer />
            </div>
            <Toaster position="top-right" />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
