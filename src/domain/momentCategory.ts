/**
 * Ordered home “Browse by moment” categories — single source of truth for the strip.
 * Add, remove, or reorder here; i18n and UI resolve labels by `id`.
 */
export const MOMENT_CATEGORY_IDS = [
  'situationship',
  'newChapter',
  'squad',
  'glowUp',
  'vibes',
  'lovedOnes',
] as const;

export type MomentCategoryId = (typeof MOMENT_CATEGORY_IDS)[number];

export function isMomentCategoryId(value: string): value is MomentCategoryId {
  return (MOMENT_CATEGORY_IDS as readonly string[]).includes(value);
}
