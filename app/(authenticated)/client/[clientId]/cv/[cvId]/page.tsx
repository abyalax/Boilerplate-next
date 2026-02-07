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
    url: url('/client/[clientId]/dashboard', { clientId }),
    active: false,
  },
  {
    title: 'CV',
    url: url('/client/[clientId]/cv', { clientId }),
    active: false,
  },
  {
    title: 'Detail',
    url: url('/client/[clientId]/cv/[cvId]', { clientId, cvId }),
    active: true,
  },
];

type Props = PageProps<'/client/[clientId]/cv/[cvId]'>;

export default async function Page({ params }: Props) {
  const { cvId, clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId, cvId);

  return (
    <PageScreen title="Detail CV" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
