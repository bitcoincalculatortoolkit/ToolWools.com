'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCountUp, formatCompact } from '@/lib/useCountUp';

const HEADLINE_WORDS = ['Every', 'tool', 'your', 'workflow', 'will', 'ever', 'need.'];

export function Hero() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.97]);

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-44 md:pb-36">
      {/* ───── Parallax background layers ───── */}
      <BackgroundLayers />

      {/* ───── Content: single centered column ───── */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative mx-auto flex max-w-page flex-col items-center px-5 text-center md:px-8"
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="inline-flex items-center gap-2 rounded-pill border border-stone-surface bg-white px-3.5 py-1.5 text-[13px] font-medium text-ash shadow-subtle"
        >
          <Sparkles size={13} strokeWidth={1.5} className="text-ember" />
          Free Online Tools — No Signup
        </motion.span>

        {/* Headline — word-by-word blur-to-sharp stagger */}
        <h1 className="mt-8 h-display max-w-[820px] text-[40px] text-midnight sm:text-[54px] md:text-[68px]">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 1,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.2 + i * 0.06,
              }}
              className="mr-[0.22em] inline-block will-change-transform"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.7 }}
          className="mt-6 max-w-[520px] text-[17px] leading-[1.53] tracking-[-0.22px] text-graphite"
        >
          A suite of 100+ browser-native utilities — SEO, image compression, PDF,
          text analysis, and developer tools. No installs. No accounts. Just results.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.9 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          {/* Primary dark pill */}
          <a
            href="#tools"
            className="group inline-flex items-center gap-2 rounded-pill bg-midnight px-6 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:bg-charcoal hover:shadow-sm"
          >
            Explore All Tools
            <ArrowRight
              size={15}
              strokeWidth={2}
              className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5"
            />
          </a>
          {/* Ghost ember link */}
          <a
            href="#seo-suite"
            className="inline-flex items-center gap-1.5 px-4 py-3.5 text-[15px] font-medium text-ember transition-colors duration-200 hover:text-ember/80"
          >
            Watch the demo
          </a>
        </motion.div>

        {/* Stats row */}
        <HeroStats />

        {/* Floating tool preview card beneath */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 1.1 }}
          className="relative mt-16 w-full max-w-[700px]"
        >
          <HeroPreviewCard />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────── */
/* Background parallax layers                          */
/* ──────────────────────────────────────────────────── */

function BackgroundLayers() {
  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 600], [0, 100]);
  const orb2Y = useTransform(scrollY, [0, 600], [0, -70]);
  const gridY = useTransform(scrollY, [0, 600], [0, 50]);

  return (
    <>
      {/* Subtle grid */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(71,70,69,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(71,70,69,0.04) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Ember orange glow — top */}
      <motion.div
        aria-hidden
        style={{ y: orb1Y }}
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2"
      >
        <div className="h-full w-full animate-blob rounded-full bg-ember/[0.06] blur-[100px]" />
      </motion.div>

      {/* Cool blue glow — bottom right */}
      <motion.div
        aria-hidden
        style={{ y: orb2Y }}
        className="pointer-events-none absolute -right-32 top-64 -z-10 h-[400px] w-[400px]"
      >
        <div className="h-full w-full animate-blob rounded-full bg-sky/[0.05] blur-[80px] [animation-delay:5s]" />
      </motion.div>
    </>
  );
}

/* ──────────────────────────────────────────────────── */
/* Hero Stats — animated counters                      */
/* ──────────────────────────────────────────────────── */

function HeroStats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const tools = useCountUp({ to: 100, start: visible });
  const users = useCountUp({ to: 2_400_000, start: visible, duration: 1800 });
  const signups = useCountUp({ to: 0, start: visible });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 1.05 }}
      className="mt-12 grid grid-cols-3 overflow-hidden rounded-cards border border-stone-surface bg-white shadow-subtle"
    >
      <StatCell value={`${tools}+`} label="Free tools" />
      <StatCell value={formatCompact(users)} label="Monthly users" divide />
      <StatCell value={`${signups}`} label="Signups needed" divide />
    </motion.div>
  );
}

function StatCell({
  value,
  label,
  divide = false,
}: {
  value: string;
  label: string;
  divide?: boolean;
}) {
  return (
    <div className={`px-5 py-4 ${divide ? 'border-l border-stone-surface' : ''}`}>
      <p className="text-[20px] font-semibold tracking-tight text-midnight tabular-nums sm:text-[22px]">
        {value}
      </p>
      <p className="mt-0.5 text-[11.5px] font-medium text-ash">{label}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────── */
/* Hero Preview Card (UI shell for image compressor)   */
/* ──────────────────────────────────────────────────── */

function HeroPreviewCard() {
  return (
    <div className="relative overflow-hidden rounded-cards-lg border border-stone-surface bg-white p-1.5 shadow-sm">
      {/* Inner card */}
      <div className="rounded-[18px] bg-parchment p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-coral/60" />
            <span className="h-3 w-3 rounded-full bg-sunburst/60" />
            <span className="h-3 w-3 rounded-full bg-meadow/60" />
          </div>
          <span className="rounded-tags bg-white px-2.5 py-1 text-[11px] font-medium text-ash shadow-subtle">
            Image Compressor
          </span>
        </div>

        {/* Mock content */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* File item */}
          <div className="col-span-2 flex items-center gap-3 rounded-cards bg-white p-4 shadow-subtle">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-cards bg-parchment">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-graphite">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-charcoal">
                hero-banner.png
              </p>
              <p className="text-[11.5px] text-ash">2.4 MB → 672 KB</p>
            </div>
            <span className="rounded-tags bg-meadow/10 px-2 py-0.5 text-[11px] font-semibold text-meadow">
              −72%
            </span>
          </div>

          {/* Mini stat */}
          <div className="flex flex-col items-center justify-center rounded-cards bg-white p-4 shadow-subtle">
            <p className="text-[28px] font-semibold tracking-tight text-midnight">72<span className="text-ember">%</span></p>
            <p className="mt-1 text-[11px] font-medium text-ash">Size reduced</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-stone-surface">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: [0.19, 1, 0.22, 1], delay: 1.5 }}
            className="h-full rounded-full bg-gradient-to-r from-ember/80 to-ember"
          />
        </div>
        <p className="mt-2 text-center text-[11.5px] text-ash">Completed in 0.8s — no server upload</p>
      </div>

      {/* Floating badges */}
      <div className="pointer-events-none absolute -right-3 top-6 animate-floatY rounded-pill border border-stone-surface bg-white px-3 py-1.5 shadow-sm">
        <p className="text-[11px] font-semibold text-ember">72% smaller</p>
      </div>
      <div className="pointer-events-none absolute -left-3 bottom-10 animate-floatY2 rounded-pill border border-stone-surface bg-white px-3 py-1.5 shadow-sm">
        <p className="text-[11px] font-medium text-charcoal">★ 4.8 rating</p>
      </div>
    </div>
  );
}
