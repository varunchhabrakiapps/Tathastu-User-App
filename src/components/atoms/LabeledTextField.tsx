import {
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
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
> & {
  label: string;
  /** Resolved, user-visible error (caller runs `t(key)`). */
  errorText?: string | null;
  className?: string;
  /** Styles the input; if `prefix` is set, applied to the outer row wrapper instead. */
  inputClassName?: string;
  /** Non-editable leading segment (e.g. country code). */
  prefix?: string;
  /** `ritual` matches profile/auth slabs; default uses app canvas tokens. */
  tone?: 'default' | 'ritual';
};

const CANVAS_BORDER = { light: '#e7e5e4', dark: '#44403c' } as const;
const INK = { light: '#1c1917', dark: '#fafaf9' } as const;

/**
 * Single-line field with semantic label + optional inline error (design-system borders).
 */
export function LabeledTextField({
  label,
  errorText,
  className,
  inputClassName,
  prefix,
  tone = 'default',
  ...inputProps
}: Props) {
  const ritual = useRitualSemanticColors();
  const mode = ritual.mode;
  const isRitual = tone === 'ritual';

  const fieldBg = isRitual ? ritual.canvas : paletteHex.canvas[mode];
  const fieldBorder = isRitual ? ritual.borderSoft : CANVAS_BORDER[mode];
  const ink = isRitual ? ritual.ink : INK[mode];
  const inkMuted = isRitual ? ritual.inkMuted : paletteHex.inkMuted[mode];
  const warmAccent = ritual.warmAccent;

  const fieldShellStyle = {
    backgroundColor: fieldBg,
    borderWidth: 1,
    borderColor: hexToRgba(fieldBorder, isRitual ? (ritual.isDark ? 0.55 : 0.85) : 1),
    borderRadius: 16,
  };

  const field = prefix ? (
    <View style={fieldShellStyle} className={cn('flex-row items-center overflow-hidden', inputClassName)}>
      <View
        className="justify-center py-[18px] pl-5 pr-3"
        style={{ borderRightWidth: 1, borderRightColor: fieldBorder }}
      >
        <Text style={{ color: inkMuted }} className="font-semibold tabular-nums">
          {prefix}
        </Text>
      </View>
      <TextInput
        placeholderTextColor={inkMuted}
        style={{ color: ink }}
        className="min-w-0 flex-1 border-0 bg-transparent py-[18px] pl-3 pr-5"
        {...inputProps}
      />
    </View>
  ) : (
    <TextInput
      placeholderTextColor={inkMuted}
      style={[fieldShellStyle, { color: ink, paddingHorizontal: 16, paddingVertical: 14 }]}
      className={cn(inputClassName)}
      {...inputProps}
    />
  );

  return (
    <View className={cn(className)}>
      <Text style={{ color: ink }} className="mb-2 text-sm font-medium">
        {label}
      </Text>
      {field}
      {errorText ? (
        <Text accessibilityRole="alert" style={{ color: warmAccent }} className="mt-2 text-sm">
          {errorText}
        </Text>
      ) : null}
    </View>
  );
}
