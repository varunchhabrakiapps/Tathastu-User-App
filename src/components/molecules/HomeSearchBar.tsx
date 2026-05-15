import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { radii } from '@/theme/tokens';
import { cn } from '@/utils/cn';

type Props = {
  onPress: () => void;
};

/**
 * Fake search field — **ghost liquid glass** like Upcoming, so the gradient shows through
 * instead of a flat white block.
 */
export const HomeSearchBar = memo(function HomeSearchBar({ onPress }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const k = isDark ? 'dark' : 'light';

  const iconMuted = hexToRgba(paletteHex.ritual.inkMuted[k], isDark ? 0.8 : 0.62);
  const chevronMuted = hexToRgba(paletteHex.ritual.inkMuted[k], isDark ? 0.55 : 0.45);

  const iosShadow = isDark ? styles.searchShadowIosDark : styles.searchShadowIosLight;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('screens.home.searchBar.accessibilityLabel')}
      accessibilityHint={t('screens.home.searchBar.accessibilityHint')}
      onPress={onPress}
      className="self-stretch active:opacity-[0.98]"
      style={[
        styles.shadowShell,
        Platform.OS === 'ios' ? iosShadow : styles.searchShadowAndroid,
      ]}
    >
      {({ pressed }) => (
        <LiquidGlassMaterial
          preset="ghost"
          borderRadius={radii.full}
          className={cn('overflow-hidden rounded-full', pressed && 'opacity-[0.98]')}
        >
          <View className="flex-row items-center gap-3 px-4 py-3.5">
            <FontAwesome
              name="search"
              size={17}
              color={iconMuted}
              importantForAccessibility="no-hide-descendants"
            />
            <Text
              numberOfLines={1}
              className="flex-1 font-normal text-[15px] leading-[20px] text-ritual-inkMuted/88 dark:text-ritual-inkMuted-dark/90"
            >
              {t('screens.home.searchBar.placeholder')}
            </Text>
            <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              <FontAwesome name="chevron-right" size={12} color={chevronMuted} />
            </View>
          </View>
        </LiquidGlassMaterial>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  shadowShell: {
    borderRadius: radii.full,
  },
  searchShadowIosLight: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 0,
  },
  searchShadowIosDark: {
    shadowColor: paletteHex.ritual.primary.dark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 0,
  },
  searchShadowAndroid: {
    elevation: 3,
  },
});
