'use client';

import { Button } from '@/components/ui/button';
import { Clipboard, UserRoundCog } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { toast } from 'sonner';

type PostActionsProps = {
  rawMarkdown: string;
  githubHistoryUrl: string;
  variant?: 'default' | 'compact';
};

export default function PostActions({
  rawMarkdown,
  githubHistoryUrl,
  variant = 'default',
}: PostActionsProps) {
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(rawMarkdown);
      } else {
        /*
        const textarea = document.createElement('textarea');
        textarea.value = rawMarkdown;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        */
      }
      toast.success('Markdown をクリップボードにコピーしました', {
        style: {
          '--normal-bg': 'var(--background)',
          '--normal-text':
            'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-400))',
        } as React.CSSProperties,
      });
    } catch {
      toast.error('Markdown のコピーに失敗しました', {
        style: {
          '--normal-bg': 'var(--background)',
          '--normal-text': 'var(--destructive)',
          '--normal-border': 'var(--destructive)',
        } as React.CSSProperties,
      });
    }
  };

  return (
    <nav
      className={
        variant === 'compact'
          ? 'flex flex-col gap-4'
          : 'flex flex-col gap-4 rounded-lg border p-5'
      }
    >
      {variant === 'default' && (
        <div className="flex items-center gap-3">
          <UserRoundCog className="size-5" />
          <div className="font-bold">Actions</div>
        </div>
      )}

      <Button
        variant="outline"
        className="w-full cursor-pointer"
        onClick={handleCopy}
      >
        <Clipboard />
        Markdown をコピーする
      </Button>

      <Button variant="outline" className="w-full cursor-pointer" asChild>
        <a href={githubHistoryUrl} target="_blank" rel="noopener noreferrer">
          <FaGithub />
          GitHub で変更履歴を見る
        </a>
      </Button>
    </nav>
  );
}
