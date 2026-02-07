import { Metadata } from 'next';
import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Analyze CV',
};

const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: url('/client/[clientId]', { clientId }),
    active: false,
  },
  {
    title: 'Dashboard',
    url: url('/client/[clientId]/dashboard', { clientId }),
    active: false,
  },
  {
    title: 'Analyze CV',
    url: url('/client/[clientId]/analyze', { clientId }),
    active: true,
  },
];

type Props = PageProps<'/client/[clientId]/analyze'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return (
    <PageScreen title="Analyze CV" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
