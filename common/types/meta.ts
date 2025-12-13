import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  per_page: z.coerce.number().int().positive().default(10),
});

export type Pagination = z.infer<typeof paginationSchema>;

export const sortingSchema = z.object({
  sort_by: z.string().optional(),
  sort_order: z.enum(['asc', 'desc']).optional(),
});

export type SortOrder = 'asc' | 'desc';

export interface Sorting<E> {
  sort_by?: keyof E | string;
  sort_order?: SortOrder;
}

export const globalFilterSchema = z.object({
  search: z.string().optional(),
});

type GlobalFilter = z.infer<typeof globalFilterSchema>;

export const metaRequestSchema = z.object({
  ...paginationSchema.shape,
  ...globalFilterSchema.shape,
  ...sortingSchema.shape,
});

export interface MetaRequest<E = undefined> extends Pagination, Sorting<E>, GlobalFilter {}

export interface MetaResponse {
  page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}
