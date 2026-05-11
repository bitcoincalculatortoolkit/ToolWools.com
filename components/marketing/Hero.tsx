'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HEADLINE_WORDS_LINE1 = ['Every', 'tool'];
const HEADLINE_WORDS_LINE2 = ['your'];
const HEADLINE_ACCENT = 'workflow';
const HEADLINE_WORDS_LINE3 = ['will', 'ever', 'need.'];

const FLOATING_SHAPES = [
  { size: 80, x: '10%', y: '25%', delay: 0, duration: 18, opacity: 0.06, type: 'circle' },
  { size: 60, x: '85%', y: '20%', delay: 2, duration: 22, opacity: 0.05, type: 'square' },
  { size: 100, x: '75%', y: '70%', delay: 4, duration: 20, opacity: 0.04, type: 'circle' },
  { size: 50, x: '20%', y: '75%', delay: 1, duration: 16, opacity: 0.06, type: 'square' },
  { size: 70, x: '60%', y: '15%', delay: 3, duration: 24, opacity: 0.04, type: 'circle' },
  { size: 40, x: '5%', y: '55%', delay: 5, duration: 19, opacity: 0.05, type: 'square' },
];

export function Hero() {
  const allWords = [...HEADLINE_WORDS_LINE1, ...HEADLINE_WORDS_LINE2, HEADLINE_ACCENT, ...HEADLINE_WORDS_LINE3];
  const totalWords = allWords.length;

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh-hero" aria-hidden />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden />

      {/* Floating geometric shapes */}
      {FLOATING_SHAPES.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 10, -5, 15, 0],
            rotate: [0, 5, -3, 2, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden
        >
          {shape.type === 'circle' ? (
            <div
              className="rounded-full bg-primary"
              style={{ width: shape.size, height: shape.size, opacity: shape.opacity }}
            />
          ) : (
            <div
              className="rounded-2xl bg-blue"
              style={{ width: shape.size, height: shape.size, opacity: shape.opacity }}
            />
          )}
        </motion.div>
      ))}

      {/* Decorative stars */}
      <Star className="absolute left-[8%] top-32 text-primary animate-pulse-star" />
      <Star className="absolute right-[12%] top-40 text-blue animate-pulse-star [animation-delay:0.6s]" />
      <Star className="absolute left-[15%] bottom-28 text-green animate-pulse-star [animation-delay:1.2s]" />
      <Star className="absolute right-[8%] bottom-32 text-primary-light animate-pulse-star [animation-delay:0.3s]" />

      {/* Mascots with glow rings */}
      <Mascot
        color="#10B981"
        emoji="📊"
        className="absolute left-[4%] top-36 hidden animate-float md:block lg:left-[8%]"
        size={130}
      />
      <Mascot
        color="#F4511E"
        emoji="Aa"
        className="absolute right-[4%] top-32 hidden animate-float-delay-1 md:block lg:right-[8%]"
        size={120}
      />
      <Mascot
        color="#2563EB"
        emoji="🖼️"
        className="absolute bottom-24 left-[6%] hidden animate-float-delay-2 md:block lg:left-[10%]"
        size={110}
      />
      <Mascot
        color="#FBBF24"
        emoji="PDF"
        className="absolute bottom-20 right-[6%] hidden animate-float-delay-3 md:block lg:right-[10%]"
        size={115}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-[760px] px-5 text-center z-10">
        {/* Badge with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="shimmer inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 backdrop-blur-sm px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            All-in-one online tools platform
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <h1 className="mt-8 font-display text-[42px] font-extrabold leading-[1.05] text-dark sm:text-[56px] md:text-[76px] tracking-[-0.03em]">
          {/* Line 1 */}
          {HEADLINE_WORDS_LINE1.map((word, i) => (
            <motion.span
              key={`l1-${i}`}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {/* Line 2 */}
          {HEADLINE_WORDS_LINE2.map((word, i) => (
            <motion.span
              key={`l2-${i}`}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.2 + (HEADLINE_WORDS_LINE1.length + i) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
          {/* Accent word */}
          <motion.span
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.2 + (HEADLINE_WORDS_LINE1.length + HEADLINE_WORDS_LINE2.length) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mr-[0.25em] text-gradient-primary"
          >
            {HEADLINE_ACCENT}
          </motion.span>
          <br />
          {/* Line 3 */}
          {HEADLINE_WORDS_LINE3.map((word, i) => (
            <motion.span
              key={`l3-${i}`}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.2 + (HEADLINE_WORDS_LINE1.length + HEADLINE_WORDS_LINE2.length + 1 + i) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + totalWords * 0.08 }}
          className="mx-auto mt-7 max-w-[540px] text-[17px] leading-[1.7] text-muted"
        >
          SEO, Images, PDFs, Text, AI and Developer tools — all in one place.
          100% free to use. No signups. No limits.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + totalWords * 0.08 + 0.1 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#tools"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 btn-glow overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore All Tools
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
          <a
            href="#demo"
            className="group inline-flex items-center gap-2.5 rounded-xl border border-border/60 bg-white/80 backdrop-blur-sm px-7 py-3.5 text-[15px] font-medium text-body transition-all duration-300 hover:bg-white hover:shadow-premium-sm hover:border-border"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gray-100 transition-colors group-hover:bg-primary-bg">
              <Play size={10} className="text-muted transition-colors group-hover:text-primary ml-0.5" fill="currentColor" />
            </span>
            See How It Works
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SVG Star ─── */
function Star({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
    </svg>
  );
}

/* ─── Mascot blob character with glow ring ─── */
function Mascot({
  color,
  emoji,
  className,
  size = 120,
}: {
  color: string;
  emoji: string;
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
        {/* Glow ring underneath */}
        <ellipse cx="60" cy="108" rx="28" ry="6" fill={color} opacity={0.15} />
        {/* Outer glow */}
        <ellipse cx="60" cy="65" rx="44" ry="42" fill={color} opacity={0.08} />
        {/* Body blob — organic shape */}
        <path
          d="M60 27C38 27 22 42 22 65C22 88 38 103 60 103C82 103 98 88 98 65C98 42 82 27 60 27Z"
          fill={color}
          opacity={0.9}
        />
        {/* Highlight */}
        <ellipse cx="48" cy="48" rx="12" ry="8" fill="white" opacity={0.15} />
        {/* Eyes */}
        <circle cx="48" cy="58" r="5" fill="white" />
        <circle cx="72" cy="58" r="5" fill="white" />
        <circle cx="49" cy="59" r="2.5" fill="#111" />
        <circle cx="73" cy="59" r="2.5" fill="#111" />
        {/* Eye sparkle */}
        <circle cx="47" cy="57" r="1" fill="white" opacity={0.8} />
        <circle cx="71" cy="57" r="1" fill="white" opacity={0.8} />
        {/* Smile */}
        <path d="M50 72 Q60 80 70 72" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Arms */}
        <path d="M22 62 Q14 52 18 44" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M98 62 Q106 52 102 44" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Legs */}
        <path d="M45 100 L45 112" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <path d="M75 100 L75 112" stroke={color} strokeWidth="5" strokeLinecap="round" />
        {/* Held item */}
        <rect x="42" y="33" width="36" height="24" rx="8" fill="white" opacity={0.9} />
        <text x="60" y="50" textAnchor="middle" fontSize="12" fill={color} fontWeight="bold">
          {emoji}
        </text>
      </svg>
    </div>
  );
}
