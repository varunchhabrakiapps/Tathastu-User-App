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
  full: 9999,
} as const;
