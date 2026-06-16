import type { ExploreSortOption } from '@/domain/exploreSort';
import type { ExploreRitualCatalogItem } from '@/hooks/useExploreRitualCatalog';
import { parsePriceAmount } from '@/utils/ritualPrice';

/** Stable in-place sort for the filtered catalog slice (before pagination). */
export function sortExploreCatalogItems(
  items: ExploreRitualCatalogItem[],
  sort: ExploreSortOption,
): ExploreRitualCatalogItem[] {
  if (sort === 'recommended') return items;

  const rows = [...items];

  switch (sort) {
    case 'priceAsc':
      return rows.sort(
        (a, b) => parsePriceAmount(a.copy.priceGlance) - parsePriceAmount(b.copy.priceGlance),
      );
    case 'priceDesc':
      return rows.sort(
        (a, b) => parsePriceAmount(b.copy.priceGlance) - parsePriceAmount(a.copy.priceGlance),
      );
    case 'titleAsc':
      return rows.sort((a, b) => a.copy.title.localeCompare(b.copy.title));
    default:
      return rows;
  }
}
