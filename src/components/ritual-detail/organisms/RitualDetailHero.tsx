import type { FlexStyle, ImageSourcePropType } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { getTrendingReelOverlayGradient } from '@/theme/trendingRitualArtwork';

import { cn } from '@/utils/cn';

const GRADIENT_FILL = { flex: 1 } satisfies FlexStyle;

const reelTitleShadow = {
  textShadowColor: 'rgba(0,0,0,0.35)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 5,
} as const;

const reelSubtitleShadow = {
  textShadowColor: 'rgba(0,0,0,0.32)',
  textShadowOffset: { width: 0, height: 0.5 },
  textShadowRadius: 4,
} as const;

const inkTitleShadow = {
  textShadowColor: 'rgba(0,0,0,0.34)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 6,
} as const;

const inkSubtitleShadow = {
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
  /**
   * When set, matches home trending reels: editorial scrim + white type + same cover art.
   * `null` keeps the softer ink wash for generic / non-catalog rituals.
   */
  overlayPreset: number | null;
};

/** Immersive hero — trending cover + reel scrim when available, else editorial wash + warm type. */
export function RitualDetailHero({
  source,
  height,
  width,
  title,
  subtitle,
  accessibilityLabel,
  overlayPreset,
}: Props) {
  const { colorScheme } = useColorScheme();
  const schemeKey = colorScheme === 'dark' ? 'dark' : 'light';
  const useReelChrome = overlayPreset !== null && overlayPreset >= 0;
  const scrimBase = paletteHex.ritual.ink.light;

  const reelOverlay =
    useReelChrome && overlayPreset !== null
      ? getTrendingReelOverlayGradient(overlayPreset, schemeKey)
      : null;

  return (
    <View
      className="overflow-hidden bg-ritual-surfaceSecondary dark:bg-ritual-surfaceSecondary-dark"
      style={{
        height,
        width,
        borderBottomLeftRadius: RITUAL_CORNER_RADIUS,
        borderBottomRightRadius: RITUAL_CORNER_RADIUS,
      }}
    >
      <Image
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
        source={source}
        className="absolute inset-0 h-full w-full"
        resizeMode="cover"
      />

      {useReelChrome && reelOverlay ? (
        <LinearGradient
          pointerEvents="none"
          colors={reelOverlay.colors}
          locations={reelOverlay.locations}
          start={reelOverlay.start}
          end={reelOverlay.end}
          style={[StyleSheet.absoluteFill, GRADIENT_FILL]}
        />
      ) : (
        <View className="pointer-events-none absolute inset-0">
          <LinearGradient
            pointerEvents="none"
            colors={[hexToRgba(scrimBase, 0), hexToRgba(scrimBase, 0.42), hexToRgba(scrimBase, 0.92)]}
            locations={[0, 0.52, 1]}
            style={[GRADIENT_FILL]}
          />
        </View>
      )}

      <View pointerEvents="box-none" className="absolute inset-x-0 bottom-0 px-5 pb-7 pt-14">
        <Text
          accessibilityRole="header"
          numberOfLines={3}
          className={cn(
            'text-[26px] font-semibold leading-[31px] tracking-[-0.02em]',
            useReelChrome ? 'text-white' : 'text-ritual-ink-dark',
          )}
          style={useReelChrome ? reelTitleShadow : inkTitleShadow}
        >
          {title}
        </Text>
        <Text
          numberOfLines={2}
          className={cn(
            'mt-2 text-login-body',
            useReelChrome ? 'text-white/90' : 'text-ritual-ink-dark/90',
          )}
          style={useReelChrome ? reelSubtitleShadow : inkSubtitleShadow}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
