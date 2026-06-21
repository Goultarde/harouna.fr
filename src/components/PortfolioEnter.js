'use client';

import { useEffect, useRef } from 'react';

export default function PortfolioEnter() {
  const ref = useRef(null);

  useEffect(() => {
    if (!sessionStorage.getItem('portfolio-enter')) return;
    sessionStorage.removeItem('portfolio-enter');

    const el = ref.current;
    if (!el) return;

    el.style.opacity = '1';
    el.style.transition = 'none';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 500ms ease';
        el.style.opacity = '0';
      });
    });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0E141B',
        pointerEvents: 'none',
        opacity: 0,
        transition: 'none',
      }}
    />
  );
}
