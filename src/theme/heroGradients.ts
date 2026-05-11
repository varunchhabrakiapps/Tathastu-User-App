import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

export type PaletteMode = 'light' | 'dark';

/**
 * Onboarding wash — derived only from `paletteHex.ritual` (soft saffron → secondary → canvas).
 */
export function getOnboardingBackdropGradient(mode: PaletteMode): string[] {
  const r = paletteHex.ritual;
  if (mode === 'light') {
    return [
      hexToRgba(r.primary.light, 0.1),
      r.canvas.light,
      hexToRgba(r.primarySoft.light, 0.2),
      r.surfaceSecondary.light,
      r.canvas.light,
    ];
  }
  return [
    hexToRgba(r.primary.dark, 0.08),
    r.canvas.dark,
    hexToRgba(r.primarySoft.dark, 0.22),
    r.surfaceSecondary.dark,
    r.canvas.dark,
  ];
}

/**
 * Marketing / auth hero gradient stops — derived from `paletteHex` (same source as Tailwind colors).
 */
export function getAuthHeroGradient(mode: PaletteMode): string[] {
  const h = paletteHex;
  if (mode === 'light') {
    return [h.primaryBright.light, h.primary.light, h.accent.light];
  }
  return [h.primaryHover.light, h.primarySoftDark.light, h.accentDeep.light];
}

