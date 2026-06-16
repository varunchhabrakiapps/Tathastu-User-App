import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { ExploreFilterToolbar } from '@/components/molecules/ExploreFilterToolbar';
import { ExploreSearchBar } from '@/components/molecules/ExploreSearchBar';
import type { ExploreMomentFilter } from '@/hooks/useExploreRitualCatalog';
import { paletteHex } from '@/theme/palette';

type Props = {
  hintLabel: string;
  contextLabel: string;
  clearLabel: string;
  sortLabel: string;
  sortAccessibilityLabel: string;
  sortActive: boolean;
  onOpenSort: () => void;
  query: string;
  onChangeQuery: (text: string) => void;
  momentFilter: ExploreMomentFilter;
  onSelectMomentFilter: (filter: ExploreMomentFilter) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

/**
 * Pinned explore controls — search, moment filters + sort, contextual hint.
 * Stays transparent so the ritual canvas shows through consistently while scrolling.
 */
export const ExploreStickyFilterRail = memo(function ExploreStickyFilterRail({
  hintLabel,
  contextLabel,
  clearLabel,
  sortLabel,
  sortAccessibilityLabel,
  sortActive,
  onOpenSort,
  query,
  onChangeQuery,
  momentFilter,
  onSelectMomentFilter,
  hasActiveFilters,
  onClearFilters,
}: Props) {
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';

  const mutedColor = paletteHex.ritual.inkMuted[k];
  const primaryColor = paletteHex.ritual.primary[k];

  return (
    <View style={styles.shell}>
      <View className="px-5 pb-2 pt-1">
        <ExploreSearchBar value={query} onChangeText={onChangeQuery} />
      </View>

      <ExploreFilterToolbar
        momentFilter={momentFilter}
        onSelectMomentFilter={onSelectMomentFilter}
        sortLabel={sortLabel}
        sortAccessibilityLabel={sortAccessibilityLabel}
        sortActive={sortActive}
        onOpenSort={onOpenSort}
      />

      <View className="flex-row items-center justify-between gap-3 px-5 pb-2.5 pt-2">
        <Text
          numberOfLines={2}
          style={{ color: mutedColor }}
          className="flex-1 font-normal text-[12px] leading-[16px]"
        >
          {hasActiveFilters ? contextLabel : hintLabel}
        </Text>
        {hasActiveFilters ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={clearLabel}
            hitSlop={8}
            onPress={onClearFilters}
            className="flex-row items-center gap-1.5 active:opacity-70"
          >
            <FontAwesome name="times" size={11} color={primaryColor} importantForAccessibility="no" />
            <Text style={{ color: primaryColor }} className="font-semibold text-[12px] leading-[16px]">
              {clearLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  shell: {
    zIndex: 10,
  },
});
