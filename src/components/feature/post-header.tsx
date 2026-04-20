'use client';

import { Badge } from '@/components/ui/badge';
import { normalizeTagPathSegment } from '@/lib/utils';
import { PostType } from '@/types/post';
import Link from 'next/link';
import { MdOutlineCalendarToday, MdOutlineEditCalendar } from 'react-icons/md';
import { RiHashtag } from 'react-icons/ri';

export default function PostHeader({
  title,
  date,
  update = '',
  coverImage = '',
  tags = [],
}: PostType) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl">
      <img
        src={coverImage}
        alt={`${title}_cover`}
        className="h-auto max-w-4xl object-contain"
      />
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/posts/tag/${encodeURIComponent(normalizeTagPathSegment(tag))}/page/1`}
            className="inline-block"
          >
            <Badge
              variant="outline"
              className="hover:bg-accent h-7 cursor-pointer text-xs font-medium"
            >
              <RiHashtag />
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          {update ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <MdOutlineCalendarToday className="text-muted-foreground" />
                <span className="text-muted-foreground text-xs">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineEditCalendar className="text-muted-foreground" />
                <span className="text-muted-foreground text-xs">{update}</span>
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
    </div>
  );
}
