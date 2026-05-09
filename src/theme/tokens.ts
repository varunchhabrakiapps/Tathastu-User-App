/** Design tokens — single source for colors, spacing, typography scale. */

export const colors = {
  background: '#FFFFFF',
  foreground: '#111827',
  primary: '#2563EB',
  muted: '#6B7280',
  border: '#E5E7EB',
  error: '#DC2626',
} as const;

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

export const typography = {
  fontFamilyRegular: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  typography,
} as const;

export type Theme = typeof theme;
