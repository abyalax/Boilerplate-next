'use client';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '~/components/provider/query-client';
import { ThemeProvider } from '~/components/provider/theme';
import { DirectionProvider } from '../context/direction-provider';
import { FontProvider } from '../context/font-provider';
import { LayoutProvider } from '../context/layout-provider';
import { SearchProvider } from '../context/search-provider';
import { NavigationProgress } from '../fragments/progress/navigation-progress';
import { Toaster } from '../ui/toaster';

interface ProviderProps extends PropsWithChildren {
  dehydratedState?: DehydratedState | null;
}

export const Providers: FC<ProviderProps> = ({ children, dehydratedState }) => {
  return (
    <SessionProvider>
      <QueryClientProvider>
        <HydrationBoundary state={dehydratedState}>
          <ThemeProvider>
            <FontProvider>
              <DirectionProvider>
                <SearchProvider>
                  <LayoutProvider>
                    <Toaster />
                    <NavigationProgress />
                    {children}
                  </LayoutProvider>
                </SearchProvider>
              </DirectionProvider>
            </FontProvider>
          </ThemeProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </SessionProvider>
  );
};
