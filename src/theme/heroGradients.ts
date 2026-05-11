import { paletteHex } from '@/theme/palette';

export type PaletteMode = 'light' | 'dark';

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

/**
 * Login hero: night-indigo base with saffron / amber (agni) highlights — all stops from `paletteHex`.
 */
export function getLoginHeroGradient(mode: PaletteMode): string[] {
  const h = paletteHex;
  if (mode === 'light') {
    return [
      h.primarySoftDark.light,
      h.primaryHover.light,
      h.warm.deep,
      h.warm.muted,
    ];
  }
  return [
    h.canvas.dark,
    h.primarySoftDark.light,
    h.warm.DEFAULT,
    h.warm.deep,
  ];
}
