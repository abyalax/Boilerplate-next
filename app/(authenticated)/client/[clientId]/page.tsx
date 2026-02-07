import { Metadata } from 'next';
import { PageScreen } from '~/components/layouts/page';
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
];

type Props = PageProps<'/client/[clientId]'>;

export default async function Page({ params }: Readonly<Props>) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return <PageScreen title="Dashboard" breadcrumbs={breadcrumbs} />;
}
