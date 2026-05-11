import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View, type ColorValue } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

/** Matched to login / auth elevated cards */
const BORDER_RADIUS = 34;

type Props = PropsWithChildren<{
  className?: string;
}>;

function surfaceMaterials(mode: 'light' | 'dark') {
  return mode === 'dark'
    ? {
        glassTint: 'rgba(165, 180, 252, 0.26)' as ColorValue,
        overlayTint: 'rgba(28, 25, 23, 0.58)',
        blurType: 'dark' as const,
      }
    : {
        glassTint: 'rgba(67, 56, 202, 0.14)' as ColorValue,
        overlayTint: 'rgba(250, 250, 249, 0.78)',
        blurType: 'light' as const,
      };
}

/**
 * Large elevated surface: **LiquidGlass** when supported, else **BlurView**, else solid themed fill.
 * For cards and sheets over busy backdrops (auth, marketing).
 */
export function AdaptiveGlassSurface({ children, className }: Props) {
  const { colorScheme } = useColorScheme();
  const mode = colorScheme === 'dark' ? 'dark' : 'light';
  const { glassTint, overlayTint, blurType } = surfaceMaterials(mode);
  const frameClass = cn(
    'overflow-hidden border border-border dark:border-border-dark',
    className,
  );

  if (isLiquidGlassSupported) {
    return (
      <View className={frameClass} style={styles.roundedWrap}>
        <LiquidGlassView
          effect="regular"
          tintColor={glassTint}
          colorScheme={mode}
          interactive={false}
          style={styles.liquid}
        >
          {children}
        </LiquidGlassView>
      </View>
    );
  }

  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return (
      <View className={frameClass} style={styles.roundedWrap}>
        <BlurView
          blurType={blurType}
          blurAmount={Platform.OS === 'ios' ? 20 : 16}
          {...(Platform.OS === 'ios'
            ? { reducedTransparencyFallbackColor: paletteHex.surface[mode] }
            : {})}
          style={StyleSheet.absoluteFill}
        />
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { backgroundColor: overlayTint }]}
        />
        <View className="relative z-10">{children}</View>
      </View>
    );
  }

  return (
    <View
      className={cn(
        'bg-surface-elevated/95 dark:bg-surface-dark/95',
        frameClass,
      )}
      style={styles.roundedWrap}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  roundedWrap: {
    borderRadius: BORDER_RADIUS,
  },
  liquid: {
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
});
