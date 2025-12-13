import { PropsWithChildren } from 'react';

type RowProps = PropsWithChildren<{
  cols?: number;
  gap?: number;
  className?: string;
}>;

export function Row({ cols = 12, gap = 4, className = '', children }: RowProps) {
  return (
    <div className={`grid gap-${gap} ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}

type ColProps = PropsWithChildren<{
  span?: number;
  className?: string;
}>;

export function Col({ span = 1, className = '', children }: ColProps) {
  return <div className={`col-span-${span} ${className}`}>{children}</div>;
}
