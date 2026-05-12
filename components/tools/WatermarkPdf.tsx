'use client';

/**
 * WatermarkPdf — Add text or image watermarks to PDF pages.
 *
 * Uses pdf-lib for watermarking and pdfjs-dist for preview rendering.
 * 100% client-side. No upload, no server, no signup.
 */

import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Image as ImageIcon,
  Loader2,
  Shield,
  Stamp,
  Type,
  Upload,
  X,
} from 'lucide-react';

/* ─── Constants ─── */
const PDFJS_VERSION = '4.8.69';
const PDFJS_WORKER_SRC = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

type WatermarkType = 'text' | 'image';
type Position = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface WatermarkConfig {
  type: WatermarkType;
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  rotation: number;
  position: Position;
  imageData: string | null;
  imageScale: number;
  applyTo: 'all' | 'specific';
  specificPages: string;
}

export function WatermarkPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [config, setConfig] = useState<WatermarkConfig>({
    type: 'text',
    text: 'CONFIDENTIAL',
    fontSize: 60,
    color: '#9CA3AF',
    opacity: 0.3,
    rotation: -45,
    position: 'center',
    imageData: null,
    imageScale: 50,
    applyTo: 'all',
    specificPages: '',
  });

  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfBytesRef = useRef<ArrayBuffer | null>(null);

  /* ─── Load PDF + preview ─── */
  const handleFile = useCallback(async (selected: File) => {
    setError(null);
    setFile(selected);
    setPreviewUrl(null);
    setTotalPages(0);
    setLoading(true);

    try {
      const arrayBuffer = await selected.arrayBuffer();
      pdfBytesRef.current = arrayBuffer.slice(0);

      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;

      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      setTotalPages(pdfDoc.numPages);

      // Render first page as preview
      const page = await pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const previewScale = 400 / viewport.width;
      const previewVp = page.getViewport({ scale: previewScale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.floor(previewVp.width);
      canvas.height = Math.floor(previewVp.height);
      const ctx = canvas.getContext('2d')!;
      await page.render({ canvasContext: ctx, viewport: previewVp }).promise;
      setPreviewUrl(canvas.toDataURL('image/jpeg', 0.8));
      canvas.width = 0;
      canvas.height = 0;
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

  /* ─── Image upload for watermark ─── */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setConfig((prev) => ({ ...prev, imageData: reader.result as string }));
    };
    reader.readAsDataURL(f);
    e.target.value = '';
  };

  /* ─── Parse page string ─── */
  const parsePages = (input: string): number[] => {
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

  /* ─── hex to rgb ─── */
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16) / 255, g: parseInt(result[2], 16) / 255, b: parseInt(result[3], 16) / 255 }
      : { r: 0.61, g: 0.64, b: 0.69 };
  };

  /* ─── Apply watermark ─── */
  const handleApply = useCallback(async () => {
    if (!pdfBytesRef.current) return;

    if (config.type === 'text' && !config.text.trim()) {
      setError('Please enter watermark text.');
      return;
    }
    if (config.type === 'image' && !config.imageData) {
      setError('Please upload a watermark image.');
      return;
    }

    setError(null);
    setProcessing(true);
    setProgress(0);

    try {
      const { PDFDocument, rgb, degrees } = await import('pdf-lib');
      setProgress(15);

      const pdfDoc = await PDFDocument.load(pdfBytesRef.current);
      const allPages = pdfDoc.getPages();
      setProgress(30);

      // Determine which pages to watermark
      let targetIndices: number[];
      if (config.applyTo === 'all') {
        targetIndices = allPages.map((_, i) => i);
      } else {
        const parsed = parsePages(config.specificPages);
        if (parsed.length === 0) {
          setError('Please enter valid page numbers.');
          setProcessing(false);
          return;
        }
        targetIndices = parsed.map((p) => p - 1);
      }

      if (config.type === 'text') {
        const color = hexToRgb(config.color);

        for (let idx = 0; idx < targetIndices.length; idx++) {
          const page = allPages[targetIndices[idx]];
          const { width, height } = page.getSize();

          // Calculate position
          let x = width / 2;
          let y = height / 2;
          if (config.position === 'top-left') { x = width * 0.15; y = height * 0.85; }
          else if (config.position === 'top-right') { x = width * 0.85; y = height * 0.85; }
          else if (config.position === 'bottom-left') { x = width * 0.15; y = height * 0.15; }
          else if (config.position === 'bottom-right') { x = width * 0.85; y = height * 0.15; }

          page.drawText(config.text, {
            x: x - (config.text.length * config.fontSize * 0.3),
            y,
            size: config.fontSize,
            color: rgb(color.r, color.g, color.b),
            opacity: config.opacity,
            rotate: degrees(config.rotation),
          });

          setProgress(30 + Math.round((idx / targetIndices.length) * 55));
        }
      } else if (config.type === 'image' && config.imageData) {
        // Embed image
        let embeddedImage;
        if (config.imageData.includes('image/png')) {
          const base64 = config.imageData.split(',')[1];
          const imageBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
          embeddedImage = await pdfDoc.embedPng(imageBytes);
        } else {
          const base64 = config.imageData.split(',')[1];
          const imageBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
          embeddedImage = await pdfDoc.embedJpg(imageBytes);
        }

        for (let idx = 0; idx < targetIndices.length; idx++) {
          const page = allPages[targetIndices[idx]];
          const { width, height } = page.getSize();

          const imgWidth = width * (config.imageScale / 100);
          const imgHeight = (embeddedImage.height / embeddedImage.width) * imgWidth;

          let x = (width - imgWidth) / 2;
          let y = (height - imgHeight) / 2;
          if (config.position === 'top-left') { x = 20; y = height - imgHeight - 20; }
          else if (config.position === 'top-right') { x = width - imgWidth - 20; y = height - imgHeight - 20; }
          else if (config.position === 'bottom-left') { x = 20; y = 20; }
          else if (config.position === 'bottom-right') { x = width - imgWidth - 20; y = 20; }

          page.drawImage(embeddedImage, {
            x,
            y,
            width: imgWidth,
            height: imgHeight,
            opacity: config.opacity,
          });

          setProgress(30 + Math.round((idx / targetIndices.length) * 55));
        }
      }

      setProgress(90);
      const savedBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(savedBytes) as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const baseName = file?.name.replace(/\.pdf$/i, '') || 'watermarked';
      link.download = `${baseName}_watermarked.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setProgress(100);
    } catch (err: any) {
      const message = err?.message || 'Failed to apply watermark. Please try again.';
      setError(message);
    } finally {
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    }
  }, [config, file, totalPages]);

  /* ─── Clear ─── */
  const clearAll = () => {
    setFile(null);
    setPreviewUrl(null);
    setTotalPages(0);
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

  /* ─── Get watermark overlay style for preview ─── */
  const getPreviewOverlayStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      pointerEvents: 'none',
      opacity: config.opacity,
      transform: `rotate(${config.rotation}deg)`,
    };

    if (config.position === 'center') {
      return { ...base, top: '50%', left: '50%', marginTop: '-20px', marginLeft: '-40%' };
    }
    if (config.position === 'top-left') { return { ...base, top: '10%', left: '10%' }; }
    if (config.position === 'top-right') { return { ...base, top: '10%', right: '10%' }; }
    if (config.position === 'bottom-left') { return { ...base, bottom: '10%', left: '10%' }; }
    return { ...base, bottom: '10%', right: '10%' };
  };

  /* ─── Upload Zone ─── */
  if (!file || loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-4 py-3">
          <Shield size={18} className="text-green-600 flex-shrink-0" />
          <p className="text-[13px] text-green-800 font-medium">
            Files processed locally — never uploaded. Your documents stay private on your device.
          </p>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !loading && inputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 md:p-16 text-center transition-all duration-300 ${
            isDragging ? 'border-primary bg-primary-bg/50 scale-[1.01]' : 'border-border hover:border-primary/40 hover:bg-primary-bg/20'
          } ${loading ? 'pointer-events-none' : ''}`}
        >
          <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} className="hidden" />
          <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-red-50 grid place-items-center">
            <Stamp size={28} className={isDragging ? 'text-primary' : 'text-red-400'} />
          </div>
          <p className="text-[15px] font-semibold text-dark">Drop a PDF here to add watermark</p>
          <p className="mt-1 text-sm text-muted">Upload one PDF — then configure your text or image watermark</p>
          {loading && (
            <div className="mt-6"><Loader2 size={24} className="animate-spin mx-auto text-primary" /></div>
          )}
        </div>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</div>}
      </div>
    );
  }

  /* ─── Main UI ─── */
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-4 py-3">
        <div className="flex items-center gap-2 text-[13px]">
          <Shield size={15} className="text-green-600" />
          <span className="font-semibold text-dark">Files processed locally — never uploaded.</span>
          <span className="hidden sm:inline text-muted">{file.name} · {totalPages} page{totalPages !== 1 ? 's' : ''}</span>
        </div>
        <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold text-muted hover:bg-red-50 hover:text-red-600 transition-colors">
          <X size={14} /> Close document
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Configuration */}
        <div className="space-y-4">
          {/* Watermark Type Tabs */}
          <div className="rounded-2xl border border-border/60 bg-white shadow-card overflow-hidden">
            <div className="flex border-b border-border/40">
              <button type="button" onClick={() => setConfig((p) => ({ ...p, type: 'text' }))} className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-[13px] font-semibold transition-colors border-b-2 ${config.type === 'text' ? 'text-primary border-primary bg-primary-bg/30' : 'text-muted border-transparent hover:text-dark hover:bg-gray-50/50'}`}>
                <Type size={14} /> Text
              </button>
              <button type="button" onClick={() => setConfig((p) => ({ ...p, type: 'image' }))} className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-[13px] font-semibold transition-colors border-b-2 ${config.type === 'image' ? 'text-primary border-primary bg-primary-bg/30' : 'text-muted border-transparent hover:text-dark hover:bg-gray-50/50'}`}>
                <ImageIcon size={14} /> Image
              </button>
            </div>

            <div className="p-4 space-y-4">
              {config.type === 'text' ? (
                <>
                  <div>
                    <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Watermark Text</label>
                    <input type="text" value={config.text} onChange={(e) => setConfig((p) => ({ ...p, text: e.target.value }))} placeholder="e.g. CONFIDENTIAL, DRAFT" className="w-full rounded-lg border border-border px-3 py-2.5 text-[14px] focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Font Size: {config.fontSize}pt</label>
                    <input type="range" min={24} max={120} value={config.fontSize} onChange={(e) => setConfig((p) => ({ ...p, fontSize: parseInt(e.target.value) }))} className="w-full accent-primary" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Color</label>
                      <input type="color" value={config.color} onChange={(e) => setConfig((p) => ({ ...p, color: e.target.value }))} className="h-9 w-full rounded-lg border border-border cursor-pointer" />
                    </div>
                    <div className="flex-1">
                      <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Rotation: {config.rotation}°</label>
                      <input type="range" min={-90} max={90} value={config.rotation} onChange={(e) => setConfig((p) => ({ ...p, rotation: parseInt(e.target.value) }))} className="w-full accent-primary" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Watermark Image</label>
                    <button type="button" onClick={() => imageInputRef.current?.click()} className="w-full rounded-lg border-2 border-dashed border-border px-4 py-6 text-center hover:border-primary/40 transition-colors">
                      {config.imageData ? (
                        <img src={config.imageData} alt="Watermark" className="mx-auto max-h-16 object-contain" />
                      ) : (
                        <span className="text-sm text-muted">Click to upload PNG/JPG</span>
                      )}
                    </button>
                    <input ref={imageInputRef} type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleImageUpload} className="hidden" />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Scale: {config.imageScale}%</label>
                    <input type="range" min={10} max={100} value={config.imageScale} onChange={(e) => setConfig((p) => ({ ...p, imageScale: parseInt(e.target.value) }))} className="w-full accent-primary" />
                  </div>
                </>
              )}

              {/* Shared options */}
              <div>
                <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Opacity: {config.opacity.toFixed(1)}</label>
                <input type="range" min={10} max={100} value={config.opacity * 100} onChange={(e) => setConfig((p) => ({ ...p, opacity: parseInt(e.target.value) / 100 }))} className="w-full accent-primary" />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Position</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['top-left', 'center', 'top-right', 'bottom-left', 'center', 'bottom-right'] as Position[]).filter((v, i, a) => a.indexOf(v) === i).map((pos) => (
                    <button key={pos} type="button" onClick={() => setConfig((p) => ({ ...p, position: pos }))} className={`rounded-lg px-2 py-1.5 text-[11px] font-semibold capitalize transition-colors ${config.position === pos ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}>
                      {pos.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Apply To</label>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setConfig((p) => ({ ...p, applyTo: 'all' }))} className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${config.applyTo === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}>
                    All Pages
                  </button>
                  <button type="button" onClick={() => setConfig((p) => ({ ...p, applyTo: 'specific' }))} className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${config.applyTo === 'specific' ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}>
                    Specific Pages
                  </button>
                </div>
                {config.applyTo === 'specific' && (
                  <input type="text" value={config.specificPages} onChange={(e) => setConfig((p) => ({ ...p, specificPages: e.target.value }))} placeholder="e.g. 1-3, 5, 7" className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-[13px] focus:outline-none focus:border-primary" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-card">
            <p className="text-[12px] font-semibold text-muted uppercase tracking-wider mb-3">Live Preview (Page 1)</p>
            <div className="relative bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px]">
              {previewUrl && <img src={previewUrl} alt="Page 1 preview" className="max-w-full max-h-[400px] object-contain" />}
              {/* Watermark overlay */}
              {config.type === 'text' && config.text && (
                <div style={getPreviewOverlayStyle()} className="whitespace-nowrap">
                  <span style={{ fontSize: `${Math.min(config.fontSize * 0.4, 48)}px`, color: config.color }} className="font-bold">{config.text}</span>
                </div>
              )}
              {config.type === 'image' && config.imageData && (
                <div style={{ ...getPreviewOverlayStyle(), width: `${config.imageScale}%` }}>
                  <img src={config.imageData} alt="Watermark preview" className="w-full object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</motion.div>
      )}

      {/* Action Bar */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/60 bg-white p-4 shadow-card">
        {processing && (
          <div className="mb-4">
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
            </div>
            <p className="mt-1.5 text-xs text-muted flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" /> Applying watermark... {progress}%
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {config.applyTo === 'all' ? `Watermark all ${totalPages} pages` : `Watermark specific pages`}
          </p>
          <button type="button" onClick={handleApply} disabled={processing} className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow disabled:opacity-60 disabled:cursor-not-allowed">
            {processing ? (
              <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Applying...</span>
            ) : (
              <span className="inline-flex items-center gap-2"><Download size={16} /> Apply Watermark & Download</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
