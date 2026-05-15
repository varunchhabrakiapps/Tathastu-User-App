import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';

import { RitualMeta } from '@/components/atoms/RitualMeta';
import { HOME_RITUAL_CARD_ARTWORK_HEIGHT } from '@/constants/ritualLayout';
import type { TrendingRitualPreview } from '@/domain/trendingRitual';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { getTrendingArtworkGradient } from '@/theme/trendingRitualArtwork';

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
  const titleColor = paletteHex.ritual.ink[schemeKey];
  const supportingColor = paletteHex.ritual.inkMuted[schemeKey];

  const prefix = itemTranslationPrefix(ritual.id);
  const title = t(`${prefix}.title`);
  const description = t(`${prefix}.description`);
  const socialProof = t(`${prefix}.socialProof`);

  const gradient = useMemo(
    () => getTrendingArtworkGradient(ritual.artworkPreset, schemeKey),
    [ritual.artworkPreset, schemeKey],
  );

  const combinedA11y = `${title}. ${description}. ${socialProof}`;
  const iosWash =
    schemeKey === 'dark'
      ? { shadowColor: paletteHex.ritual.primary.dark }
      : { shadowColor: hexToRgba(paletteHex.ritual.primary.light, 0.22) };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={t('screens.home.trendingRituals.cardOpenHint')}
      accessibilityLabel={combinedA11y}
      onPress={onPress}
      style={{ width: cardWidth }}
      className="active:opacity-[0.97]"
    >
      <View
        style={[styles.cardShadow, Platform.OS === 'ios' ? iosWash : styles.cardShadowAndroid]}
        className="overflow-hidden rounded-2xl bg-ritual-surface dark:bg-ritual-surface-dark"
      >
        <View className="overflow-hidden rounded-2xl">
          <LinearGradient
            colors={gradient.colors}
            start={gradient.start}
            end={gradient.end}
            accessibilityIgnoresInvertColors
            style={styles.gradientArt}
          />

          <View className="gap-1.5 px-3.5 pb-3.5 pt-3">
            <Text
              accessibilityRole="header"
              numberOfLines={2}
              style={{ color: titleColor }}
              className="font-medium text-[15px] leading-[20px] tracking-[-0.015em]"
            >
              {title}
            </Text>
            <Text
              numberOfLines={2}
              style={{ color: supportingColor }}
              className="font-normal text-[12px] leading-[17px]"
            >
              {description}
            </Text>
            <RitualMeta accessibilityLabel={socialProof}>{socialProof}</RitualMeta>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  gradientArt: {
    width: '100%',
    height: HOME_RITUAL_CARD_ARTWORK_HEIGHT,
  },
  cardShadow: {
    borderRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.09,
    shadowRadius: 22,
    elevation: 0,
  },
  cardShadowAndroid: {
    elevation: 3,
  },
});
