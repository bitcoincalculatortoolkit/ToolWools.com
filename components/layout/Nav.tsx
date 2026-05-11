'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Image,
  FileText,
  Type,
  Sparkles,
  Code2,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'SEO Tools', href: '#tools' },
  { label: 'Image Tools', href: '#tools' },
  { label: 'PDF Tools', href: '#tools' },
  { label: 'AI Tools', href: '#tools' },
  { label: 'Blog', href: '/blog' },
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed inset-x-0 top-[2px] z-50 transition-all duration-500 ease-spring ${
          scrolled
            ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-glass'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label="ToolStack home">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-glow transition-shadow duration-300 group-hover:shadow-glow-lg">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3v10M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[17px] font-bold text-dark transition-all duration-300 group-hover:text-gradient-primary">
              ToolStack
            </span>
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {/* Tools dropdown trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMegaOpen(!megaOpen)}
                onBlur={() => setTimeout(() => setMegaOpen(false), 200)}
                onMouseEnter={() => setActiveLink('Tools')}
                onMouseLeave={() => setActiveLink(null)}
                className="relative flex items-center gap-1 rounded-lg px-3.5 py-2 text-[14px] font-medium text-body transition-colors hover:text-primary"
              >
                Tools
                <ChevronDown size={14} className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega menu */}
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full mt-3 w-[440px] rounded-2xl glass-card p-5 shadow-premium-xl"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {MEGA_MENU_ITEMS.map((item) => (
                        <Link
                          key={item.label}
                          href="#tools"
                          className="group/item flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/80 hover:shadow-sm"
                          onClick={() => setMegaOpen(false)}
                        >
                          <span className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${item.bg} transition-transform duration-200 group-hover/item:scale-110`}>
                            <item.icon size={18} className={item.color} strokeWidth={1.5} />
                          </span>
                          <div>
                            <p className="text-[14px] font-semibold text-dark">{item.label}</p>
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
                onMouseEnter={() => setActiveLink(l.label)}
                onMouseLeave={() => setActiveLink(null)}
                className="relative rounded-lg px-3.5 py-2 text-[14px] font-medium text-body transition-colors hover:text-primary"
              >
                {l.label}
                {activeLink === l.label && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA */}
            <Link
              href="#tools"
              className="relative hidden items-center rounded-xl bg-gradient-to-r from-primary to-primary-dark px-5 py-2.5 text-[14px] font-semibold text-white transition-all duration-300 hover:shadow-glow-lg md:inline-flex overflow-hidden group"
            >
              <span className="relative z-10">Get Started Free</span>
              {/* Animated glow ring */}
              <span className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-primary-light/20 to-transparent" />
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border/50 bg-white/80 backdrop-blur-sm text-body transition-all duration-200 hover:bg-white hover:shadow-sm lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-[70] w-[85%] max-w-[380px] bg-white/95 backdrop-blur-2xl shadow-premium-xl lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-dark">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M8 3v10M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="text-[16px] font-bold text-dark">ToolStack</span>
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-gray-100 text-dark"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-4 pt-4">
                {[{ label: 'Tools', href: '#tools' }, ...NAV_LINKS].map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3.5 text-[16px] font-medium text-dark transition-colors hover:bg-primary-bg"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Link
                    href="#tools"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-dark px-5 py-3.5 text-[15px] font-semibold text-white shadow-glow"
                  >
                    Get Started Free
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
