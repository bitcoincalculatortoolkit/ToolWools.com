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
        },
        blue: {
          DEFAULT: '#2563EB',
          bg: '#EFF6FF',
        },
        green: {
          DEFAULT: '#10B981',
          bg: '#F0FDF4',
        },
        dark: '#111111',
        body: '#374151',
        muted: '#6B7280',
        border: '#E5E7EB',
        surface: '#FFFFFF',
        bg: '#FAFAFA',
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        hover: '0 4px 24px rgba(0,0,0,0.10)',
      },
      maxWidth: {
        page: '1280px',
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
      },
    },
  },
  plugins: [],
};

export default config;
