import { Metadata } from 'next';
import { PageScreen } from '~/components/layouts/page';
import { Button } from '~/components/ui/button';
import { url } from '~/lib/utils/converter';
import { Component } from './_components';

export const metadata: Metadata = {
  title: 'Chats',
};
const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: url('/client/[clientId]', { clientId }),
    active: false,
  },
  {
    title: 'Chats',
    url: url('/client/[clientId]/chats', { clientId }),
    active: true,
  },
];

type Props = PageProps<'/client/[clientId]/chats'>;

export default async function Page({ params }: Readonly<Props>) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return (
    <PageScreen title="Chats" breadcrumbs={breadcrumbs} topActions={<Button>Download</Button>}>
      <Component />
    </PageScreen>
  );
}
