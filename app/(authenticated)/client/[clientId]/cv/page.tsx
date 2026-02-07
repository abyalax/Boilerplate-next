import { Metadata } from 'next';
import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Curriculum Vitae',
};

const breadcrumbItems = (clientId: string) => [
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
    active: true,
  },
];

type Props = PageProps<'/client/[clientId]/cv'>;

export default async function Page({ params }: Readonly<Props>) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);

  return (
    <PageScreen title="Curriculum Vitae" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
