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
    note: '#beta',
    Icon: Newspaper,
  },
  {
    title: 'Interactive Map',
    href: '/map',
    description: '宝箱の情報に特化したインタラクティブマップ',
    note: '#TBD',
    Icon: MapPinned,
  },
  {
    title: 'Achievements',
    href: '/achievements',
    description: 'アチーブメントチェッカー',
    note: '#TBD',
    Icon: Trophy,
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <Container>
        <section className="border-border bg-card relative overflow-hidden rounded-xl border shadow-sm">
          <img
            src="/assets/hero/hero_light.jpg"
            aria-hidden="true"
            className="block h-[360px] w-full object-cover md:relative md:left-1/2 md:h-[440px] md:w-[calc(100%+4rem)] md:max-w-none md:-translate-x-1/2 dark:hidden"
          />
          <img
            src="/assets/hero/hero_dark.jpg"
            aria-hidden="true"
            className="hidden h-[360px] w-full object-cover md:relative md:left-1/2 md:h-[440px] md:w-[calc(100%+4rem)] md:max-w-none md:-translate-x-1/2 dark:block"
          />
          <div className="absolute inset-0 bg-linear-to-t from-white/75 via-white/40 to-white/10 dark:from-black/70 dark:via-black/35 dark:to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center md:px-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold drop-shadow-md md:text-5xl md:whitespace-nowrap">
                Welcome to the Project Thelxie!
              </h1>
              <p className="mt-6 text-base leading-7 drop-shadow-sm md:text-lg">
                <span className="font-bold">
                  &quot;Project Thelxie（プロジェクト トルクシー）&quot;
                </span>{' '}
                は原神の探索勢向け非公式 Web サイトです。
              </p>
            </div>
          </div>
        </section>
        <h2 className="my-8 text-center text-3xl font-bold"># Features</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
