import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';

import { OtpDigitBox } from '@/components/atoms/OtpDigitBox';

type Props = {
  value: string;
  length: number;
  onChangeText: (text: string) => void;
  editable?: boolean;
  accessibilityLabel: string;
};

export const OtpInput = memo(function OtpInput({
  value,
  length,
  onChangeText,
  editable = true,
  accessibilityLabel,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, []);

  const activeIndex = useMemo(() => {
    if (!focused) {
      return -1;
    }
    if (value.length >= length) {
      return length - 1;
    }
    return value.length;
  }, [focused, length, value.length]);

  const onKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (e.nativeEvent.key === 'Backspace' && value.length === 0) {
        inputRef.current?.blur();
      }
    },
    [value.length],
  );

  return (
    <View className="relative w-full" style={styles.wrap}>
      <View
        className="w-full flex-row gap-2"
        pointerEvents="none"
        importantForAccessibility="no"
      >
        {Array.from({ length }, (_, i) => (
          <OtpDigitBox
            key={i}
            char={value[i]}
            active={i === activeIndex && editable}
          />
        ))}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        editable={editable}
        caretHidden
        accessibilityLabel={accessibilityLabel}
        importantForAutofill="yes"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.overlayInput}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    minHeight: 52,
  },
  overlayInput: {
    ...StyleSheet.absoluteFill,
    opacity: 0.02,
    color: 'transparent',
  },
});
