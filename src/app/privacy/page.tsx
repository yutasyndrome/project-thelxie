import Container from '@/components/feature/container';
import PostToc from '@/components/feature/post-toc';
import markdownToHtml from '@/lib/markdownToHtml';
import { getPageBySlug } from '@/lib/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy page description.',
};

export default async function Privacy() {
  const page = getPageBySlug('privacy');
  const { date = '', update = '' } = page.data;
  const content = await markdownToHtml(page.content || '');

  return (
    <Container>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <div className="w-full min-w-0 p-2 md:rounded-lg md:border md:p-5 lg:max-w-4xl lg:flex-1 lg:p-10">
          <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
          <div className="mt-5 mb-10 flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              {update ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">
                      制定日：{date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">
                      最終更新日：{update}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">
                    制定日：{date}
                  </span>
                </div>
              )}
            </div>
          </div>
          <main
            className="markdown mt-5 min-w-0"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <aside className="hidden w-64 lg:flex lg:flex-col">
          <PostToc content={page.content} />
        </aside>
      </div>
    </Container>
  );
}
