'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Main } from '~/components/layouts/main';
import { FormCV } from '../../../_components/form';
import { FormDataCV } from '../../../_components/form/schema';
import { useGetCV } from '../../../_hooks/use-get-cv';
import { useUpdateCV } from '../../../_hooks/use-update-cv';

type Params = Awaited<PageProps<'/[clientId]/cv/[cvId]'>['params']>;

export const Component: FC = () => {
  const { clientId, cvId } = useParams<Params>();
  const { data } = useGetCV(clientId, cvId);

  const { mutate: updateCV } = useUpdateCV(clientId, cvId);

  const onSubmit = (values: FormDataCV) => {
    console.log('submit', values);
    updateCV(values);
  };

  return (
    <Main fixed>
      <FormCV onSubmit={onSubmit} initialValues={data as FormDataCV} buttonText="Update" />
    </Main>
  );
};
