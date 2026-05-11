'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories, toolsRegistry, type ToolCategory } from '@/lib/tools-registry';
import { ToolCard } from './ToolCard';

export function ToolsExplorer() {
  const [active, setActive] = useState<ToolCategory>('all');

  const visibleTools = useMemo(() => {
    if (active === 'all') return toolsRegistry;
    return toolsRegistry.filter((t) => t.category === active);
  }, [active]);

  return (
    <section id="tools" className="relative">
      {/* ───── Category pill strip ───── */}
      <div className="border-y border-stone-surface bg-parchment/60 backdrop-blur-sm">
        <div className="mx-auto max-w-page px-5 md:px-8">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-4">
            {categories.map((cat, i) => {
              const isActive = active === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.19, 1, 0.22, 1],
                    delay: i * 0.03,
                  }}
                  className={`relative flex shrink-0 items-center gap-2 rounded-pill border px-4 py-2 text-[13px] font-medium transition-all duration-200 ease-lux ${
                    isActive
                      ? 'border-midnight bg-midnight text-white'
                      : 'border-stone-surface bg-white text-graphite hover:border-ash/30 hover:bg-white'
                  }`}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  )}
                  {cat.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───── Tools Grid ───── */}
      <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-kicker text-ember">The Toolkit</p>
          <h2 className="mt-3 h-heading-lg text-[32px] text-midnight sm:text-[38px] md:text-[44px]">
            Every tool you actually need.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed tracking-[-0.16px] text-graphite">
            Built in-browser. No uploads, no accounts, no friction — just pure
            utility, wrapped in something beautiful.
          </p>
        </div>

        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {visibleTools.length === 0 && (
          <div className="mt-10 grid place-items-center rounded-cards border border-dashed border-stone-surface bg-white py-16 text-center">
            <p className="text-[14px] font-medium text-charcoal">
              No tools in this category yet.
            </p>
            <p className="mt-1 text-[13px] text-ash">
              We&rsquo;re crafting them. Check back soon.
            </p>
          </div>
        )}

        {/* View all CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 rounded-pill border border-stone-surface bg-white px-5 py-3 text-[14px] font-medium text-charcoal shadow-subtle transition-all duration-200 hover:border-midnight hover:bg-midnight hover:text-white"
          >
            View all 100+ tools
            <ArrowRight
              size={14}
              strokeWidth={2}
              className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
