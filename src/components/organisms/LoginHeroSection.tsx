import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, useWindowDimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { RitualFramedHeroIllustration } from '@/components/atoms/RitualFramedHeroIllustration';
import { LOGIN_HERO_ART, LOGIN_HERO_SOURCE } from '@/constants/loginLayout';
import { authScreen } from '@/theme/tokens';

/**
 * Top visual anchor — shared `RitualFramedHeroIllustration` frame with login asset + sizing.
 */
export const LoginHeroSection = memo(function LoginHeroSection() {
  const { t } = useTranslation();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const contentWidth = windowWidth - authScreen.insetX * 2;

  const artHeight = useMemo(
    () =>
      Math.round(
        Math.min(
          LOGIN_HERO_ART.maxHeight,
          contentWidth * LOGIN_HERO_ART.widthFactor,
          Math.max(
            LOGIN_HERO_ART.minHeight,
            windowHeight * LOGIN_HERO_ART.windowHeightFactor,
          ),
        ) * LOGIN_HERO_ART.heightScale,
      ),
    [contentWidth, windowHeight],
  );

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
