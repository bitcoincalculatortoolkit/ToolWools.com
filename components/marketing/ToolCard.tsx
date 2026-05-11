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
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-cards bg-white p-8 shadow-subtle card-hover"
    >
      {/* Hover arrow top-right */}
      <span
        aria-hidden
        className="absolute right-6 top-6 grid h-8 w-8 translate-x-1 -translate-y-1 place-items-center rounded-full bg-parchment text-ash opacity-0 transition-all duration-300 ease-spring group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-midnight group-hover:text-white group-hover:opacity-100"
      >
        <ArrowUpRight size={13} strokeWidth={2} />
      </span>

      {/* Icon */}
      <span className="grid h-12 w-12 place-items-center rounded-icons bg-parchment text-graphite transition-colors duration-300 group-hover:bg-ember/10 group-hover:text-ember">
        <Icon size={20} strokeWidth={1.5} />
      </span>

      {/* Body */}
      <div className="mt-5 flex-1">
        <h3 className="text-[16px] font-semibold tracking-[-0.16px] text-charcoal">
          {tool.name}
        </h3>
        <p className="mt-1.5 text-[14px] leading-[1.55] tracking-[-0.14px] text-graphite">
          {tool.description}
        </p>
      </div>

      {/* Footer — category badge */}
      <div className="mt-6 flex items-center gap-2">
        <span className="rounded-tags border border-stone-surface bg-parchment px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-ash">
          {tool.categoryLabel}
        </span>
        {tool.isNew && (
          <span className="rounded-tags border border-ember/20 bg-ember/5 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-ember">
            NEW
          </span>
        )}
        {tool.popular && !tool.isNew && (
          <span className="rounded-tags border border-stone-surface bg-white px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-ash">
            Popular
          </span>
        )}
      </div>
    </motion.a>
  );
}
