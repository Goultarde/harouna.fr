'use client';

import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max <= 0 ? 0 : (h.scrollTop / max) * 100;
      if (ref.current) ref.current.style.width = pct + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
};

export default ScrollProgress;
