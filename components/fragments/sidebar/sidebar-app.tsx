'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ComponentType, SVGProps, useMemo } from 'react';
import { bottomItems, sidebarItems } from '~/common/const/sidebar';
import { useLayout } from '~/components/context/layout-provider';
import { SidebarGroup as SidebarGroupApp } from '~/components/fragments/sidebar/sidebar-group';
import { usePermissions } from '~/components/hooks/use-permissions';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar';
import { cn } from '~/lib/utils';
import { SidebarUser } from './sidebar-user';

export interface MenuItem {
  title: string;
  url: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: {
    count: number;
    variant: 'default' | 'destructive' | 'secondary' | 'outline';
  };
  submenu?: MenuItem[];
  permissions: string[];
}

export interface MenuGroup {
  group: string;
  items: MenuItem[];
}

interface SidebarAppProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  appName?: string;
  appLogo?: string;
}

export function SidebarApp({ user = { name: 'John Doe', email: 'john@example.com' } }: SidebarAppProps) {
  const { collapsible, variant } = useLayout();
  const { state } = useSidebar();
  const { clientId } = useParams<{ clientId: string }>();
  const pathname = usePathname();
  const { data } = useSession();
  const userPermission = data?.user?.permissions?.map((e) => e.key);
  const permissions = usePermissions(userPermission);
  const navigations = sidebarItems(clientId);

  // Memoize the filtered navigation items based on permissions
  const filteredNavigations = useMemo(() => {
    if (!permissions) return [];

    return navigations
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.permissions && permissions.checkPermissions(item.permissions)),
      }))
      .filter((section) => section.items.length > 0);
  }, [navigations, permissions]);

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      {/* Header with branding */}
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3">
          {state !== 'collapsed' && (
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm truncate">Analytica CVs</span>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        {/* Main Navigation Groups */}
        {filteredNavigations.map((section) => (
          <SidebarGroupApp section={section} key={section.group} />
        ))}

        {/* Bottom Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors',
                      isActive(item.url) && 'bg-accent text-accent-foreground font-medium',
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user info */}
      <SidebarFooter>
        <SidebarUser user={{ email: user.email, name: user.name }} />
      </SidebarFooter>
    </Sidebar>
  );
}
