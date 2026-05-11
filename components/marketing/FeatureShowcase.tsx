'use client';

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCountUp } from '@/lib/useCountUp';

export function FeatureShowcase() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <SeoBlock />
        <div className="h-28 md:h-36" />
        <ImageBlock />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── */
/* BLOCK 1 — SEO Suite                                */
/* ─────────────────────────────────────────────────── */

function SeoBlock() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      id="seo-suite"
      ref={ref}
      className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16"
    >
      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="relative md:col-span-6"
      >
        <div className="relative overflow-hidden rounded-cards-lg bg-white p-8 shadow-subtle">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ember/[0.06] blur-3xl"
          />
          <div className="relative flex flex-col items-center">
            <ScoreRing inView={inView} value={92} />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-ash">
              Overall SEO Score
            </p>
            <p className="mt-1 text-[14px] text-graphite">
              <span className="font-semibold text-charcoal">Excellent</span> &middot; 12 suggestions
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <MetricBar label="Title Tag" value={95} inView={inView} delay={0.4} />
            <MetricBar label="Meta Description" value={80} inView={inView} delay={0.5} />
            <MetricBar label="Page Speed" value={91} inView={inView} delay={0.6} />
            <MetricBar label="Backlinks" value={55} inView={inView} delay={0.7} />
          </div>
        </div>
      </motion.div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
        className="md:col-span-6"
      >
        <p className="label-kicker text-ember">SEO Suite</p>
        <h2 className="mt-3 h-heading-lg text-[28px] text-midnight sm:text-[34px] md:text-[40px]">
          Rank higher.
          <br />
          Fix issues faster.
        </h2>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed tracking-[-0.16px] text-graphite">
          A beautifully instrumented SEO suite. Scan any URL, see what&rsquo;s
          broken, and get surgical fixes you can ship in an afternoon.
        </p>
        <ul className="mt-8 space-y-3.5">
          {[
            'Live SEO score with issue-by-issue breakdown',
            'Core Web Vitals, metadata, and OG preview in one view',
            'Keyword density, n-grams, and topical coverage',
            'Backlink health and spam-score monitoring',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-tags bg-ember/10">
                <Check size={12} strokeWidth={2.2} className="text-ember" />
              </span>
              <span className="text-[15px] leading-relaxed tracking-[-0.2px] text-graphite">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function ScoreRing({ inView, value }: { inView: boolean; value: number }) {
  const score = useCountUp({ to: value, start: inView, duration: 1600 });
  const r = 64;
  const C = 2 * Math.PI * r;
  const offset = C - (score / 100) * C;

  return (
    <div className="relative">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={r} fill="none" stroke="#f2f0ed" strokeWidth="10" />
        <circle
          cx="80" cy="80" r={r} fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="10" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={offset}
          transform="rotate(-90 80 80)"
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.19,1,0.22,1)' }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff3e00" />
            <stop offset="100%" stopColor="#d48f00" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-[40px] font-semibold leading-none tracking-tight text-midnight">
            {score}
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-ash">
            /100
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value, inView, delay }: { label: string; value: number; inView: boolean; delay: number }) {
  const pct = useCountUp({ to: value, start: inView, duration: 1200 });
  return (
    <div>
      <div className="flex items-center justify-between text-[12.5px]">
        <span className="font-medium text-graphite">{label}</span>
        <span className="text-ash tabular-nums">{pct}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-surface">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1], delay }}
          className="h-full rounded-full bg-gradient-to-r from-ember/80 to-ember"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────── */
/* BLOCK 2 — Image Tools                             */
/* ─────────────────────────────────────────────────── */

function ImageBlock() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      id="image-tools"
      ref={ref}
      className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16"
    >
      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="order-2 md:order-1 md:col-span-6"
      >
        <p className="label-kicker text-ember">Image Tools</p>
        <h2 className="mt-3 h-heading-lg text-[28px] text-midnight sm:text-[34px] md:text-[40px]">
          Compress.
          <br />
          Convert. Create.
        </h2>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed tracking-[-0.16px] text-graphite">
          Pixel-precise image utilities that run entirely in the browser. Files
          never leave your device — and the output looks indistinguishable from
          the source.
        </p>
        <ul className="mt-8 space-y-3.5">
          {[
            'Smart compression with perceptual-quality control',
            'Convert between PNG, JPG, WebP, and AVIF losslessly',
            'Batch-resize with aspect ratio lock and EXIF preservation',
            'One-click backgrounds — transparent, blurred, or branded',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-tags bg-ember/10">
                <Check size={12} strokeWidth={2.2} className="text-ember" />
              </span>
              <span className="text-[15px] leading-relaxed tracking-[-0.2px] text-graphite">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Visual — before/after */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
        className="order-1 md:order-2 md:col-span-6"
      >
        <BeforeAfter />
      </motion.div>
    </div>
  );
}

function BeforeAfter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(55);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, next)));
  };

  const onDown = (e: ReactPointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
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
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-cards-lg border border-stone-surface bg-white shadow-sm"
    >
      {/* Before — neutral gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #EAE8E4 0%, #D4D1CC 50%, #BBB8B2 100%)' }}
      />
      <span className="absolute left-4 top-4 rounded-pill border border-white/60 bg-white/80 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-widest text-ash backdrop-blur">
        Before
      </span>

      {/* After — warm gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          background: 'linear-gradient(135deg, #FFF4E6 0%, #FFD9B8 40%, #FF7A3D 100%)',
        }}
      />
      <span
        className="absolute left-4 top-4 rounded-pill border border-ember/30 bg-ember/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-widest text-ember backdrop-blur"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        After
      </span>

      {/* Abstract content blocks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="grid grid-cols-3 gap-5 opacity-60">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-12 w-12 rounded-cards border border-white/40 bg-white/20 backdrop-blur-sm" />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white/80" style={{ left: `${pos}%` }} />

      {/* Drag handle */}
      <button
        type="button"
        aria-label="Drag to compare"
        onPointerDown={onDown}
        className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-midnight text-white shadow-lg ring-4 ring-white/60"
        style={{ left: `${pos}%` }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L3 8l3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 3l3 5-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Bottom caption */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/30 to-transparent p-4 text-[11.5px] font-medium text-white">
        <span>Drag to compare</span>
        <span className="tabular-nums opacity-80">{Math.round(pos)}%</span>
      </div>
    </div>
  );
}
