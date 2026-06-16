import { memo } from 'react';
import { View } from 'react-native';

import { ExploreMomentFilterStrip } from '@/components/molecules/ExploreMomentFilterStrip';
import { ExploreSortButton } from '@/components/molecules/ExploreSortButton';
import type { ExploreMomentFilter } from '@/hooks/useExploreRitualCatalog';

type Props = {
  momentFilter: ExploreMomentFilter;
  onSelectMomentFilter: (filter: ExploreMomentFilter) => void;
  sortLabel: string;
  sortAccessibilityLabel: string;
  sortActive: boolean;
  onOpenSort: () => void;
};

/** Moment chips (scroll) + fixed sort control on the trailing edge. */
export const ExploreFilterToolbar = memo(function ExploreFilterToolbar({
  momentFilter,
  onSelectMomentFilter,
  sortLabel,
  sortAccessibilityLabel,
  sortActive,
  onOpenSort,
}: Props) {
  return (
    <View className="flex-row items-center">
      <View className="min-w-0 flex-1">
        <ExploreMomentFilterStrip
          embedded
          activeFilter={momentFilter}
          onSelectFilter={onSelectMomentFilter}
        />
      </View>
      <ExploreSortButton
        label={sortLabel}
        accessibilityLabel={sortAccessibilityLabel}
        active={sortActive}
        onPress={onOpenSort}
      />
    </View>
  );
});
