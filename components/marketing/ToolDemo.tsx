'use client';

import { motion } from 'framer-motion';
import { Check, Upload, ArrowRight } from 'lucide-react';

export function ToolDemo() {
  return (
    <section id="demo" className="bg-white px-4 py-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-100 p-8 shadow-card md:p-12">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          {/* Left — copy */}
          <div className="md:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
              Image Compressor
            </p>
            <h2 className="mt-3 font-body text-[28px] font-bold leading-[1.25] text-dark">
              Compress images without losing quality
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Reduce image size in seconds while keeping perfect quality.
            </p>

            <ul className="mt-5 space-y-2.5">
              {[
                'JPG, PNG, WEBP & more',
                'Smart compression algorithm',
                'Secure & private — files never stored',
                'Bulk optimization up to 50 files',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14px] text-body">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-bg">
                    <Check size={12} className="text-green" strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#tools"
              className="mt-6 inline-flex items-center gap-1 text-[14px] font-semibold text-primary transition-colors hover:underline"
            >
              Try Image Compressor <ArrowRight size={14} />
            </a>
          </div>

          {/* Right — mockup */}
          <div className="relative md:col-span-7">
            {/* Floating badge */}
            <div className="absolute -right-3 -top-3 z-10 grid h-[72px] w-[72px] place-items-center rounded-full bg-white shadow-lg md:-right-6 md:-top-6">
              <div className="text-center">
                <p className="text-[20px] font-bold text-primary">72%</p>
                <p className="text-[10px] text-muted">Smaller</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
              {/* macOS bar */}
              <div className="flex items-center gap-1.5 border-b border-gray-100 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28CA41]" />
              </div>

              {/* Upload zone */}
              <div className="m-4 rounded-lg border-2 border-dashed border-border p-8 text-center">
                <Upload size={40} className="mx-auto text-primary" strokeWidth={1.5} />
                <p className="mt-3 text-[14px] font-medium text-body">
                  Drag & drop your images here
                </p>
                <p className="mt-1 text-[12px] text-muted">
                  or click to browse · JPG, PNG, WEBP up to 50MB
                </p>
              </div>

              {/* File row */}
              <div className="mx-4 mb-2 rounded-lg border border-gray-100 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-bg">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-primary">
                        <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-medium text-dark">workspace-design.png</span>
                  </div>
                  <span className="text-[12px] text-muted">2.4 MB</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                    className="h-full rounded-full bg-green"
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-end">
                  <span className="text-[12px] font-semibold text-green">672 KB · 72% smaller</span>
                </div>
              </div>

              {/* Stats bottom */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 text-center">
                <div className="py-3">
                  <p className="text-[11px] text-muted">Original</p>
                  <p className="text-[14px] font-bold text-dark">2.4 MB</p>
                </div>
                <div className="py-3">
                  <p className="text-[11px] text-muted">Compressed</p>
                  <p className="text-[14px] font-bold text-dark">672 KB</p>
                </div>
                <div className="py-3">
                  <p className="text-[11px] text-muted">Savings</p>
                  <p className="text-[14px] font-bold text-green">72%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
