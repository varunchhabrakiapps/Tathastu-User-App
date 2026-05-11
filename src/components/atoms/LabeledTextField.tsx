import {
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { useColorScheme } from 'nativewind';

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
> & {
  label: string;
  /** Resolved, user-visible error (caller runs `t(key)`). */
  errorText?: string | null;
  className?: string;
  /** Styles the input; if `prefix` is set, applied to the outer row wrapper instead. */
  inputClassName?: string;
  /** Non-editable leading segment (e.g. country code). */
  prefix?: string;
};

/**
 * Single-line field with semantic label + optional inline error (design-system borders).
 */
const inputInnerClass =
  'flex-1 min-w-0 border-0 bg-transparent py-[18px] pl-3 pr-5 text-ink dark:text-ink-ondark';

export function LabeledTextField({
  label,
  errorText,
  className,
  inputClassName,
  prefix,
  ...inputProps
}: Props) {
  const { colorScheme } = useColorScheme();
  const paletteKey = colorScheme === 'dark' ? 'dark' : 'light';
  const placeholderColor = paletteHex.inkMuted[paletteKey];

  const field = prefix ? (
    <View
      className={cn(
        'flex-row items-center overflow-hidden rounded-2xl border border-border bg-canvas dark:border-border-dark dark:bg-canvas-dark',
        inputClassName,
      )}
    >
      <View className="justify-center border-r border-border py-[18px] pl-5 pr-3 dark:border-border-dark">
        <Text className="font-semibold tabular-nums text-ink-muted dark:text-ink-muted-ondark">
          {prefix}
        </Text>
      </View>
      <TextInput
        placeholderTextColor={placeholderColor}
        className={inputInnerClass}
        {...inputProps}
      />
    </View>
  ) : (
    <TextInput
      placeholderTextColor={placeholderColor}
      className={cn(
        'rounded-2xl border border-border bg-canvas px-4 py-3.5 text-ink dark:border-border-dark dark:bg-canvas-dark dark:text-ink-ondark',
        inputClassName,
      )}
      {...inputProps}
    />
  );

  return (
    <View className={cn(className)}>
      <Text className="mb-2 text-sm font-medium text-ink dark:text-ink-ondark">
        {label}
      </Text>
      {field}
      {errorText ? (
        <Text
          accessibilityRole="alert"
          className="mt-2 text-sm text-warm-deep dark:text-warm-dark"
        >
          {errorText}
        </Text>
      ) : null}
    </View>
  );
}
