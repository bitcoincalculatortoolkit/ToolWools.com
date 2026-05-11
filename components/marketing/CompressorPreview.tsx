'use client';

import { motion } from 'framer-motion';
import { ArrowDownToLine, Check, ImageIcon, UploadCloud } from 'lucide-react';

/**
 * Non-functional UI shell for the Image Compressor tool, shown inside the hero.
 * Purely visual — shows completed mock state.
 */
export function CompressorPreview() {
  return (
    <div className="relative h-full w-full rounded-[22px] bg-white p-5">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-gold-bg">
            <ImageIcon size={16} strokeWidth={1.5} className="text-gold" />
          </span>
          <div>
            <p className="text-[13px] font-semibold leading-none text-ink">
              Image Compressor
            </p>
            <p className="mt-1 text-[11px] leading-none text-ink-4">
              Lossless &middot; In-browser
            </p>
          </div>
        </div>
        <span className="rounded-pill border border-gold-border bg-gold-bg px-2.5 py-1 text-[10.5px] font-semibold tracking-wide text-gold">
          DONE
        </span>
      </div>

      {/* Drop zone */}
      <div className="mt-4 rounded-[14px] border border-dashed border-line bg-cream p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-white shadow-soft">
            <UploadCloud size={16} strokeWidth={1.5} className="text-ink-2" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-ink">
              hero-banner.png
            </p>
            <p className="text-[11px] text-ink-4">2.4 MB &middot; 2400 x 1600 px</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] text-ink-4">
            <span>Compressing</span>
            <span>100%</span>
          </div>
          <div className="relative mt-1.5 h-1.5 overflow-hidden rounded-full bg-cream-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
              className="relative h-full rounded-full bg-gold"
            >
              <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Result comparison */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <ResultTile label="Before" size="2.4 MB" tone="neutral" />
        <ResultTile label="After" size="672 KB" tone="gold" />
      </div>

      {/* Download CTA */}
      <button
        type="button"
        className="group mt-4 flex w-full items-center justify-center gap-1.5 rounded-[12px] bg-ink px-4 py-3 text-[13px] font-medium text-white transition-all duration-200 ease-lux hover:bg-ink-2"
      >
        <ArrowDownToLine
          size={14}
          strokeWidth={2}
          className="transition-transform duration-300 ease-spring group-hover:translate-y-0.5"
        />
        Download compressed
      </button>
    </div>
  );
}

function ResultTile({
  label,
  size,
  tone,
}: {
  label: string;
  size: string;
  tone: 'neutral' | 'gold';
}) {
  const isGold = tone === 'gold';
  return (
    <div
      className={`flex items-center justify-between rounded-[12px] border p-3 ${
        isGold
          ? 'border-gold-border bg-gold-bg'
          : 'border-line bg-cream'
      }`}
    >
      <div>
        <p
          className={`text-[10.5px] font-semibold uppercase tracking-wider ${
            isGold ? 'text-gold' : 'text-ink-4'
          }`}
        >
          {label}
        </p>
        <p className="mt-1 text-[14px] font-semibold text-ink">{size}</p>
      </div>
      {isGold && (
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white">
          <Check size={12} strokeWidth={2.2} className="text-gold" />
        </span>
      )}
    </div>
  );
}
