'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold text-dark mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-card border border-border/60 bg-white overflow-hidden shadow-card"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50/50"
            >
              <span className="text-[15px] font-semibold text-dark pr-4">{item.q}</span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                {openIndex === i ? (
                  <Minus size={18} className="text-primary" />
                ) : (
                  <Plus size={18} className="text-muted" />
                )}
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 pb-4 pt-0 text-[14px] text-muted leading-relaxed border-t border-border/40">
                    <p className="pt-3">{item.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
