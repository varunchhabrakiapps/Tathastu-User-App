import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

import { TrendingVolumeTag } from '@/components/atoms/TrendingVolumeTag';
import { HOME_RITUAL_PREVIEW_CORNER_RADIUS, trendingReelTileHeight } from '@/constants/ritualLayout';
import type { TrendingRitualPreview } from '@/domain/trendingRitual';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import {
  getTrendingReelOverlayGradient,
  getTrendingRitualCoverSource,
} from '@/theme/trendingRitualArtwork';

type Props = {
  ritual: TrendingRitualPreview;
  cardWidth: number;
  onPress: () => void;
};

function itemTranslationPrefix(id: string) {
  return `screens.home.trendingRituals.items.${id}`;
}

export const RitualCard = memo(function RitualCard({ ritual, cardWidth, onPress }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const schemeKey = colorScheme === 'dark' ? 'dark' : 'light';

  const prefix = itemTranslationPrefix(ritual.id);
  const title = t(`${prefix}.title`);
  const description = t(`${prefix}.description`);
  const socialProof = t(`${prefix}.socialProof`);
  const volumeTag = t(`${prefix}.volumeTag`);

  const reelHeight = useMemo(() => trendingReelTileHeight(cardWidth), [cardWidth]);

  const coverSource = useMemo(
    () => getTrendingRitualCoverSource(ritual.artworkPreset),
    [ritual.artworkPreset],
  );

  const overlay = useMemo(
    () => getTrendingReelOverlayGradient(ritual.artworkPreset, schemeKey),
    [ritual.artworkPreset, schemeKey],
  );

  const combinedA11y = `${title}. ${description}. ${socialProof}`;
  const iosWash =
    schemeKey === 'dark'
      ? { shadowColor: paletteHex.ritual.primary.dark }
      : { shadowColor: hexToRgba(paletteHex.ritual.primary.light, 0.18) };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={t('screens.home.trendingRituals.cardOpenHint')}
      accessibilityLabel={combinedA11y}
      onPress={onPress}
      style={{ width: cardWidth }}
      className="active:opacity-[0.96]"
    >
      <View
        style={[
          styles.cardShadow,
          { borderRadius: HOME_RITUAL_PREVIEW_CORNER_RADIUS },
          Platform.OS === 'ios' ? iosWash : styles.cardShadowAndroid,
        ]}
        className="overflow-hidden bg-ritual-canvas dark:bg-ritual-canvas-dark"
      >
        <View style={{ height: reelHeight }}>
          <Image
            source={coverSource}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            accessible={false}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
          />

          <LinearGradient
            colors={overlay.colors}
            locations={overlay.locations}
            start={overlay.start}
            end={overlay.end}
            accessibilityIgnoresInvertColors
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />

          <TrendingVolumeTag label={volumeTag} />

          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            className="absolute inset-x-0 bottom-0 gap-1 px-2.5 pb-2.5 pt-12"
          >
            <Text
              accessibilityRole="header"
              numberOfLines={2}
              className="font-semibold text-[14px] leading-[18px] tracking-[-0.016em] text-white"
              style={styles.titleShadow}
            >
              {title}
            </Text>
            <Text
              numberOfLines={2}
              className="font-normal text-[12px] leading-[16px] text-white/92 dark:text-white/92"
            >
              {description}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  titleShadow: {
    textShadowColor: 'rgba(0,0,0,0.32)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cardShadow: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.11,
    shadowRadius: 16,
    elevation: 0,
  },
  cardShadowAndroid: {
    elevation: 5,
  },
});
