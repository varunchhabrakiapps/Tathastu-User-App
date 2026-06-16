import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { EXPLORE_MOMENT_FILTER_CHIP_GAP } from '@/constants/exploreLayout';
import type { MomentCategoryId } from '@/domain/momentCategory';
import type { ExploreMomentFilter } from '@/hooks/useExploreRitualCatalog';
import { useMomentCategories } from '@/hooks/useMomentCategories';
import { paletteHex } from '@/theme/palette';
import { authScreen } from '@/theme/tokens';
import { cn } from '@/utils/cn';

type FilterChip = { id: ExploreMomentFilter; label: string };

type Props = {
  activeFilter: ExploreMomentFilter;
  onSelectFilter: (filter: ExploreMomentFilter) => void;
  /** When true, horizontal inset is owned by the parent toolbar. */
  embedded?: boolean;
};

export const ExploreMomentFilterStrip = memo(function ExploreMomentFilterStrip({
  activeFilter,
  onSelectFilter,
  embedded = false,
}: Props) {
  const { t } = useTranslation();
  const moments = useMomentCategories();

  const chips: FilterChip[] = [
    { id: 'all', label: t('screens.explore.filters.all') },
    ...moments.map((moment) => ({
      id: moment.id as MomentCategoryId,
      label: moment.headline,
    })),
  ];

  const renderItem = useCallback<ListRenderItem<FilterChip>>(
    ({ item }) => (
      <FilterPill
        label={item.label}
        selected={activeFilter === item.id}
        onPress={() => onSelectFilter(item.id)}
      />
    ),
    [activeFilter, onSelectFilter],
  );

  return (
    <FlatList
      horizontal
      data={chips}
      keyExtractor={(chip) => chip.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.content, embedded && styles.contentEmbedded]}
      ItemSeparatorComponent={Separator}
      accessibilityRole="list"
      accessibilityLabel={t('screens.explore.filters.stripA11y')}
    />
  );
});

function Separator() {
  return <View style={styles.separator} />;
}

type PillProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const FilterPill = memo(function FilterPill({ label, selected, onPress }: PillProps) {
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={cn(
        'rounded-full border px-3.5 py-2 active:opacity-90',
        selected
          ? 'border-ritual-primary/35 bg-ritual-primary/12 dark:border-ritual-primary-dark/40 dark:bg-ritual-primary-dark/18'
          : 'border-ritual-borderSoft bg-ritual-surface/80 dark:border-ritual-borderSoft-dark dark:bg-ritual-surface-dark/75',
      )}
    >
      <Text
        numberOfLines={1}
        style={{
          color: selected ? paletteHex.ritual.primary[k] : paletteHex.ritual.inkMuted[k],
        }}
        className="font-medium text-[13px] leading-[17px]"
      >
        {label}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: authScreen.insetX,
    paddingBottom: 4,
  },
  contentEmbedded: {
    paddingLeft: authScreen.insetX,
    paddingRight: 0,
  },
  separator: {
    width: EXPLORE_MOMENT_FILTER_CHIP_GAP,
  },
});
