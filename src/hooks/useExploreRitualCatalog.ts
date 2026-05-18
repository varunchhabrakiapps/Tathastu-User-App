import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ritualMatchesMoment } from '@/domain/ritualMomentMap';
import type { MomentCategoryId } from '@/domain/momentCategory';
import { isMomentCategoryId } from '@/domain/momentCategory';
import type { TrendingRitualPreview } from '@/domain/trendingRitual';
import { useTrendingRitualsPreview } from '@/hooks/useTrendingRitualsPreview';
import { getRitualListCopy, ritualSearchHaystack } from '@/utils/ritualCopy';

export type ExploreMomentFilter = 'all' | MomentCategoryId;

type Params = {
  initialMomentCategoryId?: string;
  query: string;
};

export type ExploreRitualCatalogItem = TrendingRitualPreview & {
  copy: ReturnType<typeof getRitualListCopy>;
};

function resolveInitialFilter(raw?: string): ExploreMomentFilter {
  if (raw && isMomentCategoryId(raw)) return raw;
  return 'all';
}

/**
 * Explore catalog — moment filter + bottom search over the trending ritual dataset.
 */
export function useExploreRitualCatalog({ initialMomentCategoryId, query }: Params) {
  const { t } = useTranslation();
  const rituals = useTrendingRitualsPreview();
  const [momentFilter, setMomentFilter] = useState<ExploreMomentFilter>(() =>
    resolveInitialFilter(initialMomentCategoryId),
  );

  useEffect(() => {
    if (initialMomentCategoryId && isMomentCategoryId(initialMomentCategoryId)) {
      setMomentFilter(initialMomentCategoryId);
    }
  }, [initialMomentCategoryId]);

  const enriched = useMemo<ExploreRitualCatalogItem[]>(
    () =>
      rituals.map((ritual) => ({
        ...ritual,
        copy: getRitualListCopy(t, ritual.id),
      })),
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

  return {
    rituals: filtered,
    momentFilter,
    setMomentFilter,
    resultCount: filtered.length,
    isEmpty: filtered.length === 0,
    hasActiveFilters: momentFilter !== 'all' || normalizedQuery.length > 0,
  };
}
