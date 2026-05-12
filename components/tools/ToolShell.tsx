'use client';

import { ReactNode } from 'react';
import {
  Code2,
  FileText,
  Gauge,
  ImageIcon,
  Tag,
  Type,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { AdPlaceholder } from './AdPlaceholder';
import { FAQAccordion } from './FAQAccordion';
import { RelatedTools } from './RelatedTools';
import { InternalLinks } from './InternalLinks';
import { AffiliateSection } from './AffiliateSection';
import { ToolHero } from './ToolHero';
import type { ToolData } from '@/lib/tools-data';

/* ──────────────────────────────────────────────────────────
   Per-tool visual identity (icon + accent colour).
   Kept here so every tool automatically gets a branded hero.
   ────────────────────────────────────────────────────────── */
const toolVisuals: Record<
  string,
  { icon: LucideIcon; iconColor: string; iconBg: string }
> = {
  'image-compressor': { icon: ImageIcon, iconColor: 'text-primary', iconBg: 'bg-primary-bg' },
  'word-counter': { icon: Type, iconColor: 'text-green', iconBg: 'bg-green-bg' },
  'json-formatter': { icon: Code2, iconColor: 'text-blue', iconBg: 'bg-blue-bg' },
  'meta-tag-generator': { icon: Tag, iconColor: 'text-primary', iconBg: 'bg-primary-bg' },
  'pdf-compressor': { icon: FileText, iconColor: 'text-primary', iconBg: 'bg-primary-bg' },
  'domain-authority-checker': { icon: Gauge, iconColor: 'text-blue', iconBg: 'bg-blue-bg' },
};

interface ToolShellProps {
  tool: ToolData;
  relatedTools: ToolData[];
  children: ReactNode;
  /** Optional long-form SEO content block to render below the tool UI */
  seoContent?: ReactNode;
}

export function ToolShell({
  tool,
  relatedTools,
  children,
  seoContent,
}: ToolShellProps) {
  const visuals =
    toolVisuals[tool.slug] ?? {
      icon: Wrench,
      iconColor: 'text-primary',
      iconBg: 'bg-primary-bg',
    };

  const headline = deriveHeadline(tool.name);

  return (
    <>
      {/* Premium hero */}
      <ToolHero
        icon={visuals.icon}
        iconColor={visuals.iconColor}
        iconBg={visuals.iconBg}
        categorySlug={tool.category}
        categoryLabel={tool.categoryLabel}
        toolName={tool.name}
        headline={headline}
        subheadline={tool.heroSubheadline ?? tool.longDescription}
        highlights={tool.heroHighlights ?? tool.tags.slice(0, 2)}
      />

      <div className="mx-auto max-w-page px-4 md:px-6 py-8 md:py-10">
        {/* Ad — above the tool */}
        <div className="mb-6">
          <div className="hidden md:flex justify-center">
            <AdPlaceholder size="leaderboard" />
          </div>
          <div className="flex md:hidden justify-center">
            <AdPlaceholder size="mobile-banner" />
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Tool content area */}
          <div className="min-w-0">
            {children}

            {/* Long-form SEO content (optional per tool) */}
            {seoContent}

            {/* Affiliate recommendations */}
            <AffiliateSection category={tool.category} />

            {/* FAQ section */}
            <FAQAccordion items={tool.faqs} />

            {/* Related tools */}
            <RelatedTools tools={relatedTools} />

            {/* Internal links for SEO */}
            <InternalLinks />
          </div>

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <AdPlaceholder size="rectangle" />
              <div className="mt-6 rounded-2xl border border-border/60 bg-white p-5 shadow-card">
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted">
                  About this tool
                </h3>
                <p className="mt-2 text-[13.5px] text-body leading-relaxed">
                  {tool.longDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tool.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

/**
 * Turn a plain tool name into a marketing-style hero headline.
 * Example: "Word Counter" → "Word Counter you'll actually enjoy using."
 */
function deriveHeadline(name: string): string {
  return `${name} you'll actually enjoy using.`;
}
