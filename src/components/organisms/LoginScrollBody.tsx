import { memo } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { LoginTrustBrandSection } from '@/components/molecules/LoginTrustBrandSection';
import { LoginFormCard } from '@/components/organisms/LoginFormCard';
import { LoginHeroSection } from '@/components/organisms/LoginHeroSection';

type Props = {
  mobile: string;
  onMobileChange: (text: string) => void;
  onContinue: () => void;
  continueDisabled: boolean;
  submitting: boolean;
  errorText: string | null;
};

/**
 * Login flow composition: hero → trust / brand → self-contained auth slab (keyboard-safe scroll parent).
 */
export const LoginScrollBody = memo(function LoginScrollBody(props: Props) {
  return (
    <View className="flex-1">
      <LoginHeroSection />
      <View className="flex-1 justify-start px-5 pt-1">
        <Animated.View
          entering={FadeInDown.duration(520).delay(80)}
          className="w-full gap-6 pb-10"
        >
          <LoginTrustBrandSection />
          <LoginFormCard {...props} />
        </Animated.View>
      </View>
    </View>
  );
});
