import type { ReactNode } from 'react';
import { Platform, StyleSheet, View, type ColorValue } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { useColorScheme } from 'nativewind';

import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

export type AuthGlassMaterialPreset = 'primary' | 'warm' | 'chrome';

type Props = {
  preset: AuthGlassMaterialPreset;
  /** Border radius in px (defaults to ritual auth chrome). */
  borderRadius?: number;
  className?: string;
  children: ReactNode;
};

type Resolved = {
  liquidTint: ColorValue;
  blurType: 'light' | 'dark' | 'xlight' | 'prominent';
  iosFallback: string;
  overlayTint: string;
  /** Solid fallback (non-mobile / reduced transparency). */
  solidLightClass: string;
  solidDarkClass: string;
};

function resolvePreset(preset: AuthGlassMaterialPreset, mode: 'light' | 'dark'): Resolved {
  if (preset === 'warm') {
    return mode === 'dark'
      ? {
          liquidTint: 'rgba(251, 146, 60, 1)' as ColorValue,
          overlayTint: 'rgba(234, 88, 12, 0.94)',
          blurType: 'dark',
          iosFallback: paletteHex.warm.saffron,
          solidLightClass: 'bg-warm-saffron',
          solidDarkClass: 'dark:bg-warm-saffron',
        }
      : {
          liquidTint: 'rgba(234, 88, 12, 1)' as ColorValue,
          overlayTint: 'rgba(194, 65, 12, 0.95)',
          blurType: 'dark',
          iosFallback: paletteHex.warm.saffron,
          solidLightClass: 'bg-warm-saffron',
          solidDarkClass: 'dark:bg-warm-saffron',
        };
  }

  if (preset === 'chrome') {
    const surface = paletteHex.ritual.surface[mode];
    const glassTint =
      (mode === 'dark'
        ? hexToRgba(paletteHex.ritual.primary.dark, 0.35)
        : hexToRgba(paletteHex.ritual.primary.light, 0.28)) as ColorValue;
    return {
      liquidTint: glassTint,
      blurType: mode === 'dark' ? 'dark' : 'light',
      iosFallback: surface,
      overlayTint:
        mode === 'dark'
          ? hexToRgba(surface, 0.86)
          : hexToRgba(surface, 0.82),
      solidLightClass: 'bg-ritual-surface',
      solidDarkClass: 'dark:bg-ritual-surface-dark',
    };
  }

  return mode === 'dark'
    ? {
        liquidTint: 'rgba(165, 180, 252, 1)' as ColorValue,
        overlayTint: 'rgba(55, 48, 163, 1)',
        blurType: 'dark',
        iosFallback: paletteHex.primary.light,
        solidLightClass: 'bg-primary',
        solidDarkClass: 'dark:bg-primary-soft-dark',
      }
    : {
        liquidTint: 'rgba(79, 70, 229, 1)' as ColorValue,
        overlayTint: 'rgba(67, 56, 202, 1)',
        blurType: 'dark',
        iosFallback: paletteHex.primary.light,
        solidLightClass: 'bg-primary',
        solidDarkClass: 'dark:bg-primary-soft-dark',
      };
}

/**
 * Shared auth “material” stack: **Liquid Glass** → **BlurView** → **solid semantic surface**.
 * Use for CTAs (`primary` / `warm`) and tactile chrome (`chrome` — back / secondary icon targets).
 */
export function AuthGlassMaterial({
  preset,
  borderRadius = RITUAL_CORNER_RADIUS,
  className,
  children,
}: Props) {
  const { colorScheme } = useColorScheme();
  const mode = colorScheme === 'dark' ? 'dark' : 'light';
  const { liquidTint, overlayTint, blurType, iosFallback, solidLightClass, solidDarkClass } =
    resolvePreset(preset, mode);

  const radiusStyle = { borderRadius };

  if (isLiquidGlassSupported) {
    return (
      <View className={cn('overflow-hidden', className)} style={radiusStyle}>
        <LiquidGlassView
          effect="clear"
          tintColor={liquidTint}
          colorScheme={mode}
          interactive
          style={[styles.materialFill, radiusStyle]}
        >
          {children}
        </LiquidGlassView>
      </View>
    );
  }

  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return (
      <View className={cn('overflow-hidden', className)} style={radiusStyle}>
        <BlurView
          blurType={blurType}
          blurAmount={Platform.OS === 'ios' ? 16 : 14}
          {...(Platform.OS === 'ios'
            ? { reducedTransparencyFallbackColor: iosFallback }
            : {})}
          style={[StyleSheet.absoluteFill, radiusStyle]}
        />
        <View
          pointerEvents="box-none"
          style={[styles.blurStack, { backgroundColor: overlayTint }, radiusStyle]}
        >
          {children}
        </View>
      </View>
    );
  }

  return (
    <View
      className={cn(
        'overflow-hidden',
        solidLightClass,
        solidDarkClass,
        className,
      )}
      style={radiusStyle}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  materialFill: {
    overflow: 'hidden',
  },
  blurStack: {
    overflow: 'hidden',
  },
});
