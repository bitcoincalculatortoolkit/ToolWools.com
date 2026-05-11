'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Search,
  Image,
  FileText,
  Type,
  Sparkles,
  Code2,
  Globe,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'SEO Tools', href: '#tools' },
  { label: 'Image Tools', href: '#tools' },
  { label: 'PDF Tools', href: '#tools' },
  { label: 'AI Tools', href: '#tools' },
  { label: 'Pricing', href: '#cta' },
  { label: 'Blog', href: '#' },
];

const MEGA_MENU_ITEMS = [
  { icon: Search, label: 'SEO Tools', desc: 'Boost rankings & traffic', color: 'text-primary', bg: 'bg-primary-bg' },
  { icon: Image, label: 'Image Tools', desc: 'Compress & optimize images', color: 'text-green', bg: 'bg-green-bg' },
  { icon: FileText, label: 'PDF Tools', desc: 'Edit & compress PDFs', color: 'text-primary', bg: 'bg-primary-bg' },
  { icon: Type, label: 'Text Tools', desc: 'Word count & analysis', color: 'text-blue', bg: 'bg-blue-bg' },
  { icon: Sparkles, label: 'AI Tools', desc: 'AI-powered writing tools', color: 'text-primary-light', bg: 'bg-primary-bg' },
  { icon: Code2, label: 'Developer Tools', desc: 'JSON, code & more', color: 'text-blue', bg: 'bg-blue-bg' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-sm border-b border-border' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="ToolStack home">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3v10M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[16px] font-semibold text-dark">ToolStack</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {/* Tools dropdown trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMegaOpen(!megaOpen)}
                onBlur={() => setTimeout(() => setMegaOpen(false), 150)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] font-normal text-body transition-colors hover:text-primary"
              >
                Tools
                <ChevronDown size={14} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega menu */}
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-[420px] rounded-xl border border-border bg-white p-4 shadow-xl"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {MEGA_MENU_ITEMS.map((item) => (
                        <Link
                          key={item.label}
                          href="#tools"
                          className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-bg"
                          onClick={() => setMegaOpen(false)}
                        >
                          <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg ${item.bg}`}>
                            <item.icon size={18} className={item.color} strokeWidth={1.5} />
                          </span>
                          <div>
                            <p className="text-[14px] font-medium text-dark">{item.label}</p>
                            <p className="text-[12px] text-muted">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="rounded-lg px-3 py-2 text-[14px] font-normal text-body transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => setDark(!dark)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:bg-bg hover:text-dark"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA */}
            <Link
              href="#tools"
              className="hidden items-center rounded-btn bg-primary px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-primary-dark md:inline-flex"
            >
              Get Started Free
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-body lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M8 3v10M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-[16px] font-semibold text-dark">ToolStack</span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-border"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-4 pt-4">
              {[{ label: 'Tools', href: '#tools' }, ...NAV_LINKS].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-[16px] font-medium text-dark transition-colors hover:bg-bg"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="#tools"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center rounded-btn bg-primary px-5 py-3 text-[15px] font-semibold text-white"
              >
                Get Started Free
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
