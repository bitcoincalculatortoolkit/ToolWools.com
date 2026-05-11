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

  const blob1Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  return (
    <section id="cta" ref={ref} className="relative">
      <div className="mx-auto max-w-page px-5 pb-24 md:px-8 md:pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="relative isolate overflow-hidden rounded-cards-lg bg-midnight px-6 py-20 text-center md:px-16 md:py-28"
        >
          {/* Grid texture */}
          <span aria-hidden className="pointer-events-none absolute inset-0 grain" />

          {/* Ember blob */}
          <motion.span
            aria-hidden
            style={{ y: blob1Y }}
            className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-ember/20 blur-[100px]"
          />
          <motion.span
            aria-hidden
            style={{ y: blob2Y }}
            className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky/10 blur-[80px]"
          />

          {/* Kicker */}
          <p className="relative label-kicker text-ember">Start for free</p>

          {/* Headline */}
          <h2 className="relative mx-auto mt-5 max-w-3xl font-display text-[34px] font-medium leading-[1.09] tracking-[-1.14px] text-white sm:text-[44px] md:text-[56px] md:tracking-[-2.11px]">
            Your tools.
            <br />
            Your workflow.
          </h2>

          <p className="relative mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            One hundred meticulously designed utilities, all free, all instant.
            No signup. No waiting. Your browser is the only runtime.
          </p>

          {/* CTAs */}
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#tools"
              className="group inline-flex items-center gap-2 rounded-pill bg-ember px-6 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:bg-ember/90 hover:shadow-lg"
            >
              Explore All Tools
              <ArrowRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#seo-suite"
              className="inline-flex items-center gap-1.5 rounded-pill border border-white/15 px-5 py-3.5 text-[15px] font-medium text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/5"
            >
              Learn more
            </a>
          </div>

          {/* Trust row */}
          <div className="relative mt-10 flex items-center justify-center gap-6 text-[11.5px] text-white/40">
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
