import { useMemo } from 'react';
import { useColorScheme } from 'nativewind';

import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

export type RitualPaletteMode = 'light' | 'dark';

/** Effective light/dark for ritual marketing surfaces — mirrors Home / booking glance chrome. */
export function useRitualPaletteMode(): RitualPaletteMode {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'dark' ? 'dark' : 'light';
}

/**
 * Mode-aware ritual palette for native `style` props — avoids NativeWind `dark:` token gaps
 * on nested `ritual.*.dark` Tailwind keys (text/backgrounds stay readable in both modes).
 */
export function useRitualSemanticColors() {
  const mode = useRitualPaletteMode();
  const isDark = mode === 'dark';

  return useMemo(() => {
    const r = paletteHex.ritual;
    const ink = r.ink[mode];
    const inkMuted = r.inkMuted[mode];
    const surface = r.surface[mode];
    const surfaceSecondary = r.surfaceSecondary[mode];
    const canvas = r.canvas[mode];
    const primary = r.primary[mode];
    const primarySoft = r.primarySoft[mode];
    const borderSoft = r.borderSoft[mode];

    return {
      mode,
      isDark,
      ink,
      inkMuted,
      surface,
      surfaceSecondary,
      canvas,
      primary,
      primarySoft,
      borderSoft,
      warmAccent: isDark ? paletteHex.warm.dark : paletteHex.warm.deep,
      sectionSurface: hexToRgba(surface, isDark ? 0.92 : 0.95),
      sectionBorder: hexToRgba(borderSoft, isDark ? 0.55 : 0.7),
      rowDivider: hexToRgba(borderSoft, isDark ? 0.55 : 0.7),
      rowPressHighlight: hexToRgba(surfaceSecondary, isDark ? 0.55 : 0.7),
      iconTileBg: isDark ? hexToRgba(surfaceSecondary, 0.7) : surfaceSecondary,
      iconTileDestructiveBg: isDark
        ? hexToRgba(paletteHex.warm.dark, 0.16)
        : hexToRgba(paletteHex.warm.peach, 0.7),
      avatarBg: hexToRgba(primarySoft, isDark ? 0.4 : 0.45),
      avatarBorder: hexToRgba(borderSoft, isDark ? 0.5 : 0.7),
      chevron: hexToRgba(inkMuted, isDark ? 0.72 : 0.6),
    };
  }, [mode, isDark]);
}
