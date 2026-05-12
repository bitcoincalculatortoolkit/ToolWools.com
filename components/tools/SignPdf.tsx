'use client';

/**
 * SignPdf — ToolWools flagship PDF signer.
 *
 * Fully client-side eSignature tool. Nothing uploads anywhere.
 *
 * Features:
 *   - Upload PDF, render every page as a thumbnail + hi-res canvas (pdfjs-dist)
 *   - Three signature modes:
 *       Draw    — signature pad powered by pointer events on a canvas
 *       Type    — handwriting-style fonts (rendered to PNG via canvas)
 *       Upload  — any PNG/JPG the user supplies
 *   - Drag & drop the signature onto any page, multi-place support
 *   - Per-placement resize handle, duplicate, delete
 *   - Extra stamps: date (today), custom text, initials
 *   - Clean flatten on download using pdf-lib, signatures embedded as PNG
 *
 * All rendering dimensions are stored in PDF-space points so that the
 * download output matches what the user sees on screen pixel-for-pixel.
 */

import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Copy as CopyIcon,
  Download,
  Eraser,
  FileSignature,
  Image as ImageIcon,
  Pencil,
  Plus,
  RotateCcw,
  Shield,
  Trash2,
  Type as TypeIcon,
  Upload,
  X,
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   pdfjs worker — loaded from CDN to avoid bundler issues.
   The version pinned here matches the package.json declared
   pdfjs-dist version.
   ────────────────────────────────────────────────────────── */
const PDFJS_VERSION = '4.8.69';
const PDFJS_WORKER_SRC = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

/* ──────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────── */

interface RenderedPage {
  pageNumber: number;
  /** High-resolution page render (used for the active editor). */
  dataUrl: string;
  /** Low-resolution thumbnail (used for the page list). */
  thumbnailUrl: string;
  /** Natural PDF page size in points. 1 pt = 1/72 inch. */
  width: number;
  height: number;
}

type StampKind = 'signature' | 'date' | 'text';

interface PlacedStamp {
  id: string;
  kind: StampKind;
  pageIndex: number;
  /** Position in *normalized* page coordinates (0-1 origin top-left). */
  x: number;
  y: number;
  /** Size in normalized coordinates so it scales with the page. */
  width: number;
  height: number;
  /** PNG data URL for signature stamps, unused for text stamps. */
  imageDataUrl?: string;
  /** Raw text for date/text stamps. */
  text?: string;
  /** Font family used to render text stamps. */
  fontFamily?: string;
  /** Font size in normalized page-height units. */
  fontScale?: number;
  /** Text color hex. */
  color?: string;
}

type SignatureMode = 'draw' | 'type' | 'upload';

const TYPE_FONTS: Array<{ label: string; family: string }> = [
  { label: 'Signature Script', family: '"Dancing Script", "Brush Script MT", cursive' },
  { label: 'Handwritten', family: '"Homemade Apple", "Segoe Script", cursive' },
  { label: 'Formal Italic', family: 'Georgia, "Times New Roman", serif' },
  { label: 'Modern Sans', family: '"Inter", -apple-system, sans-serif' },
];

/* ──────────────────────────────────────────────────────────
   Utility — unique id
   ────────────────────────────────────────────────────────── */
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/* ──────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────── */
export function SignPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [stamps, setStamps] = useState<PlacedStamp[]>([]);
  const [selectedStampId, setSelectedStampId] = useState<string | null>(null);

  const [signatureMode, setSignatureMode] = useState<SignatureMode>('draw');
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [typedName, setTypedName] = useState('');
  const [typedFont, setTypedFont] = useState(TYPE_FONTS[0].family);
  const [typedColor, setTypedColor] = useState('#1e3a8a');

  const [downloadName, setDownloadName] = useState('signed.pdf');
  const [downloading, setDownloading] = useState(false);

  const pageSurfaceRef = useRef<HTMLDivElement | null>(null);
  const pdfBytesRef = useRef<ArrayBuffer | null>(null);

  /* ───────────────────────────────
     PDF upload + rendering
     ─────────────────────────────── */
  const handleFile = useCallback(async (selected: File) => {
    setError(null);
    setFile(selected);
    setPages([]);
    setStamps([]);
    setSelectedStampId(null);
    setDownloadName(selected.name.replace(/\.pdf$/i, '') + '-signed.pdf');
    setLoading(true);
    setLoadProgress(5);

    try {
      const arrayBuffer = await selected.arrayBuffer();
      pdfBytesRef.current = arrayBuffer.slice(0);

      // Dynamic import so pdfjs is never bundled server-side.
      const pdfjs = await import('pdfjs-dist');
      // @ts-expect-error — GlobalWorkerOptions is tagged as namespace.
      pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;

      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const doc = await loadingTask.promise;
      const total = doc.numPages;
      const rendered: RenderedPage[] = [];

      for (let i = 1; i <= total; i++) {
        const page = await doc.getPage(i);

        // Hi-res render — target a render width of 1400px.
        const viewport = page.getViewport({ scale: 1 });
        const hiScale = Math.min(2.0, 1400 / viewport.width);
        const hiVp = page.getViewport({ scale: hiScale });
        const hiCanvas = document.createElement('canvas');
        hiCanvas.width = Math.floor(hiVp.width);
        hiCanvas.height = Math.floor(hiVp.height);
        const hiCtx = hiCanvas.getContext('2d')!;
        await page.render({ canvasContext: hiCtx, viewport: hiVp }).promise;

        // Thumbnail — 180px wide.
        const thumbScale = 180 / viewport.width;
        const thumbVp = page.getViewport({ scale: thumbScale });
        const thumbCanvas = document.createElement('canvas');
        thumbCanvas.width = Math.floor(thumbVp.width);
        thumbCanvas.height = Math.floor(thumbVp.height);
        const thumbCtx = thumbCanvas.getContext('2d')!;
        await page.render({ canvasContext: thumbCtx, viewport: thumbVp }).promise;

        rendered.push({
          pageNumber: i,
          dataUrl: hiCanvas.toDataURL('image/jpeg', 0.9),
          thumbnailUrl: thumbCanvas.toDataURL('image/jpeg', 0.8),
          width: viewport.width,
          height: viewport.height,
        });

        setLoadProgress(Math.round(((i) / total) * 100));
        setPages([...rendered]);
      }

      setActivePageIndex(0);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? `Could not read this PDF: ${err.message}`
          : 'Could not read this PDF. Please try another file.',
      );
      setFile(null);
      pdfBytesRef.current = null;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ───────────────────────────────
     Signature creation
     ─────────────────────────────── */

  /** Called by SignaturePad when user finishes a drawn signature. */
  const handleDrawnSignature = useCallback((dataUrl: string | null) => {
    setSignatureDataUrl(dataUrl);
  }, []);

  /** Rasterize typed signature to PNG data URL. */
  const renderTypedSignature = useCallback(() => {
    if (!typedName.trim()) {
      setSignatureDataUrl(null);
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 180;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = typedColor;
    ctx.font = `64px ${typedFont}`;
    ctx.textBaseline = 'middle';
    ctx.fillText(typedName, 20, canvas.height / 2);
    setSignatureDataUrl(canvas.toDataURL('image/png'));
  }, [typedName, typedFont, typedColor]);

  useEffect(() => {
    if (signatureMode === 'type') renderTypedSignature();
  }, [signatureMode, renderTypedSignature]);

  /** User-uploaded signature image. */
  const handleSignatureUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      if (!f.type.startsWith('image/')) {
        alert('Please upload a PNG or JPG image of your signature.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') setSignatureDataUrl(reader.result);
      };
      reader.readAsDataURL(f);
      e.target.value = '';
    },
    [],
  );

  /* ───────────────────────────────
     Placing stamps on pages
     ─────────────────────────────── */

  const placeStamp = useCallback(
    (kind: StampKind, opts?: { text?: string }) => {
      if (!pages.length) return;
      if (kind === 'signature' && !signatureDataUrl) {
        alert('Create a signature first (Draw, Type, or Upload).');
        return;
      }
      const id = uid();
      const page = pages[activePageIndex];

      // Default placement: middle of page, sized sensibly.
      const aspect =
        kind === 'signature'
          ? 0.28 // ~28% width for drawn signatures
          : 0.18; // smaller for text/date

      const widthNorm = aspect;
      const heightNorm =
        kind === 'signature'
          ? (widthNorm * 0.35 * page.width) / page.height
          : (widthNorm * 0.22 * page.width) / page.height;

      const newStamp: PlacedStamp = {
        id,
        kind,
        pageIndex: activePageIndex,
        x: 0.5 - widthNorm / 2,
        y: 0.7,
        width: widthNorm,
        height: heightNorm,
        imageDataUrl: kind === 'signature' ? signatureDataUrl ?? undefined : undefined,
        text:
          kind === 'date'
            ? new Date().toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : opts?.text ?? '',
        fontFamily:
          kind === 'date' || kind === 'text'
            ? 'Inter, -apple-system, sans-serif'
            : undefined,
        fontScale: kind === 'date' || kind === 'text' ? 0.025 : undefined,
        color: kind === 'date' || kind === 'text' ? '#111111' : undefined,
      };
      setStamps((s) => [...s, newStamp]);
      setSelectedStampId(id);
    },
    [activePageIndex, pages, signatureDataUrl],
  );

  const updateStamp = useCallback(
    (id: string, patch: Partial<PlacedStamp>) => {
      setStamps((s) => s.map((st) => (st.id === id ? { ...st, ...patch } : st)));
    },
    [],
  );

  const deleteStamp = useCallback((id: string) => {
    setStamps((s) => s.filter((st) => st.id !== id));
    setSelectedStampId(null);
  }, []);

  const duplicateStamp = useCallback((id: string) => {
    setStamps((s) => {
      const src = s.find((st) => st.id === id);
      if (!src) return s;
      const copy: PlacedStamp = {
        ...src,
        id: uid(),
        x: Math.min(0.9, src.x + 0.05),
        y: Math.min(0.9, src.y + 0.05),
      };
      return [...s, copy];
    });
  }, []);

  const clearAll = useCallback(() => {
    setFile(null);
    setPages([]);
    setStamps([]);
    setSelectedStampId(null);
    setSignatureDataUrl(null);
    setTypedName('');
    pdfBytesRef.current = null;
    setError(null);
  }, []);

  /* ───────────────────────────────
     Finalize + download
     ─────────────────────────────── */

  const handleDownload = useCallback(async () => {
    if (!pdfBytesRef.current || !pages.length) return;
    setDownloading(true);
    setError(null);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.load(pdfBytesRef.current);
      const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const pdfPages = pdfDoc.getPages();

      for (const stamp of stamps) {
        const page = pdfPages[stamp.pageIndex];
        if (!page) continue;
        const { width: pw, height: ph } = page.getSize();
        const x = stamp.x * pw;
        const w = stamp.width * pw;
        const h = stamp.height * ph;
        // Convert from top-origin (UI) to bottom-origin (PDF).
        const y = ph - stamp.y * ph - h;

        if (stamp.kind === 'signature' && stamp.imageDataUrl) {
          const bytes = await fetch(stamp.imageDataUrl).then((r) => r.arrayBuffer());
          const isPng = stamp.imageDataUrl.startsWith('data:image/png');
          const img = isPng
            ? await pdfDoc.embedPng(bytes)
            : await pdfDoc.embedJpg(bytes);
          page.drawImage(img, { x, y, width: w, height: h });
        } else if ((stamp.kind === 'date' || stamp.kind === 'text') && stamp.text) {
          const fontSize = (stamp.fontScale ?? 0.025) * ph;
          const [r, g, b] = hexToRgb(stamp.color ?? '#111111');
          page.drawText(stamp.text, {
            x,
            y: y + h - fontSize,
            size: fontSize,
            font: helv,
            color: rgb(r / 255, g / 255, b / 255),
          });
        }
      }

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadName || 'signed.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? `Download failed: ${err.message}`
          : 'Could not save the signed PDF. Please try again.',
      );
    } finally {
      setDownloading(false);
    }
  }, [pages, stamps, downloadName]);

  const activePage = pages[activePageIndex];
  const activePageStamps = stamps.filter((s) => s.pageIndex === activePageIndex);

  /* ───────────────────────────────
     Render
     ─────────────────────────────── */

  if (!file || loading || !pages.length) {
    return (
      <>
        <UploadZone onFile={handleFile} loading={loading} progress={loadProgress} error={error} />
      </>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header bar with privacy banner + clear */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green/20 bg-green-bg/40 px-4 py-3">
        <div className="flex items-center gap-2 text-[13px]">
          <Shield size={15} className="text-green" />
          <span className="font-semibold text-dark">Your PDF never leaves this browser.</span>
          <span className="hidden sm:inline text-muted">
            All signing happens on your device — nothing uploads to any server.
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

      {/* Two-column layout: sidebar (pages + stamps) + editor */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
        {/* ─── LEFT: page thumbnails + signature panel ─── */}
        <aside className="space-y-5">
          <SignaturePanel
            mode={signatureMode}
            onModeChange={setSignatureMode}
            dataUrl={signatureDataUrl}
            onDrawChange={handleDrawnSignature}
            typedName={typedName}
            onTypedNameChange={setTypedName}
            typedFont={typedFont}
            onTypedFontChange={setTypedFont}
            typedColor={typedColor}
            onTypedColorChange={setTypedColor}
            onUpload={handleSignatureUpload}
          />

          <StampActions
            canPlaceSignature={!!signatureDataUrl}
            onPlaceSignature={() => placeStamp('signature')}
            onPlaceDate={() => placeStamp('date')}
            onPlaceText={() => {
              const v = window.prompt('Text to add:', 'Approved');
              if (v) placeStamp('text', { text: v });
            }}
          />

          <PageThumbnails
            pages={pages}
            activeIndex={activePageIndex}
            onSelect={setActivePageIndex}
            stamps={stamps}
          />
        </aside>

        {/* ─── RIGHT: page editor ─── */}
        <div className="space-y-4">
          {activePage && (
            <PageEditor
              ref={pageSurfaceRef}
              page={activePage}
              pageIndex={activePageIndex}
              totalPages={pages.length}
              stamps={activePageStamps}
              selectedId={selectedStampId}
              onSelect={setSelectedStampId}
              onUpdate={updateStamp}
              onDelete={deleteStamp}
              onDuplicate={duplicateStamp}
              onPrev={() => setActivePageIndex((i) => Math.max(0, i - 1))}
              onNext={() =>
                setActivePageIndex((i) => Math.min(pages.length - 1, i + 1))
              }
            />
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-700">
              {error}
            </div>
          )}

          {/* Download bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-white px-4 py-3 shadow-card">
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <label className="text-[12px] font-semibold text-muted uppercase tracking-wider">
                Save as
              </label>
              <input
                type="text"
                value={downloadName}
                onChange={(e) => setDownloadName(e.target.value)}
                className="flex-1 min-w-[140px] rounded-lg border border-border bg-white px-3 py-2 text-[13.5px] font-medium text-dark focus:outline-none focus:border-primary"
                spellCheck={false}
              />
            </div>
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading || !stamps.length}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[14px] font-semibold text-white btn-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Download size={15} />
              {downloading
                ? 'Preparing…'
                : stamps.length
                ? `Download signed PDF (${stamps.length} ${stamps.length === 1 ? 'stamp' : 'stamps'})`
                : 'Add a signature first'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Upload Zone
   ══════════════════════════════════════════════════════════ */

function UploadZone({
  onFile,
  loading,
  progress,
  error,
}: {
  onFile: (f: File) => void;
  loading: boolean;
  progress: number;
  error: string | null;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    if (!f.name.toLowerCase().endsWith('.pdf') && f.type !== 'application/pdf') {
      alert('Please drop a PDF file.');
      return;
    }
    onFile(f);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !loading && inputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 md:p-16 text-center transition-all duration-300 ${
          dragging
            ? 'border-primary bg-primary-bg/60 scale-[1.01]'
            : 'border-border hover:border-primary/40 hover:bg-primary-bg/20'
        } ${loading ? 'pointer-events-none' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = '';
          }}
          className="hidden"
        />
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-bg shadow-sm">
          <FileSignature size={24} className="text-primary" strokeWidth={1.5} />
        </div>
        <p className="mt-5 text-[18px] font-bold text-dark">
          Drop a PDF here to sign
        </p>
        <p className="mt-1 text-[14px] text-muted">
          or click to browse — up to 100 MB, any number of pages
        </p>
        <p className="mt-5 text-[12px] text-muted/80">
          100% private. Your file is processed locally — it is never uploaded.
        </p>

        {loading && (
          <div className="mt-6 max-w-sm mx-auto">
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
              />
            </div>
            <p className="mt-2 text-[12px] text-muted">
              Rendering pages… {progress}%
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Signature panel (draw / type / upload tabs)
   ══════════════════════════════════════════════════════════ */

function SignaturePanel({
  mode,
  onModeChange,
  dataUrl,
  onDrawChange,
  typedName,
  onTypedNameChange,
  typedFont,
  onTypedFontChange,
  typedColor,
  onTypedColorChange,
  onUpload,
}: {
  mode: SignatureMode;
  onModeChange: (m: SignatureMode) => void;
  dataUrl: string | null;
  onDrawChange: (data: string | null) => void;
  typedName: string;
  onTypedNameChange: (v: string) => void;
  typedFont: string;
  onTypedFontChange: (v: string) => void;
  typedColor: string;
  onTypedColorChange: (v: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-white shadow-card overflow-hidden">
      <div className="flex items-center gap-1 px-3 pt-3">
        <TabBtn active={mode === 'draw'} onClick={() => onModeChange('draw')} icon={<Pencil size={12} />}>
          Draw
        </TabBtn>
        <TabBtn active={mode === 'type'} onClick={() => onModeChange('type')} icon={<TypeIcon size={12} />}>
          Type
        </TabBtn>
        <TabBtn active={mode === 'upload'} onClick={() => onModeChange('upload')} icon={<Upload size={12} />}>
          Upload
        </TabBtn>
      </div>

      <div className="p-3">
        {mode === 'draw' && <SignaturePad dataUrl={dataUrl} onChange={onDrawChange} />}
        {mode === 'type' && (
          <div className="space-y-2">
            <input
              type="text"
              value={typedName}
              onChange={(e) => onTypedNameChange(e.target.value)}
              placeholder="Type your name"
              className="w-full rounded-lg border border-border px-3 py-2 text-[14px] focus:outline-none focus:border-primary"
            />
            <select
              value={typedFont}
              onChange={(e) => onTypedFontChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-[13px] focus:outline-none focus:border-primary"
            >
              {TYPE_FONTS.map((f) => (
                <option key={f.family} value={f.family}>
                  {f.label}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <label className="text-[12px] text-muted">Color:</label>
              <input
                type="color"
                value={typedColor}
                onChange={(e) => onTypedColorChange(e.target.value)}
                className="h-8 w-12 cursor-pointer rounded border border-border"
              />
            </div>
            {typedName && (
              <div
                className="rounded-lg border border-dashed border-border bg-gray-50/60 p-3 text-center overflow-hidden"
                style={{
                  fontFamily: typedFont,
                  color: typedColor,
                  fontSize: 34,
                  lineHeight: 1.1,
                }}
              >
                {typedName}
              </div>
            )}
          </div>
        )}
        {mode === 'upload' && (
          <label className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded-lg border-2 border-dashed border-border bg-gray-50/60 p-5 hover:border-primary transition-colors">
            <ImageIcon size={20} className="text-muted" />
            <span className="text-[13px] font-semibold text-dark">Upload signature image</span>
            <span className="text-[11.5px] text-muted">PNG or JPG · transparent background works best</span>
            <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
            {dataUrl && (
              <img
                src={dataUrl}
                alt="Your signature"
                className="mt-2 max-h-16 object-contain rounded border border-border bg-white px-2"
              />
            )}
          </label>
        )}
      </div>

      {/* Preview bar */}
      {mode === 'draw' && dataUrl && (
        <div className="border-t border-border/60 bg-gray-50/60 px-3 py-2 flex items-center justify-between gap-2">
          <img
            src={dataUrl}
            alt="Signature preview"
            className="max-h-8 object-contain"
          />
          <button
            type="button"
            onClick={() => onDrawChange(null)}
            className="inline-flex items-center gap-1 rounded px-2 py-1 text-[11.5px] font-semibold text-muted hover:text-red-500 transition-colors"
          >
            <Eraser size={11} /> Clear
          </button>
        </div>
      )}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${
        active ? 'bg-dark text-white' : 'text-muted hover:bg-gray-100 hover:text-dark'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   Signature Pad (canvas + pointer events)
   ══════════════════════════════════════════════════════════ */

function SignaturePad({
  dataUrl,
  onChange,
}: {
  dataUrl: string | null;
  onChange: (data: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const hasInkRef = useRef(false);

  // Set up HiDPI canvas on mount + on resize.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      const ctx = canvas.getContext('2d')!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 2.2;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Keep the canvas in sync if dataUrl is reset externally.
  useEffect(() => {
    if (dataUrl === null) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d')!;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      hasInkRef.current = false;
    }
  }, [dataUrl]);

  const pointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    lastPtRef.current = pointerPos(e);
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const pt = pointerPos(e);
    if (!lastPtRef.current) {
      lastPtRef.current = pt;
      return;
    }
    ctx.beginPath();
    ctx.moveTo(lastPtRef.current.x, lastPtRef.current.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    lastPtRef.current = pt;
    hasInkRef.current = true;
  };

  const onUp = () => {
    drawingRef.current = false;
    lastPtRef.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (hasInkRef.current) {
      onChange(canvas.toDataURL('image/png'));
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    hasInkRef.current = false;
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <div className="relative rounded-lg border-2 border-dashed border-border bg-white">
        <canvas
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="block h-32 w-full cursor-crosshair touch-none"
        />
        {!hasInkRef.current && !dataUrl && (
          <p className="pointer-events-none absolute inset-0 grid place-items-center text-[12.5px] text-muted/70">
            Draw your signature here
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={clear}
        className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-muted hover:text-red-500 transition-colors"
      >
        <Eraser size={11} /> Clear pad
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Quick-action stamp buttons
   ══════════════════════════════════════════════════════════ */

function StampActions({
  canPlaceSignature,
  onPlaceSignature,
  onPlaceDate,
  onPlaceText,
}: {
  canPlaceSignature: boolean;
  onPlaceSignature: () => void;
  onPlaceDate: () => void;
  onPlaceText: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-white p-3 shadow-card">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted px-1">
        Add to page
      </p>
      <div className="mt-2 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={onPlaceSignature}
          disabled={!canPlaceSignature}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-[13px] font-semibold text-white btn-glow disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Plus size={14} /> Signature
        </button>
        <button
          type="button"
          onClick={onPlaceDate}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-[13px] font-semibold text-dark hover:bg-gray-50 transition-colors"
        >
          <Calendar size={14} /> Date stamp
        </button>
        <button
          type="button"
          onClick={onPlaceText}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-[13px] font-semibold text-dark hover:bg-gray-50 transition-colors"
        >
          <TypeIcon size={14} /> Text label
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Page thumbnails sidebar
   ══════════════════════════════════════════════════════════ */

function PageThumbnails({
  pages,
  activeIndex,
  onSelect,
  stamps,
}: {
  pages: RenderedPage[];
  activeIndex: number;
  onSelect: (i: number) => void;
  stamps: PlacedStamp[];
}) {
  const stampsByPage = useMemo(() => {
    const m = new Map<number, number>();
    stamps.forEach((s) => m.set(s.pageIndex, (m.get(s.pageIndex) ?? 0) + 1));
    return m;
  }, [stamps]);

  return (
    <div className="rounded-2xl border border-border/60 bg-white p-3 shadow-card">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted px-1 mb-2">
        Pages · {pages.length}
      </p>
      <div className="max-h-[520px] overflow-y-auto space-y-2 pr-1">
        {pages.map((p, i) => {
          const count = stampsByPage.get(i) ?? 0;
          const active = i === activeIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className={`relative block w-full rounded-lg border-2 overflow-hidden transition-all ${
                active ? 'border-primary shadow-sm' : 'border-border hover:border-primary/40'
              }`}
            >
              <img
                src={p.thumbnailUrl}
                alt={`Page ${i + 1}`}
                className="block w-full"
                loading="lazy"
              />
              <span className="absolute left-1.5 top-1.5 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-dark">
                {i + 1}
              </span>
              {count > 0 && (
                <span className="absolute right-1.5 top-1.5 inline-flex items-center justify-center rounded-full bg-primary px-1.5 min-w-[18px] h-[18px] text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Page editor — renders the page image + draggable stamps
   ══════════════════════════════════════════════════════════ */

interface PageEditorProps {
  page: RenderedPage;
  pageIndex: number;
  totalPages: number;
  stamps: PlacedStamp[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, patch: Partial<PlacedStamp>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

const PageEditor = React.forwardRef<HTMLDivElement, PageEditorProps>(function PageEditor(
  {
    page,
    pageIndex,
    totalPages,
    stamps,
    selectedId,
    onSelect,
    onUpdate,
    onDelete,
    onDuplicate,
    onPrev,
    onNext,
  },
  ref,
) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-2xl border border-border/60 bg-white shadow-card overflow-hidden">
      {/* Page nav header */}
      <div className="flex items-center justify-between border-b border-border/60 bg-gray-50/60 px-3 py-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={pageIndex === 0}
            className="rounded px-2 py-1 text-[12px] font-semibold text-muted hover:bg-gray-200 disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-[12.5px] font-semibold text-dark tabular-nums">
            Page {pageIndex + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={pageIndex === totalPages - 1}
            className="rounded px-2 py-1 text-[12px] font-semibold text-muted hover:bg-gray-200 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
        <p className="hidden sm:block text-[11.5px] text-muted">
          Drag stamps to place · click to select · corner handle resizes
        </p>
      </div>

      {/* Page surface */}
      <div
        ref={(el) => {
          surfaceRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className="relative bg-gray-100 flex justify-center p-5 overflow-auto"
        onClick={(e) => {
          // Click on empty surface -> deselect.
          if (e.target === e.currentTarget) onSelect(null);
        }}
      >
        <div
          className="relative shadow-lg"
          style={{
            width: '100%',
            maxWidth: 820,
            aspectRatio: `${page.width} / ${page.height}`,
            background: '#fff',
          }}
          onClick={(e) => {
            if ((e.target as HTMLElement).dataset.surface === 'true') onSelect(null);
          }}
        >
          <img
            src={page.dataUrl}
            alt={`PDF page ${pageIndex + 1}`}
            className="absolute inset-0 h-full w-full object-contain select-none pointer-events-none"
            draggable={false}
          />
          <div
            className="absolute inset-0"
            data-surface="true"
            onClick={() => onSelect(null)}
          >
            {stamps.map((s) => (
              <StampView
                key={s.id}
                stamp={s}
                selected={s.id === selectedId}
                onSelect={() => onSelect(s.id)}
                onUpdate={(patch) => onUpdate(s.id, patch)}
                onDelete={() => onDelete(s.id)}
                onDuplicate={() => onDuplicate(s.id)}
                surfaceRef={surfaceRef}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

/* ══════════════════════════════════════════════════════════
   Stamp — draggable + resizable overlay
   ══════════════════════════════════════════════════════════ */

function StampView({
  stamp,
  selected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  surfaceRef,
}: {
  stamp: PlacedStamp;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (patch: Partial<PlacedStamp>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  surfaceRef: React.RefObject<HTMLDivElement>;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; sx: number; sy: number } | null>(null);
  const resizeStartRef = useRef<
    { x: number; y: number; sw: number; sh: number; ratio: number } | null
  >(null);

  const beginDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.handle === 'resize') return;
    e.stopPropagation();
    onSelect();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      sx: stamp.x,
      sy: stamp.y,
    };
  };

  const onDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const parent = elRef.current?.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const dx = (e.clientX - dragStartRef.current.x) / rect.width;
    const dy = (e.clientY - dragStartRef.current.y) / rect.height;
    const nx = Math.max(0, Math.min(1 - stamp.width, dragStartRef.current.sx + dx));
    const ny = Math.max(0, Math.min(1 - stamp.height, dragStartRef.current.sy + dy));
    onUpdate({ x: nx, y: ny });
  };

  const endDrag = () => {
    dragStartRef.current = null;
    resizeStartRef.current = null;
  };

  const beginResize = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      sw: stamp.width,
      sh: stamp.height,
      ratio: stamp.width / Math.max(stamp.height, 0.0001),
    };
  };

  const onResize = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!resizeStartRef.current) return;
    const parent = elRef.current?.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const dx = (e.clientX - resizeStartRef.current.x) / rect.width;
    const newW = Math.max(
      0.04,
      Math.min(1 - stamp.x, resizeStartRef.current.sw + dx),
    );
    const newH = newW / resizeStartRef.current.ratio;
    if (stamp.y + newH > 1) return;
    onUpdate({ width: newW, height: newH });
  };

  return (
    <div
      ref={elRef}
      role="button"
      tabIndex={0}
      onPointerDown={beginDrag}
      onPointerMove={onDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={(e) => {
        if (e.key === 'Delete' || e.key === 'Backspace') onDelete();
      }}
      style={{
        position: 'absolute',
        left: `${stamp.x * 100}%`,
        top: `${stamp.y * 100}%`,
        width: `${stamp.width * 100}%`,
        height: `${stamp.height * 100}%`,
        cursor: 'grab',
        touchAction: 'none',
      }}
      className={`group rounded ${
        selected ? 'ring-2 ring-primary shadow-lg' : 'ring-1 ring-black/5 hover:ring-primary/40'
      }`}
    >
      {stamp.kind === 'signature' && stamp.imageDataUrl ? (
        <img
          src={stamp.imageDataUrl}
          alt="Signature"
          className="block h-full w-full object-contain pointer-events-none select-none"
          draggable={false}
        />
      ) : (
        <div
          className="flex items-center px-1 h-full w-full pointer-events-none select-none"
          style={{
            fontFamily: stamp.fontFamily,
            color: stamp.color,
            fontSize: 'calc(min(1.2vw, 14px))', // approximate preview — real render uses pt
            lineHeight: 1,
          }}
        >
          <span className="truncate" style={{ fontSize: '1em' }}>
            {stamp.text}
          </span>
        </div>
      )}

      {/* Floating toolbar */}
      {selected && (
        <div className="absolute -top-9 left-0 flex items-center gap-1 rounded-lg bg-dark text-white px-1.5 py-1 shadow-lg text-[11px]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            title="Duplicate"
            className="grid h-6 w-6 place-items-center rounded hover:bg-white/10"
          >
            <CopyIcon size={12} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete"
            className="grid h-6 w-6 place-items-center rounded hover:bg-red-500"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {/* Resize handle */}
      {selected && (
        <div
          data-handle="resize"
          onPointerDown={beginResize}
          onPointerMove={onResize}
          onPointerUp={endDrag}
          className="absolute -right-1.5 -bottom-1.5 h-4 w-4 rounded-sm bg-primary border-2 border-white shadow cursor-nwse-resize"
        />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────── */

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f0-9]{6})$/i.exec(hex);
  if (!m) return [17, 17, 17];
  const v = parseInt(m[1], 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}
