import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import type { TestimonialPreviewId } from '@/domain/testimonialPreview';
import { hexToRgba } from '@/theme/colorUtils';
import { useGhostCardShadow } from '@/theme/ghostCardShadow';
import { paletteHex } from '@/theme/palette';

const STAR_COUNT = 5;

type Props = {
  testimonialId: TestimonialPreviewId;
  width: number;
};

function StarRow({ color }: { color: string }) {
  return (
    <View className="mt-3 flex-row items-center gap-1" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <FontAwesome key={i} name="star" size={11} color={color} importantForAccessibility="no-hide-descendants" />
      ))}
    </View>
  );
}

/**
 * Frosted quote tile — {@link LiquidGlassMaterial} ghost, quiet star proof, editorial type.
 */
export const TestimonialCard = memo(function TestimonialCard({ testimonialId, width }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const schemeKey = colorScheme === 'dark' ? 'dark' : 'light';

  const prefix = `screens.home.testimonials.items.${testimonialId}`;
  const quote = t(`${prefix}.quote`);
  const name = t(`${prefix}.name`);
  const context = t(`${prefix}.context`);

  const titleColor = paletteHex.ritual.ink[schemeKey];
  const mutedColor = paletteHex.ritual.inkMuted[schemeKey];
  const quoteGlyphColor =
    schemeKey === 'dark'
      ? hexToRgba(paletteHex.ritual.primary.dark, 0.55)
      : hexToRgba(paletteHex.ritual.primary.light, 0.42);
  const starColor =
    schemeKey === 'dark' ? paletteHex.warm.gold : hexToRgba(paletteHex.warm.saffron, 0.92);

  const a11y = t('screens.home.testimonials.cardA11y', { quote, name, context });
  const ghostShadow = useGhostCardShadow();

  return (
    <View
      style={[{ width }, ghostShadow, styles.shadowBase]}
      accessible
      accessibilityRole="text"
      accessibilityLabel={a11y}
    >
      <LiquidGlassMaterial preset="ghost" borderRadius={RITUAL_CORNER_RADIUS} className="rounded-[18px]">
        <View className="min-h-[128px] justify-between px-[18px] py-[17px]" pointerEvents="box-none">
          <View pointerEvents="box-none">
            <FontAwesome
              name="quote-left"
              size={15}
              color={quoteGlyphColor}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
            <Text
              accessible={false}
              accessibilityElementsHidden
              style={{ color: titleColor }}
              className="mt-2 font-normal text-[14.5px] leading-[22px] tracking-[-0.015em]"
            >
              {quote}
            </Text>
            <StarRow color={starColor} />
          </View>

          <View className="pt-4" pointerEvents="box-none">
            <Text accessible={false} accessibilityElementsHidden style={{ color: titleColor }} className="font-semibold text-[13px] leading-[18px]">
              {name}
            </Text>
            <Text
              accessible={false}
              accessibilityElementsHidden
              style={{ color: mutedColor }}
              className="mt-1 font-normal text-[12px] leading-[17px]"
            >
              {context}
            </Text>
          </View>
        </View>
      </LiquidGlassMaterial>
    </View>
  );
});

const styles = StyleSheet.create({
  shadowBase: {
    borderRadius: RITUAL_CORNER_RADIUS,
  },
});
