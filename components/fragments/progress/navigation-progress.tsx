'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null);
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger loading every pathname changes
  useEffect(() => {
    ref.current?.continuousStart();

    const timer = setTimeout(() => {
      ref.current?.complete();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <LoadingBar ref={ref} color="var(--muted-foreground)" height={5} shadow={true} />;
}
