'use client';

import { Header } from '@tanstack/react-table';
import { useTheme } from 'next-themes';
import { CSSProperties } from 'react';

export const useCreateStickyColumnStyle = <TData, TValue>(freezeIds: string[]) => {
  const { theme } = useTheme();
  const createStyle = (header: Header<TData, TValue>, scrollLeft: number, isSelectedRow?: boolean) => {
    const id = header.column.id;
    if (!freezeIds.includes(id)) return undefined;
    const headerGroup = header.headerGroup.headers;

    const orderedFreeze = headerGroup.filter((h) => freezeIds.includes(h.column.id)).map((h) => h.column.id);

    const left = header.getStart();
    const isLastFrozen = orderedFreeze[orderedFreeze.length - 1] === id;
    const stuck = scrollLeft > left - 1;

    // always keep width intact
    const width = header.getSize();

    // always apply these
    const common: React.CSSProperties = {
      width,
      minWidth: width,
      maxWidth: width,
      position: 'sticky',
      left: stuck ? left : 0, // only stick after scroll, otherwise stay natural
      zIndex: 30, // base zIndex for frozen cols
      backgroundColor: stuck ? (isSelectedRow ? 'var(--selected)' : 'var(--background)') : 'transparent',
      boxSizing: 'border-box',
      transform: 'translateZ(0)',
      transition: 'left 0.2s linear',
    };

    // If last frozen col and stuck → show right-side shadow only
    if (isLastFrozen && stuck) {
      return {
        ...common,
        zIndex: 40,
        // pseudo-element for right-only shadow
        ['--sticky-shadow']: theme === 'dark' ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.10)',
      } as CSSProperties;
    }

    return common;
  };
  return createStyle;
};
