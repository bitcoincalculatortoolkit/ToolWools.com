'use client';

/**
 * MergePdf — Merge multiple PDF files into one document.
 *
 * Uses pdf-lib for merging and pdfjs-dist for thumbnail rendering.
 * Drag-to-reorder via pointer events (no external library).
 * 100% client-side. No upload, no server, no signup.
 */

import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Combine,
  Download,
  FileText,
  GripVertical,
  Loader2,
  Shield,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

/* ─── Constants ─── */
const PDFJS_VERSION = '4.8.69';
const PDFJS_WORKER_SRC = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;
const MAX_FILES = 10;

interface PdfFileItem {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  thumbnailUrl: string | null;
  file: File;
  error?: string;
}

export function MergePdf() {
  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [merging, setMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [outputName, setOutputName] = useState('merged.pdf');
  const [error, setError] = useState<string | null>(null);

  // Drag reorder state
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  /* ─── Helpers ─── */
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0);

  /* ─── Load PDF info + thumbnail ─── */
  const loadPdfInfo = useCallback(async (file: File): Promise<PdfFileItem> => {
    const id = uid();
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const pageCount = pdfDoc.numPages;

      // Render first page as thumbnail
      let thumbnailUrl: string | null = null;
      try {
        const page = await pdfDoc.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const thumbScale = 120 / viewport.width;
        const thumbVp = page.getViewport({ scale: thumbScale });
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(thumbVp.width);
        canvas.height = Math.floor(thumbVp.height);
        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport: thumbVp }).promise;
        thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
        canvas.width = 0;
        canvas.height = 0;
      } catch {
        // Thumbnail generation failed, continue without it
      }

      return { id, name: file.name, size: file.size, pageCount, thumbnailUrl, file };
    } catch (err: any) {
      const message =
        err?.message?.includes('password') || err?.name === 'PasswordException'
          ? 'Password-protected PDF'
          : 'Failed to read PDF';
      return { id, name: file.name, size: file.size, pageCount: 0, thumbnailUrl: null, file, error: message };
    }
  }, []);

  /* ─── File handling ─── */
  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList) return;
      setError(null);
      const remaining = MAX_FILES - files.length;
      if (remaining <= 0) {
        setError(`Maximum ${MAX_FILES} files allowed.`);
        return;
      }

      const selectedFiles = Array.from(fileList)
        .filter((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))
        .slice(0, remaining);

      if (selectedFiles.length === 0) {
        setError('Please select PDF files only.');
        return;
      }

      const newItems = await Promise.all(selectedFiles.map((f) => loadPdfInfo(f)));
      setFiles((prev) => [...prev, ...newItems]);
    },
    [files.length, loadPdfInfo]
  );

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
    setError(null);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  /* ─── Drag reorder ─── */
  const handleReorderStart = (index: number) => {
    setDragIndex(index);
  };

  const handleReorderOver = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    setOverIndex(index);
  };

  const handleReorderEnd = () => {
    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      setFiles((prev) => {
        const newList = [...prev];
        const [removed] = newList.splice(dragIndex, 1);
        newList.splice(overIndex, 0, removed);
        return newList;
      });
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  /* ─── Merge ─── */
  const handleMerge = useCallback(async () => {
    const validFiles = files.filter((f) => !f.error);
    if (validFiles.length < 2) {
      setError('Please add at least 2 PDF files to merge.');
      return;
    }

    setMerging(true);
    setProgress(0);
    setProgressLabel('Starting merge...');
    setError(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < validFiles.length; i++) {
        const item = validFiles[i];
        setProgressLabel(`Processing ${item.name} (${i + 1}/${validFiles.length})...`);
        setProgress(Math.round((i / validFiles.length) * 90));

        const arrayBuffer = await item.file.arrayBuffer();
        const sourcePdf = await PDFDocument.load(arrayBuffer);
        const pageIndices = sourcePdf.getPageIndices();
        const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices);
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      setProgressLabel('Saving merged PDF...');
      setProgress(95);

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = outputName || 'merged.pdf';
      link.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      setProgressLabel('Done! Download started.');
    } catch (err: any) {
      const message =
        err?.message?.includes('password') || err?.name === 'PasswordException'
          ? 'One or more PDFs are password-protected and cannot be merged.'
          : err?.message || 'Failed to merge PDFs. Please try again.';
      setError(message);
    } finally {
      setTimeout(() => {
        setMerging(false);
        setProgress(0);
        setProgressLabel('');
      }, 2000);
    }
  }, [files, outputName]);

  /* ─── Render ─── */
  return (
    <div className="space-y-6">
      {/* ─── Privacy Banner ─── */}
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-4 py-3">
        <Shield size={18} className="text-green-600 flex-shrink-0" />
        <p className="text-[13px] text-green-800 font-medium">
          Files processed locally — never uploaded. Your documents stay private on your device.
        </p>
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
        <p className="mt-1 text-sm text-muted">Up to {MAX_FILES} PDF files — drag to reorder after adding</p>
        {files.length > 0 && (
          <p className="mt-2 text-xs text-muted">{files.length}/{MAX_FILES} files added</p>
        )}
      </div>

      {/* ─── Error ─── */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
        >
          {error}
        </motion.div>
      )}

      {/* ─── File List ─── */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between px-1 mb-2">
              <p className="text-sm font-semibold text-dark">
                {files.length} file{files.length !== 1 ? 's' : ''} · {totalPages} page{totalPages !== 1 ? 's' : ''} total
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={13} /> Clear all
              </button>
            </div>

            {files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: dragIndex === index ? 1.02 : 1,
                  boxShadow: dragIndex === index ? '0 8px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.04)',
                }}
                exit={{ opacity: 0, x: 20 }}
                layout
                className={`rounded-2xl border bg-white p-3 transition-colors ${
                  overIndex === index && dragIndex !== null
                    ? 'border-primary bg-primary-bg/20'
                    : 'border-border/60'
                } ${file.error ? 'opacity-60' : ''}`}
                draggable
                onDragStart={() => handleReorderStart(index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  handleReorderOver(index);
                }}
                onDragEnd={handleReorderEnd}
              >
                <div className="flex items-center gap-3">
                  {/* Drag handle */}
                  <div className="cursor-grab active:cursor-grabbing text-muted hover:text-dark transition-colors flex-shrink-0">
                    <GripVertical size={18} />
                  </div>

                  {/* Thumbnail */}
                  <div className="h-12 w-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-border/40">
                    {file.thumbnailUrl ? (
                      <img
                        src={file.thumbnailUrl}
                        alt={`Page 1 of ${file.name}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center">
                        <FileText size={16} className="text-muted" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-dark truncate">{file.name}</p>
                    {file.error ? (
                      <p className="text-xs text-red-500 mt-0.5">{file.error}</p>
                    ) : (
                      <p className="text-xs text-muted mt-0.5">
                        {file.pageCount} page{file.pageCount !== 1 ? 's' : ''} · {formatSize(file.size)}
                      </p>
                    )}
                  </div>

                  {/* Order badge */}
                  <span className="text-[11px] font-bold text-muted bg-gray-100 rounded-full h-6 w-6 grid place-items-center flex-shrink-0">
                    {index + 1}
                  </span>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                    aria-label="Remove file"
                  >
                    <X size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Merge Controls ─── */}
      {files.filter((f) => !f.error).length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border/60 bg-white p-5 shadow-card space-y-4"
        >
          {/* Output filename */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-[12px] font-semibold text-muted uppercase tracking-wider flex-shrink-0">
              Output filename
            </label>
            <input
              type="text"
              value={outputName}
              onChange={(e) => setOutputName(e.target.value)}
              className="flex-1 min-w-[180px] rounded-lg border border-border bg-white px-3 py-2 text-[13.5px] font-medium text-dark focus:outline-none focus:border-primary"
              spellCheck={false}
            />
          </div>

          {/* Progress bar */}
          {merging && (
            <div>
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
                {progressLabel}
              </p>
            </div>
          )}

          {/* Merge button */}
          <button
            type="button"
            onClick={handleMerge}
            disabled={merging}
            className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {merging ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Merging...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Combine size={16} />
                Merge {files.filter((f) => !f.error).length} PDFs into one ({totalPages} pages)
              </span>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}
