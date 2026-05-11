import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ColorValue,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';
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

const BORDER_RADIUS = 16;

function glassTints(
  mode: 'light' | 'dark',
  tint: 'primary' | 'warm',
): {
  glassTint: ColorValue;
  overlayTint: string;
  blurType: 'light' | 'dark' | 'xlight' | 'prominent';
} {
  if (tint === 'warm') {
    return mode === 'dark'
      ? {
          glassTint: 'rgba(251, 146, 60, 1)' as ColorValue,
          overlayTint: 'rgba(234, 88, 12, 0.94)',
          blurType: 'dark',
        }
      : {
          glassTint: 'rgba(234, 88, 12, 1)' as ColorValue,
          overlayTint: 'rgba(194, 65, 12, 0.95)',
          blurType: 'dark',
        };
  }
  return mode === 'dark'
    ? {
        glassTint: 'rgba(165, 180, 252, 1)' as ColorValue,
        overlayTint: 'rgba(55, 48, 163, 1)',
        blurType: 'dark' as const,
      }
    : {
        glassTint: 'rgba(79, 70, 229, 1)' as ColorValue,
        overlayTint: 'rgba(67, 56, 202, 1)',
        blurType: 'dark' as const,
      };
}

/**
 * Primary CTA with platform materials:
 * - **Liquid glass** when `isLiquidGlassSupported` (`@callstack/liquid-glass`, native gate — today iOS 26+).
 * - **BlurView** on remaining iOS + Android (frosted stack + tint overlay).
 * - **Solid** primary where blur is unavailable.
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
  const isBusy = loading || disabled;
  const spinnerColor = mode === 'dark' ? '#fafaf9' : '#ffffff';
  const { glassTint, overlayTint, blurType } = glassTints(mode, tint);
  const iosFallback =
    tint === 'warm' ? paletteHex.warm.saffron : paletteHex.primary.light;

  const labelContent: ReactNode = loading ? (
    <ActivityIndicator color={spinnerColor} />
  ) : (
    <Text className="text-center text-base font-semibold text-white">
      {label}
    </Text>
  );

  let body: ReactNode;


  if (isLiquidGlassSupported) {
    body = (
      <View className={cn('rounded-2xl', className)}>
        <LiquidGlassView
          effect="clear"
          tintColor={glassTint}
          colorScheme={mode}
          interactive
          style={styles.liquid}
        >
          <View className="items-center justify-center py-4">{labelContent}</View>
        </LiquidGlassView>
      </View>
    );
  } else if (Platform.OS === 'ios' || Platform.OS === 'android') {
    body = (
      <View className={cn('overflow-hidden rounded-2xl', className)} style={styles.rounded}>
        <BlurView
          blurType={blurType}
          blurAmount={Platform.OS === 'ios' ? 16 : 14}
          {...(Platform.OS === 'ios'
            ? { reducedTransparencyFallbackColor: iosFallback }
            : {})}
          style={StyleSheet.absoluteFill}
        />
        <View
          pointerEvents="none"
          className="items-center justify-center py-4"
          style={{ backgroundColor: overlayTint }}
        >
          {labelContent}
        </View>
      </View>
    );
  } else {
    body = (
      <View
        className={cn(
          tint === 'warm'
            ? 'items-center justify-center overflow-hidden rounded-2xl bg-warm-saffron py-4 dark:bg-warm-saffron'
            : 'items-center justify-center overflow-hidden rounded-2xl bg-primary py-4 dark:bg-primary-soft-dark',
          className,
        )}
      >
        {labelContent}
      </View>
    );
  }

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
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rounded: {
    borderRadius: BORDER_RADIUS,
  },
  liquid: {
    borderRadius: BORDER_RADIUS,
  },
});
