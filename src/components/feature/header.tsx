import ModeToggle from '@/components/feature/mode-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SITE_NAME } from '@/lib/constants';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-border bg-background/50 dark:bg-background/50 fixed top-0 left-0 z-50 h-(--header-height) w-full border-b backdrop-blur">
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center">
          <SidebarTrigger />
          <Link href="/" className="m-0 ml-3 text-lg font-semibold">
            {SITE_NAME}
          </Link>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
