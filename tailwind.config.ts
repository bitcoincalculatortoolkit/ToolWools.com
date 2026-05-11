import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF9F6',
          2: '#F3F1EC',
          3: '#EAE7E0',
        },
        gold: {
          DEFAULT: '#B8962E',
          light: '#C9A84C',
          bg: '#F7F0DC',
          border: '#E8D5A0',
        },
        ink: {
          DEFAULT: '#111110',
          2: '#3A3A38',
          3: '#6B6B68',
          4: '#9A9A97',
        },
        line: {
          DEFAULT: '#E2DDD4',
          2: '#CCC8BE',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '28px',
        pill: '40px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)',
        lux: '0 8px 40px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04)',
        gold: '0 0 0 1px rgba(184,150,46,0.15), 0 8px 30px rgba(184,150,46,0.12)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        drawCheck: {
          '0%': { strokeDashoffset: '60' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        floatY: 'floatY 4s ease-in-out infinite',
        floatY2: 'floatY 4s ease-in-out infinite 1.2s',
        blob: 'blob 18s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        drawCheck: 'drawCheck 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
