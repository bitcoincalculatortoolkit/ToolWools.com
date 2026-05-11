'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Rocket, ShieldCheck, Star } from 'lucide-react';

interface Stat {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  color: string;
  glowColor: string;
}

const STATS: Stat[] = [
  { icon: Users, value: 2.4, suffix: 'M+', label: 'Happy Users', color: 'text-primary', glowColor: 'rgba(244,81,30,0.15)' },
  { icon: Rocket, value: 100, suffix: '+', label: 'Powerful Tools', color: 'text-blue', glowColor: 'rgba(37,99,235,0.15)' },
  { icon: ShieldCheck, value: 100, suffix: '%', label: 'Free Forever', color: 'text-green', glowColor: 'rgba(16,185,129,0.15)' },
  { icon: Star, value: 4.9, suffix: '/5', label: 'User Rating', color: 'text-primary-light', glowColor: 'rgba(255,112,67,0.15)' },
];

export function StatsBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-12 md:py-16">
      <div
        ref={ref}
        className="mx-auto grid max-w-[960px] grid-cols-2 gap-4 px-5 md:grid-cols-4 md:gap-6"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col items-center gap-2 rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `conic-gradient(from 0deg, ${s.glowColor}, transparent, ${s.glowColor})`,
                  animation: 'spin-slow 8s linear infinite',
                  padding: '1px',
                }}
              />
            </div>

            {/* Icon with colored glow */}
            <div className="relative">
              <div
                className="absolute inset-0 blur-lg rounded-full opacity-40 transition-opacity group-hover:opacity-60"
                style={{ backgroundColor: s.glowColor }}
              />
              <s.icon size={22} className={`relative ${s.color}`} strokeWidth={1.5} />
            </div>

            {/* Number */}
            <p className="text-[30px] font-bold text-dark tracking-tight">
              {visible ? (
                <CountUp to={s.value} decimals={s.value % 1 !== 0 ? 1 : 0} />
              ) : (
                '0'
              )}
              <span className="text-[20px] ml-0.5">{s.suffix}</span>
            </p>

            {/* Label */}
            <p className="text-[13px] text-muted font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Spring-like easing
      const eased = 1 - Math.pow(1 - t, 4);
      setVal(Number((eased * to).toFixed(decimals)));
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [to, decimals]);

  return <>{val}</>;
}
