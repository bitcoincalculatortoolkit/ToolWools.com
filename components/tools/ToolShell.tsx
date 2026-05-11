'use client';

import { ReactNode } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { AdPlaceholder } from './AdPlaceholder';
import { FAQAccordion } from './FAQAccordion';
import { RelatedTools } from './RelatedTools';
import { InternalLinks } from './InternalLinks';
import { AffiliateSection } from './AffiliateSection';
import type { ToolData } from '@/lib/tools-data';

interface ToolShellProps {
  tool: ToolData;
  relatedTools: ToolData[];
  children: ReactNode;
}

export function ToolShell({ tool, relatedTools, children }: ToolShellProps) {
  return (
    <div className="mx-auto max-w-page px-4 md:px-6 py-6 md:py-10">
      {/* Breadcrumb */}
      <Breadcrumb
        categorySlug={tool.category}
        categoryLabel={tool.categoryLabel}
        toolName={tool.name}
      />

      {/* Tool header */}
      <div className="mt-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-bg flex-shrink-0">
            <div className="h-6 w-6 rounded-md bg-primary/20" />
          </div>
          <div>
            <h1 className="font-display text-[36px] font-bold text-dark leading-tight tracking-[-0.02em]">
              {tool.name}
            </h1>
            <p className="mt-1 text-[15px] text-muted">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Ad - leaderboard (desktop) / mobile-banner (mobile) */}
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

          {/* Affiliate recommendations */}
          <AffiliateSection category={tool.category} />

          {/* FAQ section */}
          <FAQAccordion items={tool.faqs} />

          {/* Related tools */}
          <RelatedTools tools={relatedTools} />

          {/* Internal links for SEO */}
          <InternalLinks />
        </div>

        {/* Sidebar - desktop only */}
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <AdPlaceholder size="rectangle" />
            {/* Extra info card */}
            <div className="mt-6 rounded-card border border-border/60 bg-white p-5 shadow-card">
              <h3 className="text-sm font-semibold text-dark mb-2">About this tool</h3>
              <p className="text-[13px] text-muted leading-relaxed">
                {tool.longDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
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
  );
}
