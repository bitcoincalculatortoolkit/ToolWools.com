'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Image, Tag, Type, FileText, Globe, Code2 } from 'lucide-react';

const CATEGORIES = [
  'All Tools', 'SEO Tools', 'Image Tools', 'PDF Tools',
  'Text Tools', 'AI Tools', 'Developer Tools',
];

const TOOLS = [
  { icon: Image, bg: 'bg-primary-bg', color: 'text-primary', name: 'Image Compressor', desc: 'Compress images without losing quality', slug: 'image-compressor' },
  { icon: Tag, bg: 'bg-blue-bg', color: 'text-blue', name: 'Meta Tag Generator', desc: 'Generate SEO meta tags instantly', slug: 'meta-tag-generator' },
  { icon: Type, bg: 'bg-green-bg', color: 'text-green', name: 'Word Counter', desc: 'Count words and characters in your text', slug: 'word-counter' },
  { icon: FileText, bg: 'bg-primary-bg', color: 'text-primary', name: 'PDF Compressor', desc: 'Reduce PDF file size without losing quality', slug: 'pdf-compressor' },
  { icon: Globe, bg: 'bg-blue-bg', color: 'text-blue', name: 'Domain Authority Checker', desc: 'Check domain authority and SEO score', slug: 'domain-authority' },
  { icon: Code2, bg: 'bg-green-bg', color: 'text-green', name: 'JSON Formatter', desc: 'Format and validate JSON data easily', slug: 'json-formatter' },
];

export function ToolsGrid() {
  const [activeTab, setActiveTab] = useState('All Tools');

  return (
    <section id="tools" className="py-16">
      <div className="mx-auto max-w-page px-4 md:px-6">
        {/* Tabs */}
        <div className="no-scrollbar mb-10 flex items-center gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                activeTab === cat
                  ? 'bg-dark text-white'
                  : 'bg-gray-100 text-body hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
              Popular tools
            </p>
            <h2 className="mt-1 font-body text-[32px] font-bold text-dark">
              Powerful tools for every need
            </h2>
          </div>
          <a
            href="#"
            className="hidden items-center gap-1 text-[14px] font-medium text-primary hover:underline md:inline-flex"
          >
            View all tools <ArrowRight size={14} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TOOLS.map((tool, i) => (
            <motion.a
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hover"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${tool.bg}`}>
                <tool.icon size={24} className={tool.color} strokeWidth={1.5} />
              </span>
              <h3 className="mt-3 text-[15px] font-semibold text-dark">{tool.name}</h3>
              <p className="mt-1 line-clamp-2 text-[13px] text-muted">{tool.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Try Now <ArrowRight size={12} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
