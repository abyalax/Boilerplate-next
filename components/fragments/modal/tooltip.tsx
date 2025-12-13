import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';
import { Tooltip as TooltipComponent, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

type Props = {
  content: ReactNode;
  triggerAsChild?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentProps?: Omit<ComponentProps<typeof PopoverPrimitive.Content>, 'children'>;
} & PropsWithChildren;

export const Tooltip: FC<Props> = ({ children, content, triggerAsChild = true, open, onOpenChange, contentProps = {} }) => {
  const { side = 'top', sideOffset = 4, className = '', ...restContentProps } = contentProps;

  return (
    <TooltipComponent open={open} onOpenChange={onOpenChange}>
      <TooltipTrigger asChild={triggerAsChild}>{children}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={sideOffset} className={`p-2 text-sm ${className}`} {...restContentProps}>
        {content}
      </TooltipContent>
    </TooltipComponent>
  );
};
