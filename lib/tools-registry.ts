import type { LucideIcon } from 'lucide-react';
import {
  ImageIcon,
  FileText,
  Tags,
  FileArchive,
  Gauge,
  Braces,
  Type,
  Repeat2,
  SlidersHorizontal,
  Bot,
} from 'lucide-react';

export type ToolCategory =
  | 'all'
  | 'seo-tools'
  | 'image-tools'
  | 'text-analysis'
  | 'pdf-tools'
  | 'calculators'
  | 'domain-tools'
  | 'developer-tools'
  | 'converters'
  | 'ai-writing';

export interface Category {
  id: ToolCategory;
  label: string;
}

export const categories: Category[] = [
  { id: 'all', label: 'All Tools' },
  { id: 'seo-tools', label: 'SEO Tools' },
  { id: 'image-tools', label: 'Image Tools' },
  { id: 'text-analysis', label: 'Text Analysis' },
  { id: 'pdf-tools', label: 'PDF Tools' },
  { id: 'calculators', label: 'Calculators' },
  { id: 'domain-tools', label: 'Domain Tools' },
  { id: 'developer-tools', label: 'Developer Tools' },
  { id: 'converters', label: 'Converters' },
  { id: 'ai-writing', label: 'AI Writing' },
];

export interface Tool {
  slug: string;
  name: string;
  category: Exclude<ToolCategory, 'all'>;
  categoryLabel: string;
  description: string;
  longDescription: string;
  seoTitle: string;
  seoDescription: string;
  icon: LucideIcon;
  tags: string[];
  featured: boolean;
  popular: boolean;
  isNew?: boolean;
  relatedTools: string[];
  adPlacement: 'sidebar' | 'above' | 'both' | 'none';
}

export const toolsRegistry: Tool[] = [
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'image-tools',
    categoryLabel: 'Image Tools',
    description: 'Reduce image file size up to 90% with no visible quality loss.',
    longDescription:
      'Compress JPG, PNG, and WebP images instantly in your browser. Pixel-accurate control, zero uploads to any server.',
    seoTitle: 'Image Compressor — Free Online Image Compression | ToolWools',
    seoDescription:
      'Compress JPG, PNG, WebP images online for free. No upload limit, no signup. Instant results.',
    icon: ImageIcon,
    tags: ['compress', 'image', 'optimize', 'jpg', 'png', 'webp'],
    featured: true,
    popular: true,
    relatedTools: ['image-converter', 'pdf-compressor'],
    adPlacement: 'both',
  },
  {
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    category: 'seo-tools',
    categoryLabel: 'SEO Tools',
    description: 'Craft perfect title, description, and OG tags with live previews.',
    longDescription:
      'Generate pitch-perfect SEO and social meta tags with a live Google SERP and Open Graph preview. Character limits enforced in real time.',
    seoTitle: 'Meta Tag Generator — Free SEO Meta Tag Tool | ToolWools',
    seoDescription:
      'Generate SEO meta tags with live Google SERP and Open Graph previews. Free, instant, no signup.',
    icon: Tags,
    tags: ['seo', 'meta', 'og', 'tags'],
    featured: true,
    popular: true,
    relatedTools: ['keyword-density', 'robots-txt-generator'],
    adPlacement: 'both',
  },
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text-analysis',
    categoryLabel: 'Text Analysis',
    description: 'Live word, character, sentence, and reading-time analysis.',
    longDescription:
      'Paste or type text and instantly see words, characters, sentences, paragraphs, reading time, and keyword density.',
    seoTitle: 'Word Counter — Free Online Word & Character Counter | ToolWools',
    seoDescription:
      'Count words, characters, sentences, and reading time in real time. Free, no signup.',
    icon: Type,
    tags: ['word', 'character', 'counter', 'text'],
    featured: true,
    popular: true,
    relatedTools: ['character-counter', 'keyword-density'],
    adPlacement: 'sidebar',
  },
  {
    slug: 'pdf-compressor',
    name: 'PDF Compressor',
    category: 'pdf-tools',
    categoryLabel: 'PDF Tools',
    description: 'Shrink large PDFs without losing readable quality.',
    longDescription:
      'Compress PDF files up to 80% while preserving text clarity. Fine-grained quality slider, no watermarks.',
    seoTitle: 'PDF Compressor — Free PDF Compression Online | ToolWools',
    seoDescription:
      'Compress PDF files online for free. Keep quality, reduce size, no signup.',
    icon: FileArchive,
    tags: ['pdf', 'compress', 'optimize'],
    featured: true,
    popular: false,
    relatedTools: ['image-compressor'],
    adPlacement: 'both',
  },
  {
    slug: 'domain-authority',
    name: 'Domain Authority Checker',
    category: 'seo-tools',
    categoryLabel: 'SEO Tools',
    description: 'Instant DA, PA, and spam-score lookup for any domain.',
    longDescription:
      'Check Domain Authority, Page Authority, spam score, and backlink count for any domain with animated score gauges.',
    seoTitle: 'Domain Authority Checker — Free DA/PA Tool | ToolWools',
    seoDescription:
      'Check domain authority, page authority, and spam score instantly. Free and unlimited.',
    icon: Gauge,
    tags: ['seo', 'da', 'pa', 'authority'],
    featured: true,
    popular: true,
    relatedTools: ['meta-tag-generator', 'keyword-density'],
    adPlacement: 'both',
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'developer-tools',
    categoryLabel: 'Developer Tools',
    description: 'Format, minify, and validate JSON with a beautiful tree view.',
    longDescription:
      'A Monaco-style editor that formats, minifies, validates, and tree-views any JSON payload. Syntax errors highlighted inline.',
    seoTitle: 'JSON Formatter — Free Online JSON Beautifier | ToolWools',
    seoDescription:
      'Format, minify, and validate JSON online. Free, instant, with tree view and syntax errors.',
    icon: Braces,
    tags: ['json', 'format', 'developer', 'validator'],
    featured: true,
    popular: true,
    isNew: true,
    relatedTools: ['meta-tag-generator'],
    adPlacement: 'sidebar',
  },
  {
    slug: 'keyword-density',
    name: 'Keyword Density Checker',
    category: 'seo-tools',
    categoryLabel: 'SEO Tools',
    description: 'Analyze top keywords and density distribution in any page.',
    longDescription:
      'Paste a URL or text and see ranked keyword frequency, density %, and n-gram distribution.',
    seoTitle: 'Keyword Density Checker — Free SEO Tool | ToolWools',
    seoDescription:
      'Check keyword density for any URL or text. Top terms, density %, free and instant.',
    icon: FileText,
    tags: ['seo', 'keywords', 'density'],
    featured: false,
    popular: true,
    relatedTools: ['meta-tag-generator', 'word-counter'],
    adPlacement: 'sidebar',
  },
  {
    slug: 'image-converter',
    name: 'Image Converter',
    category: 'image-tools',
    categoryLabel: 'Image Tools',
    description: 'Convert between PNG, JPG, WebP, and AVIF in one click.',
    longDescription:
      'Lossless or quality-controlled format conversion between every modern image format. Batch supported.',
    seoTitle: 'Image Converter — Free PNG/JPG/WebP Converter | ToolWools',
    seoDescription:
      'Convert images between PNG, JPG, WebP, AVIF. Free, fast, batch-supported.',
    icon: Repeat2,
    tags: ['image', 'convert', 'png', 'jpg', 'webp'],
    featured: false,
    popular: true,
    relatedTools: ['image-compressor'],
    adPlacement: 'sidebar',
  },
  {
    slug: 'character-counter',
    name: 'Character Counter',
    category: 'text-analysis',
    categoryLabel: 'Text Analysis',
    description: 'Live character counts with Twitter, SMS, and meta limit gauges.',
    longDescription:
      'Track characters with context-aware gauges for Twitter/X, SMS, and SEO meta-description limits.',
    seoTitle: 'Character Counter — Free Live Character Count | ToolWools',
    seoDescription:
      'Live character counter with Twitter, SMS, and meta description limits. Free, no signup.',
    icon: SlidersHorizontal,
    tags: ['character', 'counter', 'twitter', 'sms'],
    featured: false,
    popular: false,
    relatedTools: ['word-counter'],
    adPlacement: 'sidebar',
  },
  {
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'seo-tools',
    categoryLabel: 'SEO Tools',
    description: 'Build a clean robots.txt with allow/disallow rules visually.',
    longDescription:
      'Compose a valid robots.txt with rule builders for crawlers, sitemaps, and rate limits. Live preview + one-click copy.',
    seoTitle: 'Robots.txt Generator — Free SEO Tool | ToolWools',
    seoDescription:
      'Generate a valid robots.txt with rule builders. Live preview, free, no signup.',
    icon: Bot,
    tags: ['robots', 'seo', 'crawlers'],
    featured: false,
    popular: false,
    isNew: true,
    relatedTools: ['meta-tag-generator'],
    adPlacement: 'sidebar',
  },
];

export function getFeaturedTools(): Tool[] {
  return toolsRegistry.filter((t) => t.featured).slice(0, 6);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  if (category === 'all') return toolsRegistry;
  return toolsRegistry.filter((t) => t.category === category);
}
