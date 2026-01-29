import Container from '@/components/feature/container';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPinned, Newspaper, Trophy } from 'lucide-react';
import Link from 'next/link';

const items = [
  {
    title: 'Posts',
    href: '/posts/page/1',
    description: '攻略に関する記事',
    note: '*記事は順次追加予定',
    Icon: Newspaper,
  },
  {
    title: 'Interactive Map',
    href: '/map',
    description: '宝箱の情報に特化したインタラクティブマップ',
    note: '*構想段階',
    Icon: MapPinned,
  },
  {
    title: 'Achievements',
    href: '/achievements',
    description: 'アチーブメントチェッカー',
    note: '*構想段階',
    Icon: Trophy,
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <Container>
        <h1 className="mt-10 text-center text-4xl font-bold">
          Welcome to the Project Thelxie!
        </h1>
        <p className="mt-10 text-center">
          <span className="font-bold">
            "Project Thelxie（プロジェクト トルクシー）"
          </span>{' '}
          は原神の探索勢向け非公式ウェブサイトです。
        </p>
        <div className="my-15 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.title} href={item.href}>
              <Card className="hover:bg-muted/50 hover:ring-azur-500 w-auto cursor-pointer hover:ring-1">
                <CardHeader className="flex flex-row items-start gap-5">
                  <item.Icon className="h-10 w-10 shrink-0" strokeWidth={1.5} />
                  <div>
                    <CardTitle className="pb-1 text-2xl">
                      {item.title}
                    </CardTitle>
                    <CardDescription>
                      {item.description}
                      <br />
                      {item.note}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
