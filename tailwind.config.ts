import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/mdx-components.tsx',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Corporate Pulse / Quiz palette
        primary: {
          DEFAULT: '#204e2b',
          container: '#386641',
          fixed: '#bcefc0',
          'fixed-dim': '#a0d3a5',
          hover: '#2F5637',
          active: '#26462D',
        },
        'on-primary': '#ffffff',
        'on-primary-container': '#afe2b3',
        secondary: {
          DEFAULT: '#984800',
          container: '#F97A00',
          fixed: '#ffdbc8',
          'fixed-dim': '#ffb689',
          hover: '#DF6D00',
        },
        'on-secondary': '#ffffff',
        'on-secondary-container': '#5c2900',
        'on-secondary-fixed': '#311300',
        tertiary: {
          DEFAULT: '#584100',
          container: '#755800',
          fixed: '#FED16A',
        },
        'on-tertiary': '#ffffff',
        'on-tertiary-fixed': '#251a00',
        'soft-cream': '#FFF4A4',
        'app-bg': '#F8FAF8',
        'surface-white': '#FFFFFF',
        surface: {
          DEFAULT: '#f2fcee',
          dim: '#d3ddcf',
          bright: '#f2fcee',
          variant: '#dbe5d8',
          container: '#e7f1e3',
          'container-low': '#ecf7e9',
          'container-high': '#e1ebdd',
          'container-highest': '#dbe5d8',
          'container-lowest': '#ffffff',
        },
        'on-surface': '#151e15',
        'on-surface-variant': '#414941',
        'on-background': '#151e15',
        background: '#f2fcee',
        outline: {
          DEFAULT: '#727970',
          variant: '#c1c9be',
        },
        'border-subtle': '#D8E0D8',
        success: {
          DEFAULT: '#2E7D32',
          green: '#2E7D32',
        },
        error: {
          DEFAULT: '#ba1a1a',
          red: '#D92D20',
          container: '#ffdad6',
        },
        brand: {
          green: '#386641',
          orange: '#F97A00',
          yellow: '#FED16A',
          cream: '#FFF4A4',
        },
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '48px',
        xl: '64px',
        gutter: '16px',
        'container-max': '1280px',
      },
      fontFamily: {
        sans: ['var(--font-be-vietnam)', 'Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['72px', { lineHeight: '90px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg-mobile': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'headline-lg': ['44px', { lineHeight: '52px', fontWeight: '700' }],
        'headline-lg-mobile': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'headline-md': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'headline-sm': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-lg': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'label-md': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(20, 40, 24, 0.06)',
        md: '0 8px 24px rgba(20, 40, 24, 0.10)',
        lg: '0 16px 40px rgba(20, 40, 24, 0.14)',
        card: '0 8px 30px rgba(0, 0, 0, 0.08)',
      },
      maxWidth: {
        'container-max': '1280px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.5' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(0.95)', opacity: '0.5' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
