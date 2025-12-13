import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { Component } from './_components';

export const permissions = [PERMISSIONS.ADMIN.READ_CLIENT];

const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
    url: '/backoffice',
    active: false,
  },
  {
    title: 'Client Managements',
    url: '/backoffice/clients',
    active: false,
  },
  {
    title: 'Client',
    url: `/backoffice/clients/${clientId}`,
    active: true,
  },
];

type Props = PageProps<'/backoffice/clients/[clientId]'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return (
    <PageScreen title="Client Information" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
