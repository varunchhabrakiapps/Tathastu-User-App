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
 * Login flow composition: hero → trust / brand → auth slab → legal (keyboard-safe scroll parent).
 */
export const LoginScrollBody = memo(function LoginScrollBody(props: Props) {
  return (
    <View className="flex-1">
      <LoginHeroSection />
      <View className="flex-1 px-5">
        <Animated.View
          entering={FadeInDown.duration(520).delay(80)}
          className="w-full gap-8 pb-2"
        >
          <LoginTrustBrandSection />
          <LoginFormCard {...props} />
        </Animated.View>
      </View>
    </View>
  );
});
