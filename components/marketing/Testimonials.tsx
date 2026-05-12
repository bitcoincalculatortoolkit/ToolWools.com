'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  borderColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "I've used maybe a dozen tools platforms over the years. ToolWools is the only one where I don't feel like I'm fighting the interface to get to the actual tool. The SEO audit alone saves me 45 minutes per client.",
    name: 'Alex Johnson',
    role: 'SEO Specialist · Freelance',
    initials: 'AJ',
    color: 'bg-primary-bg text-primary',
    borderColor: 'from-primary/40 to-primary-light/40',
  },
  {
    quote: "The image compressor cut my site's page load from 4.2s to under 1.8s. That's not a rounding error — my bounce rate dropped 18% the week after. Dead simple to use, works on the first try.",
    name: 'Sarah Williams',
    role: 'Digital Marketer · E-commerce Brand',
    initials: 'SW',
    color: 'bg-blue-bg text-blue',
    borderColor: 'from-blue/40 to-blue-light/40',
  },
  {
    quote: "Every dev tool I actually need, in one tab, with zero clutter. The JSON formatter handles nested arrays that break other tools. Bookmarked on day one, still here six months later.",
    name: 'Michael Chen',
    role: 'Full-Stack Developer · SaaS Startup',
    initials: 'MC',
    color: 'bg-green-bg text-green',
    borderColor: 'from-green/40 to-green-light/40',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-page px-4 md:px-6">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary"
          >
            Loved by millions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-2 font-display text-[36px] font-bold text-dark tracking-[-0.02em] md:text-[42px]"
          >
            Trusted by users worldwide
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl border border-gray-100/60 bg-white p-7 shadow-premium transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-xl hover:rotate-[0.5deg]"
            >
              {/* Large decorative quote mark */}
              <div className="absolute top-5 right-6 text-[60px] font-serif leading-none text-gradient-primary opacity-10 select-none pointer-events-none">
                &ldquo;
              </div>

              {/* Stars with gradient fill */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={16} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[15px] leading-[1.75] text-body relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3.5">
                {/* Avatar with animated gradient border */}
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${t.borderColor} animate-spin-slow opacity-60`} style={{ padding: '2px', margin: '-2px' }} />
                  <span className={`relative grid h-11 w-11 place-items-center rounded-full text-[14px] font-bold ${t.color} ring-2 ring-white`}>
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-dark">{t.name}</p>
                  <p className="text-[12px] text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
