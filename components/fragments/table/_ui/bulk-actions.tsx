import { type Table } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { MouseEvent, ReactNode } from 'react';
import { Flex } from '~/components/layouts/flex';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';

export type BulkAction = {
  label: string;
  icon: ReactNode;
  onClick: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  disabled?: boolean;
};

type Props<TData> = {
  table: Table<TData>;
  bulkActions?: BulkAction[];
};

export const BulkActions = <TData,>({ table, bulkActions }: Props<TData>): ReactNode | null => {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  if (selectedCount === 0) return null;

  return (
    <Flex>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Action <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {bulkActions?.map((action, index) => (
            <DropdownMenuItem key={index} disabled={action.disabled} onClick={action.onClick} className="cursor-pointer">
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="text-green-600 font-light text-sm my-auto ml-1">{selectedCount} selected</span>
    </Flex>
  );
};
