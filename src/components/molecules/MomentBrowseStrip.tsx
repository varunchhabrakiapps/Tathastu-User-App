import { memo, useCallback, useMemo } from 'react';
import { Dimensions, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

import { MomentChip } from '@/components/atoms/MomentChip';
import {
  MOMENT_CHIP_GAP,
  momentBrowseChipWidth,
  momentBrowseContentPadding,
} from '@/constants/momentBrowseLayout';
import type { MomentCategoryId } from '@/domain/momentCategory';
import type { MomentCategoryItem } from '@/hooks/useMomentCategories';

type Props = {
  moments: MomentCategoryItem[];
  chipOpenHint: string;
  onSelectMoment: (id: MomentCategoryId) => void;
};

export const MomentBrowseStrip = memo(function MomentBrowseStrip({
  moments,
  chipOpenHint,
  onSelectMoment,
}: Props) {
  const chipWidth = useMemo(
    () => momentBrowseChipWidth(Dimensions.get('window').width),
    [],
  );

  const renderItem = useCallback<ListRenderItem<MomentCategoryItem>>(
    ({ item }) => (
      <MomentChip
        momentId={item.id}
        headline={item.headline}
        subline={item.subline}
        width={chipWidth}
        accessibilityHint={chipOpenHint}
        accessibilityLabel={`${item.headline}. ${item.subline}`}
        onPress={() => onSelectMoment(item.id)}
      />
    ),
    [chipOpenHint, chipWidth, onSelectMoment],
  );

  return (
    <View accessibilityRole="none" className="mt-1">
      <FlatList
        horizontal
        data={moments}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={stripStyles.content}
      />
    </View>
  );
});

function Separator() {
  return <View style={stripStyles.sep} />;
}

const stripStyles = StyleSheet.create({
  content: momentBrowseContentPadding,
  sep: { width: MOMENT_CHIP_GAP },
});
