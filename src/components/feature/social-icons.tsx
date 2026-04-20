import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SOCIAL_LINKS } from '@/lib/constants';
import { FaDiscord, FaGithub, FaXTwitter } from 'react-icons/fa6';

export default function SocialIcons() {
  return (
    <div className="mx-2 flex gap-6 sm:gap-5">
      <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
        <Tooltip>
          <TooltipTrigger asChild>
            <FaGithub className="hover:text-primary/80 h-5 w-5 text-gray-500" />
          </TooltipTrigger>
          <TooltipContent>GitHub リポジトリ</TooltipContent>
        </Tooltip>
      </a>
      <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
        <Tooltip>
          <TooltipTrigger asChild>
            <FaDiscord className="hover:text-primary/80 h-5 w-5 text-gray-500" />
          </TooltipTrigger>
          <TooltipContent>Discord コミュニティサーバー</TooltipContent>
        </Tooltip>
      </a>
      <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer">
        <Tooltip>
          <TooltipTrigger asChild>
            <FaXTwitter className="hover:text-primary/80 h-5 w-5 text-gray-500" />
          </TooltipTrigger>
          <TooltipContent>公式 X アカウント</TooltipContent>
        </Tooltip>
      </a>
    </div>
  );
}
