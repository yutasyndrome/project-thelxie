'use client';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { APP_VERSION } from '@/lib/constants';
import {
  Home,
  Info,
  MapPinned,
  Newspaper,
  ShieldUser,
  Tag,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Posts',
    url: '/posts/page/1',
    icon: Newspaper,
  },
  {
    title: 'Interactive Map',
    url: '/map',
    icon: MapPinned,
  },
  {
    title: 'Achievements',
    url: '/achievements',
    icon: Trophy,
  },
  {
    title: 'Information',
    url: '/info',
    icon: Info,
  },
  {
    title: 'Privacy Policy',
    url: '/privacy',
    icon: ShieldUser,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isPostsMenu = item.url.startsWith('/posts');
                  const active =
                    pathname === item.url ||
                    (isPostsMenu && pathname?.startsWith('/posts'));

                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="mb-1 last:mb-0"
                    >
                      <SidebarMenuButton
                        asChild
                        className={`px-5 py-6 text-base ${active ? 'bg-azur-500! hover:bg-azur-500! font-semibold! text-white! hover:text-white!' : ''}`}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-4"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center justify-center">
              <Button variant="outline" size="sm">
                <Tag className="mr-0.5 text-green-400" /> {`v${APP_VERSION}`}
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
