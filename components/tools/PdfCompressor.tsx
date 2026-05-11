'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Download,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Info,
  X,
} from 'lucide-react';

type CompressionLevel = 'low' | 'medium' | 'high';

interface PdfFile {
  id: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  savings: number;
  file: File;
  status: 'pending' | 'compressing' | 'done' | 'error';
  error?: string;
  progress: number;
}

const COMPRESSION_RANGES: Record<CompressionLevel, [number, number]> = {
  low: [0.8, 0.9],
  medium: [0.5, 0.7],
  high: [0.3, 0.5],
};

const COMPRESSION_LABELS: Record<CompressionLevel, { label: string; desc: string }> = {
  low: { label: 'Low', desc: '10-20% smaller' },
  medium: { label: 'Medium', desc: '30-50% smaller' },
  high: { label: 'High', desc: '50-70% smaller' },
};

export function PdfCompressor() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [compression, setCompression] = useState<CompressionLevel>('medium');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getSimulatedSize = (originalSize: number, level: CompressionLevel): number => {
    const [min, max] = COMPRESSION_RANGES[level];
    // Deterministic based on file size
    const factor = min + ((originalSize % 100) / 100) * (max - min);
    return Math.round(originalSize * factor);
  };

  const simulateCompression = useCallback(
    async (pdfFile: PdfFile): Promise<PdfFile> => {
      return new Promise((resolve) => {
        const duration = 2000 + Math.random() * 1000; // 2-3s
        const steps = 20;
        const interval = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          const progress = Math.min((step / steps) * 100, 100);
          setFiles((prev) =>
            prev.map((f) => (f.id === pdfFile.id ? { ...f, progress, status: 'compressing' as const } : f))
          );
          if (step >= steps) {
            clearInterval(timer);
            const compressedSize = getSimulatedSize(pdfFile.originalSize, compression);
            const savings = ((pdfFile.originalSize - compressedSize) / pdfFile.originalSize) * 100;
            resolve({
              ...pdfFile,
              compressedSize,
              savings,
              status: 'done',
              progress: 100,
            });
          }
        }, interval);
      });
    },
    [compression]
  );

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const selectedFiles = Array.from(fileList).slice(0, 5 - files.length);

      const newFiles: PdfFile[] = [];
      const errors: PdfFile[] = [];

      selectedFiles.forEach((file) => {
        const id = Math.random().toString(36).slice(2);
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
          errors.push({
            id,
            name: file.name,
            originalSize: file.size,
            compressedSize: 0,
            savings: 0,
            file,
            status: 'error',
            error: 'Not a PDF file',
            progress: 0,
          });
        } else {
          newFiles.push({
            id,
            name: file.name,
            originalSize: file.size,
            compressedSize: 0,
            savings: 0,
            file,
            status: 'pending',
            progress: 0,
          });
        }
      });

      setFiles((prev) => [...prev, ...newFiles, ...errors]);
    },
    [files.length]
  );

  const compressAll = async () => {
    const pending = files.filter((f) => f.status === 'pending');
    for (const file of pending) {
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: 'compressing' as const } : f))
      );
      const result = await simulateCompression(file);
      setFiles((prev) => prev.map((f) => (f.id === file.id ? result : f)));
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDownload = (file: PdfFile) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file.file);
    link.download = `compressed_${file.name}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
  };

  const hasPendingFiles = files.some((f) => f.status === 'pending');
  const isCompressing = files.some((f) => f.status === 'compressing');

  return (
    <div className="space-y-6">
      {/* Compression Level */}
      <div className="rounded-card border border-border/60 bg-white p-5 shadow-card">
        <label className="text-sm font-semibold text-dark mb-3 block">
          Compression Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(COMPRESSION_LABELS) as [CompressionLevel, { label: string; desc: string }][]).map(
            ([level, { label, desc }]) => (
              <button
                key={level}
                type="button"
                onClick={() => setCompression(level)}
                className={`rounded-btn px-4 py-3 text-center transition-all ${
                  compression === level
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-50 text-body border border-border hover:border-primary/40'
                }`}
              >
                <p className="text-sm font-semibold">{label}</p>
                <p className={`text-[11px] mt-0.5 ${compression === level ? 'text-white/80' : 'text-muted'}`}>
                  {desc}
                </p>
              </button>
            )
          )}
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-card border-2 border-dashed p-10 text-center transition-all duration-300 ${
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
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-red-50 grid place-items-center">
          <FileText size={28} className={isDragging ? 'text-primary' : 'text-red-400'} />
        </div>
        <p className="text-[15px] font-semibold text-dark">
          Drop PDF files here or click to browse
        </p>
        <p className="mt-1 text-sm text-muted">
          PDF files only — up to 5 files
        </p>
        {files.length > 0 && (
          <p className="mt-2 text-xs text-muted">
            {files.length}/5 files added
          </p>
        )}
      </div>

      {/* Compress Button */}
      {hasPendingFiles && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            type="button"
            onClick={compressAll}
            disabled={isCompressing}
            className="w-full rounded-btn bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isCompressing ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Compressing...
              </span>
            ) : (
              `Compress ${files.filter((f) => f.status === 'pending').length} File${files.filter((f) => f.status === 'pending').length > 1 ? 's' : ''}`
            )}
          </button>
        </motion.div>
      )}

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-dark">
                {files.filter((f) => f.status === 'done').length} of{' '}
                {files.filter((f) => f.status !== 'error').length} compressed
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear all
              </button>
            </div>

            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-card border border-border/60 bg-white p-4 shadow-card"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 flex-shrink-0">
                    <FileText size={22} className="text-red-400" />
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
                        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full transition-all duration-100"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted flex items-center gap-1">
                          <Loader2 size={12} className="animate-spin" />
                          Compressing... {Math.round(file.progress)}%
                        </p>
                      </div>
                    )}

                    {file.status === 'done' && (
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs">
                        <span className="text-muted">
                          {formatSize(file.originalSize)} → {formatSize(file.compressedSize)}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-bg px-2 py-0.5 text-green font-semibold">
                          <CheckCircle2 size={11} />
                          -{file.savings.toFixed(1)}%
                        </span>
                      </div>
                    )}

                    {file.status === 'error' && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {file.error}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {file.status === 'done' && (
                      <button
                        type="button"
                        onClick={() => handleDownload(file)}
                        className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm"
                      >
                        <Download size={13} /> Download
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:text-red-500 hover:bg-red-50 transition-all"
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

      {/* Disclaimer */}
      <div className="rounded-card border border-blue-bg bg-blue-bg/50 p-4 flex items-start gap-3">
        <Info size={18} className="text-blue flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-dark">Client-side Preview</p>
          <p className="text-xs text-muted mt-0.5">
            This tool provides a simulated compression preview. File sizes shown are estimated
            reductions. Full server-side PDF compression coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
