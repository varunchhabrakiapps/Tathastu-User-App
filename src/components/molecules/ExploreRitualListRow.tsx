import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type AccessibilityActionEvent,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

import { WishlistToggleButton } from '@/components/atoms/WishlistToggleButton';
import { EXPLORE_RITUAL_THUMB_SIZE } from '@/constants/exploreLayout';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { trendingRitualCoverSource } from '@/constants/trendingRitualCovers';
import type { ExploreRitualCatalogItem } from '@/hooks/useExploreRitualCatalog';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { getTrendingReelOverlayGradient } from '@/theme/trendingRitualArtwork';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const PREVIEW_ACTION = 'preview';
const LONG_PRESS_DELAY_MS = 260;

type Props = {
  item: ExploreRitualCatalogItem;
  onPress: () => void;
  onLongPress: () => void;
};

/** Catalog card row — cover + copy + wishlist; tap opens detail, long-press peeks a preview. */
export const ExploreRitualListRow = memo(function ExploreRitualListRow({
  item,
  onPress,
  onLongPress,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';
  const scale = useSharedValue(1);

  const { copy } = item;
  const coverSource = useMemo(() => trendingRitualCoverSource(item.id), [item.id]);
  const overlay = useMemo(
    () => getTrendingReelOverlayGradient(item.artworkPreset, k),
    [item.artworkPreset, k],
  );

  const titleColor = paletteHex.ritual.ink[k];
  const metaColor = paletteHex.ritual.inkMuted[k];
  const priceColor = paletteHex.ritual.primary[k];

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const onAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      if (event.nativeEvent.actionName === PREVIEW_ACTION) onLongPress();
    },
    [onLongPress],
  );

  const combinedA11y = `${copy.title}. ${copy.cardSubtitle}. ${copy.socialProof}. ${copy.priceGlance}`;

  const shadowColor =
    k === 'dark'
      ? paletteHex.ritual.primary.dark
      : hexToRgba(paletteHex.ritual.primary.light, 0.5);

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={combinedA11y}
      accessibilityHint={t('screens.explore.row.openHint')}
      accessibilityActions={[{ name: PREVIEW_ACTION, label: t('screens.explore.row.previewAction') }]}
      onAccessibilityAction={onAccessibilityAction}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={LONG_PRESS_DELAY_MS}
      onPressIn={() => {
        scale.value = withSpring(0.97, { damping: 20, stiffness: 380, mass: 0.3 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 16, stiffness: 300, mass: 0.32 });
      }}
      style={[
        animatedStyle,
        styles.shadowBase,
        { shadowColor },
        Platform.OS === 'ios' ? styles.shadowIos : styles.shadowAndroid,
      ]}
      className="rounded-[18px]"
    >
      <View className="flex-row items-stretch gap-3.5 rounded-[18px] border border-ritual-borderSoft/70 bg-ritual-surface p-3 dark:border-ritual-borderSoft-dark/55 dark:bg-ritual-surface-dark">
        <View
          style={{
            width: EXPLORE_RITUAL_THUMB_SIZE,
            height: EXPLORE_RITUAL_THUMB_SIZE,
            borderRadius: RITUAL_CORNER_RADIUS,
          }}
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
        </View>

        <View className="min-w-0 flex-1 justify-between py-0.5">
          <View className="min-w-0 gap-1 pr-1">
            <Text
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
    </AnimatedPressable>
  );
});

const styles = StyleSheet.create({
  shadowBase: {
    borderRadius: RITUAL_CORNER_RADIUS,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
  },
  shadowIos: {
    shadowOpacity: 0.1,
    elevation: 0,
  },
  shadowAndroid: {
    shadowOpacity: 0,
    elevation: 2,
  },
});
