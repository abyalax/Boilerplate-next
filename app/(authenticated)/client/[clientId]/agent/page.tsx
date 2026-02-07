import { Metadata } from 'next';
import { PageScreen } from '~/components/layouts/page';
import { Button } from '~/components/ui/button';
import { url } from '~/lib/utils/converter';

export const metadata: Metadata = {
  title: 'Agent',
};
const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: url('/client/[clientId]', { clientId }),
    active: false,
  },
  {
    title: 'Agent',
    url: url('/client/[clientId]/agent', { clientId }),
    active: true,
  },
];

type Props = PageProps<'/client/[clientId]/agent'>;

export default async function Page({ params }: Readonly<Props>) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return <PageScreen title="Agent" breadcrumbs={breadcrumbs} topActions={<Button>Download</Button>} />;
}
