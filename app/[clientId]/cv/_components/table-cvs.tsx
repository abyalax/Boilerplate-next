'use client';

import { useParams } from 'next/navigation';
import { metaRequestSchema } from '~/common/types/meta';
import { Table } from '~/components/fragments/table';
import { useSearch } from '~/components/hooks/use-search';
import { useColumns } from '../_hooks/use-columns';
import { useGetCVs } from '../_hooks/use-get-list-cv';
import { Filters } from './filters';
import { UploadCV } from './upload-cv';

export const TableCVs = () => {
  const search = useSearch(metaRequestSchema);

  const { clientId } = useParams<{ clientId: string }>();

  const { data } = useGetCVs(clientId, search);

  const { columns, columnIds, initialColumnVisibility } = useColumns();

  return (
    <Table
      data={data}
      columns={columns}
      columnIds={columnIds}
      onClickRow={(data) => console.log(data.original)}
      freezeColumnIds={['select', 'name']}
      topActions={<UploadCV />}
      enableFeature={{
        columnVisibilitySelector: {
          initialColumnVisibility,
        },
        pagination: {
          perPageOptions: [5, 10, 20, 30, 40, 50, 100],
        },
        menufilter: Filters(),
        engineSide: 'server_side',
        facetedFilter: [
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
        ],
      }}
    />
  );
};
