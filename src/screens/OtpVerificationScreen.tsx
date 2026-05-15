import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AuthScreen } from '@/components/templates/AuthScreen';
import { OtpScrollBody } from '@/components/organisms/OtpScrollBody';
import { useOtpVerificationScreen } from '@/hooks/useOtpVerificationScreen';
import type { RootStackParamList } from '@/navigation/types';

export function OtpVerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'OtpVerification'>>();
  const { mobile } = route.params;
  const vm = useOtpVerificationScreen(mobile);

  return (
    <AuthScreen hasBackHeader onBackPress={() => navigation.goBack()}>
      <OtpScrollBody
        formattedPhone={vm.formattedPhone}
        onEditPhone={vm.onEditPhone}
        otp={vm.otp}
        otpLength={vm.otpLength}
        onOtpChange={vm.onOtpChange}
        onVerify={vm.onVerify}
        verifyLoading={vm.verifyLoading}
        verifyDisabled={vm.verifyDisabled}
        secondsLeft={vm.secondsLeft}
        canResend={vm.canResend}
        resendExhausted={vm.resendExhausted}
        resendLoading={vm.resendLoading}
        onResend={vm.onResend}
      />
    </AuthScreen>
  );
}
