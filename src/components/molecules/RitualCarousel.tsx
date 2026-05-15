import { memo, useMemo } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import {
  HOME_RITUAL_CARD_GAP,
  HOME_RITUAL_CARD_PEEK_PX,
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
  const cardWidth = useMemo(() => {
    const windowWidth = Dimensions.get('window').width;
    const horizontalInset = authScreen.insetX * 2;
    return Math.max(240, windowWidth - horizontalInset - HOME_RITUAL_CARD_PEEK_PX);
  }, []);

  return (
    <View accessibilityRole="none" className="mt-1">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={layoutStyles.scrollContent}
      >
        {rituals.map((item, index) => (
          <View
            key={item.id}
            style={index === rituals.length - 1 ? layoutStyles.cardCellLast : layoutStyles.cardCell}
          >
            <RitualCard
              ritual={item}
              cardWidth={cardWidth}
              onPress={() => onSelectRitual(item.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

const layoutStyles = StyleSheet.create({
  /** Inset comes from Home `FlatList` content container — only trailing peek + vertical rhythm here. */
  scrollContent: {
    paddingLeft: 0,
    // paddingRight: HOME_RITUAL_CARD_PEEK_PX,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardCell: {
    marginRight: HOME_RITUAL_CARD_GAP,
  },
  cardCellLast: {
    marginRight: 0,
  },
});
