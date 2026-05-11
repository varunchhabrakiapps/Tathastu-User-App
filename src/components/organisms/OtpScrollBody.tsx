import { memo, useCallback } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { AuthFlowHeader } from '@/components/molecules/AuthFlowHeader';
import { OtpFormCard } from '@/components/organisms/OtpFormCard';
import { OtpHeroSection } from '@/components/organisms/OtpHeroSection';
import { formatLoginMobileForDisplay } from '@/utils/mobile';
import type { RootStackParamList } from '@/navigation/types';
import { useOtpVerificationFlow } from '@/hooks/useOtpVerificationFlow';

type Flow = ReturnType<typeof useOtpVerificationFlow>;

type Props = {
  mobileNationalDigits: string;
  flow: Flow;
};

export const OtpScrollBody = memo(function OtpScrollBody({
  mobileNationalDigits,
  flow,
}: Props) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const formattedPhone = formatLoginMobileForDisplay(mobileNationalDigits);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View className="flex-1">
      <AuthFlowHeader onBackPress={onBack} />
      <OtpHeroSection />
      <View className="flex-1 justify-start px-5 pt-2">
        <Animated.View
          entering={FadeInDown.duration(480).delay(40)}
          className="w-full gap-6 pb-10"
        >
          <OtpFormCard
            formattedPhone={formattedPhone}
            onEditPhone={onBack}
            otp={flow.otp}
            otpLength={flow.otpLength}
            onOtpChange={flow.onOtpChange}
            onVerify={flow.onVerify}
            verifyLoading={flow.verifyLoading}
            verifyDisabled={flow.verifyDisabled}
            secondsLeft={flow.secondsLeft}
            canResend={flow.canResend}
            resendExhausted={flow.resendExhausted}
            onResend={flow.onResend}
          />
        </Animated.View>
      </View>
    </View>
  );
});
