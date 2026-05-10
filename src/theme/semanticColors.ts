import { paletteHex } from '@/theme/palette';

/**
 * Native-only: tab bar & StatusBar (no Tailwind `className`).
 * Hex values come from `palette.ts` so they match the indigo primary + stone canvas theme.
 */

export const semanticColors = {
  light: {
    /** Content viewport — same as `bg-canvas` */
    surface: paletteHex.canvas.light,
    /** Tab bar — same as `bg-surface` */
    tabBarBg: paletteHex.surface.light,
    tabActive: paletteHex.primary.light,
    tabInactive: paletteHex.inkMuted.light,
    statusBarStyle: 'dark-content' as const,
  },
  dark: {
    surface: paletteHex.canvas.dark,
    tabBarBg: paletteHex.surface.dark,
    tabActive: paletteHex.primary.dark,
    tabInactive: paletteHex.inkMuted.dark,
    statusBarStyle: 'light-content' as const,
  },
} as const;
