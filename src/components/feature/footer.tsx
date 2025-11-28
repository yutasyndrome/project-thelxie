import {
  FOOTER_COPYRIGHT,
  FOOTER_EXTERNAL_LINKS,
  PUBLICATION_YEAR,
  SITE_NAME,
} from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const yearText =
    PUBLICATION_YEAR === currentYear
      ? `${PUBLICATION_YEAR}`
      : `${PUBLICATION_YEAR}-${currentYear}`;

  return (
    <footer className="w-full border-t border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-black">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[13px] text-gray-500">
          © {yearText} {SITE_NAME}
          <br />
          {FOOTER_COPYRIGHT}
          <br />
          Powered by{' '}
          <a
            href={FOOTER_EXTERNAL_LINKS.nextjs}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary/80 underline underline-offset-4"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            href={FOOTER_EXTERNAL_LINKS.shadcn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary/80 underline underline-offset-4"
          >
            shadcn/ui
          </a>
          .
        </span>
      </div>
    </footer>
  );
}
