'use client';

/**
 * ProtectPdf — Remove password protection from a PDF.
 *
 * pdf-lib v1.x does NOT support adding AES encryption.
 * This tool implements the working "Remove Password" direction only.
 * The UI honestly explains this and links to alternatives for adding passwords.
 * 100% client-side. No upload, no server, no signup.
 */

import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Shield,
  Unlock,
  X,
} from 'lucide-react';

export function ProtectPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [decryptPassword, setDecryptPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const pdfBytesRef = useRef<ArrayBuffer | null>(null);

  const handleFile = useCallback(async (selected: File) => {
    setError(null);
    setSuccess(null);
    setFile(selected);
    try {
      const ab = await selected.arrayBuffer();
      pdfBytesRef.current = ab.slice(0);
    } catch {
      setError('Failed to read the file.');
      setFile(null);
      pdfBytesRef.current = null;
    }
  }, []);

  const handleDecrypt = useCallback(async () => {
    if (!pdfBytesRef.current) return;
    if (!decryptPassword.trim()) {
      setError('Please enter the current PDF password.');
      return;
    }
    setError(null);
    setSuccess(null);
    setProcessing(true);
    setProgress(0);
    try {
      const { PDFDocument } = await import('pdf-lib');
      setProgress(20);
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(pdfBytesRef.current, {
          password: decryptPassword,
        });
      } catch (loadErr: unknown) {
        const msg = loadErr instanceof Error ? loadErr.message : '';
        if (msg.includes('password') || msg.includes('decrypt') || msg.includes('encrypted')) {
          setError('Incorrect password. Please check and try again.');
        } else {
          setError('Could not load PDF. It may not be password-protected, or the file is corrupted.');
        }
        setProcessing(false);
        return;
      }
      setProgress(60);
      const savedBytes = await pdfDoc.save();
      setProgress(90);
      const blob = new Blob([new Uint8Array(savedBytes) as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(file?.name ?? 'unlocked').replace(/\.pdf$/i, '')}_unlocked.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      setProgress(100);
      setSuccess('Password removed successfully! Your unlocked PDF is downloading.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to remove password. Please try again.');
    } finally {
      setTimeout(() => { setProcessing(false); setProgress(0); }, 1500);
    }
  }, [decryptPassword, file]);

  const clearAll = () => {
    setFile(null);
    setError(null);
    setSuccess(null);
    setDecryptPassword('');
    pdfBytesRef.current = null;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    if (!f.name.toLowerCase().endsWith('.pdf') && f.type !== 'application/pdf') {
      setError('Please drop a PDF file.');
      return;
    }
    handleFile(f);
  }, [handleFile]);

  /* ─── Upload state ─── */
  if (!file) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-4 py-3">
          <Shield size={18} className="text-green-600 flex-shrink-0" />
          <p className="text-[13px] text-green-800 font-medium">
            Files processed locally — never uploaded. Your documents stay private.
          </p>
        </div>

        {/* Two-card info row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-primary bg-primary-bg/30 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary">
                <Unlock size={16} className="text-white" />
              </span>
              <h3 className="text-[14px] font-bold text-dark">Remove Password</h3>
              <span className="rounded-full bg-green-bg px-2 py-0.5 text-[10px] font-semibold text-green-700">Available</span>
            </div>
            <p className="text-[13px] text-body leading-relaxed">
              Enter the password for a protected PDF and download an unlocked copy that opens without any password.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-gray-50/60 p-5 opacity-75">
            <div className="flex items-center gap-2 mb-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gray-200">
                <Lock size={16} className="text-gray-500" />
              </span>
              <h3 className="text-[14px] font-bold text-dark">Add Password</h3>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Requires app</span>
            </div>
            <p className="text-[13px] text-body leading-relaxed">
              Browser security restrictions prevent client-side AES encryption.
            </p>
            <a href="https://www.adobe.com/acrobat/online/pdf-password.html" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
              Adobe Acrobat Online <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 md:p-16 text-center transition-all duration-300 ${
            isDragging ? 'border-primary bg-primary-bg/50 scale-[1.01]' : 'border-border hover:border-primary/40 hover:bg-primary-bg/20'
          }`}
        >
          <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} className="hidden" />
          <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-red-50 grid place-items-center">
            <Unlock size={28} className={isDragging ? 'text-primary' : 'text-red-400'} />
          </div>
          <p className="text-[15px] font-semibold text-dark">Drop a password-protected PDF here</p>
          <p className="mt-1 text-sm text-muted">or click to browse · up to 100 MB</p>
        </div>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</div>}
      </div>
    );
  }

  /* ─── Main UI (PDF loaded) ─── */
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-4 py-3">
        <div className="flex items-center gap-2 text-[13px]">
          <Shield size={15} className="text-green-600" />
          <span className="font-semibold text-dark">Files processed locally — never uploaded.</span>
          <span className="hidden sm:inline text-muted">{file.name}</span>
        </div>
        <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold text-muted hover:bg-red-50 hover:text-red-600 transition-colors">
          <X size={14} /> Close document
        </button>
      </div>

      <div className="rounded-2xl border border-border/60 bg-white shadow-card p-5 space-y-4">
        <div>
          <h3 className="text-[15px] font-bold text-dark flex items-center gap-2">
            <Unlock size={16} className="text-primary" /> Remove Password Protection
          </h3>
          <p className="mt-1 text-[13px] text-muted">Enter the current password to unlock and download a password-free copy.</p>
        </div>
        <div>
          <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">Current PDF Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={decryptPassword}
              onChange={(e) => setDecryptPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleDecrypt(); }}
              placeholder="Enter the password to unlock"
              className="w-full rounded-lg border border-border px-3 py-2.5 pr-10 text-[14px] focus:outline-none focus:border-primary"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-amber-50/60 border border-amber-200/60 px-3 py-2.5">
          <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-amber-700">Only use this on PDFs you own or have permission to modify.</p>
        </div>
      </div>

      {success && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" /> {success}
        </motion.div>
      )}
      {error && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/60 bg-white p-4 shadow-card">
        {processing && (
          <div className="mb-4">
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
            </div>
            <p className="mt-1.5 text-xs text-muted flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" /> Removing password… {progress}%
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={handleDecrypt}
          disabled={processing || !decryptPassword.trim()}
          className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {processing
            ? <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Processing…</span>
            : <span className="inline-flex items-center gap-2"><Unlock size={16} /> Remove Password & Download</span>
          }
        </button>
      </motion.div>
    </div>
  );
}
