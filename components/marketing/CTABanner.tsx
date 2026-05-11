'use client';

import { ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section id="cta" className="px-4 py-16 md:px-8">
      <div className="relative mx-auto max-w-page overflow-hidden rounded-2xl bg-dark px-8 py-16 md:px-16">
        {/* Grid texture */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 40px)',
          }}
        />

        <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left copy */}
          <div>
            <h2 className="font-display text-[32px] font-bold text-white md:text-[40px]">
              Ready to get things done?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/70">
              Join 2.4M+ users who trust ToolStack for their daily tasks.
            </p>
            <a
              href="#tools"
              className="group mt-6 inline-flex items-center gap-2 rounded-btn bg-white px-6 py-3 text-[15px] font-semibold text-dark transition-colors hover:bg-gray-100"
            >
              Explore All Tools — It&rsquo;s Free
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Right mascots */}
          <div className="flex items-end justify-center gap-2 md:justify-end" aria-hidden>
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
      <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
        <ellipse cx="40" cy="45" rx="25" ry="24" fill={color} opacity={0.9} />
        <circle cx="33" cy="40" r="3" fill="white" />
        <circle cx="47" cy="40" r="3" fill="white" />
        <circle cx="34" cy="41" r="1.5" fill="#111" />
        <circle cx="48" cy="41" r="1.5" fill="#111" />
        <path d="M34 52 Q40 57 46 52" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M15 45 Q10 38 14 32" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M65 45 Q70 38 66 32" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M32 68 L32 80" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M48 68 L48 80" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
