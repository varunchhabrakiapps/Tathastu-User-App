/** @type {import('tailwindcss').Config} */
/**
 * Semantic palette: Vedic / ritual-booking — indigo primary, warm stone neutrals,
 * teal secondary accent, plus restrained gold/amber (`warm`) for astro highlights only.
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
        /** Gold / amber — stars, subtle ritual highlights (not large fills) */
        warm: {
          DEFAULT: '#b45309',
          subtle: '#fff7ed',
          muted: '#fdba74',
          dark: '#fbbf24',
          'on-dark': '#fef3c7',
          deep: '#9a3412',
        },
        ink: {
          DEFAULT: '#1c1917',
          ondark: '#fafaf9',
          muted: '#57534e',
          'muted-ondark': '#a8a29e',
          subtle: '#78716c',
        },
      },
    },
  },
  plugins: [],
};
