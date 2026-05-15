import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { RitualCarousel } from '@/components/molecules/RitualCarousel';
import { SectionGhostHeader } from '@/components/molecules/SectionGhostHeader';
import { useTrendingRitualsPreview } from '@/hooks/useTrendingRitualsPreview';

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
      <SectionGhostHeader
        title={t('screens.home.trendingRituals.sectionTitle')}
        description={t('screens.home.trendingRituals.sectionDescription')}
        actionLabel={onViewAll ? t('screens.home.trendingRituals.viewAll') : undefined}
        onActionPress={onViewAll}
        actionAccessibilityLabel={
          onViewAll ? t('screens.home.trendingRituals.viewAllA11y') : undefined
        }
        className="mb-1"
      />
      <RitualCarousel rituals={rituals} onSelectRitual={onOpenRitualDetail} />
    </View>
  );
});
