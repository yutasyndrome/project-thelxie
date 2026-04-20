'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCssVarPx } from '@/lib/utils';
import GithubSlugger from 'github-slugger';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LuList } from 'react-icons/lu';

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type TocProps = {
  content: string;
  variant?: 'default' | 'floating';
  onSelect?: (id: string) => void;
};

export default function PostToc({
  content,
  variant = 'default',
  onSelect,
}: TocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const tocItems = useMemo((): TocItem[] => {
    const slugger = new GithubSlugger();
    const lines = content.split('\n');
    const items: TocItem[] = [];

    for (const line of lines) {
      const match = line.match(/^(#{1,6})\s+(.+)/);
      if (!match) continue;

      const hashes = match[1];
      const rawText = match[2];
      const level = hashes.length;
      const text = rawText.trim();
      const id = slugger.slug(text);

      if (level === 1) {
        items.push({ id, text, level: 1 });
      } else if (level === 2) {
        items.push({ id, text, level: 2 });
      }
    }

    return items;
  }, [content]);

  const getActiveOffset = () => getCssVarPx('--header-height') + 16;

  useEffect(() => {
    if (tocItems.length === 0) return;
    let rafId: number | null = null;

    const updateActiveByScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const activeOffset = getActiveOffset();

        const infos = tocItems
          .map((it) => {
            const el = document.getElementById(it.id);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return { id: it.id, top: rect.top };
          })
          .filter(Boolean) as { id: string; top: number }[];

        if (!infos.length) return;

        const candidates = infos.filter((info) => info.top <= activeOffset);

        let pickedId: string;
        if (candidates.length) {
          candidates.sort((left, right) => right.top - left.top);
          pickedId = candidates[0].id;
        } else {
          infos.sort((left, right) => left.top - right.top);
          pickedId = infos[0].id;
        }

        setActiveId((prev) => (prev === pickedId ? prev : pickedId));
      });
    };

    updateActiveByScroll();
    window.addEventListener('scroll', updateActiveByScroll, { passive: true });
    window.addEventListener('resize', updateActiveByScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateActiveByScroll);
      window.removeEventListener('resize', updateActiveByScroll);
    };
  }, [tocItems]);

  useEffect(() => {
    const syncActiveByHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''));

      if (!hash) return;

      const hasMatchingItem = tocItems.some((item) => item.id === hash);
      if (hasMatchingItem) {
        setActiveId(hash);
      }
    };

    syncActiveByHash();
    window.addEventListener('hashchange', syncActiveByHash);

    return () => {
      window.removeEventListener('hashchange', syncActiveByHash);
    };
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const targetTop =
      window.scrollY + el.getBoundingClientRect().top - getActiveOffset() + 1;

    setActiveId(id);
    onSelect?.(id);
    window.history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: Math.max(0, targetTop) });
  };

  const tocList = (
    <ul
      className={
        variant === 'floating'
          ? 'space-y-2 px-5 py-3 text-sm text-gray-500'
          : 'max-h-[calc(100vh-var(--header-height)-9rem)] space-y-2 overflow-y-scroll text-sm text-gray-500'
      }
    >
      {tocItems.map((it) => {
        const isActive = it.id === activeId;
        const isParent = it.level === 1;
        return (
          <li key={it.id} className="flex items-start gap-2">
            <span className="flex h-5 w-4 shrink-0 items-center justify-center">
              <span
                className={`${isParent ? 'h-2 w-2' : 'h-1 w-1'} rounded-full ${isActive ? 'bg-azur-500' : 'bg-azur-300 dark:bg-azur-700'}`}
              />
            </span>
            <a
              href={`#${it.id}`}
              className={`${isParent ? 'font-semibold' : ''} ${isActive ? 'text-primary' : ''}`}
              onClick={(e) => {
                e.preventDefault();

                if (variant === 'floating') {
                  setTocOpen(false);
                  scrollToHeading(it.id);
                  return;
                }

                scrollToHeading(it.id);
              }}
            >
              {it.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (variant === 'floating') {
    return (
      <Dialog open={tocOpen} onOpenChange={setTocOpen}>
        <DialogTrigger asChild>
          <button className="bg-primary text-primary-foreground fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow-lg">
            <LuList className="size-5" />
          </button>
        </DialogTrigger>
        <DialogContent
          ref={dialogContentRef}
          tabIndex={-1}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            dialogContentRef.current?.focus();
          }}
          className="flex max-h-[min(600px,80vh)] flex-col gap-0 p-0 sm:max-w-md"
        >
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="border-b px-6 py-4">
              Table of Contents
            </DialogTitle>
            <ScrollArea className="flex max-h-full flex-col overflow-hidden">
              {tocList}
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <nav className="sticky top-[calc(var(--header-height)+2rem)] flex flex-col gap-4 rounded-lg border p-5">
      <div className="flex items-center gap-3">
        <LuList className="size-5" />
        <div className="font-bold">Table of Contents</div>
      </div>
      {tocList}
    </nav>
  );
}
