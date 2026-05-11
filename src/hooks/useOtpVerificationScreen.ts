import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { RootStackParamList } from '@/navigation/types';
import { formatLoginMobileForDisplay } from '@/utils/mobile';
import {
  useOtpVerification,
  type UseOtpVerificationOptions,
} from '@/hooks/useOtpVerification';

/**
 * Wires OTP verification to navigation + route-derived display phone (screen-level orchestration).
 */
export function useOtpVerificationScreen(
  mobileNationalNumber: string,
  options?: UseOtpVerificationOptions,
) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const verification = useOtpVerification(mobileNationalNumber, options);

  const formattedPhone = useMemo(
    () => formatLoginMobileForDisplay(mobileNationalNumber),
    [mobileNationalNumber],
  );

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    formattedPhone,
    onBackPress,
    onEditPhone: onBackPress,
    ...verification,
  };
}
