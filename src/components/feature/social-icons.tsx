import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { SOCIAL_LINKS } from "@/lib/constants";
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function SocialIcons() {
  return (
    <div className="mx-2 flex gap-6 sm:gap-5">
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <FaGithub className="h-5 w-5 text-gray-500 hover:text-primary/80" />
          </TooltipTrigger>
          <TooltipContent>GitHubリポジトリ</TooltipContent>
        </Tooltip>
      </a>
      <a
        href={SOCIAL_LINKS.discord}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <FaDiscord className="h-5 w-5 text-gray-500 hover:text-primary/80" />
          </TooltipTrigger>
          <TooltipContent>Discordコミュニティサーバー</TooltipContent>
        </Tooltip>
      </a>
      <a
        href={SOCIAL_LINKS.x}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <FaXTwitter className="h-5 w-5 text-gray-500 hover:text-primary/80" />
          </TooltipTrigger>
          <TooltipContent>開発者Xアカウント</TooltipContent>
        </Tooltip>
      </a>
    </div>
  );
}