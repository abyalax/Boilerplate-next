'use client';

import { Table } from '~/components/fragments/table';
import { useColumns } from '../_hooks/use-columns';

export const ClientsTable = () => {
  const { columns, columnIds, initialColumnVisibility } = useColumns({
    defaultVisible: ['select', 'id', 'email', 'name', 'action'],
  });
  return (
    <Table
      data={{
        data: [],
        meta: {
          page: 0,
          per_page: 0,
          total_count: 0,
          total_pages: 0,
        },
      }}
      columns={columns}
      columnIds={columnIds as string[]}
      onClickRow={(data) => console.log(data.original)}
      enableFeature={{
        columnVisibilitySelector: {
          initialColumnVisibility,
        },
        engineSide: 'server_side',
        pagination: {
          perPageOptions: [5, 10, 20, 30, 40, 50, 100],
        },
      }}
    />
  );
};
