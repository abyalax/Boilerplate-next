'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Main } from '~/components/layouts/main';
import { FormCV } from '../../_components/form/form-cv';
import { FormDataCV } from '../../_components/form/schema-cv';
import { useCreateCV } from '../../_hooks/use-create-cv';

type Params = Awaited<PageProps<'/client/[clientId]/cv/[cvId]'>['params']>;

export const Component: FC = () => {
  const { clientId } = useParams<Params>();

  const { mutate } = useCreateCV(clientId);

  const onSubmit = (values: FormDataCV) => {
    console.log('submit', values);
    mutate(values);
  };

  return (
    <Main fixed fluid scrollable>
      <FormCV onSubmit={onSubmit} buttonText="Create" />
    </Main>
  );
};
