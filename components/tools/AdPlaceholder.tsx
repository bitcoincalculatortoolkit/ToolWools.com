'use client';

interface AdPlaceholderProps {
  size: 'leaderboard' | 'rectangle' | 'mobile-banner';
}

const dimensions: Record<string, { width: string; height: string; label: string }> = {
  leaderboard: { width: '728px', height: '90px', label: '728×90' },
  rectangle: { width: '300px', height: '250px', label: '300×250' },
  'mobile-banner': { width: '320px', height: '50px', label: '320×50' },
};

export function AdPlaceholder({ size }: AdPlaceholderProps) {
  const dim = dimensions[size];

  return (
    <div
      className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-[#F9FAFB]"
      style={{ maxWidth: dim.width, height: dim.height, width: '100%' }}
    >
      <span className="text-xs font-medium text-muted/60 select-none">
        Advertisement · {dim.label}
      </span>
    </div>
  );
}
