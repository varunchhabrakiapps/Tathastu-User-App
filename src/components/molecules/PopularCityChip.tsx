import { memo } from 'react';
import { Pressable, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onPress: () => void;
  accessibilityLabel: string;
};

/** Tappable city pill for the manual location popular-cities grid. */
export const PopularCityChip = memo(function PopularCityChip({
  label,
  selected,
  disabled = false,
  onPress,
  accessibilityLabel,
}: Props) {
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected, disabled: Boolean(disabled) }}
      disabled={disabled}
      onPress={onPress}
      className={cn(
        'min-h-[44px] flex-1 basis-[46%] items-center justify-center rounded-2xl border px-3 py-3 active:opacity-90',
        selected
          ? 'border-ritual-primary/35 bg-ritual-primary/12 dark:border-ritual-primary-dark/40 dark:bg-ritual-primary-dark/18'
          : 'border-ritual-borderSoft/70 bg-ritual-surface/85 dark:border-ritual-borderSoft-dark/55 dark:bg-ritual-surface-dark/80',
        disabled && 'opacity-50',
      )}
    >
      <Text
        numberOfLines={1}
        style={{
          color: selected ? paletteHex.ritual.primary[k] : paletteHex.ritual.ink[k],
        }}
        className="font-semibold text-[14px] leading-[18px]"
      >
        {label}
      </Text>
    </Pressable>
  );
});
