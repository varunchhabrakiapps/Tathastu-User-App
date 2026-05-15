import { memo, useMemo } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import type { MomentCategoryId } from '@/domain/momentCategory';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { getMomentChipArtwork, getMomentChipChrome } from '@/theme/momentChipArtwork';
import { cn } from '@/utils/cn';

type Props = {
  momentId: MomentCategoryId;
  headline: string;
  subline: string;
  width: number;
  onPress: () => void;
  accessibilityHint?: string;
  accessibilityLabel: string;
};

/**
 * Mood chip with layered watermark + accent — editorial, on-brand, Gen-Z legible without meme UI.
 */
export const MomentChip = memo(function MomentChip({
  momentId,
  headline,
  subline,
  width,
  onPress,
  accessibilityHint,
  accessibilityLabel,
}: Props) {
  const { colorScheme } = useColorScheme();
  const schemeKey = colorScheme === 'dark' ? 'dark' : 'light';

  const artwork = useMemo(() => getMomentChipArtwork(momentId, schemeKey), [momentId, schemeKey]);
  const chrome = useMemo(() => getMomentChipChrome(momentId, schemeKey), [momentId, schemeKey]);

  const iosWash = useMemo(
    () => ({
      ...styles.pressShadow,
      shadowColor:
        schemeKey === 'dark'
          ? hexToRgba(paletteHex.ritual.primary.dark, 0.25)
          : hexToRgba(paletteHex.ritual.ink.light, 0.07),
    }),
    [schemeKey],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      style={[
        styles.cardShell,
        {
          width,
          backgroundColor: chrome.fill,
          borderColor: chrome.border,
        },
        Platform.OS === 'ios' ? iosWash : styles.pressShadowAndroid,
      ]}
      className={cn(
        'relative min-h-[94px] justify-center overflow-hidden rounded-2xl',
        'active:opacity-[0.94]',
      )}
    >
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        style={[
          styles.watermarkBox,
          { opacity: artwork.watermarkOpacity },
        ]}
      >
        <FontAwesome
          name={artwork.watermark}
          size={artwork.watermarkSize}
          color={artwork.watermarkColor}
          importantForAccessibility="no-hide-descendants"
        />
      </View>

      <View className="relative z-10 justify-center px-4 py-4">
        <View className="flex-row items-start gap-2.5">
          <View className="mt-0.5">
            <FontAwesome
              name={artwork.accent}
              size={artwork.accentSize}
              color={artwork.accentColor}
              importantForAccessibility="no-hide-descendants"
            />
          </View>
          <View className="min-w-0 flex-1 gap-1">
            <Text
              accessibilityRole="header"
              numberOfLines={1}
              className="font-semibold text-[14.5px] leading-[19px] tracking-[-0.016em] text-ritual-ink dark:text-ritual-ink-dark"
            >
              {headline}
            </Text>
            <Text
              numberOfLines={2}
              className="font-normal text-[12px] leading-[16px] text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
            >
              {subline}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  /** Hue comes from {@link getMomentChipChrome}; keep border width here for lint tooling. */
  cardShell: {
    borderWidth: 1,
  },
  pressShadow: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 0,
  },
  pressShadowAndroid: {
    elevation: 4,
  },
  watermarkBox: {
    position: 'absolute',
    right: -8,
    bottom: -12,
    transform: [{ rotate: '-8deg' }],
  },
});
