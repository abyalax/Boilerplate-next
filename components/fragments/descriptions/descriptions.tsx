'use client';

import React, { Fragment } from 'react';
import { H3 } from '~/components/ui/typography';
import { cn } from '~/lib/utils';

type ResponsiveConfig = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

export type DescriptionItem = {
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number | ResponsiveConfig;
};

type Props = {
  title?: React.ReactNode;
  bordered?: boolean;
  column?: number | ResponsiveConfig;
  items: DescriptionItem[];
  className?: string;
};

export const Descriptions: React.FC<Props> = ({ bordered = false, column = 3, ...props }) => {
  const resolveResponsive = (config: number | ResponsiveConfig): Required<ResponsiveConfig> => {
    if (typeof config === 'number') {
      return {
        xs: config,
        sm: config,
        md: config,
        lg: config,
        xl: config,
        xxl: config,
      };
    }

    // fill using inheritance
    const order = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
    let last = 1;

    const out: Required<ResponsiveConfig> = {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1,
      xl: 1,
      xxl: 1,
    };

    for (const bp of order) {
      if (config[bp] !== undefined) last = config[bp];
      out[bp] = last;
    }

    return out;
  };

  const getResponsiveColumn = (): string => {
    const cols = resolveResponsive(column);

    return cn(
      `grid-cols-${cols.xs * 2}`,
      `sm:grid-cols-${cols.sm * 2}`,
      `md:grid-cols-${cols.md * 2}`,
      `lg:grid-cols-${cols.lg * 2}`,
      `xl:grid-cols-${cols.xl * 2}`,
      `2xl:grid-cols-${cols.xxl * 2}`,
    );
  };

  const getItemSpan = (span: number | ResponsiveConfig | undefined): string => {
    if (!span) span = 1; // default: 1 unit = 2 columns total

    const spanConfig = resolveResponsive(span);
    const cols = resolveResponsive(column);

    const classes = [];

    const map = {
      xs: '',
      sm: 'sm:',
      md: 'md:',
      lg: 'lg:',
      xl: 'xl:',
      xxl: '2xl:',
    };

    for (const bp of Object.keys(map) as (keyof ResponsiveConfig)[]) {
      const totalCells = cols[bp] * 2; // total grid cols
      const desired = spanConfig[bp] * 2; // span * 2 cells
      const safe = Math.min(desired, totalCells); // clamp
      classes.push(`${map[bp]}col-span-${safe}`);
    }

    return cn(classes);
  };

  const baseClasses = cn(bordered && 'border border-border');

  const labelClasses = cn(
    bordered
      ? 'bg-descriptions border-r border-b border-border px-6 py-4 font-medium text-foreground'
      : 'px-0 py-3 font-medium text-descriptions-foreground',
  );

  const valueClasses = cn(
    bordered
      ? 'bg-background border-b border-border px-6 py-4 text-descriptions-foreground'
      : 'px-0 py-3 text-descriptions-foreground',
  );

  return (
    <div className={cn('w-full', props.className)}>
      {props.title && <H3>{props.title}</H3>}

      <div className={cn('grid rounded-md overflow-hidden', getResponsiveColumn(), baseClasses)}>
        {props.items.map((item, index) => {
          const spanClass = getItemSpan(item.span);
          const spanForLabel = spanClass.replace(/col-span-(\d+)/g, (_, num) => `col-span-${Math.floor(Number(num) / 2)}`);

          return (
            <Fragment key={index}>
              <div className={cn(labelClasses, spanForLabel)}>{item.label}</div>
              <div className={cn(valueClasses, spanForLabel)}>{item.children}</div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
