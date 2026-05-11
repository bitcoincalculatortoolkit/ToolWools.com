'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlignLeft,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Hash,
  LetterText,
  Pilcrow,
  RotateCcw,
  Type,
  Upload,
  Volume2,
  VolumeX,
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   Stop words — common English function words excluded from
   keyword density calculations.
   ────────────────────────────────────────────────────────── */
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an',
  'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before',
  'being', 'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do',
  'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into',
  'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my',
  'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over',
  'own', 's', 'same', 'she', 'should', 'so', 'some', 'such', 't',
  'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves',
  'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to',
  'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what',
  'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will',
  'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves',
]);

/* ──────────────────────────────────────────────────────────
   Preset character limits for common use cases.
   ────────────────────────────────────────────────────────── */
type PresetId =
  | 'none'
  | 'twitter'
  | 'sms'
  | 'metaDesc'
  | 'metaTitle'
  | 'ogDesc'
  | 'linkedinHeadline'
  | 'youtube';

interface Preset {
  id: PresetId;
  label: string;
  limit: number | null;
  hint: string;
}

const PRESETS: Preset[] = [
  { id: 'none', label: 'No limit', limit: null, hint: 'Just count, no constraints.' },
  { id: 'twitter', label: 'X (Twitter) post', limit: 280, hint: '280 characters for regular posts.' },
  { id: 'sms', label: 'SMS message', limit: 160, hint: 'Single SMS is 160 characters.' },
  { id: 'metaTitle', label: 'SEO Title', limit: 60, hint: 'Google shows ~60 chars of the <title> tag.' },
  { id: 'metaDesc', label: 'SEO Meta description', limit: 160, hint: 'Keep under 160 chars to avoid truncation.' },
  { id: 'ogDesc', label: 'Open Graph description', limit: 200, hint: 'Facebook/LinkedIn shares work best under 200.' },
  { id: 'linkedinHeadline', label: 'LinkedIn headline', limit: 220, hint: 'Profile headline limit is 220 chars.' },
  { id: 'youtube', label: 'YouTube title', limit: 100, hint: 'YouTube caps titles at 100 chars.' },
];

/* ──────────────────────────────────────────────────────────
   Readability — Flesch Reading Ease + Flesch-Kincaid Grade
   Syllable counter uses a conservative heuristic.
   ────────────────────────────────────────────────────────── */
function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;

  // Remove trailing silent 'e', 'es', 'ed' (unless it makes a syllable)
  let cleaned = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  cleaned = cleaned.replace(/^y/, '');

  const matches = cleaned.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function fleschReadingEase(words: number, sentences: number, syllables: number): number {
  if (words === 0 || sentences === 0) return 0;
  return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
}

function fleschKincaidGrade(words: number, sentences: number, syllables: number): number {
  if (words === 0 || sentences === 0) return 0;
  return 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
}

function readingEaseLabel(score: number): {
  label: string;
  color: string;
  grade: string;
} {
  if (score >= 90) return { label: 'Very Easy', color: 'text-green', grade: '5th grade' };
  if (score >= 80) return { label: 'Easy', color: 'text-green', grade: '6th grade' };
  if (score >= 70) return { label: 'Fairly Easy', color: 'text-green', grade: '7th grade' };
  if (score >= 60) return { label: 'Standard', color: 'text-blue', grade: '8-9th grade' };
  if (score >= 50) return { label: 'Fairly Difficult', color: 'text-blue', grade: '10-12th grade' };
  if (score >= 30) return { label: 'Difficult', color: 'text-amber-600', grade: 'College' };
  return { label: 'Very Difficult', color: 'text-red-500', grade: 'College graduate' };
}

/* ──────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────── */
function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

function formatReadingTime(words: number): string {
  const minutes = words / 225; // Average adult reads 200-250 wpm; 225 is median.
  if (minutes < 1 / 60) return '0 sec';
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60);
    return `${seconds} sec`;
  }
  const whole = Math.floor(minutes);
  const remainder = Math.round((minutes - whole) * 60);
  if (remainder < 15) return `${whole} min`;
  if (remainder > 45) return `${whole + 1} min`;
  return `${whole}½ min`;
}

function formatSpeakingTime(words: number): string {
  const minutes = words / 130; // Average speaking pace is 130 wpm.
  if (minutes < 1 / 60) return '0 sec';
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60);
    return `${seconds} sec`;
  }
  const whole = Math.floor(minutes);
  const remainder = Math.round((minutes - whole) * 60);
  if (remainder < 15) return `${whole} min`;
  if (remainder > 45) return `${whole + 1} min`;
  return `${whole}½ min`;
}

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export function WordCounter() {
  const [text, setText] = useState('');
  const [preset, setPreset] = useState<PresetId>('none');
  const [customLimit, setCustomLimit] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [reportCopied, setReportCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  /* ───── Core stats (memoized; recompute only when text changes) ───── */
  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;

    const trimmed = text.trim();
    if (!trimmed) {
      return {
        characters,
        charactersNoSpaces,
        words: 0,
        uniqueWords: 0,
        sentences: 0,
        paragraphs: 0,
        syllables: 0,
        longestWord: '',
        avgWordLength: 0,
        avgSentenceLength: 0,
        sentenceLengths: [] as number[],
        readingEase: 0,
        gradeLevel: 0,
        keywords: [] as Array<{ word: string; count: number; density: number }>,
      };
    }

    // Words — split on whitespace, strip punctuation for accurate counts.
    const wordTokens = trimmed.split(/\s+/).filter(Boolean);
    const words = wordTokens.length;

    // Normalized alphabetic tokens used for keyword density & syllables.
    const alphaTokens = wordTokens
      .map((w) => w.toLowerCase().replace(/[^a-z']/g, ''))
      .filter(Boolean);

    const uniqueWords = new Set(alphaTokens).size;

    // Syllables — sum across all alphabetic tokens.
    const syllables = alphaTokens.reduce((acc, w) => acc + countSyllables(w), 0);

    // Sentences — robust split that handles ., !, ? including multiples.
    // Filter empties to avoid over-counting ellipses.
    const sentenceParts = trimmed
      .replace(/([.!?]+)(?=\s|$)/g, '$1|SENT|')
      .split('|SENT|')
      .map((s) => s.trim())
      .filter((s) => s && /[a-zA-Z0-9]/.test(s));
    const sentences = Math.max(sentenceParts.length, 0);

    // Sentence lengths (words per sentence).
    const sentenceLengths = sentenceParts.map(
      (s) => s.split(/\s+/).filter(Boolean).length,
    );
    const avgSentenceLength =
      sentences > 0 ? words / sentences : 0;

    // Paragraphs — split on blank lines.
    const paragraphs = trimmed
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean).length;

    // Longest word + average word length.
    let longest = '';
    let totalLen = 0;
    for (const w of wordTokens) {
      const clean = w.replace(/[^a-zA-Z'-]/g, '');
      totalLen += clean.length;
      if (clean.length > longest.length) longest = clean;
    }
    const avgWordLength = words > 0 ? totalLen / words : 0;

    // Keyword density — top non-stop-word tokens, min length 3.
    const counts: Record<string, number> = {};
    for (const w of alphaTokens) {
      if (w.length < 3 || STOP_WORDS.has(w)) continue;
      counts[w] = (counts[w] || 0) + 1;
    }
    const keywords = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({
        word,
        count,
        density: words > 0 ? (count / words) * 100 : 0,
      }));

    // Readability.
    const readingEase = fleschReadingEase(words, sentences || 1, syllables);
    const gradeLevel = fleschKincaidGrade(words, sentences || 1, syllables);

    return {
      characters,
      charactersNoSpaces,
      words,
      uniqueWords,
      sentences,
      paragraphs,
      syllables,
      longestWord: longest,
      avgWordLength,
      avgSentenceLength,
      sentenceLengths,
      readingEase,
      gradeLevel,
      keywords,
    };
  }, [text]);

  /* ───── Effective character limit (preset or custom) ───── */
  const activeLimit =
    customLimit ??
    PRESETS.find((p) => p.id === preset)?.limit ??
    null;

  const presetHint =
    PRESETS.find((p) => p.id === preset)?.hint ?? null;

  /* ───── Actions ───── */
  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [text]);

  const handleClear = useCallback(() => {
    setText('');
    if (speaking) {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
    }
  }, [speaking]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('text/') && !file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
        alert('Please upload a plain text (.txt, .md) file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (typeof result === 'string') setText(result);
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [],
  );

  const handleSpeak = useCallback(() => {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  }, [text, speaking]);

  const handleExportReport = useCallback(async () => {
    if (!text.trim()) return;
    const ease = readingEaseLabel(stats.readingEase);
    const report = [
      'ToolWools — Word Counter Report',
      `Generated ${new Date().toLocaleString()}`,
      '─────────────────────────────────────',
      '',
      'COUNTS',
      `Words: ${formatNumber(stats.words)}`,
      `Unique words: ${formatNumber(stats.uniqueWords)}`,
      `Characters (with spaces): ${formatNumber(stats.characters)}`,
      `Characters (no spaces): ${formatNumber(stats.charactersNoSpaces)}`,
      `Sentences: ${formatNumber(stats.sentences)}`,
      `Paragraphs: ${formatNumber(stats.paragraphs)}`,
      `Syllables: ${formatNumber(stats.syllables)}`,
      '',
      'STRUCTURE',
      `Average word length: ${stats.avgWordLength.toFixed(1)} characters`,
      `Average sentence length: ${stats.avgSentenceLength.toFixed(1)} words`,
      `Longest word: ${stats.longestWord}`,
      '',
      'TIME',
      `Reading time: ${formatReadingTime(stats.words)} (at 225 wpm)`,
      `Speaking time: ${formatSpeakingTime(stats.words)} (at 130 wpm)`,
      '',
      'READABILITY',
      `Flesch Reading Ease: ${stats.readingEase.toFixed(1)} — ${ease.label}`,
      `Flesch-Kincaid Grade: ${stats.gradeLevel.toFixed(1)} (${ease.grade})`,
      '',
      'TOP KEYWORDS',
      ...stats.keywords.slice(0, 5).map(
        (k, i) =>
          `${i + 1}. ${k.word} — ${k.count}× (${k.density.toFixed(2)}% density)`,
      ),
      '',
      '─────────────────────────────────────',
      'Analyzed with ToolWools · toolwools.com/tools/text-tools/word-counter',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(report);
      setReportCopied(true);
      setTimeout(() => setReportCopied(false), 2000);
    } catch {
      // Fallback: trigger download.
      const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'word-counter-report.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [text, stats]);

  /* ───── Sentence length distribution (for mini-chart) ───── */
  const lengthBuckets = useMemo(() => {
    // Buckets: 1-5, 6-10, 11-15, 16-20, 21-25, 26-30, 31+
    const buckets = [0, 0, 0, 0, 0, 0, 0];
    for (const l of stats.sentenceLengths) {
      if (l <= 5) buckets[0]++;
      else if (l <= 10) buckets[1]++;
      else if (l <= 15) buckets[2]++;
      else if (l <= 20) buckets[3]++;
      else if (l <= 25) buckets[4]++;
      else if (l <= 30) buckets[5]++;
      else buckets[6]++;
    }
    return buckets;
  }, [stats.sentenceLengths]);

  const maxBucket = Math.max(...lengthBuckets, 1);
  const bucketLabels = ['1-5', '6-10', '11-15', '16-20', '21-25', '26-30', '31+'];

  /* ───── Character limit state for active preset ───── */
  const limitPct = activeLimit
    ? Math.min(100, (stats.characters / activeLimit) * 100)
    : 0;
  const limitOver = activeLimit ? stats.characters > activeLimit : false;

  const easeInfo = readingEaseLabel(stats.readingEase);

  /* ───── Render ───── */
  return (
    <div className="space-y-6">
      {/* ─────────── Preset selector ─────────── */}
      <div className="rounded-2xl border border-border/50 bg-white p-4 shadow-card">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[13px] font-semibold text-dark">Target length preset</p>
          <span className="text-[11.5px] text-muted">{presetHint ?? 'Choose a platform limit to track.'}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPreset(p.id);
                setCustomLimit(null);
              }}
              className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-all duration-200 ${
                preset === p.id && customLimit === null
                  ? 'bg-dark text-white shadow-sm'
                  : 'bg-gray-100 text-body hover:bg-gray-200'
              }`}
            >
              {p.label}
              {p.limit !== null && (
                <span className="ml-1.5 opacity-60">· {p.limit}</span>
              )}
            </button>
          ))}
          {/* Custom limit input */}
          <div className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 bg-white">
            <span className="text-[12px] text-muted">Custom:</span>
            <input
              type="number"
              min={1}
              value={customLimit ?? ''}
              onChange={(e) => {
                const v = e.target.value;
                setCustomLimit(v ? Math.max(1, parseInt(v, 10) || 0) : null);
                if (v) setPreset('none');
              }}
              placeholder="e.g. 500"
              className="w-20 bg-transparent text-[12.5px] font-medium text-dark focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ─────────── Editor card ─────────── */}
      <div className="rounded-2xl border border-border/50 bg-white shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-gradient-to-r from-gray-50/80 to-transparent">
          <span className="text-[12px] font-semibold text-muted uppercase tracking-wider">
            Your text
          </span>
          <div className="flex items-center gap-1">
            <label className="inline-flex items-center gap-1 cursor-pointer rounded-lg px-2.5 py-1 text-[12px] font-medium text-muted hover:bg-gray-100 hover:text-dark transition-colors">
              <Upload size={13} />
              Upload
              <input
                type="file"
                accept=".txt,.md,text/plain,text/markdown"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </label>
            <button
              type="button"
              onClick={handleSpeak}
              disabled={!text}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[12px] font-medium text-muted hover:bg-gray-100 hover:text-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title={speaking ? 'Stop reading' : 'Read aloud'}
            >
              {speaking ? <VolumeX size={13} className="text-primary" /> : <Volume2 size={13} />}
              {speaking ? 'Stop' : 'Listen'}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[12px] font-medium text-muted hover:bg-gray-100 hover:text-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied ? <CheckCircle2 size={13} className="text-green" /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[12px] font-medium text-muted hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here. Stats update in real time."
          className="w-full min-h-[260px] max-h-[640px] resize-y px-5 py-5 text-[15.5px] text-dark leading-[1.7] focus:outline-none placeholder:text-muted/50 bg-white tabular-nums"
          spellCheck={false}
        />

        {/* Character limit bar (active when preset or custom limit set) */}
        {activeLimit !== null && (
          <div className="px-5 pb-4 pt-1 border-t border-border/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] text-muted">
                <span className="font-semibold text-dark tabular-nums">
                  {formatNumber(stats.characters)}
                </span>{' '}
                / {formatNumber(activeLimit)} characters
              </span>
              <span
                className={`text-[12px] font-semibold tabular-nums ${
                  limitOver ? 'text-red-500' : 'text-green'
                }`}
              >
                {limitOver
                  ? `${formatNumber(stats.characters - activeLimit)} over limit`
                  : `${formatNumber(activeLimit - stats.characters)} remaining`}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${limitPct}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  limitOver
                    ? 'bg-gradient-to-r from-red-400 to-red-500'
                    : limitPct > 85
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                    : 'bg-gradient-to-r from-green to-green/70'
                }`}
              />
            </div>
          </div>
        )}
      </div>

      {/* ─────────── Primary stats grid ─────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <PrimaryStat icon={Type} label="Words" value={formatNumber(stats.words)} color="text-primary" accent="bg-primary-bg" />
        <PrimaryStat icon={Hash} label="Characters" value={formatNumber(stats.characters)} color="text-blue" accent="bg-blue-bg" />
        <PrimaryStat icon={LetterText} label="No Spaces" value={formatNumber(stats.charactersNoSpaces)} color="text-green" accent="bg-green-bg" />
        <PrimaryStat icon={AlignLeft} label="Sentences" value={formatNumber(stats.sentences)} color="text-purple-600" accent="bg-purple-50" />
        <PrimaryStat icon={Pilcrow} label="Paragraphs" value={formatNumber(stats.paragraphs)} color="text-amber-600" accent="bg-amber-50" />
        <PrimaryStat icon={Clock} label="Reading" value={formatReadingTime(stats.words)} color="text-rose-500" accent="bg-rose-50" />
      </div>

      {/* ─────────── Secondary detail grid ─────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Readability card */}
        <div className="rounded-2xl border border-border/50 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-dark">Readability</h3>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Flesch-Kincaid
            </span>
          </div>

          <div className="mt-4 flex items-end gap-4">
            <div>
              <p className="text-[44px] font-bold tabular-nums leading-none text-dark">
                {stats.words > 0 ? stats.readingEase.toFixed(0) : '–'}
              </p>
              <p className={`mt-1 text-[13px] font-semibold ${easeInfo.color}`}>
                {stats.words > 0 ? easeInfo.label : 'No text yet'}
              </p>
            </div>
            <div className="flex-1 pb-1">
              {/* Ease scale bar 0-100 */}
              <div className="h-2 w-full rounded-full overflow-hidden bg-gradient-to-r from-red-400 via-amber-400 to-green relative">
                {stats.words > 0 && (
                  <motion.div
                    initial={false}
                    animate={{
                      left: `${Math.max(0, Math.min(100, stats.readingEase))}%`,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dark border-2 border-white shadow-md"
                  />
                )}
              </div>
              <div className="mt-1.5 flex justify-between text-[10.5px] text-muted">
                <span>Hard</span>
                <span>Standard</span>
                <span>Easy</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-border/40">
            <MiniStat label="Grade" value={stats.words > 0 ? stats.gradeLevel.toFixed(1) : '–'} suffix={stats.words > 0 ? easeInfo.grade : ''} />
            <MiniStat label="Syllables" value={formatNumber(stats.syllables)} />
            <MiniStat label="Avg word" value={stats.words > 0 ? `${stats.avgWordLength.toFixed(1)} ch` : '–'} />
          </div>
        </div>

        {/* Sentence length distribution chart */}
        <div className="rounded-2xl border border-border/50 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-dark">Sentence length distribution</h3>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              words / sentence
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-1.5 h-[120px]">
            {lengthBuckets.map((count, i) => {
              const h = count > 0 ? (count / maxBucket) * 100 : 3;
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="mb-1 text-[10px] font-semibold tabular-nums text-muted">
                    {count > 0 ? count : ''}
                  </span>
                  <motion.div
                    initial={{ height: '3%' }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                    className={`w-full rounded-t-md ${
                      count > 0
                        ? 'bg-gradient-to-b from-primary to-primary/60'
                        : 'bg-gray-100'
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex items-end justify-between gap-1.5">
            {bucketLabels.map((l) => (
              <span key={l} className="flex-1 text-center text-[10px] text-muted">
                {l}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-border/40">
            <MiniStat label="Avg length" value={stats.words > 0 ? stats.avgSentenceLength.toFixed(1) : '–'} suffix="words" />
            <MiniStat label="Unique words" value={formatNumber(stats.uniqueWords)} />
            <MiniStat label="Longest word" value={stats.longestWord || '–'} />
          </div>
        </div>
      </div>

      {/* ─────────── Keyword density ─────────── */}
      {stats.keywords.length > 0 && (
        <div className="rounded-2xl border border-border/50 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-bold text-dark">Keyword density</h3>
              <p className="mt-0.5 text-[12px] text-muted">
                Top recurring keywords (stop words excluded). Ideal density for SEO: 1-3%.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full bg-blue-bg px-2.5 py-1 text-[11px] font-semibold text-blue">
              {stats.uniqueWords} unique
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {stats.keywords.map((k, i) => (
              <div key={k.word} className="flex items-center gap-3">
                <span className="w-5 text-[11px] font-bold text-muted tabular-nums">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13.5px] font-semibold text-dark truncate">
                      {k.word}
                    </span>
                    <span className="text-[11.5px] text-muted tabular-nums whitespace-nowrap">
                      {k.count}× · {k.density.toFixed(2)}%
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(k.count / stats.keywords[0].count) * 100}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────── Time breakdown + Export ─────────── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
        <div className="rounded-2xl border border-border/50 bg-white p-5 shadow-card">
          <h3 className="text-[14px] font-bold text-dark">Time to consume</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-rose-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-500">
                Reading
              </p>
              <p className="mt-1 text-[20px] font-bold text-dark tabular-nums">
                {formatReadingTime(stats.words)}
              </p>
              <p className="mt-0.5 text-[11px] text-muted">at 225 words per minute</p>
            </div>
            <div className="rounded-xl bg-blue-bg p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-blue">
                Speaking
              </p>
              <p className="mt-1 text-[20px] font-bold text-dark tabular-nums">
                {formatSpeakingTime(stats.words)}
              </p>
              <p className="mt-0.5 text-[11px] text-muted">at 130 words per minute</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary-bg to-white p-5 shadow-card flex flex-col justify-between min-w-[220px]">
          <div>
            <h3 className="text-[14px] font-bold text-dark">Export analysis</h3>
            <p className="mt-1 text-[12px] text-muted">
              Copy a complete report to your clipboard.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExportReport}
            disabled={!text.trim()}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-dark px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-dark/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {reportCopied ? (
              <>
                <CheckCircle2 size={14} className="text-green" /> Copied report
              </>
            ) : (
              <>
                <Download size={14} /> Copy full report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Internal presentational components
   ────────────────────────────────────────────────────────── */
function PrimaryStat({
  icon: Icon,
  label,
  value,
  color,
  accent,
}: {
  icon: typeof Type;
  label: string;
  value: string;
  color: string;
  accent: string;
}) {
  return (
    <div className="relative rounded-2xl border border-border/50 bg-white p-4 shadow-card overflow-hidden group transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5">
      <div className={`absolute -top-6 -right-6 h-16 w-16 rounded-full ${accent} opacity-60 transition-opacity duration-200 group-hover:opacity-100`} />
      <div className="relative">
        <Icon size={16} className={color} strokeWidth={2} />
        <p className="mt-3 text-[22px] font-bold text-dark leading-none tabular-nums">
          {value}
        </p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1 text-[14px] font-bold text-dark leading-tight truncate">
        {value}
      </p>
      {suffix ? (
        <p className="text-[10.5px] text-muted truncate">{suffix}</p>
      ) : null}
    </div>
  );
}
