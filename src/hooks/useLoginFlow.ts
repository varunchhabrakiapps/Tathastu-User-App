import { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { RootStackParamList } from '@/navigation/types';
import {
  isValidLoginMobileNumber,
  normalizeLoginMobileDigits,
} from '@/utils/mobile';

export function useLoginFlow() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [mobile, setMobile] = useState('');

  const onContinue = useCallback(() => {
    Keyboard.dismiss();
    if (!isValidLoginMobileNumber(mobile)) {
      return;
    }
    navigation.navigate('OtpVerification', { mobile });
  }, [mobile, navigation]);

  const onMobileChange = useCallback((text: string) => {
    setMobile(normalizeLoginMobileDigits(text));
  }, []);

  const continueDisabled = !isValidLoginMobileNumber(mobile);

  return {
    mobile,
    continueDisabled,
    onContinue,
    onMobileChange,
    errorText: null as string | null,
    submitting: false,
  };
}
