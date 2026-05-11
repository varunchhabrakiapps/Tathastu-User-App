import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { IconButton } from '@/components/atoms/IconButton';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

type Props = {
  onBackPress: () => void;
};

/**
 * `angle-left` reads lighter than solid `chevron-left` (same FA glyph weight; open angle = thinner look).
 * Stroke width isn’t configurable for font-based icons — use a different glyph or a custom SVG if you need a true hairline.
 */
export const AuthFlowHeader = memo(function AuthFlowHeader({ onBackPress }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const paletteKey = isDark ? 'dark' : 'light';
  const iconColor = hexToRgba(
    paletteHex.ritual.ink[paletteKey],
    isDark ? 0.78 : 0.82,
  );

  return (
    <View className="flex-row items-center px-5 pb-2 mb-4">
      <IconButton
        onPress={onBackPress}
        accessibilityLabel={t('screens.otp.backA11y')}
      >
        <FontAwesome
          name="angle-left"
          size={22}
          color={iconColor}
          importantForAccessibility="no"
        />
      </IconButton>
    </View>
  );
});
