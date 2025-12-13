import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Checkbox } from '~/components/ui/checkbox';
import { CV } from '~/modules/cv/cv.type';
import { ActionColumn } from '../_components/action-column';

const columnHelper = createColumnHelper<CV>();
export type TCVColumn = keyof CV | 'select' | 'action';

type Params = {
  defaultVisible: TCVColumn[];
};

export const useColumns = (params?: Params) => {
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            className="cursor-pointer mx-3 hover:bg-secondary/50"
            checked={table.getIsAllRowsSelected() ? true : table.getIsSomeRowsSelected() ? 'indeterminate' : false}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="cursor-pointer mx-3 hover:bg-secondary/50"
            checked={row.getIsSelected()}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 50,
      }),
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
        size: 200,
        footer: 'Name',
      }),
      columnHelper.accessor('email', {
        id: 'email',
        header: 'Email',
      }),
      columnHelper.accessor('about', {
        id: 'about',
        header: 'Description',
      }),
      columnHelper.accessor('address', {
        id: 'address',
        header: 'Address',
      }),
      columnHelper.accessor('certificate.title', {
        id: 'certificate',
        header: 'Sertifikat',
        cell: ({ row }) => row.original.certificate?.at(-1)?.title,
      }),
      columnHelper.accessor('experience.role', {
        id: 'experience',
        header: 'Experience',
        cell: ({ row }) => row.original.experience?.at(-1)?.role,
      }),
      columnHelper.accessor('education.name', {
        id: 'education',
        header: 'Education',
        cell: ({ row }) => row.original.education.at(-1)?.name,
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => <ActionColumn record={info.row.original} />,
      }),
    ],
    [],
  );

  const columnIds = useMemo(() => columns.map((col) => col.id ?? ''), [columns]);

  const initialColumnVisibility = useMemo(() => {
    const allVisible = !params?.defaultVisible;
    return columnIds.reduce(
      (acc, val) => {
        acc[val as TCVColumn] = allVisible ? true : (params.defaultVisible.includes(val as TCVColumn) ?? false);
        return acc;
      },
      {} as Record<TCVColumn, boolean>,
    );
  }, [columnIds, params?.defaultVisible]);

  return { columns, initialColumnVisibility, columnIds };
};
