'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: 'Tools', href: '#tools' },
  { label: 'SEO Suite', href: '#seo-suite' },
  { label: 'Image Tools', href: '#image-tools' },
  { label: 'Calculators', href: '#stats' },
  { label: 'Pricing', href: '#cta' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-line transition-colors duration-300"
        style={{
          backgroundColor: scrolled
            ? 'rgba(250,249,246,0.96)'
            : 'rgba(250,249,246,0.88)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative rounded-[10px] px-3.5 py-2 text-[13.5px] font-medium text-ink-2 transition-colors duration-200 ease-lux hover:bg-cream-2 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#tools"
              className="group hidden items-center gap-1.5 rounded-[10px] bg-ink px-4 py-2.5 text-[13.5px] font-medium text-white shadow-[0_0_0_0_rgba(184,150,46,0)] transition-all duration-300 ease-lux hover:shadow-gold md:inline-flex"
            >
              Start Free
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5"
              />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-[10px] border border-line bg-white text-ink transition-colors hover:bg-cream-2 md:hidden"
            >
              <Menu size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-cream md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-[10px] border border-line bg-white"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            <motion.ul
              className="flex flex-col gap-1 px-5 pt-8"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {NAV_LINKS.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-4 text-2xl font-semibold tracking-tight text-ink hover:bg-cream-2"
                  >
                    {l.label}
                    <ArrowRight size={20} strokeWidth={1.5} className="text-ink-4" />
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-6"
              >
                <Link
                  href="#tools"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-4 text-base font-medium text-white"
                >
                  Start Free <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
