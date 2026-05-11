import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'nativewind';

import { useAuth } from '@/context/AuthContext';
import { getLoginHeroGradient, type PaletteMode } from '@/theme/heroGradients';

export function useLoginFlow() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const paletteKey: PaletteMode = colorScheme === 'dark' ? 'dark' : 'light';
  const { login } = useAuth();
  const [mobile, setMobile] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const heroColors = getLoginHeroGradient(paletteKey);

  const onContinue = useCallback(async () => {
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

  const onMobileChange = useCallback((text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 10);
    setMobile(digits);
    setErrorKey(null);
  }, []);

  return {
    paletteKey,
    heroColors,
    mobile,
    submitting,
    onContinue,
    onMobileChange,
    errorText: errorKey ? t(errorKey) : null,
  } satisfies {
    paletteKey: PaletteMode;
    heroColors: string[];
    mobile: string;
    submitting: boolean;
    onContinue: () => Promise<void>;
    onMobileChange: (text: string) => void;
    errorText: string | null;
  };
}
