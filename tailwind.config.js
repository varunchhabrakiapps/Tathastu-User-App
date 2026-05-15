/** @type {import('tailwindcss').Config} */
/**
 * Semantic palette: Vedic / ritual-booking — indigo primary actions, teal accent,
 * extended warm scale (peach, saffron, gold) for ritual marketing surfaces.
 *
 * Hex for canvas/surface/primary/ink must stay aligned with `src/theme/palette.ts`
 * (native tab ritual tint via `semanticColors` + `src/navigation/tabBarAppearance.ts`).
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
          dark: '#161311',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#201c19',
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
          'muted-ondark': '#c8c2bc',
          subtle: '#78716c',
        },
        /**
         * Ritual marketing palette — onboarding, premium storytelling (see `palette.ts` ritual).
         * Usage: `bg-ritual-canvas dark:bg-ritual-canvas-dark`, `text-ritual-ink`, etc.
         */
        ritual: {
          canvas: { DEFAULT: '#FFF8F1', dark: '#221E1B' },
          surface: { DEFAULT: '#FFFFFF', dark: '#2E2924' },
          surfaceSecondary: { DEFAULT: '#F9EBDD', dark: '#3D3630' },
          primary: { DEFAULT: '#F97316', dark: '#F0A66E' },
          primarySoft: { DEFAULT: '#FDBA74', dark: '#6B5346' },
          ink: { DEFAULT: '#1C1917', dark: '#FAF6F1' },
          inkMuted: { DEFAULT: '#57534E', dark: '#C9BDB1' },
          borderSoft: { DEFAULT: '#FED7AA', dark: '#786456' },
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
