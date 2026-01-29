import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';

export default function PostPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <Pagination className="py-6">
      <PaginationContent className="gap-1">
        <PaginationItem>
          {isFirst ? (
            <PaginationLink href="" size="icon" disabled>
              <ChevronFirstIcon className="size-5" />
            </PaginationLink>
          ) : (
            <PaginationLink href="/posts/page/1" size="icon">
              <ChevronFirstIcon className="size-5" />
            </PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem>
          {isFirst ? (
            <PaginationLink href="" size="icon" disabled>
              <ChevronLeftIcon className="size-5" />
            </PaginationLink>
          ) : (
            <PaginationLink
              href={`/posts/page/${Math.max(1, currentPage - 1)}`}
              size="icon"
            >
              <ChevronLeftIcon className="size-5" />
            </PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem className="mx-2">
          <p
            className="text-muted-foreground w-auto p-2 text-center text-sm"
            aria-live="polite"
          >
            Page <span className="text-foreground">{currentPage}</span> of{' '}
            <span className="text-foreground">{totalPages}</span>
          </p>
        </PaginationItem>
        <PaginationItem>
          {isLast ? (
            <PaginationLink href="" size="icon" disabled>
              <ChevronRightIcon className="size-5" />
            </PaginationLink>
          ) : (
            <PaginationLink
              href={`/posts/page/${Math.min(totalPages, currentPage + 1)}`}
              size="icon"
            >
              <ChevronRightIcon className="size-5" />
            </PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem>
          {isLast ? (
            <PaginationLink href="" size="icon" disabled>
              <ChevronLastIcon className="size-5" />
            </PaginationLink>
          ) : (
            <PaginationLink href={`/posts/page/${totalPages}`} size="icon">
              <ChevronLastIcon className="size-5" />
            </PaginationLink>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
