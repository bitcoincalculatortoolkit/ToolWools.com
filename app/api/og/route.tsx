import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'ToolWools';
  const description = searchParams.get('description') || 'Free Online Tools';
  const category = searchParams.get('category') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 60%, #111111 100%)',
          position: 'relative',
        }}
      >
        {/* Subtle radial gradient accent */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,81,30,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top section: Logo + Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #F4511E, #E64A19)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontSize: '20px', fontWeight: 800 }}>T</span>
            </div>
            <span style={{ color: 'white', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              ToolWools
            </span>
          </div>
          {category && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 20px',
                borderRadius: '30px',
                background: 'rgba(244,81,30,0.15)',
                border: '1px solid rgba(244,81,30,0.3)',
              }}
            >
              <span style={{ color: '#F4511E', fontSize: '16px', fontWeight: 600 }}>{category}</span>
            </div>
          )}
        </div>

        {/* Middle section: Title + Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              color: 'white',
              fontSize: '48px',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: '#9CA3AF',
              fontSize: '24px',
              fontWeight: 400,
              lineHeight: 1.4,
              margin: 0,
              maxWidth: '800px',
            }}
          >
            {description}
          </p>
        </div>

        {/* Bottom section: Tagline + URL */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ color: '#6B7280', fontSize: '16px', fontWeight: 500 }}>
              Free • No Signup • Browser-based
            </span>
          </div>
          <span style={{ color: '#6B7280', fontSize: '18px', fontWeight: 600 }}>
            toolwools.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
