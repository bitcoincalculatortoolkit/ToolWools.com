'use client';

import Link from 'next/link';
import { ArrowRight, Image, Type, Code2 } from 'lucide-react';
import type { ToolData } from '@/lib/tools-data';

const iconMap: Record<string, React.ElementType> = {
  'image-compressor': Image,
  'word-counter': Type,
  'json-formatter': Code2,
};

const colorMap: Record<string, { bg: string; text: string }> = {
  'image-compressor': { bg: 'bg-primary-bg', text: 'text-primary' },
  'word-counter': { bg: 'bg-green-bg', text: 'text-green' },
  'json-formatter': { bg: 'bg-blue-bg', text: 'text-blue' },
};

interface RelatedToolsProps {
  tools: ToolData[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold text-dark mb-6">
        Related Tools
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {tools.map((tool) => {
          const Icon = iconMap[tool.slug] || Code2;
          const colors = colorMap[tool.slug] || { bg: 'bg-gray-100', text: 'text-muted' };

          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group flex-shrink-0 w-[260px] rounded-2xl border border-gray-100/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium hover:border-transparent"
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl ${colors.bg}`}
              >
                <Icon size={22} className={colors.text} strokeWidth={1.5} />
              </span>
              <h3 className="mt-3 text-[15px] font-semibold text-dark">{tool.name}</h3>
              <p className="mt-1 text-[13px] text-muted leading-relaxed line-clamp-2">
                {tool.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-primary opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Try Now <ArrowRight size={12} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
