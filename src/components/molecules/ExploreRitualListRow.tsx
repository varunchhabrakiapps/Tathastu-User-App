import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

import { TrendingVolumeTag } from '@/components/atoms/TrendingVolumeTag';
import { WishlistToggleButton } from '@/components/atoms/WishlistToggleButton';
import { EXPLORE_RITUAL_THUMB_SIZE } from '@/constants/exploreLayout';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { trendingRitualCoverSource } from '@/constants/trendingRitualCovers';
import type { ExploreRitualCatalogItem } from '@/hooks/useExploreRitualCatalog';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { getTrendingReelOverlayGradient } from '@/theme/trendingRitualArtwork';

type Props = {
  item: ExploreRitualCatalogItem;
  onPress: () => void;
};

export const ExploreRitualListRow = memo(function ExploreRitualListRow({ item, onPress }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const schemeKey = colorScheme === 'dark' ? 'dark' : 'light';
  const k = schemeKey;

  const { copy } = item;
  const coverSource = useMemo(() => trendingRitualCoverSource(item.id), [item.id]);
  const overlay = useMemo(
    () => getTrendingReelOverlayGradient(item.artworkPreset, schemeKey),
    [item.artworkPreset, schemeKey],
  );

  const titleColor = paletteHex.ritual.ink[k];
  const metaColor = paletteHex.ritual.inkMuted[k];
  const priceColor = paletteHex.ritual.primary[k];

  const combinedA11y = `${copy.title}. ${copy.cardSubtitle}. ${copy.socialProof}. ${copy.priceGlance}`;

  const iosWash =
    schemeKey === 'dark'
      ? { shadowColor: paletteHex.ritual.primary.dark }
      : { shadowColor: hexToRgba(paletteHex.ritual.primary.light, 0.14) };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={t('screens.home.trendingRituals.cardOpenHint')}
      accessibilityLabel={combinedA11y}
      onPress={onPress}
      className="active:opacity-[0.98]"
      style={[styles.shadowShell, Platform.OS === 'ios' ? iosWash : styles.shadowAndroid]}
    >
      <View className="flex-row items-stretch gap-3">
        <View
          style={{ width: EXPLORE_RITUAL_THUMB_SIZE, height: EXPLORE_RITUAL_THUMB_SIZE, borderRadius: RITUAL_CORNER_RADIUS }}
          className="overflow-hidden bg-ritual-canvas dark:bg-ritual-canvas-dark"
        >
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
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />
          <TrendingVolumeTag label={copy.volumeTag} />
        </View>

        <View className="min-w-0 flex-1 justify-between py-0.5">
          <View className="min-w-0 flex-1 gap-1 pr-1">
            <Text
              accessibilityRole="header"
              numberOfLines={2}
              style={{ color: titleColor }}
              className="font-semibold text-[16px] leading-[21px] tracking-[-0.018em]"
            >
              {copy.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{ color: metaColor }}
              className="font-medium text-[12px] leading-[16px] tracking-[0.01em]"
            >
              {copy.cardSubtitle}
            </Text>
            <Text
              numberOfLines={2}
              style={{ color: metaColor }}
              className="font-normal text-[12px] leading-[17px]"
            >
              {copy.socialProof}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={{ color: priceColor }}
            className="mt-1.5 font-semibold text-[13px] leading-[17px]"
          >
            {copy.priceGlance}
          </Text>
        </View>

        <View className="justify-start pt-0.5">
          <WishlistToggleButton ritualId={item.id} ritualTitle={copy.title} />
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  shadowShell: {
    borderRadius: RITUAL_CORNER_RADIUS,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.09,
    shadowRadius: 14,
    elevation: 0,
  },
  shadowAndroid: {
    elevation: 2,
  },
});
