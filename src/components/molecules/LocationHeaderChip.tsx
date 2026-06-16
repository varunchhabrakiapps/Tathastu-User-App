import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { useUserLocationLabel } from '@/hooks/useUserLocationLabel';
import { paletteHex } from '@/theme/palette';
import { radii } from '@/theme/tokens';
import { cn } from '@/utils/cn';

type Props = {
  accessibilityLabelKey?: 'screens.home.locationA11y' | 'screens.profile.locationA11y';
  accessibilityHintKey?: 'screens.home.locationOpenHint' | 'screens.profile.locationOpenHint';
  className?: string;
  onPress: () => void;
};

/**
 * Compact service-area pill — ghost glass (same language as {@link GhostGlassButton} / View all).
 * Sits inline beside the brand mark on Home; standalone on Profile.
 */
export const LocationHeaderChip = memo(function LocationHeaderChip({
  accessibilityLabelKey = 'screens.home.locationA11y',
  accessibilityHintKey = 'screens.home.locationOpenHint',
  className,
  onPress,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';
  const locationName = useUserLocationLabel();
  const locationLabel = t('common.locationChipLabel');
  const nameColor = paletteHex.ritual.primary[k];
  const glyphColor = paletteHex.ritual.inkMuted[k];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t(accessibilityLabelKey, { location: locationName })}
      accessibilityHint={t(accessibilityHintKey)}
      onPress={onPress}
      hitSlop={6}
      className={cn('active:opacity-[0.92]', className)}
    >
      <LiquidGlassMaterial
        preset="ghost"
        borderRadius={radii.full}
        className="overflow-hidden rounded-full"
      >
        <View className="flex-row items-center gap-1.5 px-2.5 py-1.5">
          <FontAwesome
            name="map-marker"
            size={11}
            color={glyphColor}
            importantForAccessibility="no-hide-descendants"
          />
          <View className="flex-row items-center">
            <Text
              numberOfLines={1}
              style={{ color: glyphColor }}
              className="shrink text-[12px] leading-[16px] font-medium"
            >
              {locationLabel}
              {' · '}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: nameColor }}
              className="text-[12px] leading-[16px] font-semibold"
            >
              {locationName}
            </Text>
          </View>
          <View pointerEvents="none" className="shrink-0">
            <FontAwesome
              name="caret-down"
              size={9}
              color={glyphColor}
              importantForAccessibility="no-hide-descendants"
            />
          </View>
        </View>
      </LiquidGlassMaterial>
    </Pressable>
  );
});
