'use client';

import { Header } from '@tanstack/react-table';
import { useTheme } from 'next-themes';
import { CSSProperties } from 'react';

// ============================================================================
// HOOK Style untuk HEADER CELL (sticky vertical - freeze header row)
// ============================================================================
export const useCreateStickyHeaderStyle = <TData, TValue>(freezeIds: string[], scrollTop: number) => {
  const { theme } = useTheme();

  const createStyle = (header: Header<TData, TValue>, scrollLeft: number): CSSProperties => {
    const id = header.column.id;
    const isFrozenColumn = freezeIds.includes(id);
    if (!isFrozenColumn)
      return {
        position: 'sticky',
        top: 0,
        zIndex: 30, // Higher than body cells
        backgroundColor: 'var(--sidebar)',
      };

    const stuck = scrollTop > 0;
    const width = header.getSize();

    const baseStyle: CSSProperties = {
      width,
      minWidth: width,
      maxWidth: width,
      position: 'sticky',
      top: 0,
      zIndex: 30, // Higher than body cells
      backgroundColor: 'var(--sidebar)',
      boxSizing: 'border-box',
      transform: 'translateZ(0)',
      // Shadow bawah saat scroll vertical
      ...(stuck && {
        boxShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.28)' : '0 2px 8px rgba(0,0,0,0.10)',
        ['--sticky-shadow']: theme === 'dark' ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.10)',
      }),
    };

    // Jika header cell ini juga frozen column
    if (isFrozenColumn) {
      const headerGroup = header.headerGroup.headers;
      const orderedFreeze = headerGroup.filter((h) => freezeIds.includes(h.column.id)).map((h) => h.column.id);
      const left = header.getStart();
      const isLastFrozen = orderedFreeze[orderedFreeze.length - 1] === id;
      const stuckHorizontal = scrollLeft > left - 1;

      return {
        ...baseStyle,
        left: stuckHorizontal ? left : 0,
        zIndex: 50, // Highest: header + frozen column
        transition: 'left 0.2s linear',
        // Kombinasi shadow jika stuck both directions
        ...(stuck &&
          isLastFrozen &&
          stuckHorizontal && {
            boxShadow: theme === 'dark' ? '2px 2px 8px rgba(0,0,0,0.28)' : '2px 2px 8px rgba(0,0,0,0.10)',
            ['--sticky-shadow']: theme === 'dark' ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.10)',
          }),
      };
    }

    return baseStyle;
  };

  return createStyle;
};
