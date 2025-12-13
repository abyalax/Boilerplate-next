'use client';

import { QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren } from 'react';
import { getQueryClient } from '~/lib/query/client';

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient();
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      {isDevelopment && <ReactQueryDevtools position="left" />}
    </ReactQueryClientProvider>
  );
};
