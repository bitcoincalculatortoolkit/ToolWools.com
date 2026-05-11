'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export function FeatureShowcase() {
  return (
    <section className="py-16">
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
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-card">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">SEO Suite</p>
          <h3 className="mt-2 text-[22px] font-bold leading-tight text-dark md:text-[26px]">
            Boost your rankings with smart SEO tools
          </h3>
          <p className="mt-2 text-[14px] text-muted">
            Everything you need to improve visibility and outrank competitors.
          </p>
          <ul className="mt-4 space-y-2">
            {['Keyword Research & Gap Analysis', 'Backlink Checker', 'SERP Analysis & Position Tracking', 'Site Audit & Core Web Vitals'].map((i) => (
              <li key={i} className="flex items-center gap-2 text-[13px] text-body">
                <Check size={14} className="text-green" strokeWidth={2.5} /> {i}
              </li>
            ))}
          </ul>
          <a href="#tools" className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-primary hover:underline">
            Explore SEO Tools <ArrowRight size={14} />
          </a>
        </div>

        {/* Mockup */}
        <div className="rounded-xl border border-gray-100 bg-bg p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-muted">SEO Score</span>
            <span className="text-muted">⋯</span>
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
    </div>
  );
}

function ScoreGauge({ value }: { value: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="#10B981" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-[24px] font-bold text-dark">{value}</p>
          <p className="text-[10px] text-green font-medium">Excellent</p>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
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
      <span className="h-2 w-2 rounded-full bg-green" />
      <span className="text-body">{label}:</span>
      <span className="font-medium text-green">{status}</span>
    </div>
  );
}

/* ─── Image Tools Card ─── */
function ImageCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-card">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">Image Tools</p>
          <h3 className="mt-2 text-[22px] font-bold leading-tight text-dark md:text-[26px]">
            Optimize images like a pro
          </h3>
          <p className="mt-2 text-[14px] text-muted">
            Compress, convert and optimize images for web in seconds.
          </p>
          <ul className="mt-4 space-y-2">
            {['Image Compressor (JPG, PNG, WEBP, AVIF)', 'Format Converter (50+ formats)', 'Resize & Crop Images', 'Bulk Optimization (up to 50 files)'].map((i) => (
              <li key={i} className="flex items-center gap-2 text-[13px] text-body">
                <Check size={14} className="text-green" strokeWidth={2.5} /> {i}
              </li>
            ))}
          </ul>
          <a href="#tools" className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-primary hover:underline">
            Explore Image Tools <ArrowRight size={14} />
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
    </div>
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
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-xl border border-gray-200"
    >
      {/* Before (gray) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
      <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-muted backdrop-blur">Original</span>

      {/* After (vibrant) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-200 to-primary/60"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span
        className="absolute left-3 top-3 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary backdrop-blur"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >Compressed</span>

      {/* Divider */}
      <div className="absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }} />
      <button
        type="button"
        aria-label="Drag"
        className="absolute top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-dark shadow-lg"
        style={{ left: `${pos}%` }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L3 8l3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 3l3 5-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
