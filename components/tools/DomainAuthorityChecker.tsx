'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Search,
  Link2,
  Clock,
  Shield,
  Loader2,
  History,
  ExternalLink,
} from 'lucide-react';

interface DomainResult {
  domain: string;
  da: number;
  pa: number;
  spamScore: number;
  backlinks: number;
  referringDomains: number;
  domainAge: string;
  checkedAt: string;
}

// Deterministic hash function for consistent mock data
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function generateMockData(domain: string): Omit<DomainResult, 'checkedAt'> {
  const h = hashString(domain.toLowerCase().trim());
  const da = (h % 80) + 15; // 15-94
  const pa = Math.max(10, da - (h % 20) + 5); // Related to DA
  const spamScore = (h % 30) + ((h % 7) > 4 ? 20 : 0); // 0-49 mostly
  const backlinks = ((h % 500) + 50) * (da > 50 ? 100 : 10);
  const referringDomains = Math.round(backlinks * (0.1 + (h % 30) / 100));
  const years = (h % 15) + 1;
  const months = h % 12;
  const domainAge = `${years} year${years > 1 ? 's' : ''}, ${months} month${months > 1 ? 's' : ''}`;

  return {
    domain: domain.toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, ''),
    da: Math.min(da, 99),
    pa: Math.min(pa, 99),
    spamScore: Math.min(spamScore, 99),
    backlinks,
    referringDomains,
    domainAge,
  };
}

function CircularGauge({
  value,
  label,
  color,
  size = 120,
}: {
  value: number;
  label: string;
  color: string;
  size?: number;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const getColor = () => {
    if (label === 'Spam Score') {
      if (value < 30) return 'text-green stroke-green';
      if (value < 60) return 'text-yellow-500 stroke-yellow-500';
      return 'text-red-500 stroke-red-500';
    }
    if (value >= 60) return 'text-green stroke-green';
    if (value >= 30) return 'text-yellow-500 stroke-yellow-500';
    return 'text-red-500 stroke-red-500';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CountUp target={animatedValue} className={`text-2xl font-bold ${getColor().split(' ')[0]}`} />
          <span className="text-[10px] text-muted font-medium">/100</span>
        </div>
      </div>
      <p className="mt-2 text-xs font-semibold text-dark text-center">{label}</p>
    </div>
  );
}

function CountUp({ target, className }: { target: number; className: string }) {
  const [count, setCount] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (target - startValue) * eased));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [target]);

  return <span className={className}>{count}</span>;
}

function getHealthStatus(da: number, spamScore: number) {
  if (da >= 60 && spamScore < 20) return { label: 'Excellent', color: 'bg-green', textColor: 'text-green' };
  if (da >= 40 && spamScore < 40) return { label: 'Good', color: 'bg-yellow-400', textColor: 'text-yellow-600' };
  if (da >= 20) return { label: 'Average', color: 'bg-orange-400', textColor: 'text-orange-600' };
  return { label: 'Needs Improvement', color: 'bg-red-500', textColor: 'text-red-500' };
}

export function DomainAuthorityChecker() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DomainResult | null>(null);
  const [history, setHistory] = useState<DomainResult[]>([]);

  const handleCheck = async () => {
    const cleaned = domain.trim().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
    if (!cleaned) return;

    setLoading(true);
    setResult(null);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    const mockData = generateMockData(cleaned);
    const newResult: DomainResult = {
      ...mockData,
      checkedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setResult(newResult);
    setHistory((prev) => [newResult, ...prev.filter((h) => h.domain !== newResult.domain)].slice(0, 5));
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck();
  };

  const healthStatus = result ? getHealthStatus(result.da, result.spamScore) : null;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="rounded-card border border-border/60 bg-white p-5 shadow-card">
        <label className="text-sm font-semibold text-dark mb-3 block">
          Enter Domain
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/50" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="example.com"
              className="w-full rounded-btn border border-border pl-9 pr-3 py-2.5 text-sm text-dark placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
          <button
            type="button"
            onClick={handleCheck}
            disabled={loading || !domain.trim()}
            className="inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Search size={16} />
            )}
            Check Authority
          </button>
        </div>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-card border border-border/60 bg-white p-10 shadow-card text-center"
          >
            <Loader2 size={32} className="animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm font-medium text-dark">Analyzing domain authority...</p>
            <p className="text-xs text-muted mt-1">Checking backlinks, trust signals, and more</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Domain Header */}
            <div className="rounded-card border border-border/60 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-bg grid place-items-center">
                    <Globe size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark">{result.domain}</p>
                    <p className="text-xs text-muted">Checked at {result.checkedAt}</p>
                  </div>
                </div>
                {healthStatus && (
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${healthStatus.color}`} />
                    <span className={`text-xs font-semibold ${healthStatus.textColor}`}>
                      {healthStatus.label}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Circular Gauges */}
            <div className="rounded-card border border-border/60 bg-white p-6 shadow-card">
              <div className="grid grid-cols-3 gap-4">
                <CircularGauge value={result.da} label="Domain Authority" color="green" />
                <CircularGauge value={result.pa} label="Page Authority" color="blue" />
                <CircularGauge value={result.spamScore} label="Spam Score" color="red" />
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-card border border-border/60 bg-white p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-blue-bg grid place-items-center">
                    <Link2 size={16} className="text-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Backlinks</p>
                    <p className="text-lg font-bold text-dark">
                      {result.backlinks.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-card border border-border/60 bg-white p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-green-bg grid place-items-center">
                    <ExternalLink size={16} className="text-green" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Referring Domains</p>
                    <p className="text-lg font-bold text-dark">
                      {result.referringDomains.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-card border border-border/60 bg-white p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary-bg grid place-items-center">
                    <Clock size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Domain Age</p>
                    <p className="text-lg font-bold text-dark">{result.domainAge}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Health Summary */}
            <div className="rounded-card border border-border/60 bg-white p-5 shadow-card">
              <h3 className="text-sm font-semibold text-dark mb-3 flex items-center gap-2">
                <Shield size={16} className="text-primary" />
                SEO Health Summary
              </h3>
              <div className="space-y-2.5">
                <HealthRow
                  label="Authority Score"
                  status={result.da >= 60 ? 'good' : result.da >= 30 ? 'moderate' : 'poor'}
                  detail={`DA ${result.da}/100 — ${result.da >= 60 ? 'Strong domain authority' : result.da >= 30 ? 'Building authority' : 'Low authority, needs work'}`}
                />
                <HealthRow
                  label="Spam Risk"
                  status={result.spamScore < 20 ? 'good' : result.spamScore < 50 ? 'moderate' : 'poor'}
                  detail={`Score ${result.spamScore}/100 — ${result.spamScore < 20 ? 'Low spam risk' : result.spamScore < 50 ? 'Moderate risk, review backlinks' : 'High risk, audit needed'}`}
                />
                <HealthRow
                  label="Backlink Profile"
                  status={result.referringDomains > 100 ? 'good' : result.referringDomains > 20 ? 'moderate' : 'poor'}
                  detail={`${result.referringDomains.toLocaleString()} referring domains — ${result.referringDomains > 100 ? 'Diverse link profile' : result.referringDomains > 20 ? 'Growing link profile' : 'Limited backlinks'}`}
                />
                <HealthRow
                  label="Domain Maturity"
                  status={parseInt(result.domainAge) >= 5 ? 'good' : parseInt(result.domainAge) >= 2 ? 'moderate' : 'poor'}
                  detail={`${result.domainAge} — ${parseInt(result.domainAge) >= 5 ? 'Well-established domain' : parseInt(result.domainAge) >= 2 ? 'Maturing domain' : 'Relatively new domain'}`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent History */}
      {history.length > 0 && (
        <div className="rounded-card border border-border/60 bg-white p-5 shadow-card">
          <h3 className="text-sm font-semibold text-dark mb-3 flex items-center gap-2">
            <History size={16} className="text-muted" />
            Recent Checks
          </h3>
          <div className="space-y-2">
            {history.map((item, idx) => (
              <button
                key={`${item.domain}-${idx}`}
                type="button"
                onClick={() => {
                  setDomain(item.domain);
                  setResult(item);
                }}
                className="w-full flex items-center justify-between rounded-btn px-3 py-2.5 text-left hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Globe size={14} className="text-muted/50 group-hover:text-primary transition-colors" />
                  <span className="text-sm text-dark font-medium">{item.domain}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-primary">DA {item.da}</span>
                  <span className="text-[11px] text-muted">{item.checkedAt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HealthRow({
  label,
  status,
  detail,
}: {
  label: string;
  status: 'good' | 'moderate' | 'poor';
  detail: string;
}) {
  const colors = {
    good: { dot: 'bg-green', text: 'text-green' },
    moderate: { dot: 'bg-yellow-400', text: 'text-yellow-600' },
    poor: { dot: 'bg-red-500', text: 'text-red-500' },
  };

  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className={`h-2 w-2 rounded-full ${colors[status].dot} flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-dark">{label}</span>
          <span className={`text-[11px] font-semibold capitalize ${colors[status].text}`}>
            {status}
          </span>
        </div>
        <p className="text-[11px] text-muted mt-0.5">{detail}</p>
      </div>
    </div>
  );
}
