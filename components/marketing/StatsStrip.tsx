'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '@/lib/useCountUp';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}

const STATS: Stat[] = [
  { label: 'Free tools', value: 100, suffix: '+' },
  { label: 'Monthly users', value: 2.4, decimals: 1, suffix: 'M' },
  { label: 'Signup time', value: 0, suffix: 'ms' },
  { label: 'Average rating', value: 4.8, decimals: 1, suffix: '★' },
];

export function StatsStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="stats" className="relative">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div ref={ref} className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.19, 1, 0.22, 1],
                delay: i * 0.08,
              }}
              className="relative overflow-hidden rounded-cards bg-white p-6 shadow-subtle"
            >
              <StatContent stat={s} inView={inView} />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-ember/[0.04] blur-2xl"
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
      <p className="text-[36px] font-semibold leading-none tracking-tight text-midnight tabular-nums">
        {v}
        {stat.suffix && <span className="text-ember">{stat.suffix}</span>}
      </p>
      <p className="mt-3 text-[13px] font-medium tracking-[-0.14px] text-ash">
        {stat.label}
      </p>
    </div>
  );
}
