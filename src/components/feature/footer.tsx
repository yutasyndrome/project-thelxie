import { PUBLICATION_YEAR } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const yearText =
    PUBLICATION_YEAR === currentYear
      ? `${PUBLICATION_YEAR}`
      : `${PUBLICATION_YEAR}-${currentYear}`;

  return (
    <footer className="mw-full border-t border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[13px] text-gray-500">
          © {yearText} Project Thelxie
          <br />
          当サイトにおいて引用されているゲーム内コンテンツの著作権,
          商標権及びその他の知的財産権は COGNOSPHERE PTE. LTD. に帰属します.
          <br />
          Powered by{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary/80 underline underline-offset-4"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            href="https://ui.shadcn.com/"
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
