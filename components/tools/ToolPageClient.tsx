'use client';

import dynamic from 'next/dynamic';
import { ToolShell } from './ToolShell';
import { ComingSoon } from './ComingSoon';
import type { ToolData } from '@/lib/tools-data';

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
const SignPdf = dynamic(() =>
  import('./SignPdf').then((mod) => mod.SignPdf),
);

/* ──────────────────────────────────────────────────────────
   Long-form SEO content blocks — one per tool.
   Written to rank for primary keywords + answer user intent
   for featured snippets & AI search (Perplexity, ChatGPT, Google AI).
   ────────────────────────────────────────────────────────── */
const WordCounterContent = dynamic(() =>
  import('./content/WordCounterContent').then((mod) => mod.WordCounterContent),
);
const SignPdfContent = dynamic(() =>
  import('./content/SignPdfContent').then((mod) => mod.SignPdfContent),
);

const toolComponents: Record<string, React.ComponentType> = {
  'image-compressor': ImageCompressor,
  'word-counter': WordCounter,
  'json-formatter': JsonFormatter,
  'meta-tag-generator': MetaTagGenerator,
  'pdf-compressor': PdfCompressor,
  'domain-authority-checker': DomainAuthorityChecker,
  'sign-pdf': SignPdf,
};

const toolSeoContent: Record<string, React.ComponentType> = {
  'word-counter': WordCounterContent,
  'sign-pdf': SignPdfContent,
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
      seoContent={SeoContent ? <SeoContent /> : null}
    >
      {ToolComponent ? <ToolComponent /> : <ComingSoon toolName={tool.name} />}
    </ToolShell>
  );
}
