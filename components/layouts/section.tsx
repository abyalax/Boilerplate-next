import { FC, PropsWithChildren } from 'react';
import { cn } from '~/lib/utils';

type Props = PropsWithChildren<{ className?: string }>;

export const Section: FC<Props> = ({ children, className }) => {
  return <div className={cn('space-y-4 border p-4 rounded', className)}>{children}</div>;
};
