import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { ExploreMomentFilterStrip } from '@/components/molecules/ExploreMomentFilterStrip';
import { ExploreRitualListRow } from '@/components/molecules/ExploreRitualListRow';
import {
  SECTION_GHOST_HEADER_LEADING_SIZE,
  SectionGhostHeader,
} from '@/components/molecules/SectionGhostHeader';
import { EXPLORE_RITUAL_ROW_GAP } from '@/constants/exploreLayout';
import type { ExploreRitualCatalogItem, ExploreMomentFilter } from '@/hooks/useExploreRitualCatalog';
import { paletteHex } from '@/theme/palette';
import { authScreen } from '@/theme/tokens';

type Props = {
  headerDescription: string;
  rituals: ExploreRitualCatalogItem[];
  momentFilter: ExploreMomentFilter;
  onSelectMomentFilter: (filter: ExploreMomentFilter) => void;
  isEmpty: boolean;
  hasActiveFilters: boolean;
  wishlistCount: number;
  listBottomInset: number;
  onOpenRitualDetail: (ritualId: string) => void;
};

export const ExploreRitualCatalog = memo(function ExploreRitualCatalog({
  headerDescription,
  rituals,
  momentFilter,
  onSelectMomentFilter,
  isEmpty,
  hasActiveFilters,
  wishlistCount,
  listBottomInset,
  onOpenRitualDetail,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';

  const renderItem = useCallback<ListRenderItem<ExploreRitualCatalogItem>>(
    ({ item }) => (
      <ExploreRitualListRow item={item} onPress={() => onOpenRitualDetail(item.id)} />
    ),
    [onOpenRitualDetail],
  );

  const ListHeader = useCallback(
    () => (
      <View style={styles.headerBlock}>
        <SectionGhostHeader
          leading={
            <FontAwesomeCircleIcon
              name="compass"
              circleSize={SECTION_GHOST_HEADER_LEADING_SIZE}
              accessibilityLabel={t('screens.explore.sectionLeadingA11y')}
            />
          }
          title={t('screens.explore.catalogTitle')}
          description={headerDescription}
          className="mb-3"
        />
        {wishlistCount > 0 ? (
          <Text
            accessibilityRole="text"
            style={{ color: paletteHex.ritual.inkMuted[k] }}
            className="mb-3 font-normal text-[12px] leading-[17px]"
          >
            {t('screens.explore.wishlistGlance', { count: wishlistCount })}
          </Text>
        ) : null}
        <ExploreMomentFilterStrip activeFilter={momentFilter} onSelectFilter={onSelectMomentFilter} />
        <View className="mt-4" />
      </View>
    ),
    [headerDescription, k, momentFilter, onSelectMomentFilter, t, wishlistCount],
  );

  const ListEmpty = useCallback(
    () => (
      <View style={styles.emptyWrap} accessibilityRole="text">
        <Text
          style={{ color: paletteHex.ritual.ink[k] }}
          className="text-center font-semibold text-login-body"
        >
          {hasActiveFilters ? t('screens.explore.empty.filteredTitle') : t('screens.explore.empty.title')}
        </Text>
        <Text
          style={{ color: paletteHex.ritual.inkMuted[k] }}
          className="mt-2 text-center font-normal text-[13px] leading-[19px]"
        >
          {hasActiveFilters
            ? t('screens.explore.empty.filteredBody')
            : t('screens.explore.empty.body')}
        </Text>
      </View>
    ),
    [hasActiveFilters, k, t],
  );

  return (
    <FlatList
      data={rituals}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={isEmpty ? ListEmpty : null}
      contentContainerStyle={[
        styles.listContent,
        { paddingBottom: listBottomInset },
        isEmpty && styles.listContentEmpty,
      ]}
      ItemSeparatorComponent={RowSeparator}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
    />
  );
});

function RowSeparator() {
  return <View style={styles.rowGap} />;
}

const styles = StyleSheet.create({
  headerBlock: {
    paddingHorizontal: authScreen.insetX,
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 4,
    paddingHorizontal: authScreen.insetX,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  rowGap: {
    height: EXPLORE_RITUAL_ROW_GAP,
  },
  emptyWrap: {
    paddingHorizontal: authScreen.insetX + 8,
    paddingTop: 32,
    paddingBottom: 24,
  },
});
