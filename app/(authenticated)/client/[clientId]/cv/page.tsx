import { Metadata } from 'next';
import { MetaRequest, SortOrder } from '~/common/types/meta';
import { PageScreen } from '~/components/layouts/page';
import { getQueryClient } from '~/lib/query/client';
import { url } from '~/lib/utils/converter';
import { CV } from '~/modules/cv/cv.type';
import { Component } from './_components';
import { queryGetCVs } from './_hooks/use-get-list-cv';

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

export default async function Page({ params, searchParams }: Props) {
  const querySearch = await searchParams;

  const query: MetaRequest<CV> = {
    page: querySearch.page ? Number(querySearch.page) : 1,
    per_page: querySearch.per_page ? Number(querySearch.per_page) : 10,
    search: querySearch.search as string,
    sort_by: querySearch.sort_by as keyof CV,
    sort_order: querySearch.order_by as SortOrder,
  };

  const { clientId } = await params;
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(queryGetCVs(clientId, query));
  const breadcrumbs = breadcrumbItems(clientId);

  return (
    <PageScreen title="Curriculum Vitae" breadcrumbs={breadcrumbs}>
      <Component />
    </PageScreen>
  );
}
