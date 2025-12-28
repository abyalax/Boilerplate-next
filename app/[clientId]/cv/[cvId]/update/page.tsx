import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

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
    title: 'CV',
    url: url('/[clientId]/cv', { clientId }),
    active: false,
  },
  {
    title: 'Update',
    url: url('/[clientId]/cv/[cvId]/update', { clientId, cvId }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]/cv/[cvId]/update'>;

export default async function Page({ params }: Props) {
  const { cvId, clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId, cvId);

  return (
    <PageScreen title="Update CV" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
