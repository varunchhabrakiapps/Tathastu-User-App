import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MOMENT_CATEGORY_IDS, type MomentCategoryId } from '@/domain/momentCategory';

export type MomentCategoryItem = {
  id: MomentCategoryId;
  headline: string;
  subline: string;
};

/**
 * Home “Browse by moment” row — copy lives in i18n; order from {@link MOMENT_CATEGORY_IDS}.
 */
export function useMomentCategories(): MomentCategoryItem[] {
  const { t } = useTranslation();

  return useMemo(
    () =>
      MOMENT_CATEGORY_IDS.map((id) => ({
        id,
        headline: t(`screens.home.browseByMoment.moments.${id}.headline`),
        subline: t(`screens.home.browseByMoment.moments.${id}.subline`),
      })),
    [t],
  );
}
