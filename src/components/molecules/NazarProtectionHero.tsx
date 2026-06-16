import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { RitualFramedHeroIllustration } from '@/components/atoms/RitualFramedHeroIllustration';
import { NAZAR_HERO_ART_HEIGHT, NAZAR_HERO_SOURCE } from '@/constants/homeLayout';
import { authScreen } from '@/theme/tokens';

/** Editorial nazar protection pitch — bold headline stack, calm body, ritual illustration. */
export const NazarProtectionHero = memo(function NazarProtectionHero() {
  const { t } = useTranslation();
  const heroSource = useMemo(() => NAZAR_HERO_SOURCE, []);

  return (
    <View style={styles.inset} className="mt-5 gap-3.5" accessibilityRole="none">
      <View className="gap-0.5">
        <Text
          accessibilityRole="header"
          className="font-medium text-home-hero-question text-ritual-ink dark:text-ritual-ink-dark"
        >
          {t('screens.home.nazarProtectionHero.headlineQuestion')}
        </Text>
        <Text
          accessibilityRole="header"
          className="font-semibold text-home-hero-action text-ritual-primary dark:text-ritual-primary-dark"
        >
          {t('screens.home.nazarProtectionHero.headlineAction')}
        </Text>
      </View>

      <Text
        accessibilityRole="text"
        className="max-w-[22rem] font-normal text-login-body leading-[23px] text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
      >
        {t('screens.home.nazarProtectionHero.body')}
      </Text>

      <View className="mt-1 w-full">
        <RitualFramedHeroIllustration
          source={heroSource}
          accessibilityLabel={t('screens.home.nazarProtectionHero.illustrationA11y')}
          isActive
          artHeight={NAZAR_HERO_ART_HEIGHT}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  inset: { paddingHorizontal: authScreen.insetX },
});
