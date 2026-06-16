import { memo, useCallback, useMemo, type ComponentProps } from 'react';
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
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { WishlistToggleButton } from '@/components/atoms/WishlistToggleButton';
import { EXPLORE_RITUAL_THUMB_SIZE } from '@/constants/exploreLayout';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { trendingRitualCoverSource } from '@/constants/trendingRitualCovers';
import type { ExploreRitualCatalogItem } from '@/hooks/useExploreRitualCatalog';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { getTrendingReelOverlayGradient } from '@/theme/trendingRitualArtwork';
import { cn } from '@/utils/cn';

type FontAwesomeGlyph = ComponentProps<typeof FontAwesome>['name'];

const PREVIEW_ACTION = 'preview';
const LONG_PRESS_DELAY_MS = 260;

type Props = {
  item: ExploreRitualCatalogItem;
  onPress: () => void;
  onLongPress: () => void;
};

type MetaLineProps = {
  glyph: FontAwesomeGlyph;
  text: string;
  textColor: string;
  glyphColor: string;
};

function MetaLine({ glyph, text, textColor, glyphColor }: MetaLineProps) {
  return (
    <View className="flex-row items-center gap-2.5">
      <View className="w-[18px] items-center">
        <FontAwesome
          name={glyph}
          size={11}
          color={glyphColor}
          importantForAccessibility="no-hide-descendants"
        />
      </View>
      <Text
        numberOfLines={2}
        style={{ color: textColor }}
        className="flex-1 font-normal text-login-label leading-[17px]"
      >
        {text}
      </Text>
    </View>
  );
}

type VolumePillProps = {
  label: string;
  tone: string;
  background: string;
};

/** Decorative volume chip — parent card owns the full accessibility label. */
function VolumePill({ label, tone, background }: VolumePillProps) {
  return (
    <View
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      className="self-start rounded-full px-2.5 py-1"
      style={{ backgroundColor: background }}
    >
      <Text
        numberOfLines={1}
        style={{ color: tone }}
        className="font-semibold text-[11px] leading-[14px] tracking-[0.01em]"
      >
        {label}
      </Text>
    </View>
  );
}

/**
 * Explore catalog tile — cover + eyebrow/title/meta on shared ghost glass chrome (matching
 * {@link BookingListCard}). Tap opens detail; long-press peeks a quick preview.
 */
export const ExploreRitualListRow = memo(function ExploreRitualListRow({
  item,
  onPress,
  onLongPress,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const k = isDark ? 'dark' : 'light';

  const { copy } = item;
  const coverSource = useMemo(() => trendingRitualCoverSource(item.id), [item.id]);
  const overlay = useMemo(
    () => getTrendingReelOverlayGradient(item.artworkPreset, k),
    [item.artworkPreset, k],
  );

  const titleColor = paletteHex.ritual.ink[k];
  const metaBase = paletteHex.ritual.inkMuted[k];
  const eyebrowColor = metaBase;
  const metaText = isDark ? metaBase : hexToRgba(metaBase, 0.92);
  const glyphColor = isDark ? hexToRgba(metaBase, 0.95) : hexToRgba(metaBase, 0.55);
  const priceColor = paletteHex.ritual.primary[k];
  const volumeTone = isDark ? paletteHex.warm.dark : paletteHex.warm.deep;
  const volumeBackground = hexToRgba(volumeTone, isDark ? 0.22 : 0.14);

  const onAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      if (event.nativeEvent.actionName === PREVIEW_ACTION) onLongPress();
    },
    [onLongPress],
  );

  const combinedA11y = `${copy.title}. ${copy.cardSubtitle}. ${copy.socialProof}. ${copy.priceGlance}`;
  const iosShadow = isDark ? styles.shadowIosDark : styles.shadowIosLight;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={combinedA11y}
      accessibilityHint={t('screens.explore.row.openHint')}
      accessibilityActions={[{ name: PREVIEW_ACTION, label: t('screens.explore.row.previewAction') }]}
      onAccessibilityAction={onAccessibilityAction}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={LONG_PRESS_DELAY_MS}
      className="self-stretch active:opacity-[0.98]"
      style={[styles.shadowBase, Platform.OS === 'ios' ? iosShadow : styles.shadowAndroid]}
    >
      {({ pressed }) => (
        <LiquidGlassMaterial
          preset="ghost"
          borderRadius={RITUAL_CORNER_RADIUS}
          className={cn('rounded-[18px]', pressed && 'opacity-[0.98]')}
        >
          <View className="flex-row items-start gap-3.5 px-4 py-3.5">
            <View
              pointerEvents="none"
              importantForAccessibility="no-hide-descendants"
              style={{
                width: EXPLORE_RITUAL_THUMB_SIZE,
                height: EXPLORE_RITUAL_THUMB_SIZE,
                borderRadius: RITUAL_CORNER_RADIUS,
              }}
              className="shrink-0 overflow-hidden border border-ritual-borderSoft/45 bg-ritual-canvas dark:border-ritual-borderSoft-dark/40 dark:bg-ritual-canvas-dark"
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

            <View className="min-w-0 flex-1 gap-2.5">
              <View className="flex-row items-start justify-between gap-2.5">
                <View className="min-w-0 flex-1 gap-1">
                  <Text
                    numberOfLines={1}
                    style={{ color: eyebrowColor }}
                    className="font-medium uppercase text-login-label"
                  >
                    {copy.cardSubtitle}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{ color: titleColor }}
                    className="font-semibold text-[16px] leading-[21px] tracking-[-0.018em]"
                  >
                    {copy.title}
                  </Text>
                </View>

                <View className="shrink-0 items-end gap-2">
                  <VolumePill
                    label={copy.volumeTag}
                    tone={volumeTone}
                    background={volumeBackground}
                  />
                  <WishlistToggleButton ritualId={item.id} ritualTitle={copy.title} />
                </View>
              </View>

              <View className="gap-1.5">
                <MetaLine
                  glyph="line-chart"
                  text={copy.socialProof}
                  textColor={metaText}
                  glyphColor={glyphColor}
                />
                <Text
                  numberOfLines={1}
                  style={{ color: priceColor }}
                  className="font-semibold text-[14px] leading-[18px] tracking-[-0.01em]"
                >
                  {copy.priceGlance}
                </Text>
              </View>
            </View>
          </View>
        </LiquidGlassMaterial>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  shadowBase: {
    borderRadius: RITUAL_CORNER_RADIUS,
  },
  shadowIosLight: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 0,
  },
  shadowIosDark: {
    shadowColor: paletteHex.ritual.primary.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 0,
  },
  shadowAndroid: {
    elevation: 4,
  },
});
