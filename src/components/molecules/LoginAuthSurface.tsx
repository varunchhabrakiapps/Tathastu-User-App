import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { hexToRgba } from '@/theme/colorUtils';

const R = RITUAL_CORNER_RADIUS;

/**
 * Auth slab — light iOS blur + opaque warm-tinted surface (Wallet-like, not glass-gradient).
 */
export function LoginAuthSurface({ children }: PropsWithChildren) {
  const { isDark, surface, surfaceSecondary, borderSoft, primary } = useRitualSemanticColors();

  const surfaceAlpha = Platform.OS === 'ios' ? (isDark ? 0.94 : 0.91) : isDark ? 0.97 : 0.98;
  const surfaceBg = hexToRgba(surface, surfaceAlpha);
  const veilBg = hexToRgba(surfaceSecondary, isDark ? 0.042 : 0.035);
  const rim = primary;

  return (
    <View
      style={[
        styles.shadowWrap,
        {
          shadowColor: rim,
          shadowOpacity: isDark ? 0.11 : 0.065,
          shadowRadius: isDark ? 20 : 24,
          shadowOffset: { width: 0, height: 10 },
          elevation: isDark ? 5 : 4,
        },
      ]}
    >
      <View style={styles.innerClip}>
        {Platform.OS === 'ios' ? (
          <BlurView
            blurType={isDark ? 'dark' : 'light'}
            blurAmount={10}
            reducedTransparencyFallbackColor={surface}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        <View
          style={{
            backgroundColor: surfaceBg,
            borderWidth: isDark ? 1 : 0,
            borderColor: isDark ? hexToRgba(borderSoft, 0.45) : undefined,
          }}
        >
          <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: veilBg }]} />
          <View className="px-0 pt-6 pb-8">{children}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    alignSelf: 'stretch',
    borderRadius: R,
  },
  innerClip: {
    borderRadius: R,
    overflow: 'hidden',
  },
});
