import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { AuthScreen } from '@/components/templates/AuthScreen';
import { OtpScrollBody } from '@/components/organisms/OtpScrollBody';
import { useOtpVerificationFlow } from '@/hooks/useOtpVerificationFlow';
import type { RootStackParamList } from '@/navigation/types';

export function OtpVerificationScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'OtpVerification'>>();
  const { mobile } = route.params;
  const flow = useOtpVerificationFlow(mobile);

  return (
    <AuthScreen>
      <OtpScrollBody mobileNationalDigits={mobile} flow={flow} />
    </AuthScreen>
  );
}
