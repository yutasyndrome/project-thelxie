import AppSidebar from '@/components/feature/app-sidebar';
import Footer from '@/components/feature/footer';
import Header from '@/components/feature/header';
import ThemeProvider from '@/components/feature/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
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
          <SidebarProvider>
            <AppSidebar />
            <Header />
            <div className="flex min-h-screen w-full flex-col pt-(--header-height)">
              {children}
              <Footer />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
