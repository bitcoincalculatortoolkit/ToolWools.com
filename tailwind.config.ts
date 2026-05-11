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
        canvas: '#fbfaf9',
        stone: {
          surface: '#f2f0ed',
        },
        parchment: '#f8f7f4',
        graphite: '#474645',
        charcoal: '#343433',
        midnight: '#121212',
        obsidian: '#000000',
        ash: '#848281',
        fog: '#c6c6c6',
        smoke: '#a7a7a7',
        pepper: '#282624',
        ember: '#ff3e00',
        meadow: '#00ca48',
        sky: '#0090ff',
        sunburst: '#ffbb26',
        'deep-amber': '#d48f00',
        ocean: '#0086fc',
        'ice-blue': '#64c6ff',
        spearmint: '#00c978',
        flamingo: '#ff58ae',
        violet: '#9f4fff',
        coral: '#ff2b3a',
        valid: '#00c454',
      },
      fontFamily: {
        display: [
          'Fraunces',
          'Playfair Display',
          'ui-serif',
          'Georgia',
          'serif',
        ],
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        caption: ['12px', { lineHeight: '1.58', letterSpacing: '-0.14px' }],
        body: ['15px', { lineHeight: '1.47', letterSpacing: '-0.2px' }],
        'heading-sm': ['19px', { lineHeight: '1.38', letterSpacing: '-0.25px' }],
        heading: ['23px', { lineHeight: '1.2', letterSpacing: '-0.44px' }],
        'heading-lg': ['44px', { lineHeight: '1.09', letterSpacing: '-1.14px' }],
        display: ['68px', { lineHeight: '1.09', letterSpacing: '-2.11px' }],
      },
      borderRadius: {
        tags: '6px',
        cards: '10px',
        icons: '40px',
        inputs: '10px',
        buttons: '32px',
        'cards-lg': '24px',
        pill: '32px',
        illustrations: '72px',
      },
      boxShadow: {
        subtle:
          'inset 0 0 0 1px rgba(242, 240, 237, 1)',
        'subtle-3': '0 0 0 1px rgba(0, 0, 0, 0.04)',
        sm: '0 1px 6px rgba(0,0,0,0.04), 0 0 24px rgba(0,0,0,0.05)',
        lg: '0 0 24px rgba(0,0,0,0.15)',
      },
      spacing: {
        4.5: '18px',
        15: '60px',
        19: '76px',
        22: '88px',
        23: '92px',
        24.5: '96px',
        26: '104px',
      },
      maxWidth: {
        page: '1200px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.19, 1, 0.22, 1)',
        lux: 'cubic-bezier(0.4, 0, 0.2, 1)',
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
        bob: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(2deg)' },
        },
      },
      animation: {
        floatY: 'floatY 4s ease-in-out infinite',
        floatY2: 'floatY 4s ease-in-out infinite 1.2s',
        blob: 'blob 18s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        bob: 'bob 3s ease-in-out infinite',
        'bob-delay': 'bob 3s ease-in-out infinite 0.8s',
        'bob-delay-2': 'bob 3s ease-in-out infinite 1.6s',
      },
    },
  },
  plugins: [],
};

export default config;
