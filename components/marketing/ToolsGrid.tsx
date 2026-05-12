'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Image, Tag, Type, FileText, Globe, Code2, FileSignature, Combine, Scissors, RotateCw, Trash2, Stamp, Lock } from 'lucide-react';

const CATEGORIES = [
  'All Tools', 'SEO Tools', 'Image Tools', 'PDF Tools',
  'Text Tools', 'AI Tools', 'Developer Tools',
];

const TOOLS = [
  { icon: Image, bg: 'bg-primary-bg', color: 'text-primary', gradientFrom: 'from-primary/5', name: 'Image Compressor', desc: 'Compress images without losing quality', href: '/tools/image-tools/image-compressor' },
  { icon: Tag, bg: 'bg-blue-bg', color: 'text-blue', gradientFrom: 'from-blue/5', name: 'Meta Tag Generator', desc: 'Generate SEO meta tags instantly', href: '/tools/seo-tools/meta-tag-generator' },
  { icon: Type, bg: 'bg-green-bg', color: 'text-green', gradientFrom: 'from-green/5', name: 'Word Counter', desc: 'Count words and characters in your text', href: '/tools/text-tools/word-counter' },
  { icon: FileText, bg: 'bg-primary-bg', color: 'text-primary', gradientFrom: 'from-primary/5', name: 'PDF Compressor', desc: 'Reduce PDF file size without losing quality', href: '/tools/pdf-tools/pdf-compressor' },
  { icon: Globe, bg: 'bg-blue-bg', color: 'text-blue', gradientFrom: 'from-blue/5', name: 'Domain Authority Checker', desc: 'Check domain authority and SEO score', href: '/tools/seo-tools/domain-authority-checker' },
  { icon: Code2, bg: 'bg-green-bg', color: 'text-green', gradientFrom: 'from-green/5', name: 'JSON Formatter', desc: 'Format and validate JSON data easily', href: '/tools/developer-tools/json-formatter' },
  { icon: FileSignature, bg: 'bg-primary-bg', color: 'text-primary', gradientFrom: 'from-primary/5', name: 'PDF Signer', desc: 'Sign PDFs free — draw, type or upload signature', href: '/tools/pdf-tools/sign-pdf' },
  { icon: Combine, bg: 'bg-blue-bg', color: 'text-blue', gradientFrom: 'from-blue/5', name: 'Merge PDF', desc: 'Combine multiple PDFs into one document', href: '/tools/pdf-tools/merge-pdf' },
  { icon: Scissors, bg: 'bg-green-bg', color: 'text-green', gradientFrom: 'from-green/5', name: 'Split PDF', desc: 'Extract pages or split PDF by range', href: '/tools/pdf-tools/split-pdf' },
  { icon: RotateCw, bg: 'bg-primary-bg', color: 'text-primary', gradientFrom: 'from-primary/5', name: 'Rotate PDF', desc: 'Rotate PDF pages individually or in bulk', href: '/tools/pdf-tools/rotate-pdf' },
  { icon: Trash2, bg: 'bg-blue-bg', color: 'text-blue', gradientFrom: 'from-blue/5', name: 'Delete PDF Pages', desc: 'Remove unwanted pages from any PDF', href: '/tools/pdf-tools/delete-pages' },
  { icon: Stamp, bg: 'bg-green-bg', color: 'text-green', gradientFrom: 'from-green/5', name: 'Watermark PDF', desc: 'Add text or image watermarks to PDFs', href: '/tools/pdf-tools/watermark-pdf' },
  { icon: Lock, bg: 'bg-primary-bg', color: 'text-primary', gradientFrom: 'from-primary/5', name: 'Protect PDF', desc: 'Password protect or unlock PDF files', href: '/tools/pdf-tools/protect-pdf' },
];

export function ToolsGrid() {
  const [activeTab, setActiveTab] = useState('All Tools');

  return (
    <section id="tools" className="py-16 md:py-20">
      <div className="mx-auto max-w-page px-4 md:px-6">
        {/* Tabs */}
        <div className="no-scrollbar mb-10 flex items-center gap-2 overflow-x-auto pb-2">
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

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary"
            >
              Popular tools
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-2 font-display text-[34px] font-bold text-dark tracking-[-0.02em]"
            >
              Powerful tools for every need
            </motion.h2>
          </div>
          <a
            href="/tools"
            className="hidden items-center gap-1.5 text-[14px] font-semibold text-gradient-primary hover:opacity-80 transition-opacity md:inline-flex"
          >
            View all tools <ArrowRight size={14} className="text-primary" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TOOLS.map((tool, i) => (
            <motion.a
              key={tool.href}
              href={tool.href}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl border border-gray-100/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium hover:border-transparent overflow-hidden"
            >
              {/* Hover gradient border effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(244,81,30,0.08) 0%, rgba(37,99,235,0.06) 100%)',
                }}
              />
              {/* Animated border on hover */}
              <div className="absolute inset-px rounded-[15px] bg-white z-0 pointer-events-none" />

              {/* Icon with radial gradient bg */}
              <span className={`relative z-10 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${tool.gradientFrom} to-transparent ${tool.bg}`}>
                <tool.icon size={24} className={tool.color} strokeWidth={1.5} />
              </span>
              <h3 className="relative z-10 mt-3.5 text-[15px] font-semibold text-dark leading-tight">{tool.name}</h3>
              <p className="relative z-10 mt-1.5 line-clamp-2 text-[13px] text-muted leading-relaxed">{tool.desc}</p>

              {/* Arrow that slides in from right */}
              <span className="relative z-10 mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-primary opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Try Now <ArrowRight size={12} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
