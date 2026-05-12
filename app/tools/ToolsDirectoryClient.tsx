'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Image, Tag, Type, FileText, Globe, Code2 } from 'lucide-react';
import type { ToolData } from '@/lib/tools-data';

const CATEGORIES = [
  'All',
  'SEO Tools',
  'Image Tools',
  'PDF Tools',
  'Text Tools',
  'Developer Tools',
];

const categoryFilterMap: Record<string, string> = {
  'All': '',
  'SEO Tools': 'seo-tools',
  'Image Tools': 'image-tools',
  'PDF Tools': 'pdf-tools',
  'Text Tools': 'text-tools',
  'Developer Tools': 'developer-tools',
};

const iconMap: Record<string, React.ElementType> = {
  'image-compressor': Image,
  'meta-tag-generator': Tag,
  'word-counter': Type,
  'pdf-compressor': FileText,
  'domain-authority-checker': Globe,
  'json-formatter': Code2,
};

const colorMap: Record<string, { bg: string; color: string; gradientFrom: string }> = {
  'image-compressor': { bg: 'bg-primary-bg', color: 'text-primary', gradientFrom: 'from-primary/5' },
  'meta-tag-generator': { bg: 'bg-blue-bg', color: 'text-blue', gradientFrom: 'from-blue/5' },
  'word-counter': { bg: 'bg-green-bg', color: 'text-green', gradientFrom: 'from-green/5' },
  'pdf-compressor': { bg: 'bg-primary-bg', color: 'text-primary', gradientFrom: 'from-primary/5' },
  'domain-authority-checker': { bg: 'bg-blue-bg', color: 'text-blue', gradientFrom: 'from-blue/5' },
  'json-formatter': { bg: 'bg-green-bg', color: 'text-green', gradientFrom: 'from-green/5' },
};

interface ToolsDirectoryClientProps {
  tools: ToolData[];
}

export function ToolsDirectoryClient({ tools }: ToolsDirectoryClientProps) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredTools = activeTab === 'All'
    ? tools
    : tools.filter((tool) => tool.category === categoryFilterMap[activeTab]);

  return (
    <>
      {/* Category filter tabs */}
      <div className="no-scrollbar mb-8 flex items-center gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-300 ${
              activeTab === cat
                ? 'bg-dark text-white shadow-md'
                : 'bg-white text-body border border-border/40 hover:border-border hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => {
          const Icon = iconMap[tool.slug] || Code2;
          const colors = colorMap[tool.slug] || { bg: 'bg-gray-100', color: 'text-muted', gradientFrom: 'from-gray-100/5' };

          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group relative rounded-2xl border border-gray-100/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium hover:border-transparent overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(244,81,30,0.08) 0%, rgba(37,99,235,0.06) 100%)',
                }}
              />
              <div className="absolute inset-px rounded-[15px] bg-white z-0 pointer-events-none" />

              {/* Icon */}
              <span className={`relative z-10 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${colors.gradientFrom} to-transparent ${colors.bg}`}>
                <Icon size={24} className={colors.color} strokeWidth={1.5} />
              </span>

              {/* Category label */}
              <span className="relative z-10 mt-3 inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                {tool.categoryLabel}
              </span>

              {/* Title */}
              <h3 className="relative z-10 mt-2 text-[16px] font-semibold text-dark leading-tight">
                {tool.name}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-1.5 text-[13px] text-muted leading-relaxed line-clamp-2">
                {tool.description}
              </p>

              {/* CTA */}
              <span className="relative z-10 mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-primary opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Try Now <ArrowRight size={12} />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredTools.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted text-[15px]">No tools found in this category yet.</p>
        </div>
      )}
    </>
  );
}
