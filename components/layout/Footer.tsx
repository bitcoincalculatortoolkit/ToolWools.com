'use client';

import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Tools',
    links: [
      { label: 'Image Compressor', href: '#tools' },
      { label: 'Meta Tag Generator', href: '#tools' },
      { label: 'Word Counter', href: '#tools' },
      { label: 'PDF Compressor', href: '#tools' },
      { label: 'JSON Formatter', href: '#tools' },
      { label: 'All Tools', href: '#tools' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-surface bg-canvas">
      <div className="mx-auto grid w-full max-w-page gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed tracking-[-0.14px] text-ash">
            Every tool your workflow will ever need — crafted for speed, designed
            for clarity.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {[
              { Icon: Twitter, label: 'Twitter' },
              { Icon: Linkedin, label: 'LinkedIn' },
              { Icon: Github, label: 'GitHub' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-icons border border-stone-surface bg-white text-ash transition-all duration-200 hover:-translate-y-0.5 hover:border-ember/20 hover:bg-ember/5 hover:text-ember"
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h4 className="label-kicker text-ash">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[14px] tracking-[-0.14px] text-graphite transition-colors duration-200 hover:text-charcoal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <h4 className="label-kicker text-ash">Newsletter</h4>
          <p className="mt-4 text-[13px] tracking-[-0.14px] text-ash">
            One email a month. New tools, quiet launches.
          </p>
          <form
            className="mt-4 flex items-center gap-2 rounded-inputs border border-stone-surface bg-white p-1.5 transition-colors focus-within:border-ember/30"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="you@company.com"
              aria-label="Email address"
              className="w-full bg-transparent px-2 py-1 text-[13px] text-charcoal placeholder:text-smoke focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-inputs bg-midnight text-white transition-all duration-200 hover:bg-charcoal"
            >
              <ArrowRight size={13} strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-stone-surface">
        <div className="mx-auto flex w-full max-w-page flex-col items-start justify-between gap-3 px-5 py-5 text-[12px] text-fog md:flex-row md:items-center md:px-8">
          <p>© {new Date().getFullYear()} ToolWools. All rights reserved.</p>
          <nav className="flex items-center gap-5" aria-label="Legal">
            <Link href="#" className="hover:text-graphite">Privacy</Link>
            <Link href="#" className="hover:text-graphite">Terms</Link>
            <Link href="#" className="hover:text-graphite">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
