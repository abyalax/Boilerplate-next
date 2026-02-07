import { Metadata } from 'next';
import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Manage CVs | Dashboard',
  description: 'Manage CV, ',
  keywords: 'cv, ats, etc',
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
    title: 'Chats Candidate',
    url: url('/client/[clientId]/chats', { clientId }),
    active: true,
  },
];

type Props = PageProps<'/client/[clientId]/chats'>;

export default async function Page({ params }: Readonly<Props>) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);

  return (
    <PageScreen title="Chat Candidates" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
