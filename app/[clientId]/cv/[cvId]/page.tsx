import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

export const permissions = [PERMISSIONS.CLIENT.READ_CV];

const breadcrumbItems = (clientId: string, cvId: string) => [
  {
    title: 'Home',
    url: '/',
    active: false,
  },
  {
    title: 'Dashboard',
    url: url('/[clientId]/dashboard', { clientId }),
    active: false,
  },
  {
    title: 'Manage CVs',
    url: url('/[clientId]/cv', { clientId }),
    active: false,
  },
  {
    title: 'CV',
    url: url('/[clientId]/cv/[cvId]', { clientId, cvId }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]/cv/[cvId]'>;

export default async function Page({ params }: Props) {
  const { cvId, clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId, cvId);

  return (
    <PageScreen title="Detail CV" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
