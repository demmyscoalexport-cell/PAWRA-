/**
 * @file tailwind.config.ts
 * @description PAWRA Wild One–inspired design tokens — minimal black / white / dusty rose.
 */

import type {Config} from 'tailwindcss';

const rgb = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'page-bg': rgb('page-bg'),
        surface: rgb('surface'),
        'surface-elevated': rgb('surface-elevated'),
        'text-primary': rgb('text-primary'),
        'text-secondary': rgb('text-secondary'),
        'text-inverse': rgb('text-inverse'),
        'border-subtle': rgb('border-subtle'),
        'border-strong': rgb('border-strong'),
        'focus-ring': rgb('focus-ring'),
        'action-primary': rgb('action-primary'),
        'action-primary-hover': rgb('action-primary-hover'),
        'action-primary-label': rgb('action-primary-label'),
        'action-secondary': rgb('action-secondary-bg'),
        'action-destructive': rgb('action-destructive'),
        accent: rgb('accent'),
        success: rgb('success'),
        warning: rgb('warning'),
        sale: rgb('sale'),
        inverse: rgb('inverse'),

        // Legacy aliases → new palette
        'forest-green': rgb('action-primary'),
        'warm-oat': rgb('page-bg'),
        cloud: rgb('surface'),
        ink: rgb('text-primary'),
        'electric-jade': rgb('focus-ring'),
        midnight: rgb('inverse'),
        'forest-night': rgb('inverse'),
        coral: rgb('sale'),
        champagne: rgb('accent'),
        header: rgb('page-bg'),
        'cta-primary': rgb('action-primary'),
        'cta-primary-hover': rgb('action-primary-hover'),
        'cta-primary-active': rgb('action-primary-hover'),
      },
      fontFamily: {
        // All UI type is Inter — keep serif alias pointing to sans for compatibility
        serif: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', {lineHeight: '5rem', letterSpacing: '-0.02em', fontWeight: '400'}],
        'display-l': ['3.5rem', {lineHeight: '4rem', letterSpacing: '-0.02em', fontWeight: '400'}],
        'display-m': ['2.5rem', {lineHeight: '3rem', letterSpacing: '-0.02em', fontWeight: '400'}],
        'display-s': ['2rem', {lineHeight: '2.5rem', letterSpacing: '-0.02em', fontWeight: '400'}],
        'heading-xl': ['1.75rem', {lineHeight: '2.25rem', fontWeight: '500'}],
        'heading-l': ['1.75rem', {lineHeight: '2.25rem', fontWeight: '500'}],
        'heading-m': ['1.375rem', {lineHeight: '1.875rem', fontWeight: '500'}],
        'heading-s': ['1.125rem', {lineHeight: '1.625rem', fontWeight: '500'}],
        'heading-xs': ['1rem', {lineHeight: '1.5rem', fontWeight: '500'}],
        'body-xl': ['1.125rem', {lineHeight: '1.75rem', fontWeight: '400'}],
        'body-l': ['1.125rem', {lineHeight: '1.75rem', fontWeight: '400'}],
        'body-m': ['1rem', {lineHeight: '1.5rem', fontWeight: '400'}],
        'body-s': ['0.875rem', {lineHeight: '1.25rem', fontWeight: '400'}],
        'body-xs': ['0.75rem', {lineHeight: '1rem', fontWeight: '400'}],
        'mono-l': ['1rem', {lineHeight: '1.5rem', fontWeight: '400'}],
        'mono-m': ['1rem', {lineHeight: '1.5rem', fontWeight: '400'}],
        'mono-s': ['0.875rem', {lineHeight: '1.25rem', fontWeight: '400'}],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      maxWidth: {
        '1440': '1440px',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1rem',
        '3xl': '1rem',
        pill: '9999px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        xs: 'var(--shadow-sm)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-sm)',
        lg: 'var(--shadow-sm)',
        xl: 'var(--shadow-sm)',
        card: 'var(--shadow-sm)',
        elevated: 'var(--shadow-sm)',
        'jade-glow': 'none',
        'jade-glow-lg': 'none',
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out',
        'slide-up': 'slide-up 500ms ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        'slide-up': {
          '0%': {opacity: '0', transform: 'translateY(12px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
