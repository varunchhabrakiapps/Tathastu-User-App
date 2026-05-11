import { memo } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { OtpFormCard } from '@/components/organisms/OtpFormCard';
import { OtpHeroSection } from '@/components/organisms/OtpHeroSection';

type Props = {
  formattedPhone: string;
  onEditPhone: () => void;
  otp: string;
  otpLength: number;
  onOtpChange: (text: string) => void;
  onVerify: () => void;
  verifyLoading: boolean;
  verifyDisabled: boolean;
  secondsLeft: number;
  canResend: boolean;
  resendExhausted: boolean;
  resendLoading: boolean;
  onResend: () => void;
};

/**
 * Presentational OTP layout — callbacks and display props only.
 */
export const OtpScrollBody = memo(function OtpScrollBody({
  formattedPhone,
  onEditPhone,
  otp,
  otpLength,
  onOtpChange,
  onVerify,
  verifyLoading,
  verifyDisabled,
  secondsLeft,
  canResend,
  resendExhausted,
  resendLoading,
  onResend,
}: Props) {
  return (
    <View className="flex-1">
      <OtpHeroSection />
      <View className="flex-1 justify-start px-5 pt-2">
        <Animated.View
          entering={FadeInDown.duration(480).delay(40)}
          className="w-full gap-6 pb-10"
        >
          <OtpFormCard
            formattedPhone={formattedPhone}
            onEditPhone={onEditPhone}
            otp={otp}
            otpLength={otpLength}
            onOtpChange={onOtpChange}
            onVerify={onVerify}
            verifyLoading={verifyLoading}
            verifyDisabled={verifyDisabled}
            secondsLeft={secondsLeft}
            canResend={canResend}
            resendExhausted={resendExhausted}
            resendLoading={resendLoading}
            onResend={onResend}
          />
        </Animated.View>
      </View>
    </View>
  );
});
