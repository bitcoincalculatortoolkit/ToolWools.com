'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpOptions {
  to: number;
  duration?: number;
  start?: boolean;
  decimals?: number;
}

/**
 * Animates a numeric counter from 0 to `to` using requestAnimationFrame
 * with an easeOutCubic curve. Triggered when `start` becomes true.
 */
export function useCountUp({
  to,
  duration = 1500,
  start = false,
  decimals = 0,
}: CountUpOptions) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setValue(to);
      return;
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const next = eased * to;
      setValue(
        decimals > 0
          ? Number(next.toFixed(decimals))
          : Math.round(next)
      );
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration, start, decimals]);

  return value;
}

/**
 * Formats numbers into compact display (2400000 → 2.4M).
 */
export function formatCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}
