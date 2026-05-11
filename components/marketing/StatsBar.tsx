'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, Rocket, ShieldCheck, Star } from 'lucide-react';

interface Stat {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const STATS: Stat[] = [
  { icon: Users, value: 2.4, suffix: 'M+', label: 'Happy Users', color: 'text-primary' },
  { icon: Rocket, value: 100, suffix: '+', label: 'Powerful Tools', color: 'text-blue' },
  { icon: ShieldCheck, value: 100, suffix: '%', label: 'Free Forever', color: 'text-green' },
  { icon: Star, value: 4.9, suffix: '/5', label: 'User Rating', color: 'text-primary-light' },
];

export function StatsBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-white py-8">
      <div
        ref={ref}
        className="mx-auto grid max-w-[860px] grid-cols-2 gap-y-6 px-5 md:grid-cols-4 md:divide-x md:divide-border"
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 px-4">
            <s.icon size={20} className={s.color} strokeWidth={1.5} />
            <p className="text-[28px] font-bold text-dark">
              {visible ? (
                <CountUp to={s.value} decimals={s.value % 1 !== 0 ? 1 : 0} />
              ) : (
                '0'
              )}
              <span className="text-[22px]">{s.suffix}</span>
            </p>
            <p className="text-[13px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Number((eased * to).toFixed(decimals)));
      if (t < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [to, decimals]);

  return <>{val}</>;
}
