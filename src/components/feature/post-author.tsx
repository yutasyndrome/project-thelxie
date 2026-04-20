import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AUTHOR_LINKS } from '@/lib/constants';
import { firstChars } from '@/lib/utils';
import { UserRoundPen } from 'lucide-react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

export default function PostAuthor({
  author = { name: '', url: '' },
  variant = 'default',
}: {
  author: {
    name: string;
    url: string;
  };
  variant?: 'default' | 'compact';
}) {
  const authorLinks = AUTHOR_LINKS[author.name as keyof typeof AUTHOR_LINKS];

  if (variant === 'compact') {
    return (
      <nav className="flex items-center gap-4 py-3">
        <Avatar className="size-7">
          <AvatarImage src={author.url} alt={author.name} />
          <AvatarFallback>{firstChars(author.name, 2)}</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">{author.name}</span>
        <div className="flex items-center gap-4">
          <a
            href={authorLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="hover:text-primary/80 h-5 w-5 text-gray-500" />
          </a>
          <a href={authorLinks.x} target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="hover:text-primary/80 h-5 w-5 text-gray-500" />
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-4 rounded-lg border p-5">
      <div className="flex items-center gap-3">
        <UserRoundPen className="size-5" />
        <div className="font-bold">Author</div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar className="size-7">
          <AvatarImage src={author.url} alt={author.name} />
          <AvatarFallback>{firstChars(author.name, 2)}</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground text-xs">{author.name}</span>
      </div>
      <div className="ml-1 flex items-center gap-5">
        <a href={authorLinks.github} target="_blank" rel="noopener noreferrer">
          <Tooltip>
            <TooltipTrigger asChild>
              <FaGithub className="hover:text-primary/80 h-5 w-5 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>GitHubリポジトリ</TooltipContent>
          </Tooltip>
        </a>
        <a href={authorLinks.x} target="_blank" rel="noopener noreferrer">
          <Tooltip>
            <TooltipTrigger asChild>
              <FaXTwitter className="hover:text-primary/80 h-5 w-5 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>Xアカウント</TooltipContent>
          </Tooltip>
        </a>
      </div>
    </nav>
  );
}
