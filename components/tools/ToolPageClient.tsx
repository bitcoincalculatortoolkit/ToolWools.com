'use client';

import dynamic from 'next/dynamic';
import { ToolShell } from './ToolShell';
import { ComingSoon } from './ComingSoon';
import { WordCounterContent } from './content/WordCounterContent';
import type { ToolData } from '@/lib/tools-data';

/* ─────────── Dynamically-loaded tool components ─────────── */
const ImageCompressor = dynamic(() =>
  import('./ImageCompressor').then((mod) => mod.ImageCompressor),
);
const WordCounter = dynamic(() =>
  import('./WordCounter').then((mod) => mod.WordCounter),
);
const JsonFormatter = dynamic(() =>
  import('./JsonFormatter').then((mod) => mod.JsonFormatter),
);
const MetaTagGenerator = dynamic(() =>
  import('./MetaTagGenerator').then((mod) => mod.MetaTagGenerator),
);
const PdfCompressor = dynamic(() =>
  import('./PdfCompressor').then((mod) => mod.PdfCompressor),
);
const DomainAuthorityChecker = dynamic(() =>
  import('./DomainAuthorityChecker').then((mod) => mod.DomainAuthorityChecker),
);

const toolComponents: Record<string, React.ComponentType> = {
  'image-compressor': ImageCompressor,
  'word-counter': WordCounter,
  'json-formatter': JsonFormatter,
  'meta-tag-generator': MetaTagGenerator,
  'pdf-compressor': PdfCompressor,
  'domain-authority-checker': DomainAuthorityChecker,
};

/* ─────────── Per-tool long-form SEO content blocks ─────────── */
const toolSeoContent: Record<string, React.ComponentType> = {
  'word-counter': WordCounterContent,
  // Other tools will get their own rich content blocks in subsequent tasks.
};

interface ToolPageClientProps {
  tool: ToolData;
  relatedTools: ToolData[];
}

export function ToolPageClient({ tool, relatedTools }: ToolPageClientProps) {
  const ToolComponent = toolComponents[tool.slug];
  const SeoContent = toolSeoContent[tool.slug];

  return (
    <ToolShell
      tool={tool}
      relatedTools={relatedTools}
      seoContent={SeoContent ? <SeoContent /> : undefined}
    >
      {ToolComponent ? <ToolComponent /> : <ComingSoon toolName={tool.name} />}
    </ToolShell>
  );
}
