'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Copy,
  Check,
  RotateCcw,
  Search,
  Share2,
  Code2,
  User,
  Tag,
  FileText,
} from 'lucide-react';

interface MetaFields {
  title: string;
  description: string;
  url: string;
  author: string;
  keywords: string;
}

const LIMITS = {
  title: 60,
  description: 155,
};

export function MetaTagGenerator() {
  const [fields, setFields] = useState<MetaFields>({
    title: '',
    description: '',
    url: '',
    author: '',
    keywords: '',
  });
  const [copied, setCopied] = useState(false);

  const updateField = useCallback((key: keyof MetaFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = () => {
    setFields({ title: '', description: '', url: '', author: '', keywords: '' });
    setCopied(false);
  };

  const truncate = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  const generateMetaTags = (): string => {
    const lines: string[] = [];
    if (fields.title) lines.push(`<title>${fields.title}</title>`);
    if (fields.description)
      lines.push(`<meta name="description" content="${fields.description}" />`);
    if (fields.keywords)
      lines.push(`<meta name="keywords" content="${fields.keywords}" />`);
    if (fields.author)
      lines.push(`<meta name="author" content="${fields.author}" />`);
    lines.push('');
    lines.push('<!-- Open Graph / Facebook -->');
    if (fields.title)
      lines.push(`<meta property="og:title" content="${fields.title}" />`);
    if (fields.description)
      lines.push(`<meta property="og:description" content="${fields.description}" />`);
    if (fields.url)
      lines.push(`<meta property="og:url" content="${fields.url}" />`);
    lines.push('<meta property="og:type" content="website" />');
    lines.push('');
    lines.push('<!-- Twitter -->');
    lines.push('<meta name="twitter:card" content="summary_large_image" />');
    if (fields.title)
      lines.push(`<meta name="twitter:title" content="${fields.title}" />`);
    if (fields.description)
      lines.push(`<meta name="twitter:description" content="${fields.description}" />`);
    return lines.join('\n');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateMetaTags());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = generateMetaTags();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const charColor = (len: number, limit: number) => {
    if (len === 0) return 'text-muted';
    if (len <= limit) return 'text-green';
    return 'text-red-500';
  };

  const displayUrl = fields.url
    ? fields.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : 'example.com/page';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form Inputs */}
        <div className="space-y-4">
          <div className="rounded-card border border-border/60 bg-white p-5 shadow-card">
            <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              Page Information
            </h3>

            {/* Title */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-body">Page Title</label>
                <span className={`text-xs font-medium ${charColor(fields.title.length, LIMITS.title)}`}>
                  {fields.title.length}/{LIMITS.title}
                </span>
              </div>
              <input
                type="text"
                value={fields.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="My Awesome Page Title"
                className="w-full rounded-btn border border-border px-3 py-2.5 text-sm text-dark placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-body">Meta Description</label>
                <span className={`text-xs font-medium ${charColor(fields.description.length, LIMITS.description)}`}>
                  {fields.description.length}/{LIMITS.description}
                </span>
              </div>
              <textarea
                value={fields.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="A brief description of your page content..."
                rows={3}
                className="w-full rounded-btn border border-border px-3 py-2.5 text-sm text-dark placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none"
              />
            </div>

            {/* URL */}
            <div className="mb-4">
              <label className="text-xs font-medium text-body mb-1.5 flex items-center gap-1.5">
                <Globe size={12} className="text-muted" /> Page URL
              </label>
              <input
                type="url"
                value={fields.url}
                onChange={(e) => updateField('url', e.target.value)}
                placeholder="https://example.com/page"
                className="w-full rounded-btn border border-border px-3 py-2.5 text-sm text-dark placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            {/* Author */}
            <div className="mb-4">
              <label className="text-xs font-medium text-body mb-1.5 flex items-center gap-1.5">
                <User size={12} className="text-muted" /> Author
              </label>
              <input
                type="text"
                value={fields.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-btn border border-border px-3 py-2.5 text-sm text-dark placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            {/* Keywords */}
            <div className="mb-4">
              <label className="text-xs font-medium text-body mb-1.5 flex items-center gap-1.5">
                <Tag size={12} className="text-muted" /> Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={fields.keywords}
                onChange={(e) => updateField('keywords', e.target.value)}
                placeholder="web tools, seo, meta tags"
                className="w-full rounded-btn border border-border px-3 py-2.5 text-sm text-dark placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied!' : 'Copy All Tags'}
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-btn border border-border px-4 py-2.5 text-sm font-semibold text-body hover:bg-gray-50 transition-colors"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Previews */}
        <div className="space-y-4">
          {/* Google SERP Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-card border border-border/60 bg-white p-5 shadow-card"
          >
            <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
              <Search size={16} className="text-blue" />
              Google SERP Preview
            </h3>
            <div className="rounded-xl border border-border/40 bg-bg p-4">
              <p className="text-lg text-[#1a0dab] leading-snug hover:underline cursor-pointer font-medium truncate">
                {fields.title ? truncate(fields.title, LIMITS.title) : 'Page Title Will Appear Here'}
              </p>
              <p className="text-sm text-[#006621] mt-1 truncate">
                {displayUrl}
              </p>
              <p className="text-sm text-[#545454] mt-1 leading-relaxed line-clamp-2">
                {fields.description
                  ? truncate(fields.description, LIMITS.description)
                  : 'Your meta description will be displayed here. It should be a concise summary of the page content.'}
              </p>
            </div>
          </motion.div>

          {/* Open Graph Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-card border border-border/60 bg-white p-5 shadow-card"
          >
            <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
              <Share2 size={16} className="text-blue" />
              Social Media (Open Graph) Preview
            </h3>
            <div className="rounded-xl border border-border overflow-hidden bg-white shadow-sm">
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Globe size={32} className="mx-auto text-muted/30 mb-1" />
                  <p className="text-xs text-muted/50">Image Preview</p>
                </div>
              </div>
              <div className="p-3 border-t border-border/40">
                <p className="text-[11px] text-muted uppercase tracking-wide">
                  {displayUrl}
                </p>
                <p className="text-sm font-semibold text-dark mt-0.5 line-clamp-1">
                  {fields.title || 'Page Title'}
                </p>
                <p className="text-xs text-muted mt-0.5 line-clamp-2">
                  {fields.description || 'Page description will appear here...'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Generated Code Block */}
      {(fields.title || fields.description || fields.url || fields.author || fields.keywords) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-card border border-border/60 bg-white p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-dark flex items-center gap-2">
              <Code2 size={16} className="text-primary" />
              Generated Meta Tags
            </h3>
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 rounded-btn bg-gray-100 px-3 py-1.5 text-xs font-medium text-body hover:bg-gray-200 transition-colors"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="rounded-xl bg-[#1e1e2e] p-4 overflow-x-auto">
            <pre className="text-xs leading-relaxed font-mono">
              {generateMetaTags().split('\n').map((line, i) => (
                <div key={i} className="whitespace-pre">
                  {line.startsWith('<!--') ? (
                    <span className="text-gray-500">{line}</span>
                  ) : line.startsWith('<meta') || line.startsWith('<title') ? (
                    <>
                      <span className="text-[#89b4fa]">{'<'}</span>
                      <span className="text-[#f38ba8]">{line.match(/^<(\w+)/)?.[1] || ''}</span>
                      <span className="text-[#a6e3a1]">
                        {line.slice(line.indexOf(' '), line.indexOf('/>'))}
                      </span>
                      <span className="text-[#89b4fa]">{line.includes('/>') ? '/>' : ''}</span>
                      {line.includes('</') && (
                        <>
                          <span className="text-[#cdd6f4]">
                            {line.slice(line.indexOf('>') + 1, line.lastIndexOf('<'))}
                          </span>
                          <span className="text-[#89b4fa]">{'</'}</span>
                          <span className="text-[#f38ba8]">
                            {line.match(/<\/(\w+)>/)?.[1] || ''}
                          </span>
                          <span className="text-[#89b4fa]">{'>'}</span>
                        </>
                      )}
                    </>
                  ) : (
                    <span className="text-[#cdd6f4]">{line}</span>
                  )}
                </div>
              ))}
            </pre>
          </div>
        </motion.div>
      )}
    </div>
  );
}
