/**
 * Single source for hex values shared by `semanticColors` and documented alongside
 * `tailwind.config.js`. Tailwind cannot import this TS file — keep `extend.colors` in sync.
 */
export const paletteHex = {
  canvas: { light: '#fafaf9', dark: '#0c0a09' },
  /** Elevated tab bar / sheets */
  surface: { light: '#ffffff', dark: '#1c1917' },
  /** Indigo — primary actions & selected tab */
  primary: { light: '#4338ca', dark: '#a5b4fc' },
  /**
   * Extended tokens — mirror `tailwind.config.js` `primary.*` / `accent.*`
   * so native modules (gradients, glass tint) stay aligned with Tailwind.
   */
  primaryBright: { light: '#4f46e5', dark: '#818cf8' },
  primaryHover: { light: '#3730a3', dark: '#6366f1' },
  primarySoftDark: { light: '#312e81', dark: '#312e81' },
  accent: { light: '#0f766e', dark: '#2dd4bf' },
  accentDeep: { light: '#115e59', dark: '#134e4a' },
  /** Muted tab labels */
  inkMuted: { light: '#78716c', dark: '#a8a29e' },
  /**
   * Warm accents (astro-friendly): use sparingly — highlights, stars, subtle dividers.
   * Not dominant fills.
   */
  warm: {
    DEFAULT: '#b45309',
    subtle: '#fff7ed',
    muted: '#fdba74',
    dark: '#fbbf24',
    'on-dark': '#fef3c7',
    deep: '#9a3412',
  },
} as const;
