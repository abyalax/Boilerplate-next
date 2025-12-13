'use client';

import { FC, Fragment, PropsWithChildren, ReactNode } from 'react';
import { BreadcrumbProps, Breadcrumbs } from '~/app/_components/ui/app-breadcrumbs';
import { ToggleTheme } from '~/app/_components/ui/toggle-theme';
import { SidebarApp } from '~/components/fragments/sidebar/sidebar-app';
import { H3 } from '~/components/ui/typography';
import { cn } from '~/lib/utils';
import { ConfigDrawer } from '../fragments/config/config-drawer';
import { AppSearch } from '../fragments/input/app-search';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { Flex } from './flex';
import { Header } from './header';
import { Main } from './main';

interface PageScreenProps extends PropsWithChildren {
  title: string;
  breadcrumbs: BreadcrumbProps[];
  topActions?: ReactNode;
}

export const PageScreen: FC<PageScreenProps> = ({ title, breadcrumbs, children, topActions }) => {
  return (
    <SidebarProvider>
      <SidebarApp />
      <SidebarInset
        className={cn(
          // Set content container, so we can use container queries
          '@container/content',
          // If layout is fixed, set the height
          // to 100svh to prevent overflow
          'has-data-[layout=fixed]:h-svh',

          // If layout is fixed and sidebar is inset,
          // set the height to 100svh - spacing (total margins) to prevent overflow
          'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]',
        )}
      >
        <Header>
          <AppSearch />
          <div className="ms-auto flex items-center space-x-4">
            <ToggleTheme />
            <ConfigDrawer />
          </div>
        </Header>
        <Main fixed fluid>
          <Flex direction="row" justify="space-between" className="gap-4 mb-4">
            <Flex direction="column" gap={20}>
              <H3 className="text-start">{title}</H3>
              <Breadcrumbs items={breadcrumbs} />
            </Flex>
            {topActions}
          </Flex>
          {children}
        </Main>
      </SidebarInset>
    </SidebarProvider>
  );
};
