'use client';

import dynamic from 'next/dynamic';
import { ToolShell } from './ToolShell';
import { ComingSoon } from './ComingSoon';
import type { ToolData } from '@/lib/tools-data';

const ImageCompressor = dynamic(() =>
  import('./ImageCompressor').then((mod) => mod.ImageCompressor)
);
const WordCounter = dynamic(() =>
  import('./WordCounter').then((mod) => mod.WordCounter)
);
const JsonFormatter = dynamic(() =>
  import('./JsonFormatter').then((mod) => mod.JsonFormatter)
);

const toolComponents: Record<string, React.ComponentType> = {
  'image-compressor': ImageCompressor,
  'word-counter': WordCounter,
  'json-formatter': JsonFormatter,
};

interface ToolPageClientProps {
  tool: ToolData;
  relatedTools: ToolData[];
}

export function ToolPageClient({ tool, relatedTools }: ToolPageClientProps) {
  const ToolComponent = toolComponents[tool.slug];

  return (
    <ToolShell tool={tool} relatedTools={relatedTools}>
      {ToolComponent ? <ToolComponent /> : <ComingSoon toolName={tool.name} />}
    </ToolShell>
  );
}
