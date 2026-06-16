import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedValue } from 'react-native-reanimated';

import { ExploreStickyFilterRail } from '@/components/molecules/ExploreStickyFilterRail';
import { ExploreRitualCatalog } from '@/components/organisms/ExploreRitualCatalog';
import { ExploreSortSheet } from '@/components/organisms/ExploreSortSheet';
import { RitualQuickPreviewSheet } from '@/components/organisms/RitualQuickPreviewSheet';
import { HomeContainer } from '@/components/templates/HomeContainer';
import { isMomentCategoryId } from '@/domain/momentCategory';
import { useExploreRitualCatalog, type ExploreMomentFilter } from '@/hooks/useExploreRitualCatalog';
import { useExploreRitualPreview } from '@/hooks/useExploreRitualPreview';
import { useExploreRitualRoutes } from '@/hooks/useExploreRitualRoutes';
import type { RootTabParamList } from '@/navigation/types';
import { authScreen } from '@/theme/tokens';

type ExploreRoute = RouteProp<RootTabParamList, 'Explore'>;

/** Ritual catalog — merged intro, sticky filters, paginated list, long-press quick preview. */
export function ExploreScreen() {
  const { t } = useTranslation();
  const route = useRoute<ExploreRoute>();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const catalog = useExploreRitualCatalog({
    initialMomentCategoryId: route.params?.momentCategoryId,
  });
  const { preview, openPreview, closePreview } = useExploreRitualPreview();
  const { openRitualDetail } = useExploreRitualRoutes();

  const onOpenDetail = useCallback(
    (ritualId: string) => {
      closePreview();
      openRitualDetail(ritualId);
    },
    [closePreview, openRitualDetail],
  );

  const introDescription = exploreIntroDescription(
    t,
    route.params?.momentCategoryId,
    catalog.momentFilter,
  );
  const listBottomInset = authScreen.homeFeedExtraBottom + insets.bottom;

  return (
    <HomeContainer>
      <View className="min-h-0 flex-1">
        <ExploreStickyFilterRail
          hintLabel={t('screens.explore.longPressHint')}
          contextLabel={introDescription}
          clearLabel={t('screens.explore.clearFilters')}
          sortLabel={t('screens.explore.sort.button')}
          sortAccessibilityLabel={t('screens.explore.sort.buttonA11y')}
          sortActive={catalog.hasCustomSort}
          onOpenSort={catalog.openSortSheet}
          query={catalog.query}
          onChangeQuery={catalog.setQuery}
          momentFilter={catalog.momentFilter}
          onSelectMomentFilter={catalog.setMomentFilter}
          hasActiveFilters={catalog.hasActiveFilters}
          onClearFilters={catalog.clearFilters}
        />

        <ExploreRitualCatalog
          introTitle={t('screens.explore.catalogTitle')}
          introDescription={introDescription}
          resultLabel={t('screens.explore.resultCount', { count: catalog.resultCount })}
          rituals={catalog.rituals}
          isEmpty={catalog.isEmpty}
          isInitialLoading={catalog.isInitialLoading}
          isLoadingMore={catalog.isLoadingMore}
          isRefreshing={catalog.isRefreshing}
          hasMore={catalog.hasMore}
          hasError={catalog.hasError}
          hasActiveFilters={catalog.hasActiveFilters}
          listBottomInset={listBottomInset}
          scrollY={scrollY}
          onEndReached={catalog.loadMore}
          onRefresh={catalog.refresh}
          onRetry={catalog.retry}
          onOpenRitualDetail={onOpenDetail}
          onPreviewRitual={openPreview}
        />
      </View>

      <ExploreSortSheet
        visible={catalog.sortSheetOpen}
        selected={catalog.sortOption}
        onSelect={catalog.setSortOption}
        onClose={catalog.closeSortSheet}
      />

      <RitualQuickPreviewSheet preview={preview} onClose={closePreview} onOpenDetail={onOpenDetail} />
    </HomeContainer>
  );
}

function exploreIntroDescription(
  t: TFunction,
  routeMoment: string | undefined,
  activeFilter: ExploreMomentFilter,
): string {
  const momentKey =
    activeFilter !== 'all'
      ? activeFilter
      : routeMoment && isMomentCategoryId(routeMoment)
        ? routeMoment
        : null;

  if (momentKey) {
    const momentLabel = t(`screens.home.browseByMoment.moments.${momentKey}.headline`);
    return t('screens.explore.subtitleWithMoment', { moment: momentLabel });
  }
  return t('screens.explore.subtitle');
}
