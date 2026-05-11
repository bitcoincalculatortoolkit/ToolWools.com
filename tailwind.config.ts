import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F4511E',
          light: '#FF7043',
          bg: '#FFF3EE',
          dark: '#D84315',
          '50': '#FFF3EE',
          '100': '#FFE0D0',
          '200': '#FFBFA0',
          '300': '#FF9A6C',
          '400': '#FF7043',
          '500': '#F4511E',
          '600': '#D84315',
          '700': '#BF360C',
          '800': '#8C2A0A',
          '900': '#5C1A06',
        },
        blue: {
          DEFAULT: '#2563EB',
          bg: '#EFF6FF',
          light: '#60A5FA',
          dark: '#1D4ED8',
        },
        green: {
          DEFAULT: '#10B981',
          bg: '#F0FDF4',
          light: '#34D399',
          dark: '#059669',
        },
        dark: '#111111',
        body: '#374151',
        muted: '#6B7280',
        border: '#E5E7EB',
        surface: '#FFFFFF',
        bg: '#FAFAFA',
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'Bricolage Grotesque', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        hover: '0 4px 24px rgba(0,0,0,0.10)',
        glass: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
        'glass-lg': '0 12px 48px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
        glow: '0 0 20px rgba(244,81,30,0.15), 0 0 60px rgba(244,81,30,0.08)',
        'glow-lg': '0 0 40px rgba(244,81,30,0.2), 0 0 80px rgba(244,81,30,0.1)',
        'glow-blue': '0 0 20px rgba(37,99,235,0.15), 0 0 60px rgba(37,99,235,0.08)',
        'glow-green': '0 0 20px rgba(16,185,129,0.15), 0 0 60px rgba(16,185,129,0.08)',
        'premium-sm': '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        premium: '0 2px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 12px 48px rgba(0,0,0,0.06)',
        'premium-xl': '0 4px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 24px 80px rgba(0,0,0,0.1)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.02)',
      },
      maxWidth: {
        page: '1280px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '100%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'pulse-star': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sway: {
          '0%': { transform: 'rotate(-2deg)' },
          '100%': { transform: 'rotate(2deg)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(20px)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'rotate-in': {
          '0%': { opacity: '0', transform: 'rotate(-5deg) scale(0.95)' },
          '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'drift': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(10px, -10px) rotate(2deg)' },
          '66%': { transform: 'translate(-5px, 5px) rotate(-1deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
        'drift-slow': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(15px, -15px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'particle-float': {
          '0%': { transform: 'translateY(100%) scale(0)', opacity: '0' },
          '10%': { opacity: '1', transform: 'translateY(80%) scale(1)' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-20%) scale(0.5)', opacity: '0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite alternate',
        'float-delay-1': 'float 3s ease-in-out 0.4s infinite alternate',
        'float-delay-2': 'float 3s ease-in-out 0.8s infinite alternate',
        'float-delay-3': 'float 3s ease-in-out 1.2s infinite alternate',
        'float-slow': 'float-slow 4s ease-in-out infinite alternate',
        'pulse-star': 'pulse-star 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        sway: 'sway 2.5s ease-in-out infinite alternate',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-fade': 'slide-up-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'rotate-in': 'rotate-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'drift-slow': 'drift-slow 20s ease-in-out infinite',
        'particle-float': 'particle-float 8s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};

export default config;
