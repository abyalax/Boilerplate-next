import { Metadata } from 'next';
import { PERMISSIONS } from '~/common/const/permission';
import { PageScreen } from '~/components/layouts/page';
import { url } from '~/lib/utils/converter';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Client dashboard for managing users, settings, and system configurations',
  keywords: 'client, dashboard, management, users, settings',
};

export const permissions = [PERMISSIONS.CLIENT.READ_CV];
const breadcrumbItems = (clientId: string) => [
  {
    title: 'Home',
    url: url('/[clientId]', { clientId }),
    active: false,
  },
  {
    title: 'Dashboard',
    url: url('/[clientId]/dashboard', { clientId }),
    active: true,
  },
];

type Props = PageProps<'/[clientId]'>;

export default async function Page({ params }: Props) {
  const { clientId } = await params;
  const breadcrumbs = breadcrumbItems(clientId);
  return <PageScreen title="Dashboard" breadcrumbs={breadcrumbs} />;
}
