import { Metadata } from 'next';

import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { Button } from '~/components/ui/button';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export const permissions = [PERMISSIONS.CLIENT.READ_CV];
const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: url('/[clientId]', { clientId }),
    active: false,
  },
  {
    title: 'Dashboard',
    url: url('/[clientId]/dashboard', { clientId }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]/dashboard'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return (
    <PageScreen title="Dashboard" breadcrumbs={breadcrumbs} topActions={<Button>Download</Button>}>
      <Component />
    </PageScreen>
  );
}
