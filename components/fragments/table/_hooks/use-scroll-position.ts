import { useEffect, useState } from 'react';

export function useScrollPosition(ref: React.RefObject<HTMLElement | null>) {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollLeft(el.scrollLeft);
        setScrollTop(el.scrollTop);
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    setScrollLeft(el.scrollLeft);
    setScrollTop(el.scrollTop);

    return () => {
      el.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ref]);

  return { scrollLeft, scrollTop };
}
