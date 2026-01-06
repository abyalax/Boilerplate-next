import { PrismaPg } from '@prisma/adapter-pg';
import { pagination } from 'prisma-extension-pagination';
import { PageNumberCounters, PageNumberPagination } from 'prisma-extension-pagination/dist/types';
import { MetaResponse } from '~/common/types/meta';
import { PrismaClient } from '~/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const prismaList = prisma.$extends(
  pagination({
    pages: {
      includePageCount: true,
    },
  }),
);

export type PrismaMetaPagination = PageNumberPagination & PageNumberCounters;

export function convertMetaPagination(meta: PrismaMetaPagination, per_page: number) {
  const metaPagination: MetaResponse = {
    page: meta.currentPage,
    per_page,
    total_count: meta.totalCount,
    total_pages: meta.pageCount,
  };
  return metaPagination;
}

export function searchFilter<T extends readonly string[]>(columns: T, keyword?: string | null) {
  if (!keyword) return undefined;

  return {
    OR: columns.map((col) => ({
      [col]: {
        contains: keyword,
        mode: 'insensitive',
      },
    })),
  };
}
