import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { MomentBrowseStrip } from '@/components/molecules/MomentBrowseStrip';
import { SECTION_GHOST_HEADER_LEADING_SIZE, SectionGhostHeader } from '@/components/molecules/SectionGhostHeader';
import type { MomentCategoryId } from '@/domain/momentCategory';
import { useMomentCategories } from '@/hooks/useMomentCategories';
import { authScreen } from '@/theme/tokens';

type Props = {
  onSelectMoment: (momentId: MomentCategoryId) => void;
};

/**
 * Mood-led ritual discovery — ordered by {@link MOMENT_CATEGORY_IDS}, copy in i18n.
 */
export const BrowseByMomentSection = memo(function BrowseByMomentSection({
  onSelectMoment,
}: Props) {
  const { t } = useTranslation();
  const moments = useMomentCategories();

  return (
    <View className="mt-6" accessibilityRole="none">
      <View style={styles.headerInset}>
        <SectionGhostHeader
          leading={
            <FontAwesomeCircleIcon
              name="compass"
              circleSize={SECTION_GHOST_HEADER_LEADING_SIZE}
              accessibilityLabel={t('screens.home.browseByMoment.sectionLeadingA11y')}
            />
          }
          title={t('screens.home.browseByMoment.sectionTitle')}
          description={t('screens.home.browseByMoment.sectionDescription')}
          className="mb-1"
        />
      </View>
      <MomentBrowseStrip
        moments={moments}
        chipOpenHint={t('screens.home.browseByMoment.chipOpenHint')}
        onSelectMoment={onSelectMoment}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  headerInset: { paddingHorizontal: authScreen.insetX },
});
