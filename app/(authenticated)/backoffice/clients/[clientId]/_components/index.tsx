'use client';

import { FC } from 'react';
import { H1 } from '~/components/ui/typography';

export const Component: FC = () => {
  return (
    <div>
      <H1>Detail User</H1>
      <pre>
        <code>{JSON.stringify([], null, 2)}</code>
      </pre>
    </div>
  );
};
