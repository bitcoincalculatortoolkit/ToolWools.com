'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Download,
  Trash2,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

interface CompressedFile {
  id: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  savings: number;
  blob: Blob;
  previewUrl: string;
  status: 'compressing' | 'done' | 'error';
  error?: string;
}

export function ImageCompressor() {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [quality, setQuality] = useState(75);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compressImage = useCallback(
    async (file: File): Promise<CompressedFile> => {
      const id = Math.random().toString(36).slice(2);
      const result: CompressedFile = {
        id,
        name: file.name,
        originalSize: file.size,
        compressedSize: 0,
        savings: 0,
        blob: new Blob(),
        previewUrl: '',
        status: 'compressing',
      };

      return new Promise((resolve) => {
        const img = new window.Image();
        const reader = new FileReader();

        reader.onload = (e) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve({ ...result, status: 'error', error: 'Canvas not supported' });
              return;
            }
            ctx.drawImage(img, 0, 0);

            const mimeType = file.type === 'image/png' ? 'image/png' : file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve({ ...result, status: 'error', error: 'Compression failed' });
                  return;
                }
                const compressedSize = blob.size;
                const savings = Math.max(0, ((file.size - compressedSize) / file.size) * 100);
                resolve({
                  ...result,
                  compressedSize,
                  savings,
                  blob,
                  previewUrl: URL.createObjectURL(blob),
                  status: 'done',
                });
              },
              mimeType,
              quality / 100
            );
          };
          img.onerror = () => {
            resolve({ ...result, status: 'error', error: 'Could not read image' });
          };
          img.src = e.target?.result as string;
        };
        reader.onerror = () => {
          resolve({ ...result, status: 'error', error: 'Could not read file' });
        };
        reader.readAsDataURL(file);
      });
    },
    [quality]
  );

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList) return;
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const selectedFiles = Array.from(fileList)
        .filter((f) => validTypes.includes(f.type))
        .slice(0, 10 - files.length);

      if (selectedFiles.length === 0) return;

      // Add placeholder entries
      const placeholders: CompressedFile[] = selectedFiles.map((f) => ({
        id: Math.random().toString(36).slice(2),
        name: f.name,
        originalSize: f.size,
        compressedSize: 0,
        savings: 0,
        blob: new Blob(),
        previewUrl: '',
        status: 'compressing' as const,
      }));
      setFiles((prev) => [...prev, ...placeholders]);

      // Compress each
      for (let i = 0; i < selectedFiles.length; i++) {
        const compressed = await compressImage(selectedFiles[i]);
        setFiles((prev) =>
          prev.map((f) => (f.id === placeholders[i].id ? { ...compressed, id: f.id } : f))
        );
      }
    },
    [compressImage, files.length]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDownload = (file: CompressedFile) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file.blob);
    const ext = file.name.split('.').pop() || 'jpg';
    link.download = `compressed_${file.name.replace(/\.[^.]+$/, '')}.${ext}`;
    link.click();
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    files.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    setFiles([]);
  };

  return (
    <div className="space-y-6">
      {/* Quality Slider */}
      <div className="rounded-card border border-border/60 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-dark">
            Compression Quality
          </label>
          <span className="text-sm font-bold text-primary">{quality}%</span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between mt-1 text-[11px] text-muted">
          <span>Smaller file</span>
          <span>Better quality</span>
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
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <Upload
          size={40}
          className={`mx-auto mb-3 ${isDragging ? 'text-primary' : 'text-muted/40'}`}
        />
        <p className="text-[15px] font-semibold text-dark">
          Drop images here or click to browse
        </p>
        <p className="mt-1 text-sm text-muted">
          JPG, PNG, WEBP — up to 10 files
        </p>
        {files.length > 0 && (
          <p className="mt-2 text-xs text-muted">
            {files.length}/10 files added
          </p>
        )}
      </div>

      {/* Results */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {/* Summary bar */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-dark">
                {files.filter((f) => f.status === 'done').length} of {files.length} compressed
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear all
              </button>
            </div>

            {/* File cards */}
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-card border border-border/60 bg-white p-4 shadow-card"
              >
                <div className="flex items-center gap-4">
                  {/* Icon/Preview */}
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-bg flex-shrink-0">
                    <ImageIcon size={22} className="text-primary" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-dark truncate">
                      {file.name}
                    </p>
                    {file.status === 'compressing' && (
                      <div className="mt-2">
                        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: '90%' }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted flex items-center gap-1">
                          <Loader2 size={12} className="animate-spin" /> Compressing...
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

                  {/* Actions */}
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
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
