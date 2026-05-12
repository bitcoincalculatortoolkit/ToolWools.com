'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Zap, ShieldCheck, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ToolHeroProps {
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  categorySlug: string;
  categoryLabel: string;
  toolName: string;
  headline: string;
  subheadline: string;
  highlights: string[];
}

/**
 * Premium tool hero with gradient mesh, breadcrumb, and trust chips.
 * Used at the top of every tool page.
 */
export function ToolHero({
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary-bg',
  categorySlug,
  categoryLabel,
  toolName,
  headline,
  subheadline,
  highlights,
}: ToolHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/50 bg-white">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 gradient-mesh-hero opacity-80" />

      {/* Decorative grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-page px-4 md:px-6 pt-10 md:pt-14 pb-12 md:pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px]">
          <Link
            href="/"
            className="flex items-center gap-1 text-muted hover:text-primary transition-colors"
          >
            <Home size={13} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-border" />
          <Link
            href="/tools"
            className="text-muted hover:text-primary transition-colors"
          >
            Tools
          </Link>
          <ChevronRight size={13} className="text-border" />
          <Link
            href={`/tools/${categorySlug}`}
            className="text-muted hover:text-primary transition-colors"
          >
            {categoryLabel}
          </Link>
          <ChevronRight size={13} className="text-border" />
          <span className="text-dark font-medium truncate max-w-[220px]">{toolName}</span>
        </nav>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-4xl"
        >
          <div className="flex items-start gap-4 md:gap-5">
            {/* Icon */}
            <div className={`grid h-14 w-14 md:h-16 md:w-16 place-items-center rounded-2xl ${iconBg} flex-shrink-0 shadow-sm`}>
              <Icon className={`h-7 w-7 md:h-8 md:w-8 ${iconColor}`} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              {/* Category tag */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted shadow-sm">
                {categoryLabel}
              </span>
              {/* Headline */}
              <h1 className="mt-3 heading-xl text-[32px] sm:text-[40px] md:text-[48px] text-dark">
                {headline}
              </h1>
            </div>
          </div>

          {/* Subheadline */}
          <p className="mt-5 max-w-3xl text-[16px] md:text-[17px] leading-[1.65] text-body">
            {subheadline}
          </p>

          {/* Trust chips / feature highlights */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-bg px-3 py-1.5 text-[12px] font-semibold text-green">
              <Lock size={12} strokeWidth={2.5} /> 100% Private
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-bg px-3 py-1.5 text-[12px] font-semibold text-blue">
              <Zap size={12} strokeWidth={2.5} /> Instant Results
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-bg px-3 py-1.5 text-[12px] font-semibold text-primary">
              <ShieldCheck size={12} strokeWidth={2.5} /> No Signup Required
            </span>
            {highlights.slice(0, 2).map((h) => (
              <span
                key={h}
                className="inline-flex items-center rounded-full bg-white border border-border/60 px-3 py-1.5 text-[12px] font-medium text-muted"
              >
                {h}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
