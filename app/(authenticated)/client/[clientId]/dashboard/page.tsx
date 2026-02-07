import { Metadata } from 'next';
import { PageScreen } from '~/components/layouts/page';
import { Button } from '~/components/ui/button';
import { url } from '~/lib/utils/converter';

export const metadata: Metadata = {
  title: 'Dashboard',
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
    active: true,
  },
];

type Props = PageProps<'/client/[clientId]/dashboard'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return <PageScreen title="Dashboard" breadcrumbs={breadcrumbs} topActions={<Button>Download</Button>} />;
}
