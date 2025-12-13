'use client';

import { RotateCcw } from 'lucide-react';
import { FC } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

type Props = {
  title: string;
  showReset?: boolean;
  onReset?: () => void;
  className?: string;
};

export const SectionTitle: FC<Props> = ({ title, showReset = false, onReset, className }) => {
  return (
    <div className={cn('text-muted-foreground mb-2 flex items-center gap-2 text-sm font-semibold', className)}>
      {title}
      {showReset && onReset && (
        <Button size="icon" variant="secondary" className="size-4 rounded-full" onClick={onReset}>
          <RotateCcw className="size-3" />
        </Button>
      )}
    </div>
  );
};
