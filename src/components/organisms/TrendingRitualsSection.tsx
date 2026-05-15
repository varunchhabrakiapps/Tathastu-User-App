import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { RitualCarousel } from '@/components/molecules/RitualCarousel';
import { SectionGhostHeader, SECTION_GHOST_HEADER_LEADING_SIZE } from '@/components/molecules/SectionGhostHeader';
import { useTrendingRitualsPreview } from '@/hooks/useTrendingRitualsPreview';
import { authScreen } from '@/theme/tokens';

type Props = {
  onOpenRitualDetail: (ritualId: string) => void;
  /** Optional — wire to Explore or a full trending hub when it exists. */
  onViewAll?: () => void;
};

export const TrendingRitualsSection = memo(function TrendingRitualsSection({
  onOpenRitualDetail,
  onViewAll,
}: Props) {
  const { t } = useTranslation();
  const rituals = useTrendingRitualsPreview();

  return (
    <View className="mt-8" accessibilityRole="none">
      <View style={styles.headerInset}>
        <SectionGhostHeader
          leading={
            <FontAwesomeCircleIcon
              name="line-chart"
              circleSize={SECTION_GHOST_HEADER_LEADING_SIZE}
              accessibilityLabel={t('screens.home.trendingRituals.sectionLeadingA11y')}
            />
          }
          title={t('screens.home.trendingRituals.sectionTitle')}
          description={t('screens.home.trendingRituals.sectionDescription')}
          actionLabel={onViewAll ? t('screens.home.trendingRituals.viewAll') : undefined}
          onActionPress={onViewAll}
          actionAccessibilityLabel={
            onViewAll ? t('screens.home.trendingRituals.viewAllA11y') : undefined
          }
          className="mb-1"
        />
      </View>
      <RitualCarousel rituals={rituals} onSelectRitual={onOpenRitualDetail} />
    </View>
  );
});

const styles = StyleSheet.create({
  headerInset: { paddingHorizontal: authScreen.insetX },
});
