/**
 * Single source for hex values shared by `semanticColors` and documented alongside
 * `tailwind.config.js`. Tailwind cannot import this TS file — keep `extend.colors` in sync.
 */
export const paletteHex = {
  /** Dark: warm charcoal — readable body copy without “mud on mud”. */
  canvas: { light: '#fafaf9', dark: '#161311' },
  /** Elevated tab bar / sheets */
  surface: { light: '#ffffff', dark: '#201c19' },
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
  /** Muted tab labels + non-ritual secondary text */
  inkMuted: { light: '#78716c', dark: '#c8c2bc' },
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
    canvas: { light: '#FFF8F1', dark: '#221E1B' },
    surface: { light: '#FFFFFF', dark: '#2E2924' },
    surfaceSecondary: { light: '#F9EBDD', dark: '#3D3630' },
    primary: { light: '#F97316', dark: '#F0A66E' },
    primarySoft: { light: '#FDBA74', dark: '#6B5346' },
    ink: { light: '#1C1917', dark: '#FAF6F1' },
    inkMuted: { light: '#57534E', dark: '#C9BDB1' },
    borderSoft: { light: '#FED7AA', dark: '#786456' },
    success: { light: '#16A34A', dark: '#22C55E' },
    /** Onboarding CTA — warm saffron glow (rich, not neon). */
    cta: {
      light: { top: '#FDBA74', bottom: '#F97316' },
      dark: { top: '#F5BE8C', bottom: '#E8914D' },
    },
  },
} as const;
