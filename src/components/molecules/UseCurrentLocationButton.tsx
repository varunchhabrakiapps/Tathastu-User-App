import { memo } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel: string;
  accessibilityHint?: string;
  className?: string;
  variant?: 'card' | 'inline';
};

/** GPS affordance — inline text link (default) or secondary ghost card. */
export const UseCurrentLocationButton = memo(function UseCurrentLocationButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  className,
  variant = 'inline',
}: Props) {
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';
  const labelColor = paletteHex.ritual.primary[k];
  const isBusy = loading || disabled;

  if (variant === 'inline') {
    return (
      <Pressable
        onPress={onPress}
        disabled={isBusy}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: isBusy, busy: loading }}
        className={cn(
          'flex-row items-center justify-center gap-2 py-1 active:opacity-70',
          isBusy && !loading && 'opacity-48',
          className,
        )}
      >
        {loading ? (
          <ActivityIndicator size="small" color={labelColor} />
        ) : (
          <FontAwesome
            name="crosshairs"
            size={14}
            color={labelColor}
            importantForAccessibility="no-hide-descendants"
          />
        )}
        <Text style={{ color: labelColor }} className="font-semibold text-[14px] leading-[18px]">
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isBusy}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isBusy, busy: loading }}
      className={cn('active:opacity-88', isBusy && !loading && 'opacity-48', className)}
    >
      <LiquidGlassMaterial
        preset="ghost"
        borderRadius={RITUAL_CORNER_RADIUS}
        className="overflow-hidden rounded-[18px]"
      >
        <View className="flex-row items-center justify-center gap-2.5 px-4 py-3.5">
          {loading ? (
            <ActivityIndicator size="small" color={labelColor} />
          ) : (
            <FontAwesome
              name="crosshairs"
              size={15}
              color={labelColor}
              importantForAccessibility="no-hide-descendants"
            />
          )}
          <Text style={{ color: labelColor }} className="font-semibold text-[14px] leading-[18px]">
            {label}
          </Text>
        </View>
      </LiquidGlassMaterial>
    </Pressable>
  );
});
