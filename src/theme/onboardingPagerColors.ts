import { paletteHex } from '@/theme/palette';
import { hexToRgba } from '@/theme/colorUtils';

export type PagerActiveTint = 'primary' | 'warm' | 'ritual';

export function getPagerDotColors(tint: PagerActiveTint, isDark: boolean) {
  const inactive = isDark
    ? hexToRgba(paletteHex.ritual.inkMuted.dark, 0.38)
    : hexToRgba(paletteHex.ritual.inkMuted.light, 0.3);

  let active: string;
  switch (tint) {
    case 'ritual':
      active = isDark
        ? paletteHex.ritual.primary.dark
        : paletteHex.ritual.primary.light;
      break;
    case 'warm':
      active = isDark ? paletteHex.warm.gold : paletteHex.warm.saffron;
      break;
    default:
      active = isDark ? paletteHex.primary.dark : paletteHex.primary.light;
  }

  return { inactive, active };
}
