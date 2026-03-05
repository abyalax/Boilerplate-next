'use client';

import { FC } from 'react';
import { useGetCV } from '../_hooks/use-get-cv';

type Props = {
  clientId: string;
  cvId: string;
};

export const Component: FC<Props> = ({ clientId, cvId }) => {
  const { data } = useGetCV(clientId, cvId);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};
