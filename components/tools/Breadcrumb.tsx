'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  categorySlug: string;
  categoryLabel: string;
  toolName: string;
}

export function Breadcrumb({ categorySlug, categoryLabel, toolName }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        href="/"
        className="flex items-center gap-1 text-muted hover:text-primary transition-colors"
      >
        <Home size={14} />
        <span>Home</span>
      </Link>
      <ChevronRight size={14} className="text-border" />
      <Link
        href={`/tools/${categorySlug}`}
        className="text-muted hover:text-primary transition-colors"
      >
        {categoryLabel}
      </Link>
      <ChevronRight size={14} className="text-border" />
      <span className="text-dark font-medium truncate max-w-[200px]">{toolName}</span>
    </nav>
  );
}
