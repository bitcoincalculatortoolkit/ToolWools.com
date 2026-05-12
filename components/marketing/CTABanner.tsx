'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 6 + Math.random() * 4,
  size: 2 + Math.random() * 3,
}));

export function CTABanner() {
  return (
    <section id="cta" className="px-4 py-16 md:px-8 md:py-20">
      <div className="relative mx-auto max-w-page overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20"
        style={{
          background: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 40%, #0f0c29 70%, #1a1a2e 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 8s ease infinite',
        }}
      >
        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden />

        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue/10 rounded-full blur-3xl" aria-hidden />

        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              bottom: '-5%',
            }}
            animate={{
              y: [0, -600],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            aria-hidden
          />
        ))}

        {/* Grid texture */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 50px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 50px)',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left copy */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[34px] font-bold text-white md:text-[44px] tracking-[-0.02em] leading-[1.1]"
            >
              Ready to{' '}
              <span className="text-gradient-primary inline-block">get things done</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-[16px] leading-relaxed text-white/60"
            >
              Join 2.4M+ users who trust ToolWools for their daily tasks.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              href="/tools"
              className="group relative mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-white to-gray-100 px-7 py-3.5 text-[15px] font-semibold text-dark transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore All Tools — It&rsquo;s Free
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          </div>

          {/* Right mascots with glow rings */}
          <div className="flex items-end justify-center gap-3 md:justify-end" aria-hidden>
            <MascotSmall color="#F4511E" delay="0s" />
            <MascotSmall color="#10B981" delay="0.3s" />
            <MascotSmall color="#2563EB" delay="0.6s" />
            <MascotSmall color="#FBBF24" delay="0.9s" />
            <MascotSmall color="#FF5F57" delay="1.2s" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MascotSmall({ color, delay }: { color: string; delay: string }) {
  return (
    <div
      className="animate-sway"
      style={{ animationDelay: delay }}
    >
      <svg width="80" height="95" viewBox="0 0 80 95" fill="none">
        {/* Glow ring underneath */}
        <ellipse cx="40" cy="88" rx="20" ry="5" fill={color} opacity={0.25} />
        {/* Body */}
        <ellipse cx="40" cy="45" rx="25" ry="24" fill={color} opacity={0.9} />
        {/* Highlight */}
        <ellipse cx="32" cy="35" rx="8" ry="5" fill="white" opacity={0.12} />
        {/* Eyes */}
        <circle cx="33" cy="40" r="3.5" fill="white" />
        <circle cx="47" cy="40" r="3.5" fill="white" />
        <circle cx="34" cy="41" r="1.8" fill="#111" />
        <circle cx="48" cy="41" r="1.8" fill="#111" />
        {/* Eye sparkle */}
        <circle cx="32.5" cy="39.5" r="0.8" fill="white" opacity={0.8} />
        <circle cx="46.5" cy="39.5" r="0.8" fill="white" opacity={0.8} />
        {/* Smile */}
        <path d="M34 52 Q40 57 46 52" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Arms */}
        <path d="M15 45 Q10 38 14 32" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M65 45 Q70 38 66 32" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Legs */}
        <path d="M32 68 L32 80" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M48 68 L48 80" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
