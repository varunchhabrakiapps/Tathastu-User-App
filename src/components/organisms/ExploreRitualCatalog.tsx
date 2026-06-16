import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  type ListRenderItem,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { type SharedValue } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { ExploreCatalogIntro } from '@/components/molecules/ExploreCatalogIntro';
import { ExploreRitualListRow } from '@/components/molecules/ExploreRitualListRow';
import { ExploreRitualRowSkeleton } from '@/components/molecules/ExploreRitualRowSkeleton';
import { PaginationFooter } from '@/components/molecules/PaginationFooter';
import {
  EXPLORE_RITUAL_ROW_GAP,
  EXPLORE_SKELETON_ROW_COUNT,
} from '@/constants/exploreLayout';
import type { ExploreRitualCatalogItem } from '@/hooks/useExploreRitualCatalog';
import { paletteHex } from '@/theme/palette';
import { authScreen } from '@/theme/tokens';

type Props = {
  introTitle: string;
  introDescription: string;
  resultLabel: string;
  rituals: ExploreRitualCatalogItem[];
  isEmpty: boolean;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  hasError: boolean;
  hasActiveFilters: boolean;
  listBottomInset: number;
  scrollY: SharedValue<number>;
  onEndReached: () => void;
  onRefresh: () => void;
  onRetry: () => void;
  onOpenRitualDetail: (ritualId: string) => void;
  onPreviewRitual: (item: ExploreRitualCatalogItem) => void;
};

export const ExploreRitualCatalog = memo(function ExploreRitualCatalog({
  introTitle,
  introDescription,
  resultLabel,
  rituals,
  isEmpty,
  isInitialLoading,
  isLoadingMore,
  isRefreshing,
  hasMore,
  hasError,
  hasActiveFilters,
  listBottomInset,
  scrollY,
  onEndReached,
  onRefresh,
  onRetry,
  onOpenRitualDetail,
  onPreviewRitual,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';

  const renderItem = useCallback<ListRenderItem<ExploreRitualCatalogItem>>(
    ({ item }) => (
      <ExploreRitualListRow
        item={item}
        onPress={() => onOpenRitualDetail(item.id)}
        onLongPress={() => onPreviewRitual(item)}
      />
    ),
    [onOpenRitualDetail, onPreviewRitual],
  );

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.value = event.nativeEvent.contentOffset.y;
    },
    [scrollY],
  );

  const ListHeader = useCallback(
    () => (
      <ExploreCatalogIntro
        title={introTitle}
        description={introDescription}
        resultLabel={resultLabel}
      />
    ),
    [introDescription, introTitle, resultLabel],
  );

  const ListEmpty = useCallback(() => {
    if (isInitialLoading) {
      return (
        <View style={styles.skeletonStack}>
          {Array.from({ length: EXPLORE_SKELETON_ROW_COUNT }).map((_, index) => (
            <ExploreRitualRowSkeleton key={index} />
          ))}
        </View>
      );
    }

    return (
      <View style={styles.emptyWrap} accessibilityRole="text">
        <FontAwesomeCircleIcon
          name="compass"
          circleSize={56}
          accessibilityLabel={t('screens.explore.sectionLeadingA11y')}
        />
        <Text
          style={{ color: paletteHex.ritual.ink[k] }}
          className="mt-4 text-center font-semibold text-[16px] leading-[21px]"
        >
          {hasActiveFilters ? t('screens.explore.empty.filteredTitle') : t('screens.explore.empty.title')}
        </Text>
        <Text
          style={{ color: paletteHex.ritual.inkMuted[k] }}
          className="mt-2 max-w-[300px] text-center font-normal text-[13px] leading-[19px]"
        >
          {hasActiveFilters ? t('screens.explore.empty.filteredBody') : t('screens.explore.empty.body')}
        </Text>
      </View>
    );
  }, [hasActiveFilters, isInitialLoading, k, t]);

  const ListFooter = useCallback(
    () => (
      <PaginationFooter
        isLoadingMore={isLoadingMore}
        hasError={hasError}
        showEnd={!hasMore && rituals.length > 0}
        loadingLabel={t('screens.explore.feed.loadingMore')}
        endLabel={t('screens.explore.feed.endReached')}
        errorLabel={t('screens.explore.feed.error')}
        onRetry={onRetry}
      />
    ),
    [hasError, hasMore, isLoadingMore, onRetry, rituals.length, t],
  );

  return (
    <FlatList
      data={rituals}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      onScroll={onScroll}
      scrollEventThrottle={16}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={ListFooter}
      ItemSeparatorComponent={RowSeparator}
      contentContainerStyle={[
        styles.listContent,
        { paddingBottom: listBottomInset },
        isEmpty && styles.listContentCentered,
      ]}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={paletteHex.ritual.primary[k]}
          colors={[paletteHex.ritual.primary[k]]}
        />
      }
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      windowSize={9}
      removeClippedSubviews
    />
  );
});

function RowSeparator() {
  return <View style={styles.rowGap} />;
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingTop: 2,
    paddingHorizontal: authScreen.insetX,
  },
  listContentCentered: {
    justifyContent: 'center',
  },
  rowGap: {
    height: EXPLORE_RITUAL_ROW_GAP,
  },
  skeletonStack: {
    gap: EXPLORE_RITUAL_ROW_GAP,
    paddingTop: 2,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
});
