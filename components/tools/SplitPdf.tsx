'use client';

/**
 * SplitPdf — Split PDF into separate files, extract pages, or split by range.
 *
 * Uses pdf-lib for splitting and pdfjs-dist for thumbnail rendering.
 * 100% client-side. No upload, no server, no signup.
 */

import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  Download,
  FileText,
  Grid3X3,
  Loader2,
  Scissors,
  Shield,
  Square,
  Upload,
  X,
} from 'lucide-react';

/* ─── Constants ─── */
const PDFJS_VERSION = '4.8.69';
const PDFJS_WORKER_SRC = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

type SplitMode = 'extract' | 'range' | 'every-n';

interface PageThumb {
  pageNumber: number;
  thumbnailUrl: string;
}

interface SplitResult {
  id: string;
  name: string;
  blob: Blob;
  pageCount: number;
}

export function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumb[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [splitMode, setSplitMode] = useState<SplitMode>('extract');
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rangeInput, setRangeInput] = useState('');
  const [everyN, setEveryN] = useState(2);

  const [splitting, setSplitting] = useState(false);
  const [splitProgress, setSplitProgress] = useState(0);
  const [splitResults, setSplitResults] = useState<SplitResult[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pdfBytesRef = useRef<ArrayBuffer | null>(null);

  // Track last clicked page for shift-click range selection
  const lastClickedRef = useRef<number | null>(null);

  /* ─── Helpers ─── */
  const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  /* ─── Load PDF + render thumbnails ─── */
  const handleFile = useCallback(async (selected: File) => {
    setError(null);
    setFile(selected);
    setPages([]);
    setSelectedPages(new Set());
    setSplitResults([]);
    setTotalPages(0);
    setLoading(true);
    setLoadProgress(5);

    try {
      const arrayBuffer = await selected.arrayBuffer();
      pdfBytesRef.current = arrayBuffer.slice(0);

      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;

      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;
      setTotalPages(numPages);

      const rendered: PageThumb[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        const thumbScale = 150 / viewport.width;
        const thumbVp = page.getViewport({ scale: thumbScale });
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(thumbVp.width);
        canvas.height = Math.floor(thumbVp.height);
        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport: thumbVp }).promise;

        rendered.push({
          pageNumber: i,
          thumbnailUrl: canvas.toDataURL('image/jpeg', 0.7),
        });

        canvas.width = 0;
        canvas.height = 0;

        setLoadProgress(Math.round((i / numPages) * 100));
        setPages([...rendered]);
      }
    } catch (err: any) {
      const message =
        err?.message?.includes('password') || err?.name === 'PasswordException'
          ? 'Password-protected PDF — cannot read.'
          : err?.message || 'Failed to read this PDF.';
      setError(message);
      setFile(null);
      pdfBytesRef.current = null;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ─── Page selection ─── */
  const togglePage = (pageNum: number, shiftKey: boolean) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);

      if (shiftKey && lastClickedRef.current !== null) {
        const start = Math.min(lastClickedRef.current, pageNum);
        const end = Math.max(lastClickedRef.current, pageNum);
        for (let i = start; i <= end; i++) {
          next.add(i);
        }
      } else {
        if (next.has(pageNum)) {
          next.delete(pageNum);
        } else {
          next.add(pageNum);
        }
      }

      lastClickedRef.current = pageNum;
      return next;
    });
  };

  const selectAll = () => {
    const all = new Set<number>();
    for (let i = 1; i <= totalPages; i++) all.add(i);
    setSelectedPages(all);
  };

  const deselectAll = () => {
    setSelectedPages(new Set());
  };

  const invertSelection = () => {
    setSelectedPages((prev) => {
      const next = new Set<number>();
      for (let i = 1; i <= totalPages; i++) {
        if (!prev.has(i)) next.add(i);
      }
      return next;
    });
  };

  /* ─── Parse range string ─── */
  const parseRanges = (input: string): number[] => {
    const pages: Set<number> = new Set();
    const parts = input.split(',').map((s) => s.trim()).filter(Boolean);

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
            pages.add(i);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= totalPages) {
          pages.add(num);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  /* ─── Split / Extract ─── */
  const handleSplit = useCallback(async () => {
    if (!pdfBytesRef.current) return;
    setError(null);
    setSplitting(true);
    setSplitProgress(0);
    setSplitResults([]);

    try {
      const { PDFDocument } = await import('pdf-lib');

      if (splitMode === 'extract' || splitMode === 'range') {
        // Determine which pages to extract
        let pagesToExtract: number[];
        if (splitMode === 'extract') {
          pagesToExtract = Array.from(selectedPages).sort((a, b) => a - b);
        } else {
          pagesToExtract = parseRanges(rangeInput);
        }

        if (pagesToExtract.length === 0) {
          setError(splitMode === 'extract' ? 'Please select at least one page.' : 'Please enter a valid page range.');
          setSplitting(false);
          return;
        }

        setSplitProgress(20);
        const sourcePdf = await PDFDocument.load(pdfBytesRef.current);
        const newPdf = await PDFDocument.create();

        // pdf-lib uses 0-based indices
        const indices = pagesToExtract.map((p) => p - 1);
        const copiedPages = await newPdf.copyPages(sourcePdf, indices);
        copiedPages.forEach((page) => newPdf.addPage(page));

        setSplitProgress(80);
        const savedBytes = await newPdf.save();
        const blob = new Blob([savedBytes], { type: 'application/pdf' });

        const baseName = file?.name.replace(/\.pdf$/i, '') || 'split';
        setSplitResults([
          {
            id: uid(),
            name: `${baseName}_pages_${pagesToExtract[0]}-${pagesToExtract[pagesToExtract.length - 1]}.pdf`,
            blob,
            pageCount: pagesToExtract.length,
          },
        ]);
        setSplitProgress(100);
      } else if (splitMode === 'every-n') {
        const sourcePdf = await PDFDocument.load(pdfBytesRef.current);
        const sourcePageCount = sourcePdf.getPageCount();
        const results: SplitResult[] = [];
        const chunks = Math.ceil(sourcePageCount / everyN);
        const baseName = file?.name.replace(/\.pdf$/i, '') || 'split';

        for (let chunk = 0; chunk < chunks; chunk++) {
          const startPage = chunk * everyN;
          const endPage = Math.min(startPage + everyN, sourcePageCount);
          const indices = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

          const newPdf = await PDFDocument.create();
          const copiedPages = await newPdf.copyPages(sourcePdf, indices);
          copiedPages.forEach((page) => newPdf.addPage(page));

          const savedBytes = await newPdf.save();
          const blob = new Blob([savedBytes], { type: 'application/pdf' });

          results.push({
            id: uid(),
            name: `${baseName}_part${chunk + 1}_pages${startPage + 1}-${endPage}.pdf`,
            blob,
            pageCount: endPage - startPage,
          });

          setSplitProgress(Math.round(((chunk + 1) / chunks) * 100));
        }

        setSplitResults(results);
      }
    } catch (err: any) {
      const message =
        err?.message?.includes('password') || err?.name === 'PasswordException'
          ? 'Password-protected PDF — cannot split.'
          : err?.message || 'Failed to split PDF.';
      setError(message);
    } finally {
      setTimeout(() => {
        setSplitting(false);
        setSplitProgress(0);
      }, 1500);
    }
  }, [splitMode, selectedPages, rangeInput, everyN, totalPages, file]);

  /* ─── Download result ─── */
  const downloadResult = (result: SplitResult) => {
    const url = URL.createObjectURL(result.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = result.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  /* ─── Clear ─── */
  const clearAll = () => {
    setFile(null);
    setPages([]);
    setTotalPages(0);
    setSelectedPages(new Set());
    setSplitResults([]);
    setError(null);
    setRangeInput('');
    pdfBytesRef.current = null;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (!f) return;
      if (!f.name.toLowerCase().endsWith('.pdf') && f.type !== 'application/pdf') {
        setError('Please drop a PDF file.');
        return;
      }
      handleFile(f);
    },
    [handleFile]
  );

  /* ─── Upload Zone (no PDF loaded) ─── */
  if (!file || loading) {
    return (
      <div className="space-y-6">
        {/* Privacy Banner */}
        <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-4 py-3">
          <Shield size={18} className="text-green-600 flex-shrink-0" />
          <p className="text-[13px] text-green-800 font-medium">
            Files processed locally — never uploaded. Your documents stay private on your device.
          </p>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !loading && inputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 md:p-16 text-center transition-all duration-300 ${
            isDragging
              ? 'border-primary bg-primary-bg/50 scale-[1.01]'
              : 'border-border hover:border-primary/40 hover:bg-primary-bg/20'
          } ${loading ? 'pointer-events-none' : ''}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = '';
            }}
            className="hidden"
          />
          <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-red-50 grid place-items-center">
            <Scissors size={28} className={isDragging ? 'text-primary' : 'text-red-400'} />
          </div>
          <p className="text-[15px] font-semibold text-dark">
            Drop a PDF here to split
          </p>
          <p className="mt-1 text-sm text-muted">
            Upload one PDF — then extract pages, split by range, or divide every N pages
          </p>

          {loading && (
            <div className="mt-6 max-w-sm mx-auto">
              <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                />
              </div>
              <p className="mt-2 text-[12px] text-muted">
                Rendering pages… {loadProgress}%
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            {error}
          </div>
        )}
      </div>
    );
  }

  /* ─── Main UI (PDF loaded) ─── */
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-4 py-3">
        <div className="flex items-center gap-2 text-[13px]">
          <Shield size={15} className="text-green-600" />
          <span className="font-semibold text-dark">Files processed locally — never uploaded.</span>
          <span className="hidden sm:inline text-muted">
            {file.name} · {totalPages} page{totalPages !== 1 ? 's' : ''}
          </span>
        </div>
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold text-muted hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <X size={14} /> Close document
        </button>
      </div>

      {/* Mode Tabs */}
      <div className="rounded-2xl border border-border/60 bg-white shadow-card overflow-hidden">
        <div className="flex border-b border-border/40">
          <ModeTab
            active={splitMode === 'extract'}
            onClick={() => setSplitMode('extract')}
            label="Extract Pages"
            icon={<CheckSquare size={14} />}
          />
          <ModeTab
            active={splitMode === 'range'}
            onClick={() => setSplitMode('range')}
            label="Split by Range"
            icon={<FileText size={14} />}
          />
          <ModeTab
            active={splitMode === 'every-n'}
            onClick={() => setSplitMode('every-n')}
            label="Split Every N"
            icon={<Grid3X3 size={14} />}
          />
        </div>

        <div className="p-4">
          {/* Mode: Extract Pages */}
          {splitMode === 'extract' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" onClick={selectAll} className="text-[12px] font-semibold text-primary hover:underline">
                  Select All
                </button>
                <span className="text-muted">·</span>
                <button type="button" onClick={deselectAll} className="text-[12px] font-semibold text-primary hover:underline">
                  Deselect All
                </button>
                <span className="text-muted">·</span>
                <button type="button" onClick={invertSelection} className="text-[12px] font-semibold text-primary hover:underline">
                  Invert Selection
                </button>
                <span className="ml-auto text-[12px] text-muted">
                  {selectedPages.size} of {totalPages} selected
                </span>
              </div>
              <p className="text-[11px] text-muted">Click to select pages. Hold Shift + click for range selection.</p>
            </div>
          )}

          {/* Mode: Range */}
          {splitMode === 'range' && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-dark block">
                Enter page ranges
              </label>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder="e.g. 1-3, 5, 7-10"
                className="w-full rounded-lg border border-border px-3 py-2.5 text-[14px] focus:outline-none focus:border-primary"
              />
              <p className="text-[11px] text-muted">
                Separate pages with commas. Use dashes for ranges. Total pages: {totalPages}
              </p>
            </div>
          )}

          {/* Mode: Every N */}
          {splitMode === 'every-n' && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-dark block">
                Split every N pages
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={everyN}
                  onChange={(e) => setEveryN(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 rounded-lg border border-border px-3 py-2.5 text-[14px] focus:outline-none focus:border-primary"
                />
                <span className="text-sm text-muted">
                  → {Math.ceil(totalPages / everyN)} file{Math.ceil(totalPages / everyN) !== 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-[11px] text-muted">
                Splits into multiple PDFs, each with {everyN} page{everyN !== 1 ? 's' : ''} (last file may have fewer).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Page Grid (show for all modes — highlight for extract mode) */}
      <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-card">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {pages.map((page) => {
            const isSelected = selectedPages.has(page.pageNumber);
            const isInRange =
              splitMode === 'range'
                ? parseRanges(rangeInput).includes(page.pageNumber)
                : false;
            const highlighted = splitMode === 'extract' ? isSelected : isInRange;

            return (
              <motion.button
                key={page.pageNumber}
                type="button"
                onClick={(e) => {
                  if (splitMode === 'extract') {
                    togglePage(page.pageNumber, e.shiftKey);
                  }
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative rounded-xl border-2 overflow-hidden transition-all ${
                  highlighted
                    ? 'border-primary ring-2 ring-primary/20 shadow-md'
                    : 'border-border/40 hover:border-border'
                } ${splitMode === 'extract' ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <img
                  src={page.thumbnailUrl}
                  alt={`Page ${page.pageNumber}`}
                  className="w-full h-auto"
                />

                {/* Page number badge */}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-white/90 backdrop-blur-sm text-dark rounded-full px-2 py-0.5 shadow-sm border border-border/40">
                  {page.pageNumber}
                </span>

                {/* Selected checkmark overlay */}
                {highlighted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-primary grid place-items-center shadow-sm"
                  >
                    <CheckSquare size={11} className="text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
        >
          {error}
        </motion.div>
      )}

      {/* Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border/60 bg-white p-4 shadow-card"
      >
        {/* Progress */}
        {splitting && (
          <div className="mb-4">
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${splitProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" />
              Splitting... {splitProgress}%
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {splitMode === 'extract' && `${selectedPages.size} page${selectedPages.size !== 1 ? 's' : ''} selected`}
            {splitMode === 'range' && `${parseRanges(rangeInput).length} page${parseRanges(rangeInput).length !== 1 ? 's' : ''} in range`}
            {splitMode === 'every-n' && `Will create ${Math.ceil(totalPages / everyN)} file${Math.ceil(totalPages / everyN) !== 1 ? 's' : ''}`}
          </p>
          <button
            type="button"
            onClick={handleSplit}
            disabled={splitting}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {splitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Splitting...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Scissors size={16} />
                {splitMode === 'extract' ? 'Extract Pages' : splitMode === 'range' ? 'Split by Range' : 'Split PDF'}
              </span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {splitResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            <p className="text-sm font-semibold text-dark px-1">
              {splitResults.length === 1 ? 'Result' : `${splitResults.length} Files Ready`}
            </p>
            {splitResults.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-white p-4 shadow-card"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-green-50 flex-shrink-0">
                    <FileText size={18} className="text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-dark truncate">{result.name}</p>
                    <p className="text-xs text-muted">{result.pageCount} page{result.pageCount !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => downloadResult(result)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow flex-shrink-0"
                >
                  <Download size={13} /> Download
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mode Tab Component ─── */
function ModeTab({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-[13px] font-semibold transition-colors border-b-2 ${
        active
          ? 'text-primary border-primary bg-primary-bg/30'
          : 'text-muted border-transparent hover:text-dark hover:bg-gray-50/50'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
