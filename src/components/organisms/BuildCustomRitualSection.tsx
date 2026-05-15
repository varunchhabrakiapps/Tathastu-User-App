import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { CustomRitualBuilderCallout } from '@/components/molecules/CustomRitualBuilderCallout';
import { SECTION_GHOST_HEADER_LEADING_SIZE, SectionGhostHeader } from '@/components/molecules/SectionGhostHeader';
import { authScreen } from '@/theme/tokens';

type Props = {
  onOpenBuilder: () => void;
};

/**
 * Lets seekers “draft” a ritual when the catalog or moments row doesn’t land — tees up {@link BuildCustomRitualScreen}.
 */
export const BuildCustomRitualSection = memo(function BuildCustomRitualSection({
  onOpenBuilder,
}: Props) {
  const { t } = useTranslation();

  return (
    <View className="mt-6" accessibilityRole="none">
      <View style={styles.headerInset}>
        <SectionGhostHeader
          leading={
            <FontAwesomeCircleIcon
              name="magic"
              circleSize={SECTION_GHOST_HEADER_LEADING_SIZE}
              accessibilityLabel={t('screens.home.buildCustomRitual.sectionLeadingA11y')}
            />
          }
          title={t('screens.home.buildCustomRitual.sectionTitle')}
          description={t('screens.home.buildCustomRitual.sectionDescription')}
          className="mb-2"
        />
      </View>
      <View className='mt-4' style={styles.cardInset}>
        <CustomRitualBuilderCallout onPress={onOpenBuilder} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  headerInset: { paddingHorizontal: authScreen.insetX },
  cardInset: {
    paddingHorizontal: authScreen.insetX,
  },
});
