import type { ImageSourcePropType } from 'react-native';

import {
  ONBOARDING_SLIDE_ART_KEYS,
  ONBOARDING_SLIDE_IMAGES,
} from '@/constants/onboardingLayout';

import { hexToRgba, mixHex } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

/** Bottom-weighted reel scrim — light & dark tweaks keep white type legible without looking muddy. */
export type TrendingReelOverlayGradient = {
  colors: [string, string, ...string[]];
  locations?: number[];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

/**
 * Rotate through bundled onboarding hero art until dedicated trending covers ship.
 */
export function getTrendingRitualCoverSource(preset: number): ImageSourcePropType {
  const keys = ONBOARDING_SLIDE_ART_KEYS;
  const idx = ((preset % keys.length) + keys.length) % keys.length;
  return ONBOARDING_SLIDE_IMAGES[keys[idx]!]!;
}

/**
 * Editorial warm scrim — reels-style readability with ritual brown/saffron depth.
 */
export function getTrendingReelOverlayGradient(
  preset: number,
  scheme: 'light' | 'dark',
): TrendingReelOverlayGradient {
  const hueT = (((preset % 3) + 3) % 3) / 22;
  const emphasis =
    scheme === 'dark' ? paletteHex.ritual.primary.dark : paletteHex.ritual.primary.light;

  const base =
    scheme === 'dark'
      ? mixHex('#242019', paletteHex.warm.deep, 0.32 + hueT)
      : mixHex('#261a14', paletteHex.warm.deep, 0.38 + hueT);

  const mid = mixHex(base, emphasis, 0.14);
  const floor = mixHex(base, paletteHex.warm.deep, 0.24);

  return {
    colors: [
      hexToRgba(mid, 0),
      hexToRgba(mid, 0.55),
      hexToRgba(floor, 0.92),
    ],
    locations: [0, 0.45, 1],
    start: { x: 0.5, y: 0.38 },
    end: { x: 0.5, y: 1 },
  };
}
