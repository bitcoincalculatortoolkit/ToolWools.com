'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Trash2,
  CheckCircle2,
  XCircle,
  AlignLeft,
  Minimize2,
  Shield,
  ChevronRight,
  ChevronDown,
  Braces,
  List,
} from 'lucide-react';

type ViewMode = 'formatted' | 'tree';

interface TreeNodeProps {
  keyName: string | null;
  value: unknown;
  depth: number;
  isLast: boolean;
}

function TreeNode({ keyName, value, depth, isLast }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(depth < 2);

  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const entries = isObject
    ? isArray
      ? (value as unknown[]).map((v, i) => [String(i), v] as [string, unknown])
      : Object.entries(value as Record<string, unknown>)
    : [];

  const renderValue = (val: unknown) => {
    if (val === null) return <span className="text-red-500 font-mono text-sm">null</span>;
    if (typeof val === 'boolean')
      return <span className="text-purple-600 font-mono text-sm">{String(val)}</span>;
    if (typeof val === 'number')
      return <span className="text-blue-600 font-mono text-sm">{val}</span>;
    if (typeof val === 'string')
      return (
        <span className="text-green-600 font-mono text-sm">
          &quot;{val.length > 80 ? val.slice(0, 80) + '...' : val}&quot;
        </span>
      );
    return null;
  };

  if (!isObject) {
    return (
      <div className="flex items-start gap-1 py-0.5" style={{ paddingLeft: `${depth * 16}px` }}>
        {keyName !== null && (
          <span className="text-dark font-mono text-sm font-semibold">&quot;{keyName}&quot;: </span>
        )}
        {renderValue(value)}
        {!isLast && <span className="text-muted">,</span>}
      </div>
    );
  }

  const bracket = isArray ? ['[', ']'] : ['{', '}'];
  const count = entries.length;

  return (
    <div style={{ paddingLeft: `${depth * 16}px` }}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-0.5 py-0.5 hover:bg-gray-50 rounded transition-colors"
      >
        {expanded ? (
          <ChevronDown size={14} className="text-muted flex-shrink-0" />
        ) : (
          <ChevronRight size={14} className="text-muted flex-shrink-0" />
        )}
        {keyName !== null && (
          <span className="text-dark font-mono text-sm font-semibold">&quot;{keyName}&quot;: </span>
        )}
        <span className="font-mono text-sm text-muted">
          {bracket[0]}
          {!expanded && ` ... ${count} items `}
          {!expanded && bracket[1]}
          {!expanded && !isLast && ','}
        </span>
      </button>
      {expanded && (
        <>
          {entries.map(([k, v], i) => (
            <TreeNode
              key={k}
              keyName={isArray ? null : k}
              value={v}
              depth={depth + 1}
              isLast={i === entries.length - 1}
            />
          ))}
          <div className="py-0.5" style={{ paddingLeft: `${(depth + 1) * 0}px` }}>
            <span className="font-mono text-sm text-muted" style={{ paddingLeft: `${depth * 16}px` }}>
              {bracket[1]}{!isLast && ','}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function SyntaxHighlight({ json }: { json: string }) {
  const highlighted = useMemo(() => {
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?)/g,
      (match) => {
        let cls = 'text-blue-600'; // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-dark font-semibold'; // key
            match = match.replace(/:$/, '');
            return `<span class="${cls}">${match}</span>:`;
          } else {
            cls = 'text-green-600'; // string
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-purple-600'; // boolean
        } else if (/null/.test(match)) {
          cls = 'text-red-500'; // null
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  }, [json]);

  return (
    <pre
      className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('formatted');
  const [parsedJson, setParsedJson] = useState<unknown>(null);
  const [copied, setCopied] = useState(false);

  const isValid = useMemo(() => {
    if (!input.trim()) return null;
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  }, [input]);

  const handleFormat = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setParsedJson(parsed);
      setError(null);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Invalid JSON';
      setError(message);
      setOutput('');
      setParsedJson(null);
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setParsedJson(parsed);
      setError(null);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Invalid JSON';
      setError(message);
      setOutput('');
      setParsedJson(null);
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      setError(null);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Invalid JSON';
      setError(message);
      setOutput('');
      setParsedJson(null);
    }
  }, [input]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output || input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setParsedJson(null);
  };

  return (
    <div className="space-y-4">
      {/* Validity Badge */}
      {isValid !== null && (
        <div className="flex items-center gap-2">
          {isValid ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-bg px-3 py-1 text-xs font-semibold text-green">
              <CheckCircle2 size={13} /> Valid JSON
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
              <XCircle size={13} /> Invalid JSON
            </span>
          )}
          <span className="text-xs text-muted">
            {input.length} characters
          </span>
        </div>
      )}

      {/* Two-pane layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input pane */}
        <div className="rounded-card border border-border/60 bg-white shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-gray-50/50">
            <span className="text-xs font-semibold text-dark">Input</span>
            <span className="text-[11px] text-muted">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"paste": "your JSON here"}'
            className="w-full min-h-[300px] resize-y px-4 py-3 font-mono text-sm text-dark leading-relaxed focus:outline-none placeholder:text-muted/40"
            spellCheck={false}
          />
        </div>

        {/* Output pane */}
        <div className="rounded-card border border-border/60 bg-white shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-dark">Output</span>
              {/* View mode toggle */}
              <div className="flex items-center rounded-lg bg-gray-100 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('formatted')}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                    viewMode === 'formatted'
                      ? 'bg-white text-dark shadow-sm'
                      : 'text-muted hover:text-dark'
                  }`}
                >
                  <Braces size={11} /> Code
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('tree')}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                    viewMode === 'tree'
                      ? 'bg-white text-dark shadow-sm'
                      : 'text-muted hover:text-dark'
                  }`}
                >
                  <List size={11} /> Tree
                </button>
              </div>
            </div>
            <span className="text-[11px] text-muted">{output.length} chars</span>
          </div>
          <div className="min-h-[300px] max-h-[500px] overflow-auto px-4 py-3">
            {error && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-red-200 bg-red-50 p-3 mb-3"
                >
                  <p className="text-sm text-red-600 font-medium flex items-center gap-1.5">
                    <XCircle size={14} /> Error
                  </p>
                  <p className="mt-1 text-xs text-red-500 font-mono">{error}</p>
                </motion.div>
              </AnimatePresence>
            )}
            {!error && output && viewMode === 'formatted' && (
              <SyntaxHighlight json={output} />
            )}
            {!error && parsedJson !== null && viewMode === 'tree' && (
              <div className="overflow-x-auto">
                <TreeNode keyName={null} value={parsedJson} depth={0} isLast={true} />
              </div>
            )}
            {!error && !output && (
              <p className="text-sm text-muted/50 italic">
                Output will appear here after formatting...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleFormat}
          disabled={!input.trim()}
          className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <AlignLeft size={15} /> Format
        </button>
        <button
          type="button"
          onClick={handleMinify}
          disabled={!input.trim()}
          className="inline-flex items-center gap-1.5 rounded-btn bg-dark px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Minimize2 size={15} /> Minify
        </button>
        <button
          type="button"
          onClick={handleValidate}
          disabled={!input.trim()}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-white px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Shield size={15} /> Validate
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output && !input}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-white px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copied ? <CheckCircle2 size={15} className="text-green" /> : <Copy size={15} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={!input && !output}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-white px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 size={15} /> Clear
        </button>
      </div>
    </div>
  );
}
