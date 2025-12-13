/** biome-ignore-all lint/suspicious/noExplicitAny: < */
'use client';

import type { ColumnDef, PaginationState, Row, SortingState, Updater } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FunnelPlus } from 'lucide-react';
import { ComponentType, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { MetaResponse, metaRequestSchema } from '~/common/types/meta';
import { useDebouncedCallback } from '~/components/hooks/use-debounce-callback';
import { useNavigate } from '~/components/hooks/use-navigate';
import { useSearch } from '~/components/hooks/use-search';
import { Flex } from '~/components/layouts/flex';
import { Col, Row as RowComponent } from '~/components/layouts/grid';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Pill } from '~/components/ui/pill';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { TablePagination } from '~/components/ui/table-pagination';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { createFuzzyFilter } from '~/lib/utils';
import { useCreateStickyColumnStyle } from './_hooks/use-freeze-style';
import { useScrollLeft } from './_hooks/use-scroll-left';
import { BulkAction, BulkActions } from './_ui/bulk-actions';
import { ColumnVisibilitySelector } from './_ui/column-visibility';
import { FacetedFilter } from './_ui/faceted-filter';

export type EngineSide = 'client_side' | 'server_side';

type EnableFeature<T = unknown> = {
  virtualizer?: { virtualizeAt: number };
  columnVisibilitySelector?: {
    initialColumnVisibility: Record<keyof T, boolean>;
  };
  engineSide?: EngineSide;
  pagination?: {
    perPageOptions?: number[];
    initialState?: PaginationState;
  };
  menufilter?: ReactNode[];
  facetedFilter?: {
    columnId: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: ComponentType<{ className?: string }>;
    }[];
  }[];
};

export type TableProps<T> = {
  enableFeature: EnableFeature<T>;
  bulkActions?: BulkAction[];
  columns: ColumnDef<T, any>[];
  columnIds: string[];
  freezeColumnIds?: string[];
  data?: { data: T[]; meta: MetaResponse };
  topActions?: ReactNode;
  onClickRow: (data: Row<T>, e?: MouseEvent) => void;
};

const defaultFeature: EnableFeature<any> = {
  virtualizer: { virtualizeAt: 1000 },
  engineSide: 'client_side',
  pagination: {
    perPageOptions: [5, 10, 20, 30, 40, 50, 100],
  },
};

export const Table = <T,>({ enableFeature = defaultFeature, ...props }: TableProps<T>) => {
  const [engine] = useState<EngineSide>(enableFeature.engineSide ?? 'client_side');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string | undefined>(undefined);
  const [sorting, setSorting] = useState<SortingState>([]);

  const fuzzyFilter = createFuzzyFilter<T>();
  const filterFns = { fuzzy: fuzzyFilter };
  const parentRef = useRef<HTMLDivElement>(null);
  const search = useSearch(metaRequestSchema);
  const navigate = useNavigate();

  const isClientControl = engine === 'client_side';
  const isServerControl = engine === 'server_side';

  const pageIndex = isServerControl ? Number(search.page ?? 1) - 1 : pagination.pageIndex;
  const pageSize = isServerControl ? Number(search.per_page ?? 10) : pagination.pageSize;

  /**freezing columns */
  const stickyStyle = useCreateStickyColumnStyle<T, unknown>(props.freezeColumnIds ?? []);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollLeft = useScrollLeft(scrollRef);

  const serverSearch = useDebouncedCallback((value: string) => {
    navigate({
      replace: true,
      search: (prev) => ({
        ...prev,
        search: value,
        page: 1,
      }),
      viewTransition: true,
    });
    setGlobalFilter(value);
  }, 500);

  const clientSearch = useDebouncedCallback((value: string) => {
    setGlobalFilter(value);
  }, 500);

  const onPaginationChange = (updater: Updater<PaginationState>) => {
    const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
    navigate({
      replace: true,
      search: (prev) => ({
        ...prev,
        page: next.pageIndex + 1,
        per_page: next.pageSize,
      }),
      viewTransition: true,
    });
  };

  const onSortingChange = (updater: Updater<SortingState>) => {
    const next = typeof updater === 'function' ? updater(sorting) : updater;
    setSorting(updater);
    navigate({
      search: (prev) => ({
        ...prev,
        sort_by: next[0]?.id,
        sort_order: next[0]?.desc ? 'desc' : 'asc',
      }),
      replace: true,
      viewTransition: true,
    });
  };

  const table = useReactTable<T>({
    /**Common */
    data: props.data?.data ?? [],
    columns: props.columns ?? [],
    debugTable: false,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableMultiSort: true,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    /**Client Side Only */
    getSortedRowModel: isClientControl ? getSortedRowModel() : undefined,
    getFilteredRowModel: isClientControl ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enableFeature.pagination ? (isClientControl ? getPaginationRowModel() : undefined) : undefined,

    filterFns: isClientControl ? filterFns : undefined,
    globalFilterFn: isClientControl ? fuzzyFilter : undefined,

    /**Server Side or Client Side */
    onGlobalFilterChange: isServerControl ? serverSearch : clientSearch,
    onSortingChange: isServerControl ? onSortingChange : setSorting,

    /**Server Side */
    manualPagination: isServerControl,
    manualSorting: isServerControl,
    manualFiltering: isServerControl,
    pageCount: isServerControl ? props.data?.meta.total_pages : undefined,
    onPaginationChange: enableFeature.pagination ? (isServerControl ? onPaginationChange : setPagination) : undefined,

    /**State */
    initialState: {
      columnVisibility: enableFeature.columnVisibilitySelector?.initialColumnVisibility,
      columnOrder: props.columnIds,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      sorting,
      pagination: enableFeature.pagination
        ? {
            pageIndex,
            pageSize,
          }
        : undefined,
      globalFilter: isClientControl ? globalFilter : search.search,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  useEffect(() => {
    table.setGlobalFilter(globalFilter);
  }, [globalFilter, table]);

  useEffect(() => {
    if (search.search !== undefined && isClientControl) setGlobalFilter(search.search ?? undefined);
  }, [isClientControl, search]);

  return (
    <main className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {enableFeature.menufilter && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="cusrsor-pointer" variant={'outline'}>
                  <FunnelPlus />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" style={{ width: 'fit-content' }}>
                <RowComponent cols={enableFeature.menufilter.length > 1 ? 2 : 1}>
                  {enableFeature.menufilter.map((item, index) => (
                    <Col span={1} key={index}>
                      {item}
                    </Col>
                  ))}
                </RowComponent>
              </PopoverContent>
            </Popover>
          )}
          <Flex gap={'md'} align={'center'} justify={'center'} style={{ width: 300 }}>
            <Input placeholder="Search..." value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)} />
          </Flex>
          {enableFeature.facetedFilter?.map((filter) => {
            const column = table.getColumn(filter.columnId);
            if (!column) return null;
            return <FacetedFilter key={filter.columnId} column={column} title={filter.title} options={filter.options} />;
          })}
          <Pill onRemove={() => table.resetRowSelection()} selectedCount={selectedRows.length} />
        </div>
        <Flex gap={8} align={'center'}>
          {props.topActions}
          {enableFeature.columnVisibilitySelector?.initialColumnVisibility && (
            <ColumnVisibilitySelector table={table} columnIds={props.columnIds} />
          )}
        </Flex>
      </div>
      <div className="rounded-md border overflow-hidden">
        <div ref={scrollRef} className="overflow-x-auto w-full">
          <div className="relative">
            <TableComponent>
              <TableHeader className="rounded-md">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="cursor-pointer rounded-md bg-background hover:bg-accent/50 group/row">
                    {headerGroup.headers.map((header) => {
                      const style = stickyStyle(header, scrollLeft);
                      const isAccessor = header.column.accessorFn !== undefined;
                      return (
                        <TableHead
                          style={style}
                          key={header.index}
                          colSpan={header.colSpan}
                          className="sticky-shadow h-14 cursor-pointer relative"
                        >
                          {isAccessor ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  onClick={header.column.getToggleSortingHandler()}
                                  style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                  {{
                                    asc: <FaArrowUp style={{ margin: '0 5px' }} />,
                                    desc: <FaArrowDown style={{ margin: '0 5px' }} />,
                                  }[header.column.getIsSorted() as string] ?? null}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {(() => {
                                  const sorted = header.column.getIsSorted();

                                  if (sorted === false || sorted == null) return 'Sort Ascending';
                                  if (sorted === 'asc') return 'Sort Descending';
                                  if (sorted === 'desc') return 'Unsort by this column';

                                  return 'Sort by this column';
                                })()}
                              </TooltipContent>
                            </Tooltip>
                          ) : header.isPlaceholder ? null : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length > (enableFeature.virtualizer?.virtualizeAt as number)
                  ? virtualizer.getVirtualItems().map((virtualRow, index) => {
                      const rows = table.getRowModel().rows;
                      const row = rows[virtualRow.index];
                      return (
                        <TableRow
                          data-state={row.getIsSelected() && 'selected'}
                          className="cursor-pointer bg-background hover:bg-secondary"
                          onClick={(e) => props.onClickRow(row, e)}
                          key={virtualRow.key}
                          style={{
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                          }}
                        >
                          {row.getVisibleCells().map((cell) => {
                            const headerForCell = table.getHeaderGroups()[0].headers[cell.column.getIndex()];
                            const style = stickyStyle(headerForCell, scrollLeft, row.getIsSelected());
                            return (
                              <TableCell style={style} className="sticky-shadow h-14 relative" key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                  : table.getRowModel().rows.map((row: Row<any>) => (
                      <TableRow
                        data-state={row.getIsSelected() && 'selected'}
                        className="bg-background hover:bg-accent/50 group/row"
                        onClick={(e) => props.onClickRow(row, e)}
                        style={{ cursor: 'pointer' }}
                        key={row.id}
                      >
                        {row.getVisibleCells().map((cell, index) => {
                          const headerForCell = table.getHeaderGroups()[0].headers[cell.column.getIndex()];
                          const style = stickyStyle(headerForCell, scrollLeft, row.getIsSelected());
                          return (
                            <TableCell style={style} className="sticky-shadow h-14 relative" key={index}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
              </TableBody>
              <TableFooter>
                {table.getFooterGroups().map((footerGroup) => (
                  <TableRow key={footerGroup.id}>
                    {footerGroup.headers.map((header) => {
                      const style = stickyStyle(header, scrollLeft);
                      return (
                        <TableHead
                          style={style}
                          key={header.index}
                          colSpan={header.colSpan}
                          className="sticky-shadow h-14 cursor-pointer relative"
                        >
                          {flexRender(header.column.columnDef.footer, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableFooter>
            </TableComponent>
          </div>
        </div>
      </div>
      {enableFeature.pagination && (
        <Flex direction="column" gap={20} className="bg-background rounded-md p-5">
          <Flex>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm w-24">Total Page</p>
                  <p className="text-sm">: {table.getPageCount()}</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm w-24">Current Page</p>
                  <p className="text-sm">: {table.getState().pagination.pageIndex + 1}</p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm w-24">Page Size</p>
                  <Select
                    value={search.per_page.toString()}
                    onValueChange={(value) =>
                      navigate({
                        search(_prev) {
                          return {
                            ..._prev,
                            per_page: value,
                          };
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-[70px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {enableFeature.pagination?.perPageOptions?.map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Flex>
          <Flex justify={'center'} align={'center'}>
            <TablePagination
              totalPages={table.getPageCount()}
              currentPage={table.getState().pagination.pageIndex + 1}
              onPageChange={(page) => table.setPageIndex(page - 1)}
              onNextPage={table.nextPage}
              onPreviousPage={table.previousPage}
            />
          </Flex>
        </Flex>
      )}
      <BulkActions<T> table={table} bulkActions={props.bulkActions} />
    </main>
  );
};
