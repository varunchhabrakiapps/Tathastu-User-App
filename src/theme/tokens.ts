/**
 * Numeric design tokens shared with programmatic styles.
 * Prefer NativeWind + semanticColors for visuals; extend these when bridging to native APIs.
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radii = {
  sm: 4,
  md: 8,
  lg: 16,
  /** Ritual onboarding + auth chrome (matches `RitualPrimaryButton`). */
  ritualLg: 18,
  full: 9999,
} as const;

/**
 * Login screen rhythm — 8pt-derived scale (8, 12, 16, 20, 24, 32, 40).
 * Mirrors Tailwind usage: `px-5`, `gap-8`, `gap-6`, `py-8`, `gap-3`, scroll bottom via `scrollBottom`.
 */
export const authScreen = {
  insetX: 20,
  /** Vertical gap between trust strip and auth slab. */
  trustToAuth: 32,
  credentialsStack: 24,
  surfacePadY: 32,
  credentialsToLegal: 32,
  legalStack: 12,
  scrollBottom: 40,
} as const;
