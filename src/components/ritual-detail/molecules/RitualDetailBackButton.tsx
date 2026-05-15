import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { paletteHex } from '@/theme/palette';

type Props = {
  /** After scrolling past the hero — higher-contrast chrome for readability on prose. */
  elevated: boolean;
};

const BTN = 40;

/**
 * Ritual detail only — circular glass back; no previous-route title (“Main”) beside the chevron.
 */
export function RitualDetailBackButton({ elevated }: Props) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const preset = elevated ? 'chrome' : 'ghost';

  const iconColor = elevated
    ? isDark
      ? paletteHex.ritual.ink.dark
      : paletteHex.ritual.ink.light
    : '#FFFFFF';

  return (
    <Pressable
      onPress={() => {
        if (navigation.canGoBack()) navigation.goBack();
      }}
      accessibilityRole="button"
      accessibilityLabel={t('screens.ritualDetail.backA11y')}
      hitSlop={12}
      className="active:opacity-90"
      style={{ width: BTN, height: BTN }}
    >
      <LiquidGlassMaterial
        preset={preset}
        borderRadius={BTN / 2}
        className="h-full w-full items-center justify-center"
      >
        <FontAwesome name="chevron-left" size={15} color={iconColor} />
      </LiquidGlassMaterial>
    </Pressable>
  );
}
