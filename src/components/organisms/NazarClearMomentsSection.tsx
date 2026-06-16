import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { NazarClearMomentsPanel } from '@/components/molecules/NazarClearMomentsPanel';
import type { NazarClearMomentId } from '@/domain/nazarClearMoment';
import { useNazarClearMoments } from '@/hooks/useNazarClearMoments';
import { paletteHex } from '@/theme/palette';
import { authScreen } from '@/theme/tokens';

type Props = {
  onSelectMoment: (momentId: NazarClearMomentId) => void;
};

/**
 * Relatable nazar-clearing moments — editorial header + one scannable panel below the hero.
 */
export const NazarClearMomentsSection = memo(function NazarClearMomentsSection({
  onSelectMoment,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const schemeKey = colorScheme === 'dark' ? 'dark' : 'light';
  const moments = useNazarClearMoments();

  const titleColor = paletteHex.ritual.ink[schemeKey];
  const descriptionColor = paletteHex.ritual.inkMuted[schemeKey];

  return (
    <View style={styles.inset} className="mt-6 gap-3" accessibilityRole="none">
      <View className="gap-1.5">
        <Text
          accessibilityRole="header"
          style={{ color: titleColor }}
          className="font-semibold text-[17px] leading-[22px] tracking-[-0.02em]"
        >
          {t('screens.home.nazarClearMoments.sectionTitle')}
        </Text>
        <Text
          accessibilityRole="text"
          style={{ color: descriptionColor }}
          className="max-w-[21rem] font-normal text-[13px] leading-[19px]"
        >
          {t('screens.home.nazarClearMoments.sectionDescription')}
        </Text>
      </View>

      <NazarClearMomentsPanel moments={moments} onSelectMoment={onSelectMoment} />
    </View>
  );
});

const styles = StyleSheet.create({
  inset: { paddingHorizontal: authScreen.insetX },
});
