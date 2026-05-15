import { memo, useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = {
  char?: string;
  active: boolean;
};

const rInk = paletteHex.ritual.ink;

export const OtpDigitBox = memo(function OtpDigitBox({ char, active }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const k = isDark ? 'dark' : 'light';
  const digitColor = rInk[k];
  const primaryDot = paletteHex.ritual.primary[k];

  const rowShadow = useMemo(() => {
    if (!active) {
      if (Platform.OS === 'android') {
        return { elevation: 2 };
      }
      return {
        shadowColor: rInk[isDark ? 'dark' : 'light'],
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: isDark ? 0.18 : 0.08,
        shadowRadius: 8,
      };
    }
    if (Platform.OS === 'android') {
      return { elevation: 6 };
    }
    return {
      shadowColor: paletteHex.ritual.primary[isDark ? 'dark' : 'light'],
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: isDark ? 0.35 : 0.2,
      shadowRadius: 14,
    };
  }, [active, isDark]);

  return (
    <View
      className={cn(
        'h-[52px] min-w-0 flex-1 items-center justify-center overflow-hidden',
        char
          ? 'bg-ritual-surface dark:bg-ritual-surface-dark'
          : 'bg-ritual-canvas dark:bg-ritual-surfaceSecondary-dark/55',
        active && 'bg-ritual-surface dark:bg-ritual-surface-dark',
      )}
      style={[styles.box, rowShadow]}
    >
      {char ? (
        <Animated.Text
          entering={FadeIn.duration(200)}
          style={{ color: digitColor }}
          className="text-[20px] font-semibold tabular-nums tracking-tight"
        >
          {char}
        </Animated.Text>
      ) : active ? (
        <View
          style={{ backgroundColor: primaryDot }}
          className="h-2 w-2 rounded-full opacity-[0.85]"
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  box: {
    borderRadius: RITUAL_CORNER_RADIUS,
  },
});
