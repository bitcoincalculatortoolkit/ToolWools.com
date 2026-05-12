'use client';

/**
 * RotatePdf — Rotate PDF pages individually or in bulk.
 *
 * Uses pdf-lib for rotation and pdfjs-dist for thumbnail rendering.
 * 100% client-side. No upload, no server, no signup.
 */

import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  Download,
  Loader2,
  RotateCcw,
  RotateCw,
  Shield,
  Upload,
  X,
} from 'lucide-react';

/* ─── Constants ─── */
const PDFJS_VERSION = '4.8.69';
const PDFJS_WORKER_SRC = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

interface PageThumb {
  pageNumber: number;
  thumbnailUrl: string;
  rotation: number; // cumulative rotation in degrees
}

export function RotatePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumb[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
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
    setSelectedPages(new Set());
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
          rotation: 0,
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
  const togglePage = (pageNum: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) {
        next.delete(pageNum);
      } else {
        next.add(pageNum);
      }
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

  /* ─── Rotation actions ─── */
  const rotatePage = (pageNum: number, degrees: number) => {
    setPages((prev) =>
      prev.map((p) =>
        p.pageNumber === pageNum
          ? { ...p, rotation: (p.rotation + degrees + 360) % 360 }
          : p
      )
    );
  };

  const rotateSelected = (degrees: number) => {
    if (selectedPages.size === 0) return;
    setPages((prev) =>
      prev.map((p) =>
        selectedPages.has(p.pageNumber)
          ? { ...p, rotation: (p.rotation + degrees + 360) % 360 }
          : p
      )
    );
  };

  const rotateAll = (degrees: number) => {
    setPages((prev) =>
      prev.map((p) => ({
        ...p,
        rotation: (p.rotation + degrees + 360) % 360,
      }))
    );
  };

  /* ─── Apply + Download ─── */
  const handleApply = useCallback(async () => {
    if (!pdfBytesRef.current) return;

    const hasRotation = pages.some((p) => p.rotation !== 0);
    if (!hasRotation) {
      setError('No rotation applied to any page. Rotate at least one page first.');
      return;
    }

    setError(null);
    setProcessing(true);
    setProgress(0);

    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      setProgress(20);

      const pdfDoc = await PDFDocument.load(pdfBytesRef.current);
      setProgress(40);

      const pdfPages = pdfDoc.getPages();
      for (let i = 0; i < pdfPages.length; i++) {
        const rotation = pages[i]?.rotation || 0;
        if (rotation !== 0) {
          const currentRotation = pdfPages[i].getRotation().angle;
          pdfPages[i].setRotation(degrees(currentRotation + rotation));
        }
      }

      setProgress(70);
      const savedBytes = await pdfDoc.save();
      setProgress(90);

      const blob = new Blob([new Uint8Array(savedBytes) as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const baseName = file?.name.replace(/\.pdf$/i, '') || 'rotated';
      link.download = `${baseName}_rotated.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setProgress(100);
    } catch (err: any) {
      const message = err?.message || 'Failed to apply rotation. Please try again.';
      setError(message);
    } finally {
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    }
  }, [pages, file]);

  /* ─── Clear ─── */
  const clearAll = () => {
    setFile(null);
    setPages([]);
    setTotalPages(0);
    setSelectedPages(new Set());
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
            <RotateCw size={28} className={isDragging ? 'text-primary' : 'text-red-400'} />
          </div>
          <p className="text-[15px] font-semibold text-dark">
            Drop a PDF here to rotate pages
          </p>
          <p className="mt-1 text-sm text-muted">
            Upload one PDF — then rotate individual pages or all pages at once
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

      {/* Bulk Actions */}
      <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-card space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={selectAll} className="text-[12px] font-semibold text-primary hover:underline">
            Select All
          </button>
          <span className="text-muted">·</span>
          <button type="button" onClick={deselectAll} className="text-[12px] font-semibold text-primary hover:underline">
            Deselect All
          </button>
          <span className="ml-auto text-[12px] text-muted">
            {selectedPages.size} of {totalPages} selected
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-semibold text-muted uppercase tracking-wider">Rotate All:</span>
          <button
            type="button"
            onClick={() => rotateAll(90)}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-[12px] font-semibold text-dark hover:bg-gray-50 transition-colors"
          >
            <RotateCw size={12} /> 90° CW
          </button>
          <button
            type="button"
            onClick={() => rotateAll(-90)}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-[12px] font-semibold text-dark hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={12} /> 90° CCW
          </button>
          <button
            type="button"
            onClick={() => rotateAll(180)}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-[12px] font-semibold text-dark hover:bg-gray-50 transition-colors"
          >
            <RotateCw size={12} /> 180°
          </button>
        </div>

        {selectedPages.size > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/40">
            <span className="text-[12px] font-semibold text-muted uppercase tracking-wider">
              Rotate Selected ({selectedPages.size}):
            </span>
            <button
              type="button"
              onClick={() => rotateSelected(90)}
              className="inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary-bg/30 px-3 py-1.5 text-[12px] font-semibold text-primary hover:bg-primary-bg/60 transition-colors"
            >
              <RotateCw size={12} /> 90° CW
            </button>
            <button
              type="button"
              onClick={() => rotateSelected(-90)}
              className="inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary-bg/30 px-3 py-1.5 text-[12px] font-semibold text-primary hover:bg-primary-bg/60 transition-colors"
            >
              <RotateCcw size={12} /> 90° CCW
            </button>
            <button
              type="button"
              onClick={() => rotateSelected(180)}
              className="inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary-bg/30 px-3 py-1.5 text-[12px] font-semibold text-primary hover:bg-primary-bg/60 transition-colors"
            >
              <RotateCw size={12} /> 180°
            </button>
          </div>
        )}
      </div>

      {/* Page Grid */}
      <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-card">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {pages.map((page) => {
            const isSelected = selectedPages.has(page.pageNumber);

            return (
              <motion.div
                key={page.pageNumber}
                className={`relative rounded-xl border-2 overflow-hidden transition-all ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 shadow-md'
                    : 'border-border/40 hover:border-border'
                }`}
              >
                {/* Thumbnail with rotation preview */}
                <button
                  type="button"
                  onClick={() => togglePage(page.pageNumber)}
                  className="w-full cursor-pointer"
                >
                  <div className="flex items-center justify-center p-2 min-h-[120px]">
                    <img
                      src={page.thumbnailUrl}
                      alt={`Page ${page.pageNumber}`}
                      className="max-w-full max-h-full transition-transform duration-300"
                      style={{ transform: `rotate(${page.rotation}deg)` }}
                    />
                  </div>
                </button>

                {/* Page info + rotation controls */}
                <div className="border-t border-border/40 bg-gray-50/50 px-2 py-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-muted">
                      P{page.pageNumber}
                      {page.rotation !== 0 && (
                        <span className="ml-1 text-primary">{page.rotation}°</span>
                      )}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => rotatePage(page.pageNumber, -90)}
                        className="p-1 rounded hover:bg-gray-200 transition-colors"
                        title="Rotate 90° CCW"
                      >
                        <RotateCcw size={11} className="text-muted" />
                      </button>
                      <button
                        type="button"
                        onClick={() => rotatePage(page.pageNumber, 90)}
                        className="p-1 rounded hover:bg-gray-200 transition-colors"
                        title="Rotate 90° CW"
                      >
                        <RotateCw size={11} className="text-muted" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected overlay */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-primary grid place-items-center shadow-sm"
                  >
                    <CheckSquare size={11} className="text-white" />
                  </motion.div>
                )}
              </motion.div>
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
              Applying rotations... {progress}%
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {pages.filter((p) => p.rotation !== 0).length} page{pages.filter((p) => p.rotation !== 0).length !== 1 ? 's' : ''} rotated
          </p>
          <button
            type="button"
            onClick={handleApply}
            disabled={processing}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Applying...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Download size={16} />
                Apply & Download
              </span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
