import { memo, useCallback, useMemo } from 'react';
import { Dimensions, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

import {
  HOME_RITUAL_CARD_GAP,
  HOME_RITUAL_CARD_PEEK_PX,
  trendingPreviewCardWidth,
} from '@/constants/ritualLayout';
import type { TrendingRitualPreview } from '@/domain/trendingRitual';
import { authScreen } from '@/theme/tokens';

import { RitualCard } from './RitualCard';

type Props = {
  rituals: TrendingRitualPreview[];
  onSelectRitual: (ritualId: string) => void;
};

export const RitualCarousel = memo(function RitualCarousel({
  rituals,
  onSelectRitual,
}: Props) {
  const cardWidth = useMemo(
    () => trendingPreviewCardWidth(Dimensions.get('window').width),
    [],
  );

  const renderItem = useCallback<ListRenderItem<TrendingRitualPreview>>(
    ({ item }) => (
      <RitualCard
        ritual={item}
        cardWidth={cardWidth}
        onPress={() => onSelectRitual(item.id)}
      />
    ),
    [cardWidth, onSelectRitual],
  );

  return (
    <View accessibilityRole="none" className="mt-1">
      <FlatList
        horizontal
        data={rituals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={carouselContentStyles.scroll}
      />
    </View>
  );
});

function Separator() {
  return <View style={carouselContentStyles.sep} />;
}

const carouselContentStyles = StyleSheet.create({
  scroll: {
    paddingLeft: authScreen.insetX,
    paddingRight: authScreen.insetX + HOME_RITUAL_CARD_PEEK_PX,
    paddingVertical: 6,
  },
  sep: {
    width: HOME_RITUAL_CARD_GAP,
  },
});
