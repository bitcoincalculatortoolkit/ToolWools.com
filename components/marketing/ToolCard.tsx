'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Tool } from '@/lib/tools-registry';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  return (
    <motion.a
      layout
      href={`#${tool.slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-white p-7 shadow-soft transition-[border-color,box-shadow] duration-300 ease-lux hover:border-gold-border hover:shadow-lux"
    >
      {/* Gold gradient overlay on hover (top-right tint) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-lux group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(184,150,46,0.10), transparent 55%)',
        }}
      />

      {/* Hover arrow top-right */}
      <span
        aria-hidden
        className="absolute right-5 top-5 grid h-8 w-8 translate-x-1 -translate-y-1 place-items-center rounded-full border border-line bg-white text-ink-3 opacity-0 transition-all duration-300 ease-lux group-hover:translate-x-0 group-hover:translate-y-0 group-hover:border-gold-border group-hover:bg-gold-bg group-hover:text-gold group-hover:opacity-100"
      >
        <ArrowUpRight size={14} strokeWidth={1.75} />
      </span>

      {/* Icon */}
      <span className="grid h-12 w-12 place-items-center rounded-[12px] bg-cream-2 text-ink-2 transition-colors duration-300 ease-lux group-hover:bg-gold-bg group-hover:text-gold">
        <Icon size={20} strokeWidth={1.5} />
      </span>

      {/* Body */}
      <div className="mt-5 flex-1">
        <h3 className="text-[16px] font-semibold tracking-tight text-ink">
          {tool.name}
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink-3">
          {tool.description}
        </p>
      </div>

      {/* Footer — category + badges */}
      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-pill border border-gold-border bg-gold-bg px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wide text-gold">
          {tool.categoryLabel}
        </span>
        {tool.isNew && (
          <span className="rounded-pill border border-line bg-cream-2 px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wide text-ink-2">
            NEW
          </span>
        )}
        {tool.popular && !tool.isNew && (
          <span className="rounded-pill border border-line bg-white px-2.5 py-0.5 text-[10.5px] font-medium tracking-wide text-ink-3">
            Popular
          </span>
        )}
      </div>
    </motion.a>
  );
}
