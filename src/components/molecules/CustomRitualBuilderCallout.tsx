import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = {
  onPress: () => void;
};

/**
 * Home entry to the custom ritual builder — ghost glass tile, same rhythm as upcoming booking.
 */
export const CustomRitualBuilderCallout = memo(function CustomRitualBuilderCallout({
  onPress,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const k = isDark ? 'dark' : 'light';
  const titleColor = paletteHex.ritual.ink[k];
  const sublineColor = isDark ? paletteHex.ritual.inkMuted[k] : hexToRgba(paletteHex.ritual.inkMuted[k], 0.9);
  const hintColor = paletteHex.ritual.primary[k];
  const chevronColor = isDark ? hexToRgba(paletteHex.ritual.inkMuted[k], 0.72) : hexToRgba(paletteHex.ritual.inkMuted[k], 0.52);

  const combinedA11y = `${t('screens.home.buildCustomRitual.cardTitle')}. ${t('screens.home.buildCustomRitual.cardSubtitle')}`;

  const iosShadowStyle = isDark ? styles.tileShadowIosDark : styles.tileShadowIosLight;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={t('screens.home.buildCustomRitual.cardOpenHint')}
      accessibilityLabel={combinedA11y}
      onPress={onPress}
      className="self-stretch active:opacity-[0.97]"
      style={[
        styles.shadowBase,
        Platform.OS === 'ios' ? iosShadowStyle : styles.tileShadowAndroid,
      ]}
    >
      {({ pressed }) => (
        <LiquidGlassMaterial
          preset="ghost"
          borderRadius={RITUAL_CORNER_RADIUS}
          className={cn('rounded-[18px]', pressed && 'opacity-[0.99]')}
        >
          <View className="px-4 py-3.5">
            <View className="flex-row items-center gap-3">
              <View className="min-w-0 flex-1 gap-1.5">
                <Text
                  accessibilityRole="header"
                  style={{ color: titleColor }}
                  className="font-semibold text-[17px] leading-snug tracking-[-0.02em]"
                >
                  {t('screens.home.buildCustomRitual.cardTitle')}
                </Text>
                <Text style={{ color: sublineColor }} className="text-login-body leading-[22px]">
                  {t('screens.home.buildCustomRitual.cardSubtitle')}
                </Text>
                <Text style={{ color: hintColor }} className="pt-px text-sm font-semibold">
                  {t('screens.home.buildCustomRitual.cardHint')}
                </Text>
              </View>
              <FontAwesome
                name="angle-right"
                size={22}
                color={chevronColor}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              />
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
  tileShadowIosLight: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 0,
  },
  tileShadowIosDark: {
    shadowColor: paletteHex.ritual.primary.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 0,
  },
  tileShadowAndroid: {
    elevation: 4,
  },
});
