import { memo, useCallback, useMemo, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { useColorScheme } from 'nativewind';

import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = Pick<
  TextInputProps,
  | 'value'
  | 'onChangeText'
  | 'placeholder'
  | 'keyboardType'
  | 'autoComplete'
  | 'textContentType'
  | 'editable'
  | 'accessibilityLabel'
  | 'maxLength'
  | 'returnKeyType'
  | 'onSubmitEditing'
  | 'blurOnSubmit'
  | 'inputAccessoryViewID'
  | 'onFocus'
  | 'onBlur'
> & {
  label: string;
  prefix: string;
  errorText?: string | null;
  className?: string;
};

const inputClass =
  'min-w-0 flex-1 border-0 bg-transparent py-4 pr-5 font-normal text-[17px] tracking-[-0.018em] text-ritual-ink dark:text-ritual-ink-dark';

const rInk = paletteHex.ritual.ink;

/**
 * Solid filled phone row — iOS-style surface, neutral depth (no warm “glow wash”).
 */
export const RitualPhoneField = memo(function RitualPhoneField({
  label,
  prefix,
  errorText,
  className,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ...inputRest
}: Props) {
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const isDark = colorScheme === 'dark';
  const [focused, setFocused] = useState(false);

  const placeholderColor = useMemo(
    () =>
      hexToRgba(paletteHex.ritual.inkMuted[paletteKey], isDark ? 0.42 : 0.36),
    [paletteKey, isDark],
  );

  const onFocus = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
      setFocused(true);
      onFocusProp?.(e);
    },
    [onFocusProp],
  );

  const onBlur = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
      setFocused(false);
      onBlurProp?.(e);
    },
    [onBlurProp],
  );

  const rowShadow = useMemo(() => {
    if (Platform.OS === 'android') {
      return { elevation: focused ? 7 : 4 };
    }
    return focused
      ? {
          shadowColor: rInk[isDark ? 'dark' : 'light'],
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.35 : 0.12,
          shadowRadius: 20,
        }
      : {
          shadowColor: rInk[isDark ? 'dark' : 'light'],
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: isDark ? 0.22 : 0.08,
          shadowRadius: 14,
        };
  }, [focused, isDark]);

  return (
    <View className={cn(className)}>
      <Text
        className={cn(
          'mb-3 text-xs font-semibold tracking-[0.02em]',
          focused
            ? 'text-ritual-ink dark:text-ritual-ink-dark'
            : 'text-ritual-inkMuted dark:text-ritual-inkMuted-dark',
        )}
      >
        {label}
      </Text>
      <View
        className={cn(
          'min-h-[56px] flex-row items-center overflow-hidden',
          'bg-ritual-surfaceSecondary dark:bg-ritual-surfaceSecondary-dark',
          focused && 'bg-ritual-surface dark:bg-ritual-surface-dark',
        )}
        style={[styles.row, rowShadow]}
      >
        <Text
          className={cn(
            'pl-5 pr-2.5 pb-[1px] pt-[1px] text-[17px] font-semibold tabular-nums leading-none text-ritual-inkMuted dark:text-ritual-inkMuted-dark',
            focused && 'text-ritual-primary dark:text-ritual-primary-dark',
          )}
        >
          {prefix}
        </Text>
        <TextInput
          placeholderTextColor={placeholderColor}
          className={inputClass}
          onFocus={onFocus}
          onBlur={onBlur}
          underlineColorAndroid="transparent"
          {...inputRest}
        />
      </View>
      {errorText ? (
        <Text
          accessibilityRole="alert"
          className="mt-3 text-[13px] leading-[18px] text-warm-deep dark:text-warm-dark"
        >
          {errorText}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    borderRadius: RITUAL_CORNER_RADIUS,
  },
});
