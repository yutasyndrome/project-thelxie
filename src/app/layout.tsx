import Footer from '@/components/feature/footer';
import Header from '@/components/feature/header';
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
        <Header />
        <main className="flex min-h-screen w-full flex-col">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
