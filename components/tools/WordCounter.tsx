'use client';

import { useState, useMemo } from 'react';
import {
  Type,
  Hash,
  AlignLeft,
  Clock,
  LetterText,
  Pilcrow,
  Copy,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'may', 'might', 'shall', 'can', 'it', 'its', 'this',
  'that', 'these', 'those', 'i', 'me', 'my', 'we', 'our', 'you', 'your',
  'he', 'him', 'his', 'she', 'her', 'they', 'them', 'their', 'what',
  'which', 'who', 'whom', 'when', 'where', 'why', 'how', 'not', 'no',
  'so', 'if', 'then', 'than', 'too', 'very', 'just', 'about', 'above',
  'after', 'again', 'all', 'also', 'am', 'as', 'because', 'before',
  'between', 'both', 'each', 'few', 'more', 'most', 'other', 'some',
  'such', 'into', 'over', 'own', 'same', 'up', 'down', 'out', 'off',
]);

export function WordCounter() {
  const [text, setText] = useState('');
  const [charLimit, setCharLimit] = useState<number | null>(null);
  const [showLimitInput, setShowLimitInput] = useState(false);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed
      ? (trimmed.match(/[.!?]+(\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0)
      : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  const topKeywords = useMemo(() => {
    if (!text.trim()) return [];
    const wordCounts: Record<string, number> = {};
    const words = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

    words.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    return Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));
  }, [text]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statCards = [
    { label: 'Words', value: stats.words, icon: Type, color: 'text-primary' },
    { label: 'Characters', value: stats.characters, icon: Hash, color: 'text-blue' },
    { label: 'No Spaces', value: stats.charactersNoSpaces, icon: LetterText, color: 'text-green' },
    { label: 'Sentences', value: stats.sentences, icon: AlignLeft, color: 'text-purple-500' },
    { label: 'Paragraphs', value: stats.paragraphs, icon: Pilcrow, color: 'text-amber-500' },
    { label: 'Read Time', value: `${stats.readingTime} min`, icon: Clock, color: 'text-rose-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Textarea */}
      <div className="rounded-card border border-border/60 bg-white shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-gray-50/50">
          <span className="text-xs font-medium text-muted">
            Type or paste your text below
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowLimitInput(!showLimitInput)}
              className="text-xs font-medium text-muted hover:text-primary transition-colors"
            >
              {charLimit ? `Limit: ${charLimit}` : 'Set limit'}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-primary transition-colors disabled:opacity-40"
            >
              {copied ? <CheckCircle2 size={13} className="text-green" /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={() => setText('')}
              disabled={!text}
              className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-red-500 transition-colors disabled:opacity-40"
            >
              <Trash2 size={13} /> Clear
            </button>
          </div>
        </div>

        {showLimitInput && (
          <div className="px-4 py-2 border-b border-border/40 bg-amber-50/50 flex items-center gap-3">
            <label className="text-xs font-medium text-dark">Character limit:</label>
            <input
              type="number"
              min={0}
              value={charLimit || ''}
              onChange={(e) => setCharLimit(e.target.value ? Number(e.target.value) : null)}
              placeholder="e.g. 280"
              className="w-24 rounded-lg border border-border px-2.5 py-1 text-sm focus:outline-none focus:border-primary"
            />
            {charLimit && (
              <button
                type="button"
                onClick={() => {
                  setCharLimit(null);
                  setShowLimitInput(false);
                }}
                className="text-xs text-red-500 font-medium"
              >
                Remove
              </button>
            )}
          </div>
        )}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full min-h-[200px] resize-y px-4 py-4 text-[15px] text-dark leading-relaxed focus:outline-none placeholder:text-muted/40"
          style={{ minHeight: '200px' }}
        />

        {/* Character limit bar */}
        {charLimit && (
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted">
                {stats.characters} / {charLimit} characters
              </span>
              <span
                className={`text-xs font-semibold ${
                  stats.characters > charLimit ? 'text-red-500' : 'text-green'
                }`}
              >
                {stats.characters > charLimit
                  ? `${stats.characters - charLimit} over`
                  : `${charLimit - stats.characters} remaining`}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  stats.characters > charLimit ? 'bg-red-500' : 'bg-green'
                }`}
                style={{ width: `${Math.min(100, (stats.characters / charLimit) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-card border border-border/60 bg-white p-4 shadow-card text-center"
          >
            <stat.icon size={18} className={`mx-auto mb-1.5 ${stat.color}`} />
            <p className="text-xl font-bold text-dark">{stat.value}</p>
            <p className="text-[11px] font-medium text-muted uppercase tracking-wide mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Top Keywords */}
      {topKeywords.length > 0 && (
        <div className="rounded-card border border-border/60 bg-white p-5 shadow-card">
          <h3 className="text-sm font-semibold text-dark mb-3">Top Keywords</h3>
          <div className="space-y-2">
            {topKeywords.map((kw, i) => (
              <div key={kw.word} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted w-4">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-dark">{kw.word}</span>
                    <span className="text-xs text-muted">{kw.count}×</span>
                  </div>
                  <div className="mt-1 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/60"
                      style={{
                        width: `${(kw.count / topKeywords[0].count) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
