import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'forest-green': '#1B3A2D',
        'electric-jade': '#2EE8A0',
        'warm-oat': '#F5F0E8',
        midnight: '#0E1A15',
        coral: '#FF6B5B',
        cloud: '#F2F2F0',
        ink: '#1A1A1A',
        champagne: '#C9A96E',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pawra-pulse-ring':
          'pawra-pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pawra-pulse-ring': {
          '0%': {boxShadow: '0 0 0 0 rgba(46, 232, 160, 0.55)'},
          '70%': {boxShadow: '0 0 0 12px rgba(46, 232, 160, 0)'},
          '100%': {boxShadow: '0 0 0 0 rgba(46, 232, 160, 0)'},
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
