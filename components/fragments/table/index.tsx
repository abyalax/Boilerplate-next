/** biome-ignore-all lint/suspicious/noExplicitAny: < */
'use client';

import type { ColumnDef, PaginationState, Row, SortingState, Updater } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FunnelPlus } from 'lucide-react';
import { ComponentType, Fragment, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { MetaResponse, metaRequestSchema } from '~/common/types/meta';
import { useDebouncedCallback } from '~/components/hooks/use-debounce-callback';
import { useNavigate } from '~/components/hooks/use-navigate';
import { useSearch } from '~/components/hooks/use-search';
import { Flex } from '~/components/layouts/flex';
import { Col, Row as RowComponent } from '~/components/layouts/grid';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger } from '~/components/ui/select';
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
import { useScrollPosition } from './_hooks/use-scroll-position';
import { useCreateStickyColumnStyle } from './_hooks/use-sticky-column-style';
import { useCreateStickyHeaderStyle } from './_hooks/use-sticky-header-style';
import { BulkAction, BulkActions } from './_ui/bulk-actions';
import { ColumnVisibilitySelector } from './_ui/column-visibility';
import { FacetedFilter } from './_ui/faceted-filter';

export type EngineSide = 'client_side' | 'server_side';
export type Option = {
  label: string;
  value: number;
};
export type Options = Option[];

export type TableProps<T> = {
  bulkActions?: BulkAction[];
  columns: ColumnDef<T, any>[];
  columnIds: string[];
  freezeColumnIds?: string[];
  data?: { data: T[]; meta: MetaResponse };
  topActions?: ReactNode;
  virtualizer?: { virtualizeAt: number };
  initialColumnVisibility?: Record<keyof T, boolean>;
  engineSide?: EngineSide;
  perPageOptions?: Option[];
  pagination?: { initialState?: PaginationState } | boolean;
  menufilter?: ReactNode[];
  facetedFilter?: {
    columnId: keyof T;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: ComponentType<{ className?: string }>;
    }[];
  }[];
  expandedRow?: (record: T) => ReactNode;
  onClickRow: (data: T, e?: MouseEvent) => void;
};

export const Table = <T,>({
  engineSide = 'client_side',
  pagination = true,
  perPageOptions = [
    { label: '5 / page', value: 5 },
    { label: '10 / page', value: 10 },
    { label: '20 / page', value: 20 },
    { label: '30 / page', value: 30 },
    { label: '40 / page', value: 40 },
    { label: '50 / page', value: 50 },
    { label: '100 / page', value: 100 },
  ],
  ...props
}: TableProps<T>) => {
  const [engine] = useState<EngineSide>(engineSide ?? 'client_side');
  const [_pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string | undefined>(undefined);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState({});

  const fuzzyFilter = createFuzzyFilter<T>();
  const filterFns = { fuzzy: fuzzyFilter };
  const parentRef = useRef<HTMLDivElement>(null);
  const search = useSearch(metaRequestSchema);
  const navigate = useNavigate();

  const isClientControl = engine === 'client_side';
  const isServerControl = engine === 'server_side';

  const pageIndex = isServerControl ? Number(search.page ?? 1) - 1 : _pagination.pageIndex;
  const pageSize = isServerControl ? Number(search.per_page ?? 10) : _pagination.pageSize;

  const selectedLabel = perPageOptions?.find((opt) => opt.value.toString() === search.per_page.toString());

  /**freezing columns */
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollLeft, scrollTop } = useScrollPosition(scrollRef);

  const headerStickyStyle = useCreateStickyHeaderStyle<T, unknown>(props.freezeColumnIds ?? [], scrollTop);
  const bodyStickyStyle = useCreateStickyColumnStyle<T, unknown>(props.freezeColumnIds ?? []);

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
    getExpandedRowModel: getExpandedRowModel(),

    /**Client Side Only */
    getSortedRowModel: isClientControl ? getSortedRowModel() : undefined,
    getFilteredRowModel: isClientControl ? getFilteredRowModel() : undefined,
    getPaginationRowModel: pagination ? (isClientControl ? getPaginationRowModel() : undefined) : undefined,

    filterFns: isClientControl ? filterFns : undefined,
    globalFilterFn: isClientControl ? fuzzyFilter : undefined,

    /**Server Side or Client Side */
    onGlobalFilterChange: isServerControl ? serverSearch : clientSearch,
    onSortingChange: isServerControl ? onSortingChange : setSorting,
    onExpandedChange: setExpanded,

    /**Server Side */
    manualPagination: isServerControl,
    manualSorting: isServerControl,
    manualFiltering: isServerControl,
    pageCount: isServerControl ? props.data?.meta.total_pages : undefined,
    onPaginationChange: pagination ? (isServerControl ? onPaginationChange : setPagination) : undefined,

    /**State */
    initialState: {
      columnVisibility: props.initialColumnVisibility,
      columnOrder: props.columnIds,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      sorting,
      expanded,
      pagination: pagination
        ? {
            pageIndex,
            pageSize,
          }
        : undefined,
      globalFilter: isClientControl ? globalFilter : search.search,
    },
  });

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
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div className="flex gap-4 flex-wrap">
          <BulkActions<T> table={table} bulkActions={props.bulkActions} />
          {props.menufilter && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="cusrsor-pointer" variant={'outline'}>
                  <FunnelPlus />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" style={{ width: 'fit-content' }}>
                <RowComponent cols={props.menufilter.length > 1 ? 2 : 1}>
                  {props.menufilter.map((item, index) => (
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
          {props.facetedFilter?.map((filter) => {
            const column = table.getColumn(filter.columnId as string);
            if (!column) return null;
            return (
              <FacetedFilter key={filter.columnId as string} column={column} title={filter.title} options={filter.options} />
            );
          })}
        </div>
        <Flex gap={8} align={'end'} justify="flex-end" wrap="wrap">
          {props.topActions}
          {props.initialColumnVisibility && <ColumnVisibilitySelector table={table} columnIds={props.columnIds} />}
        </Flex>
      </div>
      <div className="rounded-md border overflow-hidden">
        <div ref={scrollRef} className="overflow-x-auto overflow-y-scroll no-scrollbar max-h-[68vh] w-full">
          <div className="relative">
            <TableComponent>
              <TableHeader className="rounded-md">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="cursor-pointer rounded-md bg-background hover:bg-accent/50 group/row">
                    {headerGroup.headers.map((header) => {
                      const style = headerStickyStyle(header, scrollLeft);
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
                              <TooltipContent className="z-100">
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
                {table.getRowModel().rows.length > (props.virtualizer?.virtualizeAt as number)
                  ? virtualizer.getVirtualItems().map((virtualRow, index) => {
                      const rows = table.getRowModel().rows;
                      const row = rows[virtualRow.index];
                      return (
                        <Fragment key={row.id}>
                          <TableRow
                            data-state={row.getIsSelected() && 'selected'}
                            className="cursor-pointer bg-background hover:bg-secondary"
                            onClick={(e) => props.onClickRow(row.original, e)}
                            key={virtualRow.key}
                            style={{
                              height: `${virtualRow.size}px`,
                              transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                            }}
                          >
                            {row.getVisibleCells().map((cell) => {
                              const headerForCell = table.getHeaderGroups()[0].headers[cell.column.getIndex()];
                              const style = bodyStickyStyle(headerForCell, scrollLeft, row.getIsSelected());
                              return (
                                <TableCell style={style} className="sticky-shadow h-14 relative" key={cell.id}>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                          {/* EXPANDED ROW */}
                          {row.getIsExpanded() && (
                            <TableRow className="bg-muted">
                              <TableCell colSpan={row.getVisibleCells().length} className="p-4">
                                {props.expandedRow?.(row.original)}
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
                      );
                    })
                  : table.getRowModel().rows.map((row: Row<any>) => (
                      <Fragment key={row.id}>
                        <TableRow
                          data-state={row.getIsSelected() && 'selected'}
                          className="bg-background hover:bg-accent/50 group/row"
                          onClick={(e) => props.onClickRow(row.original, e)}
                          style={{ cursor: 'pointer' }}
                          key={row.id}
                        >
                          {row.getVisibleCells().map((cell, index) => {
                            const headerForCell = table.getHeaderGroups()[0].headers[cell.column.getIndex()];
                            const style = bodyStickyStyle(headerForCell, scrollLeft, row.getIsSelected());
                            return (
                              <TableCell style={style} className="sticky-shadow h-14 relative" key={index}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                        {/* EXPANDED ROW */}
                        {row.getIsExpanded() && (
                          <TableRow className="bg-muted">
                            <TableCell colSpan={row.getVisibleCells().length} className="p-4">
                              {props.expandedRow?.(row.original)}
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    ))}
              </TableBody>
              {table.getFooterGroups().length > 0 && (
                <TableFooter>
                  {table.getFooterGroups().map((footerGroup) => (
                    <TableRow key={footerGroup.id}>
                      {footerGroup.headers.map((header) => {
                        const style = bodyStickyStyle(header, scrollLeft);
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
              )}
            </TableComponent>
          </div>
        </div>
      </div>
      {pagination && (
        <Flex justify={'end'} align={'center'} className="mb-6">
          <Flex>
            <TablePagination
              totalPages={table.getPageCount()}
              currentPage={table.getState().pagination.pageIndex + 1}
              onPageChange={(page) => table.setPageIndex(page - 1)}
              onNextPage={table.nextPage}
              onPreviousPage={table.previousPage}
            />
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
              <SelectTrigger className="w-[130px] h-8">{selectedLabel?.label}</SelectTrigger>
              <SelectContent>
                {perPageOptions?.map((e) => (
                  <SelectItem key={e.value} value={e.value.toString()}>
                    {e.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Flex>
        </Flex>
      )}
    </main>
  );
};
