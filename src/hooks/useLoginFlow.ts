import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { useColorScheme } from 'nativewind';

import { useAuth } from '@/context/AuthContext';
import { getLoginHeroGradient, type PaletteMode } from '@/theme/heroGradients';
import {
  isValidLoginMobileNumber,
  normalizeLoginMobileDigits,
} from '@/utils/mobile';

export function useLoginFlow() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const paletteKey: PaletteMode = colorScheme === 'dark' ? 'dark' : 'light';
  const { login } = useAuth();
  const [mobile, setMobile] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const heroColors = getLoginHeroGradient(paletteKey);

  const submitLogin = useCallback(async () => {
    setErrorKey(null);
    setSubmitting(true);
    try {
      await login(mobile);
    } catch (e) {
      if (e instanceof Error && e.message === 'INVALID_MOBILE') {
        setErrorKey('screens.login.errorInvalidMobile');
      } else {
        setErrorKey('screens.login.errorGeneric');
      }
    } finally {
      setSubmitting(false);
    }
  }, [login, mobile]);

  /** Continue button, IME Done, and iOS accessory Done share one path: dismiss keyboard, then submit if valid. */
  const onContinue = useCallback(() => {
    Keyboard.dismiss();
    if (submitting || !isValidLoginMobileNumber(mobile)) {
      return;
    }
    submitLogin();
  }, [mobile, submitting, submitLogin]);

  const onMobileChange = useCallback((text: string) => {
    setMobile(normalizeLoginMobileDigits(text));
    setErrorKey(null);
  }, []);

  const continueDisabled = !isValidLoginMobileNumber(mobile);

  return {
    paletteKey,
    heroColors,
    mobile,
    submitting,
    continueDisabled,
    onContinue,
    onMobileChange,
    errorText: errorKey ? t(errorKey) : null,
  } satisfies {
    paletteKey: PaletteMode;
    heroColors: string[];
    mobile: string;
    submitting: boolean;
    continueDisabled: boolean;
    onContinue: () => void;
    onMobileChange: (text: string) => void;
    errorText: string | null;
  };
}
