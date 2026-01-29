'use client';

import { getCssVarPx } from '@/lib/utils';
import GithubSlugger from 'github-slugger';
import { useEffect, useMemo, useState } from 'react';

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type TocProps = {
  content: string;
  onSelect?: (id: string) => void;
};

export default function PostToc({ content, onSelect }: TocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

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

  useEffect(() => {
    if (tocItems.length === 0) return;
    let rafId: number | null = null;

    const updateActiveByScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const headerHeight = getCssVarPx('--header-height');

        const infos = tocItems
          .map((it) => {
            const el = document.getElementById(it.id);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return { id: it.id, top: rect.top };
          })
          .filter(Boolean) as { id: string; top: number }[];

        if (!infos.length) return;

        const candidates = infos.filter((i) => i.top <= headerHeight);

        let pickedId: string;
        if (candidates.length) {
          candidates.sort((a, b) => b.top - a.top);
          pickedId = candidates[0].id;
        } else {
          infos.sort((a, b) => a.top - b.top);
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

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-(--header-height) flex flex-col gap-4 p-5">
      <div className="font-bold">Table of Contents</div>
      <ul className="max-h-[calc(100vh-var(--header-height)-6rem)] space-y-2 overflow-y-scroll text-sm text-gray-500">
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
                className={`${isParent ? 'font-semibold' : ''} hover:text-primary ${isActive ? 'text-primary' : ''}`}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
