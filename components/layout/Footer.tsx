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

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-page px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8 3v10M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[16px] font-semibold text-dark">ToolStack</span>
            </Link>
            <p className="mt-3 max-w-[240px] text-[13px] leading-relaxed text-muted">
              All-in-one online tools platform for SEO, Images, PDFs, Text, AI and Developers.
            </p>
            <div className="mt-5 flex gap-3">
              {['X', 'Li', 'GH', 'IG'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-border text-[11px] font-bold text-muted transition-colors hover:text-dark"
                >
                  {s}
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
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-[14px] text-muted transition-colors hover:text-primary">
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
            <p className="mt-3 text-[13px] text-muted">
              Get updates about new tools and features.
            </p>
            <form
              className="mt-3 flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@email.com"
                aria-label="Email"
                className="w-full rounded-btn border border-border px-4 py-2 text-[14px] text-dark placeholder:text-muted focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted sm:flex-row sm:items-center">
          <p>© 2025 ToolStack. All rights reserved.</p>
          <p>Made with ♥ for the community</p>
        </div>
      </div>
    </footer>
  );
}
