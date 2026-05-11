import type { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export function GradientHeroOrnaments() {
  return (
    <>
      <View
        pointerEvents="none"
        className="absolute -right-10 top-6 h-48 w-48 rounded-full bg-warm/30 dark:bg-warm/25"
      />
      <View
        pointerEvents="none"
        className="absolute -left-14 bottom-24 h-40 w-40 rounded-full bg-amber-400/25 dark:bg-warm-muted/20"
      />
      <View
        pointerEvents="none"
        className="absolute bottom-12 right-8 h-24 w-24 rounded-full border-2 border-warm-muted/35 dark:border-warm-dark/30"
      />
      <View
        pointerEvents="none"
        className="absolute bottom-20 left-5 h-14 w-14 rotate-45 rounded-sm border border-warm-muted/40 dark:border-warm-muted/25"
      />
      <View
        pointerEvents="none"
        className="absolute left-1/4 top-1/3 h-2 w-2 rounded-full bg-warm-muted/80"
      />
      <View
        pointerEvents="none"
        className="absolute right-1/3 top-1/2 h-1.5 w-1.5 rounded-full bg-amber-200/70"
      />
    </>
  );
}

type Props = PropsWithChildren<{
  /** At least two hex/RGB strings for react-native-linear-gradient. */
  colors: string[];
  /**
   * Top safe-area inset (e.g. `useSafeAreaInsets().top`) so gradient can extend edge-to-edge
   * while text stays below the status bar.
   */
  contentTopInset?: number;
  /** Minimum height (e.g. `useWindowDimensions().height`) so the hero gradient fills the viewport. */
  minHeight?: number;
}>;

/**
 * Rounded marketing hero shell: diagonal gradient + soft vedic ornaments (reusable for auth / onboarding).
 */
export function GradientHeroShell({
  colors,
  children,
  contentTopInset = 0,
  minHeight,
}: Props) {
  return (
    <View className="relative flex-1 overflow-hidden" style={minHeight ? { minHeight } : undefined}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        className="absolute inset-0 z-[5]"
      >
        <GradientHeroOrnaments />
      </View>
      <View
        className="z-10 px-6"
        style={{ paddingTop: contentTopInset + 8 }}
      >
        {children}
      </View>
    </View>
  );
}
