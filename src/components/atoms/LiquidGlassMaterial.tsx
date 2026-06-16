import type { ReactNode } from 'react';
import { Platform, StyleSheet, View, type ColorValue } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { useColorScheme } from 'nativewind';

import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { hexToRgba, mixHex } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

export type LiquidGlassMaterialPreset = 'primary' | 'warm' | 'chrome' | 'ghost';

type Props = {
  preset: LiquidGlassMaterialPreset;
  /** Border radius in px (defaults to shared ritual chrome). */
  borderRadius?: number;
  /** Stronger frost for Modal sheets where blur sources are weak (e.g. quick preview). */
  elevated?: boolean;
  className?: string;
  children: ReactNode;
};

type Resolved = {
  liquidTint: ColorValue;
  blurType: 'light' | 'dark' | 'xlight' | 'prominent';
  iosFallback: string;
  /**
   * Frost layer on top of blur / liquid glass. Keep α moderate inline so the backdrop still
   * reads through — unlike a flat `bg-ritual-surface` slab. Use {@link Props.elevated} for sheets.
   */
  blurVeilIos: string;
  /**
   * Android **BlurView** supplies its own native `overlayColor`. We must **not** stack a second
   * near-opaque white veil on top, or the card reads as a solid block over the gradient.
   */
  androidBlurOverlay: string;
  /** Optional hairline tint above Android blur when presets need a touch more readability. */
  androidSecondVeil: string;
  /** Solid fallback (non-mobile / reduced transparency). */
  solidLightClass: string;
  solidDarkClass: string;
};

function resolvePreset(preset: LiquidGlassMaterialPreset, mode: 'light' | 'dark'): Resolved {
  const canvas = paletteHex.ritual.canvas[mode];
  const surface = paletteHex.ritual.surface[mode];

  if (preset === 'warm') {
    return mode === 'dark'
      ? {
          liquidTint: 'rgba(251, 146, 60, 1)' as ColorValue,
          blurVeilIos: 'rgba(234, 88, 12, 0.72)',
          androidBlurOverlay: 'rgba(234, 88, 12, 0.52)',
          androidSecondVeil: 'transparent',
          blurType: 'dark',
          iosFallback: paletteHex.warm.saffron,
          solidLightClass: 'bg-warm-saffron',
          solidDarkClass: 'dark:bg-warm-saffron',
        }
      : {
          liquidTint: 'rgba(234, 88, 12, 1)' as ColorValue,
          blurVeilIos: 'rgba(194, 65, 12, 0.58)',
          androidBlurOverlay: 'rgba(234, 88, 12, 0.48)',
          androidSecondVeil: 'transparent',
          blurType: 'dark',
          iosFallback: paletteHex.warm.saffron,
          solidLightClass: 'bg-warm-saffron',
          solidDarkClass: 'dark:bg-warm-saffron',
        };
  }

  if (preset === 'chrome') {
    const glassTint =
      (mode === 'dark'
        ? hexToRgba(paletteHex.ritual.primary.dark, 0.35)
        : hexToRgba(paletteHex.ritual.primary.light, 0.28)) as ColorValue;
    return mode === 'dark'
      ? {
          liquidTint: glassTint,
          blurType: 'dark',
          iosFallback: surface,
          blurVeilIos: hexToRgba(surface, 0.68),
          androidBlurOverlay: hexToRgba(mixHex(surface, canvas, 0.4), 0.58),
          androidSecondVeil: 'transparent',
          solidLightClass: 'bg-ritual-surface',
          solidDarkClass: 'dark:bg-ritual-surface-dark',
        }
      : {
          liquidTint: glassTint,
          blurType: 'light',
          iosFallback: surface,
          blurVeilIos: hexToRgba(mixHex(surface, canvas, 0.55), 0.42),
          androidBlurOverlay: hexToRgba(mixHex(surface, paletteHex.warm.peach, 0.35), 0.36),
          androidSecondVeil: 'rgba(255, 255, 255, 0.06)',
          solidLightClass: 'bg-ritual-surface',
          solidDarkClass: 'dark:bg-ritual-surface-dark',
        };
  }

  if (preset === 'ghost') {
    const glassTint = (mode === 'dark'
      ? hexToRgba(paletteHex.ritual.primary.dark, 0.18)
      : hexToRgba(paletteHex.ritual.primary.light, 0.14)) as ColorValue;
    return mode === 'dark'
      ? {
          liquidTint: glassTint,
          blurType: 'dark',
          iosFallback: hexToRgba(surface, 0.82),
          blurVeilIos: hexToRgba(surface, 0.38),
          androidBlurOverlay: hexToRgba(mixHex(surface, canvas, 0.45), 0.34),
          androidSecondVeil: 'transparent',
          solidLightClass: 'bg-ritual-surfaceSecondary',
          solidDarkClass: 'dark:bg-ritual-surfaceSecondary-dark',
        }
      : {
          liquidTint: glassTint,
          blurType: 'light',
          iosFallback: hexToRgba(surface, 0.82),
          blurVeilIos: hexToRgba(mixHex(surface, canvas, 0.7), 0.26),
          androidBlurOverlay: hexToRgba(canvas, 0.22),
          androidSecondVeil: 'transparent',
          solidLightClass: 'bg-ritual-surfaceSecondary',
          solidDarkClass: 'dark:bg-ritual-surfaceSecondary-dark',
        };
  }

  return mode === 'dark'
    ? {
        liquidTint: 'rgba(165, 180, 252, 1)' as ColorValue,
        blurVeilIos: 'rgba(55, 48, 163, 0.78)',
        androidBlurOverlay: 'rgba(55, 48, 163, 0.48)',
        androidSecondVeil: 'transparent',
        blurType: 'dark',
        iosFallback: paletteHex.primary.light,
        solidLightClass: 'bg-primary',
        solidDarkClass: 'dark:bg-primary-soft-dark',
      }
    : {
        liquidTint: 'rgba(79, 70, 229, 1)' as ColorValue,
        blurVeilIos: 'rgba(67, 56, 202, 0.42)',
        androidBlurOverlay: 'rgba(79, 70, 229, 0.28)',
        androidSecondVeil: 'transparent',
        blurType: 'dark',
        iosFallback: paletteHex.primary.light,
        solidLightClass: 'bg-primary',
        solidDarkClass: 'dark:bg-primary-soft-dark',
      };
}

/**
 * App-wide **liquid / blur / solid** material stack (login, home chrome, marketing CTAs, etc.).
 * - **iOS (supported)**: native `LiquidGlassView`.
 * - **iOS (unsupported) + Android**: `@react-native-community/blur` — not a flat white fallback.
 *   Android’s blur already applies `overlayColor`; we tune it per preset instead of stacking a
 *   second near-opaque `ritual.surface` layer (which killed the gradient).
 * - **Web / other**: solid themed fill.
 *
 * Presets: `primary`, `warm`, `chrome` (icon chrome), `ghost` (whisper actions).
 */
export function LiquidGlassMaterial({
  preset,
  borderRadius = RITUAL_CORNER_RADIUS,
  elevated = false,
  className,
  children,
}: Props) {
  const { colorScheme } = useColorScheme();
  const mode = colorScheme === 'dark' ? 'dark' : 'light';
  const {
    liquidTint,
    blurVeilIos,
    androidBlurOverlay,
    androidSecondVeil,
    blurType,
    iosFallback,
    solidLightClass,
    solidDarkClass,
  } = resolvePreset(preset, mode);

  const frostVeil =
    elevated && preset === 'chrome'
      ? hexToRgba(iosFallback, mode === 'dark' ? 0.88 : 0.96)
      : blurVeilIos;
  const androidOverlay =
    elevated && preset === 'chrome'
      ? hexToRgba(iosFallback, mode === 'dark' ? 0.78 : 0.88)
      : androidBlurOverlay;
  const androidVeil =
    elevated && preset === 'chrome' ? frostVeil : androidSecondVeil;

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
          {/*
           * Match the BlurView stack: `effect="clear"` alone is invisible in light mode when
           * there is nothing meaningful to refract (e.g. quick-preview Modal over a scrim).
           */}
          <View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { backgroundColor: frostVeil }, radiusStyle]}
          />
          <View pointerEvents="box-none" className="relative z-10" style={[styles.blurStack, radiusStyle]}>
            {children}
          </View>
        </LiquidGlassView>
      </View>
    );
  }

  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const blurAmount = Platform.OS === 'ios' ? 18 : 16;
    return (
      <View className={cn('overflow-hidden', className)} style={radiusStyle}>
        <BlurView
          blurType={blurType}
          blurAmount={blurAmount}
          {...(Platform.OS === 'ios'
            ? { reducedTransparencyFallbackColor: iosFallback }
            : { overlayColor: androidOverlay })}
          style={[StyleSheet.absoluteFill, radiusStyle]}
        />
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Platform.OS === 'android' ? androidVeil : frostVeil,
            },
            radiusStyle,
          ]}
        />
        <View pointerEvents="box-none" className="relative z-10" style={[styles.blurStack, radiusStyle]}>
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
