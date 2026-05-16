import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'nativewind';

import { IconButton } from '@/components/atoms/IconButton';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

type Props = {
  /** Hero reel — ghost glass + light icon; scrolled body — chrome + ink (same as OTP). */
  onHero: boolean;
};

/**
 * Ritual detail back — mirrors {@link AuthFlowHeader} (`angle-left` on {@link IconButton}).
 */
export function RitualDetailBackButton({ onHero }: Props) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const paletteKey = isDark ? 'dark' : 'light';

  const iconColor = onHero
    ? hexToRgba('#FFFFFF', isDark ? 0.92 : 0.95)
    : hexToRgba(paletteHex.ritual.ink[paletteKey], isDark ? 0.78 : 0.82);

  return (
    <View className="flex-row items-center">
      <IconButton
        onPress={() => {
          if (navigation.canGoBack()) navigation.goBack();
        }}
        accessibilityLabel={t('screens.ritualDetail.backA11y')}
        glassVariant={onHero ? 'ghost' : 'chrome'}
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
}
