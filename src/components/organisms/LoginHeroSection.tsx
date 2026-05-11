import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { RitualFramedHeroIllustration } from '@/components/atoms/RitualFramedHeroIllustration';
import { LOGIN_HERO_SOURCE } from '@/constants/loginLayout';
/**
 * Top visual anchor — shared `RitualFramedHeroIllustration` frame with login asset + sizing.
 */
export const LoginHeroSection = memo(function LoginHeroSection() {
  const { t } = useTranslation();

  return (
    <Animated.View entering={FadeIn.duration(560)} className="w-full">
      <View className="px-5 pt-4 pb-6">
        <RitualFramedHeroIllustration
          source={LOGIN_HERO_SOURCE}
          accessibilityLabel={t('screens.login.heroIllustrationA11y')}
          isActive
          artHeight={180}
        />
      </View>
    </Animated.View>
  );
});
