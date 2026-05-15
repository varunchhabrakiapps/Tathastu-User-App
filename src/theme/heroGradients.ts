import { hexToRgba, mixHex } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

export type PaletteMode = 'light' | 'dark';

export type OnboardingBackdrop = {
  colors: string[];
  locations: readonly number[];
};

/**
 * Onboarding wash — derived only from `paletteHex.ritual` (soft saffron → secondary → canvas).
 * Dark mode uses **opaque** mixed stops so orange tints blend smoothly (no rgba “steps”).
 */
export function getOnboardingBackdrop(mode: PaletteMode): OnboardingBackdrop {
  const r = paletteHex.ritual;
  if (mode === 'light') {
    return {
      colors: [
        hexToRgba(r.primary.light, 0.1),
        r.canvas.light,
        hexToRgba(r.primarySoft.light, 0.2),
        r.surfaceSecondary.light,
        r.canvas.light,
      ],
      locations: [0, 0.24, 0.48, 0.68, 1],
    };
  }

  const cd = r.canvas.dark;
  const sd = r.surface.dark;
  const scd = r.surfaceSecondary.dark;
  const od = r.primary.dark;

  /** Opaque ladder: tight orange→neutral steps so RN LinearGradient doesn’t show “hard lines”. */
  return {
    colors: [
      mixHex(cd, od, 0.1),
      mixHex(cd, sd, 0.36),
      mixHex(cd, sd, 0.68),
      sd,
      mixHex(sd, scd, 0.26),
      mixHex(sd, od, 0.05),
    ],
    locations: [0, 0.19, 0.38, 0.55, 0.76, 1],
  };
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
