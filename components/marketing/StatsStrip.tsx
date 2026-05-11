'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '@/lib/useCountUp';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  format?: (n: number) => string;
}

const STATS: Stat[] = [
  { label: 'Free tools', value: 100, suffix: '+' },
  {
    label: 'Monthly users',
    value: 2.4,
    decimals: 1,
    suffix: 'M',
  },
  { label: 'Signup time', value: 0, suffix: 'ms' },
  { label: 'Average rating', value: 4.8, decimals: 1, suffix: '★' },
];

export function StatsStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="stats" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div ref={ref} className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.2, 0.8, 0.2, 1],
                delay: i * 0.08,
              }}
              className="relative overflow-hidden rounded-[20px] border border-line bg-white p-6 shadow-soft"
            >
              <StatContent stat={s} inView={inView} />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gold/5 blur-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatContent({ stat, inView }: { stat: Stat; inView: boolean }) {
  const v = useCountUp({
    to: stat.value,
    start: inView,
    duration: 1600,
    decimals: stat.decimals ?? 0,
  });
  return (
    <div>
      <p className="text-[36px] font-semibold leading-none tracking-tight text-ink tabular-nums">
        {v}
        {stat.suffix && <span className="text-gold">{stat.suffix}</span>}
      </p>
      <p className="mt-3 text-[12.5px] font-medium text-ink-3">{stat.label}</p>
    </div>
  );
}
