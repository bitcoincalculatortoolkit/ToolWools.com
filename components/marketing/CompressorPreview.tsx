'use client';

import { motion } from 'framer-motion';
import { ArrowDownToLine, Check, ImageIcon, UploadCloud } from 'lucide-react';

/**
 * Standalone Image Compressor UI shell — used within feature showcase.
 * Non-functional (mock state only — Phase 1).
 */
export function CompressorPreview() {
  return (
    <div className="relative h-full w-full rounded-cards-lg bg-white p-5">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-cards bg-parchment">
            <ImageIcon size={16} strokeWidth={1.5} className="text-graphite" />
          </span>
          <div>
            <p className="text-[13px] font-semibold leading-none text-charcoal">
              Image Compressor
            </p>
            <p className="mt-1 text-[11px] leading-none text-ash">
              Lossless &middot; In-browser
            </p>
          </div>
        </div>
        <span className="rounded-pill border border-meadow/20 bg-meadow/10 px-2.5 py-1 text-[10.5px] font-semibold tracking-wide text-meadow">
          DONE
        </span>
      </div>

      {/* Drop zone */}
      <div className="mt-4 rounded-cards border border-dashed border-stone-surface bg-parchment p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-cards bg-white shadow-subtle">
            <UploadCloud size={16} strokeWidth={1.5} className="text-graphite" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-medium text-charcoal">
              hero-banner.png
            </p>
            <p className="text-[11px] text-ash">2.4 MB &middot; 2400 × 1600 px</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] text-ash">
            <span>Compressing</span>
            <span>100%</span>
          </div>
          <div className="relative mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-surface">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
              className="h-full rounded-full bg-ember"
            />
          </div>
        </div>
      </div>

      {/* Result comparison */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <ResultTile label="Before" size="2.4 MB" tone="neutral" />
        <ResultTile label="After" size="672 KB" tone="success" />
      </div>

      {/* Download CTA */}
      <button
        type="button"
        className="group mt-4 flex w-full items-center justify-center gap-1.5 rounded-pill bg-midnight px-4 py-3 text-[13px] font-medium text-white transition-all duration-200 hover:bg-charcoal"
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
  tone: 'neutral' | 'success';
}) {
  const isSuccess = tone === 'success';
  return (
    <div
      className={`flex items-center justify-between rounded-cards border p-3 ${
        isSuccess
          ? 'border-meadow/20 bg-meadow/5'
          : 'border-stone-surface bg-parchment'
      }`}
    >
      <div>
        <p
          className={`text-[10.5px] font-semibold uppercase tracking-wider ${
            isSuccess ? 'text-meadow' : 'text-ash'
          }`}
        >
          {label}
        </p>
        <p className="mt-1 text-[14px] font-semibold text-charcoal">{size}</p>
      </div>
      {isSuccess && (
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white shadow-subtle">
          <Check size={12} strokeWidth={2.2} className="text-meadow" />
        </span>
      )}
    </div>
  );
}
