import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { SectionGhostHeader, SECTION_GHOST_HEADER_LEADING_SIZE } from '@/components/molecules/SectionGhostHeader';
import { TestimonialCarousel } from '@/components/molecules/TestimonialCarousel';
import { useTestimonialsPreview } from '@/hooks/useTestimonialsPreview';
import { authScreen } from '@/theme/tokens';

/**
 * Closing social proof — frosted quote rail, calm enough to balance a busy feed.
 */
export const TestimonialsSection = memo(function TestimonialsSection() {
  const { t } = useTranslation();
  const testimonials = useTestimonialsPreview();

  return (
    <View className="mt-8" accessibilityRole="none">
      <View style={styles.headerInset}>
        <SectionGhostHeader
          leading={
            <FontAwesomeCircleIcon
              name="quote-left"
              circleSize={SECTION_GHOST_HEADER_LEADING_SIZE}
              accessibilityLabel={t('screens.home.testimonials.sectionLeadingA11y')}
            />
          }
          title={t('screens.home.testimonials.sectionTitle')}
          description={t('screens.home.testimonials.sectionDescription')}
          className="mb-1"
        />
      </View>
      <TestimonialCarousel testimonials={testimonials} />
    </View>
  );
});

const styles = StyleSheet.create({
  headerInset: { paddingHorizontal: authScreen.insetX },
});
