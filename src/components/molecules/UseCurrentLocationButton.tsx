import { memo } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
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
};

/** Secondary GPS affordance — sits below the location search field. */
export const UseCurrentLocationButton = memo(function UseCurrentLocationButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  className,
}: Props) {
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';
  const labelColor = paletteHex.ritual.primary[k];
  const isBusy = loading || disabled;

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
