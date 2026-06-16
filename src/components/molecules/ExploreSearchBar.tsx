import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { radii } from '@/theme/tokens';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
};

/**
 * Explore search — real input that filters the catalog as you type, with an inline clear
 * affordance (consistent across iOS/Android).
 */
export const ExploreSearchBar = memo(function ExploreSearchBar({
  value,
  onChangeText,
  onSubmitEditing,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const k = isDark ? 'dark' : 'light';

  const iconMuted = hexToRgba(paletteHex.ritual.inkMuted[k], isDark ? 0.82 : 0.62);
  const textColor = paletteHex.ritual.ink[k];
  const placeholderColor = hexToRgba(paletteHex.ritual.inkMuted[k], isDark ? 0.72 : 0.58);
  const hasValue = value.length > 0;

  const iosShadow = isDark ? styles.searchShadowIosDark : styles.searchShadowIosLight;

  return (
    <View
      style={[styles.shadowShell, Platform.OS === 'ios' ? iosShadow : styles.searchShadowAndroid]}
      accessibilityRole="search"
    >
      <LiquidGlassMaterial preset="ghost" borderRadius={radii.full} className="overflow-hidden rounded-full">
        <View className="flex-row items-center gap-3 px-4 py-3">
          <FontAwesome
            name="search"
            size={16}
            color={iconMuted}
            importantForAccessibility="no-hide-descendants"
          />
          <TextInput
            accessibilityLabel={t('screens.explore.search.accessibilityLabel')}
            accessibilityHint={t('screens.explore.search.accessibilityHint')}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            placeholder={t('screens.explore.search.placeholder')}
            placeholderTextColor={placeholderColor}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            style={[styles.input, { color: textColor }]}
            className="flex-1 font-normal text-[15px] leading-[20px]"
          />
          {hasValue ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('screens.explore.search.clearA11y')}
              hitSlop={10}
              onPress={() => onChangeText('')}
              className="active:opacity-70"
            >
              <FontAwesome name="times-circle" size={16} color={iconMuted} />
            </Pressable>
          ) : null}
        </View>
      </LiquidGlassMaterial>
    </View>
  );
});

const styles = StyleSheet.create({
  shadowShell: {
    borderRadius: radii.full,
  },
  input: {
    paddingVertical: Platform.select({ ios: 2, default: 0 }),
    margin: 0,
    includeFontPadding: false,
  },
  searchShadowIosLight: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 0,
  },
  searchShadowIosDark: {
    shadowColor: paletteHex.ritual.primary.dark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 0,
  },
  searchShadowAndroid: {
    elevation: 3,
  },
});
