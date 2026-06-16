import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  EXPLORE_FEED_INITIAL_DELAY_MS,
  EXPLORE_FEED_PAGE_DELAY_MS,
  EXPLORE_FEED_PAGE_SIZE,
} from '@/constants/exploreLayout';
import type { ExploreSortOption } from '@/domain/exploreSort';
import type { MomentCategoryId } from '@/domain/momentCategory';
import { isMomentCategoryId } from '@/domain/momentCategory';
import { ritualMatchesMoment } from '@/domain/ritualMomentMap';
import type { TrendingRitualPreview } from '@/domain/trendingRitual';
import { usePaginatedFeed } from '@/hooks/usePaginatedFeed';
import { useTrendingRitualsPreview } from '@/hooks/useTrendingRitualsPreview';
import { createLocalPageFetcher } from '@/services/localPageFetcher';
import { sortExploreCatalogItems } from '@/utils/exploreCatalogSort';
import { getRitualListCopy, ritualSearchHaystack } from '@/utils/ritualCopy';

export type ExploreMomentFilter = 'all' | MomentCategoryId;

export type ExploreRitualCatalogItem = TrendingRitualPreview & {
  copy: ReturnType<typeof getRitualListCopy>;
};

type Params = {
  initialMomentCategoryId?: string;
};

function resolveInitialFilter(raw?: string): ExploreMomentFilter {
  if (raw && isMomentCategoryId(raw)) return raw;
  return 'all';
}

/**
 * Explore catalog state — moment filter, search, sort, and paginated results.
 */
export function useExploreRitualCatalog({ initialMomentCategoryId }: Params) {
  const { t } = useTranslation();
  const rituals = useTrendingRitualsPreview();

  const [query, setQuery] = useState('');
  const [momentFilter, setMomentFilter] = useState<ExploreMomentFilter>(() =>
    resolveInitialFilter(initialMomentCategoryId),
  );
  const [sortOption, setSortOption] = useState<ExploreSortOption>('recommended');
  const [sortSheetOpen, setSortSheetOpen] = useState(false);

  useEffect(() => {
    if (initialMomentCategoryId && isMomentCategoryId(initialMomentCategoryId)) {
      setMomentFilter(initialMomentCategoryId);
    }
  }, [initialMomentCategoryId]);

  const enriched = useMemo<ExploreRitualCatalogItem[]>(
    () => rituals.map((ritual) => ({ ...ritual, copy: getRitualListCopy(t, ritual.id) })),
    [rituals, t],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    let rows = enriched;
    if (momentFilter !== 'all') {
      rows = rows.filter((ritual) => ritualMatchesMoment(ritual.id, momentFilter));
    }
    if (normalizedQuery.length > 0) {
      rows = rows.filter((ritual) => ritualSearchHaystack(ritual.copy).includes(normalizedQuery));
    }
    return rows;
  }, [enriched, momentFilter, normalizedQuery]);

  const sorted = useMemo(
    () => sortExploreCatalogItems(filtered, sortOption),
    [filtered, sortOption],
  );

  const fetchPage = useMemo(
    () =>
      createLocalPageFetcher(sorted, {
        initialDelayMs: EXPLORE_FEED_INITIAL_DELAY_MS,
        pageDelayMs: EXPLORE_FEED_PAGE_DELAY_MS,
      }),
    [sorted],
  );

  const feed = usePaginatedFeed<ExploreRitualCatalogItem>({
    fetchPage,
    pageSize: EXPLORE_FEED_PAGE_SIZE,
    resetKey: `${momentFilter}::${normalizedQuery}::${sortOption}`,
  });

  const hasActiveFilters = momentFilter !== 'all' || normalizedQuery.length > 0;
  const hasCustomSort = sortOption !== 'recommended';

  const clearFilters = useCallback(() => {
    setMomentFilter('all');
    setQuery('');
    setSortOption('recommended');
  }, []);

  const openSortSheet = useCallback(() => setSortSheetOpen(true), []);
  const closeSortSheet = useCallback(() => setSortSheetOpen(false), []);

  return {
    query,
    setQuery,
    momentFilter,
    setMomentFilter,
    sortOption,
    setSortOption,
    sortSheetOpen,
    openSortSheet,
    closeSortSheet,
    clearFilters,
    hasActiveFilters,
    hasCustomSort,
    rituals: feed.items,
    resultCount: sorted.length,
    isEmpty: !feed.isInitialLoading && sorted.length === 0,
    isInitialLoading: feed.isInitialLoading,
    isLoadingMore: feed.isLoadingMore,
    isRefreshing: feed.isRefreshing,
    hasMore: feed.hasMore,
    hasError: feed.hasError,
    loadMore: feed.loadMore,
    refresh: feed.refresh,
    retry: feed.retry,
  };
}
