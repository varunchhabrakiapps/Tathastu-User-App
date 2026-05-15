import { paletteHex } from '@/theme/palette';

export type TrendingArtworkGradient = {
  colors: [string, string, ...string[]];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

/**
 * Placeholder “illustration” washes — warm, modern, non-stock (until real artwork ships).
 * Hex aligns with `paletteHex.ritual` + warm marketing scale.
 */
export function getTrendingArtworkGradient(
  preset: number,
  scheme: 'light' | 'dark',
): TrendingArtworkGradient {
  const r = paletteHex.ritual;
  const w = paletteHex.warm;

  const lightSets: TrendingArtworkGradient[] = [
    {
      colors: [r.canvas.light, w.peach, r.primarySoft.light],
      start: { x: 0.1, y: 0 },
      end: { x: 0.9, y: 1 },
    },
    {
      colors: [r.surfaceSecondary.light, '#fde68a', r.primarySoft.light],
      start: { x: 0, y: 0.2 },
      end: { x: 1, y: 0.85 },
    },
    {
      colors: ['#fffbeb', w.peach, r.borderSoft.light],
      start: { x: 0.15, y: 0 },
      end: { x: 0.85, y: 1 },
    },
    {
      colors: [r.surfaceSecondary.light, '#fcd34d', r.primary.light],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    {
      colors: [w.subtle, w.muted, r.primarySoft.light],
      start: { x: 0.2, y: 0 },
      end: { x: 0.8, y: 1 },
    },
    {
      colors: ['#ecfdf5', w.peach, r.primarySoft.light],
      start: { x: 0, y: 0.15 },
      end: { x: 1, y: 0.9 },
    },
  ];

  const darkSets: TrendingArtworkGradient[] = [
    {
      colors: [r.canvas.dark, r.surfaceSecondary.dark, r.primarySoft.dark],
      start: { x: 0.1, y: 0 },
      end: { x: 0.9, y: 1 },
    },
    {
      colors: [r.surface.dark, '#78350f', r.primary.dark],
      start: { x: 0, y: 0.15 },
      end: { x: 1, y: 0.9 },
    },
    {
      colors: [r.canvas.dark, r.surfaceSecondary.dark, '#92400e'],
      start: { x: 0.1, y: 0 },
      end: { x: 0.95, y: 1 },
    },
    {
      colors: [r.surface.dark, r.primarySoft.dark, r.primary.dark],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    {
      colors: ['#292524', '#713f12', r.primary.dark],
      start: { x: 0.15, y: 0 },
      end: { x: 0.85, y: 1 },
    },
    {
      colors: [r.canvas.dark, '#134e4a', r.primarySoft.dark],
      start: { x: 0, y: 0.1 },
      end: { x: 1, y: 1 },
    },
  ];

  const sets = scheme === 'dark' ? darkSets : lightSets;
  const idx = ((preset % sets.length) + sets.length) % sets.length;
  return sets[idx]!;
}
