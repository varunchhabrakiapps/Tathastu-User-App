/** Catalog sort modes — `recommended` preserves editorial catalog order. */
export const EXPLORE_SORT_OPTIONS = ['recommended', 'priceAsc', 'priceDesc', 'titleAsc'] as const;

export type ExploreSortOption = (typeof EXPLORE_SORT_OPTIONS)[number];

export function isExploreSortOption(value: string): value is ExploreSortOption {
  return (EXPLORE_SORT_OPTIONS as readonly string[]).includes(value);
}
