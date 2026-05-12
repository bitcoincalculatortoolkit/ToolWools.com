'use client';

/**
 * ProtectPdf — Encrypt PDF with password or remove password protection.
 *
 * Uses pdf-lib for encryption/decryption.
 * 100% client-side. No upload, no server, no signup.
 */

import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Shield,
  Unlock,
  Upload,
  X,
} from 'lucide-react';

/* ─── Constants ─── */
type Mode = 'encrypt' | 'decrypt';

interface EncryptConfig {
  userPassword: string;
  ownerPassword: string;
  allowPrinting: boolean;
  allowCopying: boolean;
  allowModifying: boolean;
  allowAnnotating: boolean;
}

export function ProtectPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>('encrypt');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [encryptConfig, setEncryptConfig] = useState<EncryptConfig>({
    userPassword: '',
    ownerPassword: '',
    allowPrinting: true,
    allowCopying: false,
    allowModifying: false,
    allowAnnotating: true,
  });

  const [decryptPassword, setDecryptPassword] = useState('');
  const [showUserPass, setShowUserPass] = useState(false);
  const [showOwnerPass, setShowOwnerPass] = useState(false);
  const [showDecryptPass, setShowDecryptPass] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pdfBytesRef = useRef<ArrayBuffer | null>(null);

  /* ─── Load file ─── */
  const handleFile = useCallback(async (selected: File) => {
    setError(null);
    setSuccess(null);
    setFile(selected);

    try {
      const arrayBuffer = await selected.arrayBuffer();
      pdfBytesRef.current = arrayBuffer.slice(0);
    } catch (err: any) {
      setError('Failed to read the file.');
      setFile(null);
      pdfBytesRef.current = null;
    }
  }, []);

  /* ─── Encrypt PDF ─── */
  const handleEncrypt = useCallback(async () => {
    if (!pdfBytesRef.current) return;

    if (!encryptConfig.userPassword.trim()) {
      setError('Please enter a user password (required to open the PDF).');
      return;
    }

    setError(null);
    setSuccess(null);
    setProcessing(true);
    setProgress(0);

    try {
      const { PDFDocument } = await import('pdf-lib');
      setProgress(20);

      const pdfDoc = await PDFDocument.load(pdfBytesRef.current, {
        ignoreEncryption: true,
      });
      setProgress(40);

      const ownerPass = encryptConfig.ownerPassword.trim() || encryptConfig.userPassword;

      pdfDoc.encrypt({
        userPassword: encryptConfig.userPassword,
        ownerPassword: ownerPass,
        permissions: {
          printing: encryptConfig.allowPrinting ? 'highResolution' : undefined,
          copying: encryptConfig.allowCopying,
          modifying: encryptConfig.allowModifying,
          annotating: encryptConfig.allowAnnotating,
        },
      });

      setProgress(70);
      const savedBytes = await pdfDoc.save();
      setProgress(90);

      const blob = new Blob([savedBytes.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const baseName = file?.name.replace(/\.pdf$/i, '') || 'protected';
      link.download = `${baseName}_protected.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      setSuccess('PDF encrypted successfully! Download has started.');
    } catch (err: any) {
      const message = err?.message || 'Failed to encrypt PDF. Please try again.';
      setError(message);
    } finally {
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    }
  }, [encryptConfig, file]);

  /* ─── Decrypt PDF ─── */
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
      } catch (loadErr: any) {
        if (loadErr?.message?.includes('password') || loadErr?.message?.includes('decrypt')) {
          setError('Incorrect password. Please check and try again.');
        } else {
          setError('Failed to load PDF. It may not be password-protected or is corrupted.');
        }
        setProcessing(false);
        return;
      }

      setProgress(50);
      const savedBytes = await pdfDoc.save();
      setProgress(90);

      const blob = new Blob([savedBytes.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const baseName = file?.name.replace(/\.pdf$/i, '') || 'unlocked';
      link.download = `${baseName}_unlocked.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      setSuccess('Password removed successfully! Download has started.');
    } catch (err: any) {
      const message = err?.message || 'Failed to remove password. Please try again.';
      setError(message);
    } finally {
      setTimeout(() => {
        setProcessing(false);
        setProgress(0);
      }, 1500);
    }
  }, [decryptPassword, file]);

  /* ─── Clear ─── */
  const clearAll = () => {
    setFile(null);
    setError(null);
    setSuccess(null);
    setDecryptPassword('');
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

  /* ─── Upload Zone ─── */
  if (!file) {
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
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 md:p-16 text-center transition-all duration-300 ${
            isDragging ? 'border-primary bg-primary-bg/50 scale-[1.01]' : 'border-border hover:border-primary/40 hover:bg-primary-bg/20'
          }`}
        >
          <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} className="hidden" />
          <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-red-50 grid place-items-center">
            <Lock size={28} className={isDragging ? 'text-primary' : 'text-red-400'} />
          </div>
          <p className="text-[15px] font-semibold text-dark">Drop a PDF here to protect or unlock</p>
          <p className="mt-1 text-sm text-muted">Add password protection or remove existing passwords</p>
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
          <span className="hidden sm:inline text-muted">{file.name}</span>
        </div>
        <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold text-muted hover:bg-red-50 hover:text-red-600 transition-colors">
          <X size={14} /> Close document
        </button>
      </div>

      {/* Mode Tabs */}
      <div className="rounded-2xl border border-border/60 bg-white shadow-card overflow-hidden">
        <div className="flex border-b border-border/40">
          <button type="button" onClick={() => { setMode('encrypt'); setError(null); setSuccess(null); }} className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-[13px] font-semibold transition-colors border-b-2 ${mode === 'encrypt' ? 'text-primary border-primary bg-primary-bg/30' : 'text-muted border-transparent hover:text-dark hover:bg-gray-50/50'}`}>
            <Lock size={14} /> Encrypt (Add Password)
          </button>
          <button type="button" onClick={() => { setMode('decrypt'); setError(null); setSuccess(null); }} className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-[13px] font-semibold transition-colors border-b-2 ${mode === 'decrypt' ? 'text-primary border-primary bg-primary-bg/30' : 'text-muted border-transparent hover:text-dark hover:bg-gray-50/50'}`}>
            <Unlock size={14} /> Remove Password
          </button>
        </div>

        <div className="p-5 space-y-4">
          {mode === 'encrypt' ? (
            <>
              {/* User Password */}
              <div>
                <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">
                  User Password <span className="text-red-400">(required to open)</span>
                </label>
                <div className="relative">
                  <input
                    type={showUserPass ? 'text' : 'password'}
                    value={encryptConfig.userPassword}
                    onChange={(e) => setEncryptConfig((p) => ({ ...p, userPassword: e.target.value }))}
                    placeholder="Enter password to open the PDF"
                    className="w-full rounded-lg border border-border px-3 py-2.5 pr-10 text-[14px] focus:outline-none focus:border-primary"
                  />
                  <button type="button" onClick={() => setShowUserPass(!showUserPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark">
                    {showUserPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Owner Password */}
              <div>
                <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">
                  Owner Password <span className="text-muted">(optional, for permissions)</span>
                </label>
                <div className="relative">
                  <input
                    type={showOwnerPass ? 'text' : 'password'}
                    value={encryptConfig.ownerPassword}
                    onChange={(e) => setEncryptConfig((p) => ({ ...p, ownerPassword: e.target.value }))}
                    placeholder="Leave empty to use user password"
                    className="w-full rounded-lg border border-border px-3 py-2.5 pr-10 text-[14px] focus:outline-none focus:border-primary"
                  />
                  <button type="button" onClick={() => setShowOwnerPass(!showOwnerPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark">
                    {showOwnerPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-2">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'allowPrinting', label: 'Allow Printing' },
                    { key: 'allowCopying', label: 'Allow Copying' },
                    { key: 'allowModifying', label: 'Allow Modifying' },
                    { key: 'allowAnnotating', label: 'Allow Annotating' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={encryptConfig[key as keyof EncryptConfig] as boolean}
                        onChange={(e) => setEncryptConfig((p) => ({ ...p, [key]: e.target.checked }))}
                        className="rounded accent-primary"
                      />
                      <span className="text-[13px] font-medium text-dark">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-[12px] font-semibold text-muted uppercase tracking-wider block mb-1.5">
                  Current PDF Password
                </label>
                <div className="relative">
                  <input
                    type={showDecryptPass ? 'text' : 'password'}
                    value={decryptPassword}
                    onChange={(e) => setDecryptPassword(e.target.value)}
                    placeholder="Enter the password to unlock"
                    className="w-full rounded-lg border border-border px-3 py-2.5 pr-10 text-[14px] focus:outline-none focus:border-primary"
                  />
                  <button type="button" onClick={() => setShowDecryptPass(!showDecryptPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark">
                    {showDecryptPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <p className="text-[12px] text-muted">
                Enter the password used to protect this PDF. The tool will save a new copy without any password protection.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Success */}
      {success && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-green-600" /> {success}
        </motion.div>
      )}

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
              <Loader2 size={12} className="animate-spin" /> {mode === 'encrypt' ? 'Encrypting...' : 'Removing password...'} {progress}%
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {mode === 'encrypt' ? 'Add password protection to your PDF' : 'Remove password and download unprotected PDF'}
          </p>
          <button
            type="button"
            onClick={mode === 'encrypt' ? handleEncrypt : handleDecrypt}
            disabled={processing}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Processing...</span>
            ) : mode === 'encrypt' ? (
              <span className="inline-flex items-center gap-2"><Lock size={16} /> Encrypt & Download</span>
            ) : (
              <span className="inline-flex items-center gap-2"><Unlock size={16} /> Remove Password & Download</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
