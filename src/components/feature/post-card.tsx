'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { excerptFromMarkdown, firstChars } from '@/lib/utils';
import { PostType } from '@/types/post';
import { Pin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { MdOutlineCalendarToday, MdOutlineEditCalendar } from 'react-icons/md';
import { RiHashtag } from 'react-icons/ri';

export default function PostCard({
  slug,
  title,
  date,
  update = '',
  coverImage = '',
  author = { name: '', url: '' },
  tags = [],
  fix = false,
  content,
}: PostType) {
  const excerpt = excerptFromMarkdown(content);
  const router = useRouter();

  const handleActivate = useCallback(() => {
    router.push(`/posts/${encodeURIComponent(slug)}`);
  }, [router, slug]);

  return (
    <Card
      className="hover:bg-muted/50 hover:ring-azur-500 w-auto cursor-pointer pt-0 hover:ring-1"
      onClick={handleActivate}
    >
      <CardContent className="px-0">
        <img
          src={coverImage}
          className="aspect-video rounded-t-xl object-cover"
        />
      </CardContent>
      <CardHeader className="gap-1">
        <CardDescription className="flex items-center gap-2 pb-3">
          {fix && (
            <Badge
              variant="outline"
              className="bg-azur-500 h-7 text-xs text-white"
            >
              <Pin className="mr-1 size-3" />
              Pinned
            </Badge>
          )}
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/posts/tag/${encodeURIComponent(tag)}/page/1`}
              onClick={(e) => e.stopPropagation()}
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
        </CardDescription>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-3 overflow-hidden">
          {excerpt}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between gap-3">
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage src={author.url} alt={author.name} />
            <AvatarFallback>{firstChars(author.name, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground text-xs">{author.name}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          {update ? (
            <>
              <MdOutlineEditCalendar className="text-muted-foreground" />
              <span className="text-muted-foreground text-xs">
                {date} (Edited)
              </span>
            </>
          ) : (
            <>
              <MdOutlineCalendarToday className="text-muted-foreground" />
              <span className="text-muted-foreground text-xs">{date}</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
