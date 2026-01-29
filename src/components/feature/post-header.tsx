'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { firstChars } from '@/lib/utils';
import { PostType } from '@/types/post';
import Link from 'next/link';
import { MdOutlineCalendarToday, MdOutlineEditCalendar } from 'react-icons/md';
import { RiHashtag } from 'react-icons/ri';

export default function PostHeader({
  title,
  date,
  update = '',
  coverImage = '',
  author = { name: '', url: '' },
  tags = [],
}: PostType) {
  return (
    <div className="flex flex-col gap-5">
      <img src={coverImage} alt={`${title}_cover`} />
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/posts/tag/${encodeURIComponent(tag)}/page/1`}
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
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage src={author.url} alt={author.name} />
            <AvatarFallback>{firstChars(author.name, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground text-xs">{author.name}</span>
        </div>
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
