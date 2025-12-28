import { FC, Ref } from 'react';
import { cn } from '~/lib/utils';

type MainProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean;
  fluid?: boolean;
  scrollable?: boolean;
  ref?: Ref<HTMLElement>;
};

export const Main: FC<MainProps> = (props) => {
  // don't pass props fixed and fluid to component html
  const { fixed, fluid, scrollable, children, ...spreadProps } = props;
  return (
    <main
      data-layout={fixed ? 'fixed' : 'auto'}
      className={cn(
        'px-4',
        // If layout is fixed, make the main container flex and grow
        fixed && 'flex grow flex-col',
        // If layout is not fluid, set the max-width
        !fluid && '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
        props.className,
      )}
      {...spreadProps}
    >
      {scrollable ? <div className="max-h-[80vh] overflow-y-scroll">{children}</div> : children}
    </main>
  );
};
