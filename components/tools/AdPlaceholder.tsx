'use client';

interface AdPlaceholderProps {
  size: 'leaderboard' | 'rectangle' | 'mobile-banner';
}

const dimensions: Record<string, { width: string; height: string; label: string }> = {
  leaderboard: { width: '728px', height: '90px', label: '728×90' },
  rectangle: { width: '300px', height: '250px', label: '300×250' },
  'mobile-banner': { width: '320px', height: '50px', label: '320×50' },
};

const adSlotMap: Record<string, string> = {
  leaderboard: '',
  rectangle: '',
  'mobile-banner': '',
};

export function AdPlaceholder({ size }: AdPlaceholderProps) {
  const dim = dimensions[size];
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const adSlot = adSlotMap[size];

  // If AdSense is configured, render real ad unit
  if (adsenseId) {
    return (
      /* Replace with real AdSense code when approved */
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          maxWidth: dim.width,
          height: dim.height,
          width: '100%',
        }}
        data-ad-client={adsenseId}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  }

  // Placeholder for development / pre-approval
  return (
    <div
      className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-[#F9FAFB]"
      style={{ maxWidth: dim.width, height: dim.height, width: '100%' }}
      data-ad-slot=""
    >
      {/* Replace with real AdSense code when approved */}
      <span className="text-xs font-medium text-muted/60 select-none">
        Advertisement · {dim.label}
      </span>
    </div>
  );
}
