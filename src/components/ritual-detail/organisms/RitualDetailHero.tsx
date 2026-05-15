import type { FlexStyle, ImageSourcePropType } from 'react-native';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

/** LinearGradient fills its shell — RN gradient has no Tailwind layout bridge here. */
const RITUAL_HERO_GRADIENT_FILL = { flex: 1 } satisfies FlexStyle;

const heroTitleShadow = {
  textShadowColor: 'rgba(0,0,0,0.34)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 6,
} as const;

const heroSubtitleShadow = {
  textShadowColor: 'rgba(0,0,0,0.28)',
  textShadowOffset: { width: 0, height: 0.5 },
  textShadowRadius: 4,
} as const;

type Props = {
  source: ImageSourcePropType;
  /** Total hero height — artwork draws from the top of the scene under the status bar. */
  height: number;
  width: number;
  title: string;
  subtitle: string;
  accessibilityLabel: string;
};

/** Immersive hero — edge-to-edge cover, ink scrim, title stack under the transparent header. */
export function RitualDetailHero({
  source,
  height,
  width,
  title,
  subtitle,
  accessibilityLabel,
}: Props) {
  const scrimBase = paletteHex.ritual.ink.light;

  return (
    <View
      className="overflow-hidden bg-ritual-surfaceSecondary dark:bg-ritual-surfaceSecondary-dark"
      style={{ height, width }}
    >
      <Image
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
        source={source}
        className="absolute inset-0 h-full w-full"
        resizeMode="cover"
      />

      <View className="pointer-events-none absolute inset-0">
        <LinearGradient
          pointerEvents="none"
          colors={[hexToRgba(scrimBase, 0), hexToRgba(scrimBase, 0.42), hexToRgba(scrimBase, 0.92)]}
          locations={[0, 0.52, 1]}
          style={RITUAL_HERO_GRADIENT_FILL}
        />
      </View>

      <View pointerEvents="box-none" className="absolute inset-x-0 bottom-0 px-[22px] pb-[26px] pt-14">
        <Text
          accessibilityRole="header"
          numberOfLines={3}
          className="text-[26px] font-semibold leading-[31px] tracking-[-0.02em] text-ritual-ink-dark"
          style={heroTitleShadow}
        >
          {title}
        </Text>
        <Text
          numberOfLines={2}
          className="mt-2 text-login-body text-ritual-ink-dark/90"
          style={heroSubtitleShadow}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
