'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Product',
    links: ['All Tools', 'SEO Tools', 'Image Tools', 'PDF Tools', 'AI Tools', 'Text Tools'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Blog', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
  },
  {
    title: 'Resources',
    links: ['Help Center', 'FAQs', 'API Docs', 'Status', 'Changelog'],
  },
];

const SOCIALS = [
  { label: 'X', hover: 'hover:bg-dark hover:text-white' },
  { label: 'Li', hover: 'hover:bg-[#0077B5] hover:text-white' },
  { label: 'GH', hover: 'hover:bg-[#333] hover:text-white' },
  { label: 'IG', hover: 'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] hover:text-white' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-transparent bg-white">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-page px-4 py-16 md:px-6 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-sm transition-shadow duration-300 group-hover:shadow-glow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8 3v10M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[16px] font-bold text-dark">ToolStack</span>
            </Link>
            <p className="mt-4 max-w-[240px] text-[13px] leading-relaxed text-muted">
              All-in-one online tools platform for SEO, Images, PDFs, Text, AI and Developers.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className={`grid h-9 w-9 place-items-center rounded-xl border border-border/50 text-[11px] font-bold text-muted transition-all duration-300 hover:scale-110 hover:border-transparent hover:shadow-sm ${s.hover}`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-dark">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="group/link inline-flex items-center text-[14px] text-muted transition-all duration-200 hover:text-primary hover:translate-x-0.5"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-dark">
              Newsletter
            </h4>
            <p className="mt-4 text-[13px] text-muted leading-relaxed">
              Get updates about new tools and features.
            </p>
            <form
              className="mt-4 flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@email.com"
                aria-label="Email"
                className="w-full rounded-xl border border-border/60 bg-white px-4 py-2.5 text-[14px] text-dark placeholder:text-muted/60 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:shadow-glow"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-7 text-[12px] text-muted sm:flex-row sm:items-center">
          <p>© 2025 ToolStack. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with{' '}
            <span className="inline-block animate-heart-beat text-red-500">♥</span>
            {' '}for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
