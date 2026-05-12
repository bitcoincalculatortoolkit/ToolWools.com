'use client';

import { Sparkles, ExternalLink } from 'lucide-react';

interface Recommendation {
  name: string;
  description: string;
  url: string;
}

const RECOMMENDATIONS: Record<string, Recommendation[]> = {
  'image-tools': [
    { name: 'Adobe Express', description: 'Professional photo editing', url: '#' },
    { name: 'Canva', description: 'Design graphics easily', url: '#' },
    { name: 'TinyPNG', description: 'Advanced PNG optimization', url: '#' },
  ],
  'seo-tools': [
    { name: 'Ahrefs', description: 'Complete SEO toolkit', url: '#' },
    { name: 'SEMrush', description: 'Keyword research pro', url: '#' },
    { name: 'Moz', description: 'Domain authority experts', url: '#' },
  ],
  'pdf-tools': [
    { name: 'Adobe Acrobat', description: 'Complete PDF solution', url: '#' },
    { name: 'Smallpdf', description: 'PDF made simple', url: '#' },
    { name: 'iLovePDF', description: 'All PDF tools', url: '#' },
  ],
  'developer-tools': [
    { name: 'VS Code', description: 'Best code editor', url: '#' },
    { name: 'Postman', description: 'API testing', url: '#' },
    { name: 'GitHub Copilot', description: 'AI coding assistant', url: '#' },
  ],
  'text-tools': [
    { name: 'Grammarly', description: 'Writing assistant', url: '#' },
    { name: 'Hemingway', description: 'Clarity editor', url: '#' },
    { name: 'ProWritingAid', description: 'Deep analysis', url: '#' },
  ],
};

interface AffiliateSectionProps {
  category: string;
}

export function AffiliateSection({ category }: AffiliateSectionProps) {
  const recommendations = RECOMMENDATIONS[category] || RECOMMENDATIONS['developer-tools'];

  return (
    <section className="mt-10 mb-8">
      {/* Subtle gradient background */}
      <div className="relative rounded-2xl bg-gradient-to-b from-bg to-transparent p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary/70" />
            <h3 className="text-[14px] font-semibold text-dark">Recommended Resources</h3>
          </div>
          <span className="text-[10px] font-medium text-muted/50 uppercase tracking-wider">
            Sponsored
          </span>
        </div>

        {/* Recommendation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recommendations.map((rec) => (
            <a
              key={rec.name}
              href={rec.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group flex items-start gap-3 rounded-xl border border-border/40 bg-white/80 backdrop-blur-sm p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-card hover:bg-white"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-bg transition-transform duration-200 group-hover:scale-110">
                <span className="text-[12px] font-bold text-primary">
                  {rec.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-dark truncate">{rec.name}</p>
                <p className="text-[12px] text-muted truncate">{rec.description}</p>
              </div>
              <ExternalLink
                size={12}
                className="mt-1 shrink-0 text-muted/40 transition-colors duration-200 group-hover:text-primary"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
