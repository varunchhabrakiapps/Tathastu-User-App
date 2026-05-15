import { paletteHex } from '@/theme/palette';

/**
 * Native-only: StatusBar + stack/tab scene surfaces (no Tailwind `className`).
 * Ritual-accented native **tab tint** lives in `@/navigation/tabBarAppearance`; values here align `paletteHex`.
 */

export const semanticColors = {
  light: {
    /** Stack headers & scenes — matches `bg-canvas` tabs */
    surface: paletteHex.canvas.light,
    tabBarBg: paletteHex.surface.light,
    tabActive: paletteHex.ritual.primary.light,
    tabInactive: paletteHex.inkMuted.light,
    statusBarStyle: 'dark-content' as const,
  },
  dark: {
    surface: paletteHex.canvas.dark,
    tabBarBg: paletteHex.surface.dark,
    tabActive: paletteHex.ritual.primary.dark,
    tabInactive: paletteHex.inkMuted.dark,
    statusBarStyle: 'light-content' as const,
  },
} as const;
