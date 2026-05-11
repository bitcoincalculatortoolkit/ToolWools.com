'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { CompressorPreview } from './CompressorPreview';
import { formatCompact, useCountUp } from '@/lib/useCountUp';

const HEADLINE_LINES: string[][] = [
  ['Every', 'tool'],
  ['your', 'workflow'],
  ['will', 'ever', 'need.'],
];

export function Hero() {
  // Parallax — use page scroll so layers keep moving as the user scrolls
  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 600], [0, 120]);
  const orb2Y = useTransform(scrollY, [0, 600], [0, -80]);
  const gridY = useTransform(scrollY, [0, 600], [0, 60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.6]);

  return (
    <section className="relative isolate overflow-hidden pt-28 md:pt-36">
      {/* ───────── Parallax background layers ───────── */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(17,17,16,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,16,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)',
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: orb1Y }}
        className="pointer-events-none absolute -left-32 top-24 -z-10 h-[480px] w-[480px] rounded-full"
      >
        <div className="h-full w-full animate-blob rounded-full bg-gold/20 blur-3xl" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: orb2Y }}
        className="pointer-events-none absolute -right-24 top-48 -z-10 h-[420px] w-[420px] rounded-full"
      >
        <div className="h-full w-full animate-blob rounded-full bg-cream-3/60 blur-3xl [animation-delay:4s]" />
      </motion.div>

      {/* ───────── Content ───────── */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 md:grid-cols-12 md:gap-6 md:px-8 md:pb-28"
      >
        {/* Left column */}
        <div className="md:col-span-7">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-white/80 px-3 py-1.5 text-[12px] font-medium text-ink-3 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Free Online Tools
          </motion.span>

          {/* Headline — word-by-word blur-to-sharp */}
          <h1 className="mt-6 h-display text-[44px] leading-[1.02] text-ink sm:text-[56px] md:text-[64px]">
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => {
                  const absoluteIndex =
                    HEADLINE_LINES.slice(0, li).reduce((a, l) => a + l.length, 0) + wi;
                  return (
                    <motion.span
                      key={`${li}-${wi}`}
                      initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.9,
                        ease: [0.2, 0.8, 0.2, 1],
                        delay: 0.15 + absoluteIndex * 0.06,
                      }}
                      className="mr-[0.25em] inline-block will-change-transform"
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
            className="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-ink-3"
          >
            A luxury-minimal suite of 100+ browser-native tools — SEO, image,
            PDF, text, and developer utilities. No signup. Instant. Beautifully
            crafted.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.85 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#tools"
              className="group inline-flex items-center gap-1.5 rounded-[12px] bg-ink px-5 py-3.5 text-[14px] font-medium text-white transition-all duration-300 ease-lux hover:scale-[1.02] hover:shadow-gold"
            >
              Explore all tools
              <ArrowRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#seo-suite"
              className="group inline-flex items-center gap-2 rounded-[12px] px-4 py-3.5 text-[14px] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-line bg-white transition-all duration-300 group-hover:border-gold-border group-hover:bg-gold-bg">
                <PlayCircle
                  size={16}
                  strokeWidth={1.5}
                  className="text-ink-2 transition-colors group-hover:text-gold"
                />
              </span>
              Watch 60-sec tour
            </a>
          </motion.div>

          {/* Stats */}
          <HeroStats />
        </div>

        {/* Right column — 3D tilt preview card */}
        <div className="relative md:col-span-5">
          <TiltCard />
        </div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */
/* Stats bar — counters animate when in viewport               */
/* ──────────────────────────────────────────────────────────── */
function HeroStats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
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
    <div
      ref={ref}
      className="mt-10 grid max-w-[520px] grid-cols-3 overflow-hidden rounded-[14px] border border-line bg-white/70 backdrop-blur-sm"
    >
      <StatCell value={`${tools}+`} label="Free tools" />
      <StatCell value={formatCompact(users)} label="Monthly users" divide />
      <StatCell value={`${signups}`} label="Signups needed" divide />
    </div>
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
    <div
      className={`px-4 py-4 ${divide ? 'border-l border-line' : ''}`}
    >
      <p className="text-[22px] font-semibold tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-0.5 text-[11.5px] text-ink-3">{label}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */
/* Tilt card — tracks mouse position, spring-driven rotation   */
/* ──────────────────────────────────────────────────────────── */
function TiltCard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Max 5deg in either direction, smoothed with spring
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.35 }}
      className="relative"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-[28px] border border-line bg-white p-2 shadow-lux"
      >
        <CompressorPreview />

        {/* Floating badge — top right */}
        <div
          className="pointer-events-none absolute -right-4 -top-4 animate-floatY rounded-[14px] border border-gold-border bg-white px-3.5 py-2 shadow-lux"
          style={{ transform: 'translateZ(40px)' }}
        >
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-gold">
            72% smaller
          </p>
          <p className="text-[12px] font-medium text-ink">in 0.8s</p>
        </div>

        {/* Floating badge — bottom left */}
        <div
          className="pointer-events-none absolute -bottom-4 -left-4 animate-floatY2 rounded-[14px] border border-line bg-white px-3.5 py-2 shadow-lux"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[13px]">★</span>
            <div>
              <p className="text-[12px] font-semibold text-ink">4.8 Rating</p>
              <p className="text-[10.5px] text-ink-4">12k reviews</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
