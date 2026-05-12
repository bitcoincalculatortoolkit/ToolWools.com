'use client';

/**
 * PdfCompressor — Real PDF compression via pdfjs-dist + pdf-lib.
 *
 * Strategy: Re-render each page to canvas at a configurable DPI,
 * export as JPEG at a chosen quality, then re-assemble into a new PDF
 * with pdf-lib. This produces genuinely smaller files — images get
 * re-encoded at lower quality/resolution and vector content is rasterized.
 *
 * 100% client-side. No upload, no server, no signup.
 */

import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Download,
  FileDown,
  Loader2,
  Settings2,
  Shield,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

/* ─── Constants ─── */
const PDFJS_VERSION = '4.8.69';
const PDFJS_WORKER_SRC = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

type CompressionLevel = 'low' | 'medium' | 'high';

interface CompressionConfig {
  dpi: number;
  quality: number;
  label: string;
  desc: string;
}

const COMPRESSION_PRESETS: Record<CompressionLevel, CompressionConfig> = {
  low: { dpi: 150, quality: 0.85, label: 'Low', desc: '~20-40% smaller' },
  medium: { dpi: 120, quality: 0.65, label: 'Medium', desc: '~40-60% smaller' },
  high: { dpi: 96, quality: 0.45, label: 'High', desc: '~60-80% smaller' },
};

interface PdfFile {
  id: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  savings: number;
  file: File;
  status: 'pending' | 'compressing' | 'done' | 'error' | 'cancelled';
  error?: string;
  progress: number;
  progressLabel?: string;
  compressedBlob?: Blob;
}

export function PdfCompressor() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [compression, setCompression] = useState<CompressionLevel>('medium');
  const [isDragging, setIsDragging] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Advanced options (initialized from preset)
  const [customDpi, setCustomDpi] = useState(COMPRESSION_PRESETS.medium.dpi);
  const [customQuality, setCustomQuality] = useState(COMPRESSION_PRESETS.medium.quality);
  const [grayscale, setGrayscale] = useState(false);
  const [stripMetadata, setStripMetadata] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef<Set<string>>(new Set());

  // Sync advanced options when compression level changes
  useEffect(() => {
    const preset = COMPRESSION_PRESETS[compression];
    setCustomDpi(preset.dpi);
    setCustomQuality(preset.quality);
  }, [compression]);

  /* ─── Helpers ─── */
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const updateFile = (id: string, updates: Partial<PdfFile>) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  /* ─── Compression engine ─── */
  const compressOne = useCallback(
    async (pdfFile: PdfFile) => {
      const fileId = pdfFile.id;
      updateFile(fileId, { status: 'compressing', progress: 0, progressLabel: 'Loading PDF...' });

      try {
        // Dynamic imports
        const pdfjsLib = await import('pdfjs-dist');
        const { PDFDocument } = await import('pdf-lib');

        pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;

        // Read file bytes
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);

        // Load with pdfjs for rendering
        const loadingTask = pdfjsLib.getDocument({ data: uint8 });
        const pdfDoc = await loadingTask.promise;
        const numPages = pdfDoc.numPages;

        // Create new PDF with pdf-lib
        const newPdf = await PDFDocument.create();

        if (stripMetadata) {
          newPdf.setTitle('');
          newPdf.setAuthor('');
          newPdf.setSubject('');
          newPdf.setKeywords([]);
          newPdf.setProducer('');
          newPdf.setCreator('');
        }

        // Process each page
        for (let i = 1; i <= numPages; i++) {
          // Check for cancellation
          if (cancelRef.current.has(fileId)) {
            cancelRef.current.delete(fileId);
            updateFile(fileId, { status: 'cancelled', progress: 0, progressLabel: undefined });
            return;
          }

          const progressPct = Math.round(((i - 1) / numPages) * 100);
          updateFile(fileId, {
            progress: progressPct,
            progressLabel: `Processing page ${i} of ${numPages}...`,
          });

          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 1 });

          // Calculate canvas dimensions from DPI
          // PDF points are 72/inch, so scale = targetDPI / 72
          const scale = customDpi / 72;
          const scaledViewport = page.getViewport({ scale });

          // Render to canvas
          const canvas = document.createElement('canvas');
          canvas.width = scaledViewport.width;
          canvas.height = scaledViewport.height;
          const ctx = canvas.getContext('2d')!;

          if (grayscale) {
            ctx.filter = 'grayscale(100%)';
          }

          await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

          // Convert canvas to JPEG blob
          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
              (b) => {
                if (b) resolve(b);
                else reject(new Error('Canvas toBlob failed'));
              },
              'image/jpeg',
              customQuality
            );
          });

          // Embed the JPEG into pdf-lib
          const jpegBytes = new Uint8Array(await blob.arrayBuffer());
          const image = await newPdf.embedJpg(jpegBytes);

          // Add page with original dimensions (in PDF points)
          const newPage = newPdf.addPage([viewport.width, viewport.height]);
          newPage.drawImage(image, {
            x: 0,
            y: 0,
            width: viewport.width,
            height: viewport.height,
          });

          // Clean up
          canvas.width = 0;
          canvas.height = 0;
        }

        // Final cancellation check
        if (cancelRef.current.has(fileId)) {
          cancelRef.current.delete(fileId);
          updateFile(fileId, { status: 'cancelled', progress: 0, progressLabel: undefined });
          return;
        }

        updateFile(fileId, { progress: 95, progressLabel: 'Saving compressed PDF...' });

        // Save
        const savedBytes = await newPdf.save();
        const compressedBlob = new Blob([savedBytes.buffer], { type: 'application/pdf' });
        const compressedSize = compressedBlob.size;
        const savings = ((pdfFile.originalSize - compressedSize) / pdfFile.originalSize) * 100;

        updateFile(fileId, {
          status: 'done',
          progress: 100,
          compressedSize,
          savings: Math.max(savings, 0),
          compressedBlob,
          progressLabel: undefined,
        });
      } catch (err: any) {
        const message =
          err?.message?.includes('password') || err?.name === 'PasswordException'
            ? 'Password-protected PDF — cannot compress'
            : err?.message || 'Failed to compress PDF';
        updateFile(fileId, { status: 'error', error: message, progress: 0, progressLabel: undefined });
      }
    },
    [customDpi, customQuality, grayscale, stripMetadata]
  );

  /* ─── File handling ─── */
  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const remaining = 5 - files.length;
      if (remaining <= 0) return;
      const selectedFiles = Array.from(fileList).slice(0, remaining);

      const newFiles: PdfFile[] = selectedFiles.map((file) => {
        const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        return {
          id,
          name: file.name,
          originalSize: file.size,
          compressedSize: 0,
          savings: 0,
          file,
          status: isPdf ? ('pending' as const) : ('error' as const),
          error: isPdf ? undefined : 'Not a valid PDF file',
          progress: 0,
        };
      });

      setFiles((prev) => [...prev, ...newFiles]);
    },
    [files.length]
  );

  const compressAll = async () => {
    const pending = files.filter((f) => f.status === 'pending');
    for (const file of pending) {
      await compressOne(file);
    }
  };

  const cancelCompression = (id: string) => {
    cancelRef.current.add(id);
  };

  const handleDownload = (file: PdfFile) => {
    if (!file.compressedBlob) return;
    const url = URL.createObjectURL(file.compressedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed_${file.name}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    const doneFiles = files.filter((f) => f.status === 'done' && f.compressedBlob);
    doneFiles.forEach((f) => handleDownload(f));
  };

  const removeFile = (id: string) => {
    cancelRef.current.add(id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    files.forEach((f) => cancelRef.current.add(f.id));
    setFiles([]);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  /* ─── Derived state ─── */
  const hasPendingFiles = files.some((f) => f.status === 'pending');
  const isCompressing = files.some((f) => f.status === 'compressing');
  const doneFiles = files.filter((f) => f.status === 'done');
  const totalOriginal = doneFiles.reduce((s, f) => s + f.originalSize, 0);
  const totalCompressed = doneFiles.reduce((s, f) => s + f.compressedSize, 0);
  const totalSavings = totalOriginal > 0 ? ((totalOriginal - totalCompressed) / totalOriginal) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* ─── Privacy Banner ─── */}
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-4 py-3">
        <Shield size={18} className="text-green-600 flex-shrink-0" />
        <p className="text-[13px] text-green-800 font-medium">
          Your files never leave your browser — all compression happens locally on your device.
        </p>
      </div>

      {/* ─── Compression Level Selector ─── */}
      <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-card">
        <label className="text-sm font-semibold text-dark mb-3 block">
          Compression Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(COMPRESSION_PRESETS) as [CompressionLevel, CompressionConfig][]).map(
            ([level, config]) => (
              <button
                key={level}
                type="button"
                onClick={() => setCompression(level)}
                className={`rounded-xl px-4 py-3 text-center transition-all ${
                  compression === level
                    ? 'bg-primary text-white shadow-sm btn-glow'
                    : 'bg-gray-50 text-body border border-border hover:border-primary/40'
                }`}
              >
                <p className="text-sm font-semibold">{config.label}</p>
                <p
                  className={`text-[11px] mt-0.5 ${
                    compression === level ? 'text-white/80' : 'text-muted'
                  }`}
                >
                  {config.desc}
                </p>
              </button>
            )
          )}
        </div>
      </div>

      {/* ─── Advanced Options ─── */}
      <div className="rounded-2xl border border-border/60 bg-white shadow-card overflow-hidden">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-dark hover:bg-gray-50/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Settings2 size={16} className="text-muted" />
            Advanced Options
          </span>
          <ChevronDown
            size={16}
            className={`text-muted transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-5 border-t border-border/40 pt-4">
                {/* DPI Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[13px] font-medium text-dark">
                      Render DPI
                    </label>
                    <span className="text-[12px] font-mono text-muted bg-gray-100 px-2 py-0.5 rounded">
                      {customDpi} DPI
                    </span>
                  </div>
                  <input
                    type="range"
                    min={72}
                    max={300}
                    step={1}
                    value={customDpi}
                    onChange={(e) => setCustomDpi(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-[11px] text-muted mt-1">
                    <span>72 (smallest)</span>
                    <span>300 (highest quality)</span>
                  </div>
                </div>

                {/* JPEG Quality Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[13px] font-medium text-dark">
                      JPEG Quality
                    </label>
                    <span className="text-[12px] font-mono text-muted bg-gray-100 px-2 py-0.5 rounded">
                      {customQuality.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={1}
                    value={Math.round(customQuality * 100)}
                    onChange={(e) => setCustomQuality(Number(e.target.value) / 100)}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-[11px] text-muted mt-1">
                    <span>0.10 (max compression)</span>
                    <span>1.00 (lossless)</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={grayscale}
                      onChange={(e) => setGrayscale(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-[13px] text-body">
                      Convert to grayscale (extra size reduction)
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={stripMetadata}
                      onChange={(e) => setStripMetadata(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-[13px] text-body">
                      Strip metadata (title, author, keywords)
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Upload Drop Zone ─── */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
          isDragging
            ? 'border-primary bg-primary-bg/50 scale-[1.01]'
            : 'border-border hover:border-primary/40 hover:bg-primary-bg/20'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
          className="hidden"
        />
        <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-red-50 grid place-items-center">
          <Upload size={28} className={isDragging ? 'text-primary' : 'text-red-400'} />
        </div>
        <p className="text-[15px] font-semibold text-dark">
          Drop PDF files here or click to browse
        </p>
        <p className="mt-1 text-sm text-muted">PDF files only — up to 5 files at once</p>
        {files.length > 0 && (
          <p className="mt-2 text-xs text-muted">{files.length}/5 files added</p>
        )}
      </div>

      {/* ─── Batch Controls ─── */}
      {(hasPendingFiles || doneFiles.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3"
        >
          {hasPendingFiles && (
            <button
              type="button"
              onClick={compressAll}
              disabled={isCompressing}
              className="flex-1 sm:flex-none rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCompressing ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Compressing...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <FileDown size={16} />
                  Compress All ({files.filter((f) => f.status === 'pending').length})
                </span>
              )}
            </button>
          )}

          {doneFiles.length > 1 && (
            <button
              type="button"
              onClick={downloadAll}
              className="flex-1 sm:flex-none rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-dark hover:bg-gray-50 transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <Download size={16} />
                Download All
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={clearAll}
            className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
          >
            <span className="inline-flex items-center gap-2">
              <Trash2 size={14} />
              Clear
            </span>
          </button>
        </motion.div>
      )}

      {/* ─── File List ─── */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                layout
                className="rounded-2xl border border-border/60 bg-white p-4 shadow-card"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 flex-shrink-0">
                    <FileDown size={22} className="text-red-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-dark truncate">{file.name}</p>

                    {file.status === 'pending' && (
                      <p className="text-xs text-muted mt-1">
                        {formatSize(file.originalSize)} — Ready to compress
                      </p>
                    )}

                    {file.status === 'compressing' && (
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted flex items-center gap-1">
                          <Loader2 size={12} className="animate-spin" />
                          {file.progressLabel || `Compressing... ${Math.round(file.progress)}%`}
                        </p>
                      </div>
                    )}

                    {file.status === 'done' && (
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs">
                        <span className="text-muted">
                          {formatSize(file.originalSize)} → {formatSize(file.compressedSize)}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-green-700 font-semibold">
                          <CheckCircle2 size={11} />-{file.savings.toFixed(1)}%
                        </span>
                      </div>
                    )}

                    {file.status === 'cancelled' && (
                      <p className="mt-1 text-xs text-amber-600">Compression cancelled</p>
                    )}

                    {file.status === 'error' && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {file.error}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {file.status === 'compressing' && (
                      <button
                        type="button"
                        onClick={() => cancelCompression(file.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    {file.status === 'done' && (
                      <button
                        type="button"
                        onClick={() => handleDownload(file)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow"
                      >
                        <Download size={13} /> Download
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      aria-label="Remove file"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Stats Summary ─── */}
      {doneFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-border/60 bg-gradient-to-br from-white to-gray-50/80 p-5 shadow-card"
        >
          <p className="text-sm font-semibold text-dark mb-3 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600" />
            Compression Summary
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-wider text-muted font-medium">
                Original
              </p>
              <p className="text-lg font-bold text-dark mt-0.5">{formatSize(totalOriginal)}</p>
            </div>
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-wider text-muted font-medium">
                Compressed
              </p>
              <p className="text-lg font-bold text-primary mt-0.5">
                {formatSize(totalCompressed)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-wider text-muted font-medium">
                Saved
              </p>
              <p className="text-lg font-bold text-green-600 mt-0.5">
                {totalSavings.toFixed(1)}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
