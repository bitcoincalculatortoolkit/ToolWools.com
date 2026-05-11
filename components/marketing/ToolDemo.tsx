'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Upload, ArrowRight } from 'lucide-react';

export function ToolDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -3, // max 3deg
      y: (x - 0.5) * 3,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="demo" className="px-4 py-8 md:py-12">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="mx-auto max-w-5xl rounded-3xl glass-card p-8 md:p-12 transition-shadow duration-500 hover:shadow-premium-xl"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          {/* Left — copy */}
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary"
            >
              Image Compressor
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 font-display text-[28px] font-bold leading-[1.2] text-dark tracking-[-0.02em]"
            >
              Compress images without losing quality
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-[15px] leading-relaxed text-muted"
            >
              Reduce image size in seconds while keeping perfect quality.
            </motion.p>

            <ul className="mt-5 space-y-3">
              {[
                'JPG, PNG, WEBP & more',
                'Smart compression algorithm',
                'Secure & private — files never stored',
                'Bulk optimization up to 50 files',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2.5 text-[14px] text-body"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-bg">
                    <Check size={12} className="text-green" strokeWidth={2.5} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              href="#tools"
              className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-all duration-200 hover:gap-2.5"
            >
              Try Image Compressor <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          {/* Right — mockup */}
          <div className="relative md:col-span-7">
            {/* Floating badge with pulse glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute -right-3 -top-3 z-10 md:-right-6 md:-top-6"
            >
              <div className="relative">
                {/* Glow pulse ring */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
                <div className="relative grid h-[76px] w-[76px] place-items-center rounded-full bg-white shadow-premium border border-white/50">
                  <div className="text-center">
                    <p className="text-[22px] font-bold text-gradient-primary">72%</p>
                    <p className="text-[10px] text-muted font-medium">Smaller</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.06)',
              }}
            >
              {/* macOS bar with realistic dots */}
              <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3.5">
                <div className="group/dot relative">
                  <span className="block h-3 w-3 rounded-full bg-[#FF5F57] transition-transform hover:scale-110" />
                </div>
                <div className="group/dot relative">
                  <span className="block h-3 w-3 rounded-full bg-[#FFBD2E] transition-transform hover:scale-110" />
                </div>
                <div className="group/dot relative">
                  <span className="block h-3 w-3 rounded-full bg-[#28CA41] transition-transform hover:scale-110" />
                </div>
                <div className="ml-auto rounded-md bg-gray-50 px-3 py-1 text-[11px] text-muted">
                  toolstack.io/compress
                </div>
              </div>

              {/* Upload zone */}
              <div className="m-4 rounded-xl border-2 border-dashed border-border/60 p-8 text-center transition-colors hover:border-primary/30 hover:bg-primary-bg/30">
                <Upload size={40} className="mx-auto text-primary" strokeWidth={1.5} />
                <p className="mt-3 text-[14px] font-medium text-body">
                  Drag & drop your images here
                </p>
                <p className="mt-1 text-[12px] text-muted">
                  or click to browse · JPG, PNG, WEBP up to 50MB
                </p>
              </div>

              {/* File row */}
              <div className="mx-4 mb-3 rounded-xl border border-gray-100 px-4 py-3.5 transition-colors hover:bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-bg">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-primary">
                        <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-medium text-dark">workspace-design.png</span>
                  </div>
                  <span className="text-[12px] text-muted">2.4 MB</span>
                </div>
                {/* Progress bar with shimmer */}
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                    className="relative h-full rounded-full bg-gradient-to-r from-green to-green-light"
                  >
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  </motion.div>
                </div>
                <div className="mt-2 flex items-center justify-end">
                  <span className="text-[12px] font-semibold text-green">672 KB · 72% smaller</span>
                </div>
              </div>

              {/* Stats bottom */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 text-center">
                <div className="py-3.5">
                  <p className="text-[11px] text-muted">Original</p>
                  <p className="text-[14px] font-bold text-dark">2.4 MB</p>
                </div>
                <div className="py-3.5">
                  <p className="text-[11px] text-muted">Compressed</p>
                  <p className="text-[14px] font-bold text-dark">672 KB</p>
                </div>
                <div className="py-3.5">
                  <p className="text-[11px] text-muted">Savings</p>
                  <p className="text-[14px] font-bold text-green">72%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
