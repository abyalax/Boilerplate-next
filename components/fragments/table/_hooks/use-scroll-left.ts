'use client';

import { useEffect, useState } from 'react';

export function useScrollLeft(ref: React.RefObject<HTMLElement | null>) {
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollLeft(el.scrollLeft);
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    setScrollLeft(el.scrollLeft);

    return () => {
      el.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ref]);

  return scrollLeft;
}
