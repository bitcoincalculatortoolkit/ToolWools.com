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
  { label: 'Developers', href: '#stats' },
  { label: 'Pricing', href: '#cta' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'shadow-subtle-3 backdrop-blur-xl'
            : ''
        }`}
        style={{
          backgroundColor: scrolled
            ? 'rgba(251,250,249,0.92)'
            : 'rgba(251,250,249,0.6)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-5 md:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-inputs px-3.5 py-2 text-[14px] font-medium text-charcoal transition-colors duration-200 ease-lux hover:bg-stone-surface hover:text-midnight"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Light pill — Log In */}
            <Link
              href="#"
              className="hidden items-center rounded-pill bg-stone-surface px-4 py-2 text-[14px] font-medium text-midnight transition-colors duration-200 hover:bg-fog/40 md:inline-flex"
            >
              Log In
            </Link>
            {/* Dark pill — Get Started */}
            <Link
              href="#tools"
              className="group hidden items-center gap-1.5 rounded-pill bg-midnight px-4 py-2.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-charcoal md:inline-flex"
            >
              Get Started
              <ArrowRight
                size={13}
                strokeWidth={2}
                className="transition-transform duration-300 ease-spring group-hover:translate-x-0.5"
              />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-inputs border border-stone-surface bg-white text-charcoal transition-colors hover:bg-stone-surface md:hidden"
            >
              <Menu size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-canvas md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-inputs border border-stone-surface bg-white"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            <motion.ul
              className="flex flex-col gap-1 px-5 pt-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {NAV_LINKS.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-cards px-4 py-4 text-2xl font-medium tracking-tight text-charcoal hover:bg-stone-surface"
                  >
                    {l.label}
                    <ArrowRight size={20} strokeWidth={1.5} className="text-ash" />
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="mt-6"
              >
                <Link
                  href="#tools"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-pill bg-midnight px-4 py-4 text-base font-medium text-white"
                >
                  Get Started <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
