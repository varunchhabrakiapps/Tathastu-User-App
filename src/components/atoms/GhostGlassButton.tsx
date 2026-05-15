import { Pressable, Text, View } from 'react-native';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { cn } from '@/utils/cn';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  className?: string;
};

/**
 * Whisper-weight control — pairs with {@link PrimaryGlassButton} and {@link IconButton} via {@link LiquidGlassMaterial}.
 */
export function GhostGlassButton({
  label,
  onPress,
  disabled = false,
  accessibilityLabel,
  className,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !!disabled }}
      hitSlop={10}
      className={cn('self-start active:opacity-88', disabled && 'opacity-48', className)}
    >
      <LiquidGlassMaterial
        preset="ghost"
        borderRadius={RITUAL_CORNER_RADIUS}
        className="rounded-[18px]"
      >
        <View className="justify-center px-3.5 py-2">
          <Text className="text-center text-sm font-semibold text-ritual-primary dark:text-ritual-primary-dark">
            {label}
          </Text>
        </View>
      </LiquidGlassMaterial>
    </Pressable>
  );
}
