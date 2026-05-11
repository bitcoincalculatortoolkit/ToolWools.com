'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-28 pb-20 md:pt-40 md:pb-24">
      {/* Decorative stars */}
      <Star className="absolute left-[8%] top-32 text-primary animate-pulse-star" />
      <Star className="absolute right-[12%] top-40 text-blue animate-pulse-star [animation-delay:0.6s]" />
      <Star className="absolute left-[15%] bottom-28 text-green animate-pulse-star [animation-delay:1.2s]" />
      <Star className="absolute right-[8%] bottom-32 text-primary-light animate-pulse-star [animation-delay:0.3s]" />

      {/* Mascots */}
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
        className="absolute bottom-20 left-[6%] hidden animate-float-delay-2 md:block lg:left-[10%]"
        size={110}
      />
      <Mascot
        color="#FBBF24"
        emoji="PDF"
        className="absolute bottom-16 right-[6%] hidden animate-float-delay-3 md:block lg:right-[10%]"
        size={115}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-[720px] px-5 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD0B5] bg-primary-bg px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            All-in-one online tools platform
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mt-7 font-display text-[40px] font-extrabold leading-[1.08] text-dark sm:text-[52px] md:text-[72px]"
        >
          Every tool
          <br />
          your <em className="not-italic text-primary">workflow</em>
          <br />
          will ever need.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="mx-auto mt-6 max-w-[520px] text-[17px] leading-[1.7] text-muted"
        >
          SEO, Images, PDFs, Text, AI and Developer tools — all in one place.
          100% free to use. No signups. No limits.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#tools"
            className="group inline-flex items-center gap-2 rounded-btn bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-hover"
          >
            Explore All Tools
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-btn border border-border bg-white px-6 py-3 text-[15px] font-medium text-body transition-colors hover:bg-bg"
          >
            <Play size={14} className="text-muted" />
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

/* ─── Mascot blob character ─── */
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
        {/* Body blob */}
        <ellipse cx="60" cy="65" rx="40" ry="38" fill={color} opacity={0.9} />
        {/* Eyes */}
        <circle cx="48" cy="58" r="4" fill="white" />
        <circle cx="72" cy="58" r="4" fill="white" />
        <circle cx="49" cy="59" r="2" fill="#111" />
        <circle cx="73" cy="59" r="2" fill="#111" />
        {/* Smile */}
        <path d="M50 72 Q60 80 70 72" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Arms */}
        <path d="M22 65 Q15 55 20 48" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M98 65 Q105 55 100 48" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Legs */}
        <path d="M45 100 L45 112" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M75 100 L75 112" stroke={color} strokeWidth="4" strokeLinecap="round" />
        {/* Held item */}
        <rect x="42" y="35" width="36" height="24" rx="6" fill="white" opacity={0.85} />
        <text x="60" y="52" textAnchor="middle" fontSize="12" fill={color} fontWeight="bold">
          {emoji}
        </text>
      </svg>
    </div>
  );
}
