'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { Badge } from '~/components/ui/badge';
import {
  SidebarGroup as SidebarGroupComponent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '~/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { cn } from '~/lib/utils';
import { MenuItem } from './sidebar-app';

type Props = {
  section: {
    items: MenuItem[];
    group: string;
  };
};

export const SidebarGroup: FC<Props> = ({ section }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { state, isMobile } = useSidebar();
  const pathname = usePathname();

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]));
  };
  const isParentActive = (submenu?: Array<{ url: string }>) => submenu?.some((item) => pathname === item.url);
  const isActive = (url: string) => pathname === url;
  const showTooltip = state === 'collapsed' && !isMobile;

  return (
    <SidebarGroupComponent key={section.group}>
      <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {section.group}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => {
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedItems.includes(item.title);
            const itemIsActive = isActive(item.url) || (hasSubmenu && isParentActive(item.submenu));

            return (
              <SidebarMenuItem key={item.title}>
                {showTooltip ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <SidebarMenuButton
                        asChild={!hasSubmenu}
                        className={cn(
                          'w-full flex items-center justify-start hover:bg-accent hover:text-accent-foreground transition-colors',
                          itemIsActive && 'bg-accent text-accent-foreground font-medium',
                        )}
                        onClick={hasSubmenu ? () => toggleExpanded(item.title) : undefined}
                      >
                        {hasSubmenu ? (
                          <>
                            <div className="flex items-center gap-3">
                              {item.icon && <item.icon className="w-4 h-4" />}
                              <span>{item.title}</span>
                              {item.badge && (
                                <Badge variant={item.badge.variant} className="ml-auto text-xs px-1.5 py-0.5 h-5">
                                  {item.badge.count}
                                </Badge>
                              )}
                            </div>
                            <ChevronRight className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-90')} />
                          </>
                        ) : (
                          <Link href={item.url} className="flex items-center gap-3 w-full">
                            {item.icon && <item.icon className="w-4 h-4" />}
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge variant={item.badge.variant} className="rounded-full px-1 py-0 text-xs ml-auto h-5">
                                {item.badge.count}
                              </Badge>
                            )}
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center" sideOffset={5}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton
                    asChild={!hasSubmenu}
                    className={cn(
                      'w-full flex items-center justify-start hover:bg-accent hover:text-accent-foreground transition-colors',
                      itemIsActive && 'bg-accent text-accent-foreground font-medium',
                    )}
                    onClick={hasSubmenu ? () => toggleExpanded(item.title) : undefined}
                  >
                    {hasSubmenu ? (
                      <>
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant={item.badge.variant} className="ml-auto text-xs px-1.5 py-0.5 h-5">
                              {item.badge.count}
                            </Badge>
                          )}
                        </div>
                        <ChevronRight className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-90')} />
                      </>
                    ) : (
                      <Link href={item.url} className="flex items-center gap-3 w-full">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant={item.badge.variant} className="rounded-full px-1 py-0 text-xs ml-auto h-5">
                            {item.badge.count}
                          </Badge>
                        )}
                      </Link>
                    )}
                  </SidebarMenuButton>
                )}

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <SidebarMenuSub className="ml-4 mt-1">
                    {item.submenu?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={cn(
                            'px-4 py-1.5 \\text-sm hover:bg-accent hover:text-accent-foreground transition-colors',
                            isActive(subItem.url) && 'bg-accent text-accent-foreground font-medium',
                          )}
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroupComponent>
  );
};
