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
 * Mirrors Tailwind usage: e.g. `px-5`, `gap-7`, auth stack `gap-4`, surface `py-6`, legal spacing via `credentialsToLegal`.
 */
export const authScreen = {
  insetX: 20,
  /** Vertical gap between trust strip and auth slab. */
  trustToAuth: 28,
  credentialsStack: 20,
  surfacePadY: 24,
  credentialsToLegal: 20,
  legalStack: 12,
  scrollBottom: 40,
  /** Extra bottom breathing room for the home feed (tab bar + comfortable scroll end). */
  homeFeedExtraBottom: 72,
} as const;
