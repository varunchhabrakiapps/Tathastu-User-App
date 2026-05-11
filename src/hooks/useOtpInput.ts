import { useCallback, useMemo, useState } from 'react';

/**
 * Controlled-style OTP string: digits only, max length, no timer or verify logic.
 */
export function useOtpInput(maxLength: number) {
  const [value, setValue] = useState('');

  const onChangeText = useCallback(
    (text: string) => {
      setValue(text.replace(/\D/g, '').slice(0, maxLength));
    },
    [maxLength],
  );

  const clear = useCallback(() => {
    setValue('');
  }, []);

  const isComplete = useMemo(() => value.length === maxLength, [maxLength, value.length]);

  return {
    value,
    onChangeText,
    clear,
    isComplete,
  };
}
