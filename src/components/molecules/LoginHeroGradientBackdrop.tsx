import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { HeroDiyaImage } from '@/components/atoms/HeroDiyaImage';
import { GradientHeroOrnaments } from '@/components/molecules/GradientHeroShell';

type Props = PropsWithChildren<{
  colors: string[];
  diyaAccessibilityLabel: string;
}>;

/**
 * Full-screen login marketing gradient with ornaments, corner diya, and a slot for scrollable content.
 */
export function LoginHeroGradientBackdrop({
  colors,
  diyaAccessibilityLabel,
  children,
}: Props) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View pointerEvents="none" className="absolute inset-0 z-[5]">
        <GradientHeroOrnaments />
      </View>
      {children}
      <HeroDiyaImage
        accessibilityLabel={diyaAccessibilityLabel}
        className="z-[1]"
      />
    </LinearGradient>
  );
}
