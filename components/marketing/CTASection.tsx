'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax blobs drift as the section scrolls
  const blob1Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  return (
    <section id="cta" ref={ref} className="relative">
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative isolate overflow-hidden rounded-[36px] bg-ink px-6 py-20 text-center md:px-16 md:py-28"
        >
          {/* Grid texture */}
          <span aria-hidden className="pointer-events-none absolute inset-0 grain" />

          {/* Gold orbit blob */}
          <motion.span
            aria-hidden
            style={{ y: blob1Y }}
            className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
          />
          <motion.span
            aria-hidden
            style={{ y: blob2Y }}
            className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
          />

          {/* Kicker */}
          <p className="relative label-kicker text-gold-light">
            Start for free
          </p>

          {/* Headline */}
          <h2 className="relative mx-auto mt-5 max-w-3xl h-display text-[36px] leading-[1.04] text-white sm:text-[44px] md:text-[56px]">
            Your tools.
            <br />
            Your workflow.
          </h2>

          <p className="relative mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/60">
            One hundred meticulously designed utilities, all free, all instant.
            No signup. No waiting. Your browser is the only runtime.
          </p>

          {/* CTAs */}
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#tools"
              className="group inline-flex items-center gap-1.5 rounded-[12px] bg-gold px-5 py-3.5 text-[14px] font-medium text-white transition-all duration-300 ease-lux hover:scale-[1.03] hover:bg-gold-light"
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
              className="inline-flex items-center gap-1.5 rounded-[12px] border border-white/20 px-5 py-3.5 text-[14px] font-medium text-white transition-colors duration-300 ease-lux hover:border-white/50 hover:bg-white/5"
            >
              Learn more
            </a>
          </div>

          {/* Micro row */}
          <div className="relative mt-10 flex items-center justify-center gap-6 text-[11.5px] text-white/50">
            <span>No credit card</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>No signup</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Works offline</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
