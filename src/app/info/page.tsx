import Container from '@/components/feature/container';
import PostActions from '@/components/feature/post-actions';
import PostToc from '@/components/feature/post-toc';
import markdownToHtml from '@/lib/markdownToHtml';
import { getPageBySlug, getPageRawMarkdownBySlug } from '@/lib/pages';
import { Metadata } from 'next';
import { MdOutlineCalendarToday, MdOutlineEditCalendar } from 'react-icons/md';

export const metadata: Metadata = {
  title: 'Information',
  description: 'Information page description.',
};

export default async function Information() {
  const page = getPageBySlug('info');
  const { date = '', update = '' } = page.data;
  const content = await markdownToHtml(page.content || '');
  const rawMarkdown = getPageRawMarkdownBySlug('info');
  const githubHistoryUrl =
    'https://github.com/yutasyndrome/project-thelxie-contents/commits/main/_pages/info';

  return (
    <Container>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <div className="w-full min-w-0 p-2 md:rounded-lg md:border md:p-5 lg:max-w-4xl lg:flex-1 lg:p-10">
          <h1 className="text-2xl font-bold">インフォメーション</h1>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              {update ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <MdOutlineCalendarToday className="text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">
                      {date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdOutlineEditCalendar className="text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">
                      {update}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MdOutlineCalendarToday className="text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">{date}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-4 lg:hidden">
            <PostActions
              rawMarkdown={rawMarkdown}
              githubHistoryUrl={githubHistoryUrl}
              variant="compact"
            />
          </div>
          <main
            className="markdown mt-5 min-w-0"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <aside className="hidden w-64 gap-8 lg:flex lg:flex-col">
          <PostActions
            rawMarkdown={rawMarkdown}
            githubHistoryUrl={githubHistoryUrl}
          />
          <PostToc content={page.content} />
        </aside>
      </div>
      <div className="lg:hidden">
        <PostToc content={page.content} variant="floating" />
      </div>
    </Container>
  );
}
