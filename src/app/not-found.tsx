import Container from '@/components/feature/container';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404',
  description: '申し訳ございませんが、お探しのページは見つかりませんでした。',
};

export default function NotFound() {
  return (
    <main className="flex-1">
      <Container>
        <div className="mt-10 justify-center w-full flex flex-col items-center gap-8 text-center" >
        <h1 className="text-4xl font-bold">
          404 - Page Not Found
        </h1>
        <p >
          申し訳ございませんが、お探しのページは見つかりませんでした。
          <br />
          URL が変更されたか、ページが削除された可能性がございます。
        </p>
        <Link href="/">
          <Button className="mt-6 bg-sky-400 text-white hover:bg-sky-500">Home へ戻る</Button>
        </Link>
        </div>
      </Container>
    </main>
  );
}