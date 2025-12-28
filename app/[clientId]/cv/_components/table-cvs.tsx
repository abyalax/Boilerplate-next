'use client';

import { MailCheck, PlusIcon, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { metaRequestSchema } from '~/common/types/meta';
import { Table } from '~/components/fragments/table';
import { useSearch } from '~/components/hooks/use-search';
import { Flex } from '~/components/layouts/flex';
import { Button } from '~/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { url } from '~/lib/utils/converter';
import { useColumns } from '../_hooks/use-columns';
import { useGetCVs } from '../_hooks/use-get-list-cv';
import { ExpandRow } from './expand-row';
import { Filters } from './filters';
import { UploadCV } from './upload-cv';

export const TableCVs = () => {
  const search = useSearch(metaRequestSchema);
  const { clientId } = useParams<{ clientId: string }>();
  const { data } = useGetCVs(clientId, search);
  const { columns, columnIds, initialColumnVisibility } = useColumns();
  const { push } = useRouter();

  const handleCreate = () => push(url('/[clientId]/cv/create', { clientId }));

  const topActions = () => (
    <Flex>
      <UploadCV />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleCreate} variant={'outline'}>
            <PlusIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add New CV</TooltipContent>
      </Tooltip>
    </Flex>
  );

  return (
    <Table
      data={data}
      columns={columns}
      columnIds={columnIds}
      onClickRow={(data) => console.log(data)}
      freezeColumnIds={['select', 'name']}
      topActions={topActions()}
      initialColumnVisibility={initialColumnVisibility}
      pagination={true}
      menufilter={Filters()}
      engineSide="server_side"
      expandedRow={(data) => <ExpandRow data={data} />}
      bulkActions={[
        { icon: <MailCheck />, label: 'Send To Email', onClick: () => toast.info('Success gess') },
        { icon: <Trash2 />, label: 'Remove Data', onClick: () => toast.info('Success gess') },
        { icon: <MailCheck />, label: 'Send To Email', onClick: () => toast.info('Success gess') },
        { icon: <Trash2 />, label: 'Remove Data', onClick: () => toast.info('Success gess') },
      ]}
      facetedFilter={[
        {
          columnId: 'name',
          title: 'Name',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Invited', value: 'invited' },
            { label: 'Suspended', value: 'suspended' },
          ],
        },
      ]}
    />
  );
};
