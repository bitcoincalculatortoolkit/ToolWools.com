import { Metadata } from 'next';
import { getAllTools } from '@/lib/tools-data';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ToolsDirectoryClient } from './ToolsDirectoryClient';

export const metadata: Metadata = {
  title: 'All Free Online Tools | ToolWools',
  description:
    'Browse all free online tools — SEO tools, image compressor, PDF compressor, word counter, JSON formatter, meta tag generator & more. No signup needed.',
  openGraph: {
    title: 'All Free Online Tools | ToolWools',
    description:
      'Browse 100+ free tools for SEO, images, PDFs, text & development. No signup, no limits.',
    url: 'https://toolwools.com/tools',
    siteName: 'ToolWools',
    type: 'website',
  },
  alternates: {
    canonical: 'https://toolwools.com/tools',
  },
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16">
        <div className="mx-auto max-w-page px-4 md:px-6 py-10 md:py-16">
          {/* Section header */}
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
              Tool Directory
            </p>
            <div className="mt-2 flex items-center gap-3">
              <h1 className="font-display text-[34px] font-bold text-dark tracking-[-0.02em]">
                All Tools
              </h1>
              <span className="inline-flex items-center justify-center rounded-full bg-primary-bg px-3 py-1 text-[13px] font-semibold text-primary">
                {tools.length}
              </span>
            </div>
            <p className="mt-2 text-[15px] text-muted max-w-xl">
              Explore our complete collection of free online tools. No signup required — every tool works directly in your browser.
            </p>
          </div>

          {/* Client component for interactive filter + grid */}
          <ToolsDirectoryClient tools={tools} />
        </div>
      </main>
      <Footer />
    </>
  );
}
