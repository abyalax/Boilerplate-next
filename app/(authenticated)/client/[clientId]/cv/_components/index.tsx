'use client';

import { FC, Suspense } from 'react';
import { FallBack } from '~/components/fragments/fallback';
import { TableCVs } from './table-cvs';

export const Component: FC = () => {
  return (
    <Suspense fallback={<FallBack />}>
      <TableCVs />
    </Suspense>
  );
};
