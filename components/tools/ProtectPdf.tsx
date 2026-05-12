'use client';

/**
 * ProtectPdf — PDF Password Checker.
 *
 * pdf-lib v1.x does NOT support loading encrypted PDFs or encrypting them.
 * This tool provides value by detecting whether a PDF is password-protected,
 * and links to desktop alternatives for actual encryption/decryption.
 *
 * 100% client-side. No upload, no server, no signup.
 */

import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileText,
  Loader2,
  Lock,
  Shield,
  Upload,
} from 'lucide-react';

export function ProtectPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'checking' | 'unprotected' | 'protected' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (selected: File) => {
    setFile(selected);
    setStatus('checking');
    setMessage('');

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await selected.arrayBuffer();

      try {
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        setStatus('unprotected');
        setMessage(`This PDF is not password-protected. It has ${pageCount} page${pageCount !== 1 ? 's' : ''} and can be opened freely.`);
      } catch {
        setStatus('protected');
        setMessage('This PDF appears to be password-protected or encrypted. Browser-based libraries cannot decrypt PDFs — use a desktop application to unlock it.');
      }
    } catch {
      setStatus('error');
      setMessage('Could not read this file. It may be corrupted or not a valid PDF.');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    if (!f.name.toLowerCase().endsWith('.pdf') && f.type !== 'application/pdf') {
      setMessage('Please drop a PDF file.');
      setStatus('error');
      return;
    }
    handleFile(f);
  }, [handleFile]);

  const clearAll = () => {
    setFile(null);
    setStatus('idle');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Privacy Banner */}
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-4 py-3">
        <Shield size={18} className="text-green-600 flex-shrink-0" />
        <p className="text-[13px] text-green-800 font-medium">
          Files processed locally — never uploaded. Your documents stay private on your device.
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-bg">
              <FileText size={16} className="text-blue" />
            </span>
            <h3 className="text-[14px] font-bold text-dark">Check PDF Protection</h3>
            <span className="rounded-full bg-green-bg px-2 py-0.5 text-[10px] font-semibold text-green-700">Available</span>
          </div>
          <p className="text-[13px] text-body leading-relaxed">
            Drop any PDF to instantly check if it&apos;s password-protected. No upload, no server — detection happens locally.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-gray-50/60 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gray-200">
              <Lock size={16} className="text-gray-500" />
            </span>
            <h3 className="text-[14px] font-bold text-dark">Add / Remove Password</h3>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Desktop only</span>
          </div>
          <p className="text-[13px] text-body leading-relaxed">
            PDF encryption requires native OS cryptography. Use a desktop tool:
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a href="https://www.adobe.com/acrobat/online/password-protect-pdf.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
              Adobe Acrobat <ExternalLink size={10} />
            </a>
            <span className="text-muted text-[12px]">·</span>
            <a href="https://support.apple.com/en-us/guide/preview/prvw587dd90f/mac" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline">
              macOS Preview <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 md:p-14 text-center transition-all duration-300 ${
          isDragging ? 'border-primary bg-primary-bg/50 scale-[1.01]' : 'border-border hover:border-primary/40 hover:bg-primary-bg/20'
        }`}
      >
        <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} className="hidden" />
        <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-red-50 grid place-items-center">
          {status === 'checking' ? (
            <Loader2 size={28} className="text-primary animate-spin" />
          ) : (
            <Upload size={28} className={isDragging ? 'text-primary' : 'text-red-400'} />
          )}
        </div>
        <p className="text-[15px] font-semibold text-dark">
          {status === 'checking' ? 'Checking PDF...' : 'Drop a PDF to check its protection status'}
        </p>
        <p className="mt-1 text-sm text-muted">Instantly detect whether a PDF requires a password</p>
      </div>

      {/* Results */}
      {status === 'unprotected' && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-semibold text-green-800">Not password-protected</p>
              <p className="mt-1 text-[13px] text-green-700">{message}</p>
            </div>
          </div>
        </motion.div>
      )}

      {status === 'protected' && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-semibold text-amber-800">Password-protected PDF detected</p>
              <p className="mt-1 text-[13px] text-amber-700">{message}</p>
              <div className="mt-3 rounded-lg bg-white/70 border border-amber-200/60 p-3">
                <p className="text-[12px] font-semibold text-dark mb-1">To unlock this PDF:</p>
                <ul className="space-y-1 text-[12px] text-body">
                  <li>• <strong>Adobe Acrobat</strong> — enter password, save without protection</li>
                  <li>• <strong>macOS Preview</strong> — File → Export as PDF → uncheck Encrypt</li>
                  <li>• <strong>Chrome</strong> — open PDF, enter password, Print → Save as PDF</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {message}
        </motion.div>
      )}

      {file && status !== 'idle' && status !== 'checking' && (
        <div className="flex justify-center">
          <button type="button" onClick={clearAll} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-[13px] font-semibold text-dark hover:bg-gray-50 transition-colors">
            Check another PDF
          </button>
        </div>
      )}
    </div>
  );
}
