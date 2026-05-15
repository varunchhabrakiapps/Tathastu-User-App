import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useColorScheme } from 'nativewind';

import {
  LiquidGlassMaterial,
  type LiquidGlassMaterialPreset,
} from '@/components/atoms/LiquidGlassMaterial';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { cn } from '@/utils/cn';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
  /** Marketing flows (e.g. onboarding) — saffron glass instead of indigo. */
  tint?: 'primary' | 'warm';
};

/**
 * Primary CTA with platform materials (see {@link LiquidGlassMaterial}).
 */
export function PrimaryGlassButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  accessibilityLabel,
  className,
  tint = 'primary',
}: Props) {
  const { colorScheme } = useColorScheme();
  const mode = colorScheme === 'dark' ? 'dark' : 'light';
  const preset: LiquidGlassMaterialPreset = tint === 'warm' ? 'warm' : 'primary';
  const isBusy = loading || disabled;
  const spinnerColor = mode === 'dark' ? '#fafaf9' : '#ffffff';

  const labelContent: ReactNode = loading ? (
    <ActivityIndicator color={spinnerColor} />
  ) : (
    <Text className="text-center text-base font-semibold text-white">{label}</Text>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={isBusy}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isBusy, busy: loading }}
      className={cn(
        'active:opacity-92',
        disabled && !loading && 'opacity-48',
      )}
    >
      <LiquidGlassMaterial
        preset={preset}
        borderRadius={RITUAL_CORNER_RADIUS}
        className={cn('rounded-[18px]', className)}
      >
        <View className="items-center justify-center py-4">{labelContent}</View>
      </LiquidGlassMaterial>
    </Pressable>
  );
}
