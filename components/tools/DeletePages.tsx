'use client';

/**
 * DeletePages — Remove unwanted pages from a PDF.
 *
 * Uses pdf-lib for page removal and pdfjs-dist for thumbnail rendering.
 * 100% client-side. No upload, no server, no signup.
 */

import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Loader2,
  Shield,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

/* ─── Constants ─── */
const PDFJS_VERSION = '4.8.69';
const PDFJS_WORKER_SRC = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

interface PageThumb {
  pageNumber: number;
  thumbnailUrl: string;
}

export function DeletePages() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumb[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [markedForDeletion, setMarkedForDeletion] = useState<Set<number>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pdfBytesRef = useRef<ArrayBuffer | null>(null);

  /* ─── Load PDF + render thumbnails ─── */
  const handleFile = useCallback(async (selected: File) => {
    setError(null);
    setFile(selected);
    setPages([]);
    setMarkedForDeletion(new Set());
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

  /* ─── Page marking ─── */
  const toggleDeletion = (pageNum: number) => {
    setMarkedForDeletion((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) {
        next.delete(pageNum);
      } else {
        // Don't allow deleting ALL pages
        if (next.size >= totalPages - 1) {
          return prev;
        }
        next.add(pageNum);
      }
      return next;
    });
  };

  const selectAllForDeletion = () => {
    // Leave at least 1 page
    const all = new Set<number>();
    for (let i = 1; i <= totalPages - 1; i++) all.add(i);
    setMarkedForDeletion(all);
  };

  const deselectAll = () => {
    setMarkedForDeletion(new Set());
  };

  const invertSelection = () => {
    setMarkedForDeletion((prev) => {
      const next = new Set<number>();
      for (let i = 1; i <= totalPages; i++) {
        if (!prev.has(i)) next.add(i);
      }
      // Ensure at least 1 page remains
      if (next.size >= totalPages) {
        next.delete(totalPages);
      }
      return next;
    });
  };

  const keptPages = totalPages - markedForDeletion.size;

  /* ─── Apply deletion + Download ─── */
  const handleApply = useCallback(async () => {
    if (!pdfBytesRef.current) return;

    if (markedForDeletion.size === 0) {
      setError('No pages marked for deletion. Click pages to mark them for removal.');
      return;
    }

    if (keptPages < 1) {
      setError('Cannot delete all pages. At least one page must remain.');
      return;
    }

    setError(null);
    setProcessing(true);
    setProgress(0);

    try {
      const { PDFDocument } = await import('pdf-lib');
      setProgress(20);

      const pdfDoc = await PDFDocument.load(pdfBytesRef.current);
      setProgress(40);

      // Remove pages in reverse order to preserve indices
      const pagesToRemove = Array.from(markedForDeletion).sort((a, b) => b - a);
      for (const pageNum of pagesToRemove) {
        pdfDoc.removePage(pageNum - 1); // pdf-lib uses 0-based index
      }

      setProgress(70);
      const savedBytes = await pdfDoc.save();
      setProgress(90);

      const blob = new Blob([new Uint8Array(savedBytes) as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const baseName = file?.name.replace(/\.pdf$/i, '') || 'edited';
      link.download = `${baseName}_${keptPages}pages.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setProgress(100);
    } catch (err: any) {
      const message = err?.message || 'Failed to remove pages. Please try again.';
      setError(message);
    } finally {
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    }
  }, [markedForDeletion, file, keptPages]);

  /* ─── Clear ─── */
  const clearAll = () => {
    setFile(null);
    setPages([]);
    setTotalPages(0);
    setMarkedForDeletion(new Set());
    setError(null);
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
            <Trash2 size={28} className={isDragging ? 'text-primary' : 'text-red-400'} />
          </div>
          <p className="text-[15px] font-semibold text-dark">
            Drop a PDF here to delete pages
          </p>
          <p className="mt-1 text-sm text-muted">
            Upload one PDF — then click pages to mark them for deletion
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

      {/* Selection Controls */}
      <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={selectAllForDeletion} className="text-[12px] font-semibold text-primary hover:underline">
            Select All
          </button>
          <span className="text-muted">·</span>
          <button type="button" onClick={deselectAll} className="text-[12px] font-semibold text-primary hover:underline">
            Deselect All
          </button>
          <span className="text-muted">·</span>
          <button type="button" onClick={invertSelection} className="text-[12px] font-semibold text-primary hover:underline">
            Invert
          </button>
          <span className="ml-auto text-[12px] font-semibold">
            <span className="text-green-600">Keeping {keptPages}</span>
            <span className="text-muted"> of {totalPages} pages</span>
            {markedForDeletion.size > 0 && (
              <span className="text-red-500 ml-2">({markedForDeletion.size} to delete)</span>
            )}
          </span>
        </div>
        <p className="mt-2 text-[11px] text-muted">Click pages to mark them for deletion. Red pages will be removed.</p>
      </div>

      {/* Page Grid */}
      <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-card">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {pages.map((page) => {
            const isMarked = markedForDeletion.has(page.pageNumber);

            return (
              <motion.button
                key={page.pageNumber}
                type="button"
                onClick={() => toggleDeletion(page.pageNumber)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative rounded-xl border-2 overflow-hidden transition-all cursor-pointer ${
                  isMarked
                    ? 'border-red-400 ring-2 ring-red-200 shadow-md'
                    : 'border-border/40 hover:border-border'
                }`}
              >
                <img
                  src={page.thumbnailUrl}
                  alt={`Page ${page.pageNumber}`}
                  className={`w-full h-auto transition-all duration-200 ${
                    isMarked ? 'opacity-40 grayscale' : ''
                  }`}
                />

                {/* Page number badge */}
                <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-bold rounded-full px-2 py-0.5 shadow-sm border ${
                  isMarked
                    ? 'bg-red-100 text-red-600 border-red-200 line-through'
                    : 'bg-white/90 backdrop-blur-sm text-dark border-border/40'
                }`}>
                  {page.pageNumber}
                </span>

                {/* Red X overlay for marked pages */}
                {isMarked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-red-500/90 grid place-items-center shadow-lg">
                      <X size={20} className="text-white" strokeWidth={3} />
                    </div>
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
        {processing && (
          <div className="mb-4">
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" />
              Removing pages... {progress}%
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {markedForDeletion.size === 0
              ? 'Click pages above to mark for deletion'
              : `${markedForDeletion.size} page${markedForDeletion.size !== 1 ? 's' : ''} will be removed`}
          </p>
          <button
            type="button"
            onClick={handleApply}
            disabled={processing || markedForDeletion.size === 0}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Removing...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Download size={16} />
                Delete Pages & Download ({keptPages} pages)
              </span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
