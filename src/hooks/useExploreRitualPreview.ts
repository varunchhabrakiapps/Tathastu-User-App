import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { TrendingRitualId } from '@/domain/trendingRitual';
import type { ExploreRitualCatalogItem } from '@/hooks/useExploreRitualCatalog';
import { getRitualPreviewCopy, type RitualPreviewCopy } from '@/utils/ritualCopy';

export type RitualQuickPreview = {
  id: TrendingRitualId;
  artworkPreset: number;
  copy: RitualPreviewCopy;
};

/**
 * Long-press quick-preview state — tracks which ritual is peeked and resolves its
 * richer copy on demand (kept out of every list row so the catalog stays light).
 */
export function useExploreRitualPreview() {
  const { t } = useTranslation();
  const [active, setActive] = useState<Pick<ExploreRitualCatalogItem, 'id' | 'artworkPreset'> | null>(
    null,
  );

  const openPreview = useCallback((item: ExploreRitualCatalogItem) => {
    setActive({ id: item.id, artworkPreset: item.artworkPreset });
  }, []);

  const closePreview = useCallback(() => setActive(null), []);

  const preview = useMemo<RitualQuickPreview | null>(() => {
    if (!active) return null;
    return {
      id: active.id,
      artworkPreset: active.artworkPreset,
      copy: getRitualPreviewCopy(t, active.id),
    };
  }, [active, t]);

  return { preview, openPreview, closePreview };
}
