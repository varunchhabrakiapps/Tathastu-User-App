import { memo, useCallback, useMemo } from 'react';
import { Dimensions, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

import { TestimonialCard } from '@/components/molecules/TestimonialCard';
import {
  TESTIMONIAL_CARD_GAP,
  testimonialCardWidth,
  testimonialCarouselContentPadding,
} from '@/constants/testimonialCarouselLayout';
import type { TestimonialPreview } from '@/domain/testimonialPreview';

type Props = {
  testimonials: readonly TestimonialPreview[];
};

export const TestimonialCarousel = memo(function TestimonialCarousel({ testimonials }: Props) {
  const cardWidth = useMemo(
    () => testimonialCardWidth(Dimensions.get('window').width),
    [],
  );

  const rows = useMemo(() => [...testimonials], [testimonials]);

  const renderItem = useCallback<ListRenderItem<TestimonialPreview>>(
    ({ item }) => <TestimonialCard testimonialId={item.id} width={cardWidth} />,
    [cardWidth],
  );

  return (
    <View accessibilityRole="none" className="mt-1">
      <FlatList
        horizontal
        data={rows}
        keyExtractor={(item) => item.id}
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
  content: testimonialCarouselContentPadding,
  sep: { width: TESTIMONIAL_CARD_GAP },
});
