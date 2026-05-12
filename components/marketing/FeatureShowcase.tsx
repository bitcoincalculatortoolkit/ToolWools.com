'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export function FeatureShowcase() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6">
        <SeoCard />
        <ImageCard />
      </div>
    </section>
  );
}

/* ─── SEO Suite Card ─── */
function SeoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-gray-100/60 bg-white p-8 shadow-premium transition-shadow duration-300 hover:shadow-premium-xl"
    >
      {/* Decorative floating dots */}
      <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-primary/10 animate-drift" aria-hidden />
      <div className="absolute top-20 right-12 h-3 w-3 rounded-full bg-blue/8 animate-drift-slow" aria-hidden />
      <div className="absolute bottom-10 left-8 h-2.5 w-2.5 rounded-full bg-green/10 animate-drift" aria-hidden />

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-3xl shadow-inner-glow pointer-events-none" />

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">SEO Suite</p>
          <h3 className="mt-2 text-[22px] font-bold leading-tight text-dark md:text-[26px] tracking-[-0.01em]">
            Boost your rankings with smart SEO tools
          </h3>
          <p className="mt-2 text-[14px] text-muted leading-relaxed">
            Everything you need to improve visibility and outrank competitors.
          </p>
          <ul className="mt-5 space-y-2.5">
            {['Keyword Research & Gap Analysis', 'Backlink Checker', 'SERP Analysis & Position Tracking', 'Site Audit & Core Web Vitals'].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 text-[13px] text-body"
              >
                <Check size={14} className="text-green" strokeWidth={2.5} /> {item}
              </motion.li>
            ))}
          </ul>
          <a href="/tools" className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-all duration-200 hover:gap-2.5">
            Explore SEO Tools <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mockup */}
        <div className="rounded-2xl border border-gray-100/60 bg-gradient-to-br from-gray-50 to-white p-5 shadow-premium-sm">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-muted">SEO Score</span>
            <span className="text-muted text-sm">⋯</span>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <ScoreGauge value={86} />
          </div>
          <div className="mt-4 space-y-2">
            <MetricRow label="Backlinks" value="14.2K" change="+12.5%" />
            <MetricRow label="Organic Traffic" value="34.7K" change="+9.3%" />
          </div>
          <div className="mt-3 space-y-1.5">
            <StatusDot label="On-Page SEO" status="Good" />
            <StatusDot label="Mobile Friendly" status="Good" />
            <StatusDot label="SSL Certificate" status="Valid" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScoreGauge({ value }: { value: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#F3F4F6" strokeWidth="12" />
        <circle
          cx="55" cy="55" r={r} fill="none"
          stroke="url(#gauge-gradient)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          transform="rotate(-90 55 55)"
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)', filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.3))' }}
        />
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-[26px] font-bold text-dark">{value}</p>
          <p className="text-[10px] text-green font-semibold">Excellent</p>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 shadow-sm border border-gray-50">
      <span className="text-[12px] text-muted">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-dark">{value}</span>
        <span className="text-[11px] font-medium text-green">▲{change}</span>
      </div>
    </div>
  );
}

function StatusDot({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <span className="h-2 w-2 rounded-full bg-green shadow-glow-green" />
      <span className="text-body">{label}:</span>
      <span className="font-medium text-green">{status}</span>
    </div>
  );
}

/* ─── Image Tools Card ─── */
function ImageCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-gray-100/60 bg-white p-8 shadow-premium transition-shadow duration-300 hover:shadow-premium-xl"
    >
      {/* Decorative floating dots */}
      <div className="absolute top-8 right-10 h-2 w-2 rounded-full bg-primary/10 animate-drift-slow" aria-hidden />
      <div className="absolute bottom-12 right-6 h-3 w-3 rounded-full bg-blue/8 animate-drift" aria-hidden />

      {/* Inner glow */}
      <div className="absolute inset-0 rounded-3xl shadow-inner-glow pointer-events-none" />

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">Image Tools</p>
          <h3 className="mt-2 text-[22px] font-bold leading-tight text-dark md:text-[26px] tracking-[-0.01em]">
            Optimize images like a pro
          </h3>
          <p className="mt-2 text-[14px] text-muted leading-relaxed">
            Compress, convert and optimize images for web in seconds.
          </p>
          <ul className="mt-5 space-y-2.5">
            {['Image Compressor (JPG, PNG, WEBP, AVIF)', 'Format Converter (50+ formats)', 'Resize & Crop Images', 'Bulk Optimization (up to 50 files)'].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 text-[13px] text-body"
              >
                <Check size={14} className="text-green" strokeWidth={2.5} /> {item}
              </motion.li>
            ))}
          </ul>
          <a href="/tools" className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-all duration-200 hover:gap-2.5">
            Explore Image Tools <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Before/After slider */}
        <div className="flex flex-col items-center justify-center">
          <ComparisonSlider />
          <div className="mt-3 flex w-full items-center justify-between text-[12px]">
            <span className="text-muted">Savings: <strong className="text-dark">72%</strong></span>
            <span className="text-muted">Quality: <strong className="text-green">Excellent</strong></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComparisonSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onDown = (e: ReactPointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };
  const onMove = (e: ReactPointerEvent) => { if (dragging.current) update(e.clientX); };
  const onUp = () => { dragging.current = false; };

  useEffect(() => {
    const stop = () => { dragging.current = false; };
    window.addEventListener('pointerup', stop);
    return () => window.removeEventListener('pointerup', stop);
  }, []);

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-gray-200/60 shadow-premium-sm"
    >
      {/* Before (gray) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-muted backdrop-blur-sm shadow-sm">Original</span>

      {/* After (vibrant) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-200 to-primary/60"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span
        className="absolute left-3 top-3 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary backdrop-blur-sm"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >Compressed</span>

      {/* Divider */}
      <div className="absolute inset-y-0 w-0.5 bg-white/80" style={{ left: `${pos}%` }} />

      {/* Handle with gradient ring + glow */}
      <button
        type="button"
        aria-label="Drag to compare"
        className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-dark shadow-premium border-2 border-white transition-transform hover:scale-110"
        style={{
          left: `${pos}%`,
          boxShadow: '0 0 0 3px rgba(244,81,30,0.2), 0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L3 8l3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 3l3 5-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
