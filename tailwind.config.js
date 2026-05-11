/** @type {import('tailwindcss').Config} */
/**
 * Semantic palette: Vedic / ritual-booking — indigo primary for app chrome, teal accent,
 * extended warm scale (peach, saffron, gold) for marketing and ritual highlights.
 *
 * Hex for canvas/surface/primary/ink must stay aligned with `src/theme/palette.ts`
 * (used by native tab bar via `semanticColors`).
 */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#fafaf9',
          dark: '#0c0a09',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1c1917',
        },
        'surface-elevated': {
          DEFAULT: '#f5f5f4',
          dark: '#292524',
        },
        border: {
          DEFAULT: '#e7e5e4',
          dark: '#44403c',
        },
        primary: {
          DEFAULT: '#4338ca',
          hover: '#3730a3',
          soft: '#eef2ff',
          dark: '#a5b4fc',
          'soft-dark': '#312e81',
        },
        accent: {
          DEFAULT: '#0f766e',
          soft: '#ccfbf1',
          dark: '#2dd4bf',
          'soft-dark': '#134e4a',
        },
        /** Peach / saffron / gold — ritual marketing + onboarding (see `palette.ts`) */
        warm: {
          DEFAULT: '#c2410c',
          subtle: '#fff7ed',
          muted: '#fdba74',
          dark: '#fbbf24',
          'on-dark': '#fef3c7',
          deep: '#7c2d12',
          peach: '#ffead5',
          saffron: '#ea580c',
          gold: '#facc15',
        },
        ink: {
          DEFAULT: '#1c1917',
          ondark: '#fafaf9',
          muted: '#57534e',
          'muted-ondark': '#a8a29e',
          subtle: '#78716c',
        },
        /**
         * Ritual marketing palette — onboarding, premium storytelling (see `palette.ts` ritual).
         * Usage: `bg-ritual-canvas dark:bg-ritual-canvas-dark`, `text-ritual-ink`, etc.
         */
        ritual: {
          canvas: { DEFAULT: '#FFF8F1', dark: '#1C1714' },
          surface: { DEFAULT: '#FFFFFF', dark: '#25211D' },
          surfaceSecondary: { DEFAULT: '#F9EBDD', dark: '#302922' },
          primary: { DEFAULT: '#F97316', dark: '#D9915C' },
          primarySoft: { DEFAULT: '#FDBA74', dark: '#4A3228' },
          ink: { DEFAULT: '#1C1917', dark: '#F2EDE6' },
          inkMuted: { DEFAULT: '#57534E', dark: '#9C948C' },
          borderSoft: { DEFAULT: '#FED7AA', dark: '#5C4030' },
          success: { DEFAULT: '#16A34A', dark: '#22C55E' },
        },
      },
      spacing: {
        /** 8pt grid helpers */
        4.5: '18px',
        7.5: '30px',
        15: '60px',
      },
      fontSize: {
        'onboarding-hero': ['28px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
        'onboarding-body': ['15px', { lineHeight: '22px' }],
        /** Login / auth editorial scale — display → legal (single source for rhythm). */
        'login-display': ['24px', { lineHeight: '29px', letterSpacing: '-0.02em' }],
        'login-body': ['15px', { lineHeight: '22px' }],
        'login-metadata': ['10px', { lineHeight: '14px', letterSpacing: '0.12em' }],
        'login-label': ['11px', { lineHeight: '15px', letterSpacing: '0.03em' }],
        /** Legal / compliance — readable minimum (not fine print). */
        'login-legal': ['11px', { lineHeight: '17px' }],
        /** Tappable legal links on login — one step above `login-legal`. */
        'login-legal-link': ['12px', { lineHeight: '18px' }],
      },
    },
  },
  plugins: [],
};
