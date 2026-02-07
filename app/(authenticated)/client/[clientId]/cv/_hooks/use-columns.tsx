import { createColumnHelper } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
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

      columnHelper.accessor('certificates', {
        id: 'certificate',
        header: 'Sertifikat',
        cell: ({ row }) => {
          const lastCert = row.original.certificates?.[row.original.certificates.length - 1];
          if (!lastCert) return '-';
          const year = lastCert.issuedYear ? ` (${lastCert.issuedYear})` : '';
          return `${lastCert.name}${year}`;
        },
      }),

      columnHelper.accessor('experiences', {
        id: 'experience',
        header: 'Experience',
        cell: ({ row }) => {
          const lastExp = row.original.experiences?.[row.original.experiences.length - 1];
          if (!lastExp) return '-';
          const start = lastExp.startDate ? new Date(lastExp.startDate).getFullYear() : '';
          const end = lastExp.endDate ? new Date(lastExp.endDate).getFullYear() : 'Present';
          return `${lastExp.role} @ ${lastExp.company} (${start} - ${end})`;
        },
      }),

      columnHelper.accessor('educations', {
        id: 'education',
        header: 'Education',
        cell: ({ row }) => {
          const lastEdu = row.original.educations?.[row.original.educations.length - 1];
          if (!lastEdu) return '-';
          return `${lastEdu.degree} @ ${lastEdu.field}`;
        },
      }),

      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: (info) => <ActionColumn record={info.row.original} />,
      }),
      columnHelper.display({
        id: 'expander',
        header: '',
        cell: ({ row }) => (
          <button
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
              console.log(row.getIsExpanded());
            }}
          >
            {row.getIsExpanded() ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        ),
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
