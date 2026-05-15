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
   * Warm accents — peach / saffron / gold from onboarding artwork; use for ritual highlights
   * and marketing surfaces. Native tab accents use ritual primaries (`tabBarAppearance` + `semanticColors`).
   */
  warm: {
    DEFAULT: '#c2410c',
    subtle: '#fff7ed',
    muted: '#fdba74',
    dark: '#fbbf24',
    'on-dark': '#fef3c7',
    deep: '#7c2d12',
    /** Soft wash behind illustration cards */
    peach: '#ffead5',
    /** Primary marketing CTA / active pager (vivid saffron) */
    saffron: '#ea580c',
    /** Highlights, second-axis accent */
    gold: '#facc15',
  },
  /**
   * Ritual marketing system — onboarding & premium surfaces (mirrors `tailwind` `ritual.*`).
   * Light `canvas` / dark pairs for NativeWind `dark:`.
   */
  ritual: {
    canvas: { light: '#FFF8F1', dark: '#1C1714' },
    surface: { light: '#FFFFFF', dark: '#25211D' },
    surfaceSecondary: { light: '#F9EBDD', dark: '#302922' },
    primary: { light: '#F97316', dark: '#D9915C' },
    primarySoft: { light: '#FDBA74', dark: '#4A3228' },
    ink: { light: '#1C1917', dark: '#F2EDE6' },
    inkMuted: { light: '#57534E', dark: '#9C948C' },
    borderSoft: { light: '#FED7AA', dark: '#5C4030' },
    success: { light: '#16A34A', dark: '#22C55E' },
    /** Onboarding CTA — warm saffron glow (rich, not neon). */
    cta: {
      light: { top: '#FDBA74', bottom: '#F97316' },
      dark: { top: '#E4A068', bottom: '#D9915C' },
    },
  },
} as const;
