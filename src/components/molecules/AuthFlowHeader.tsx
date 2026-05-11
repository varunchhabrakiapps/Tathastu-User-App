import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { AuthIconButton } from '@/components/atoms/auth/AuthIconButton';
import { paletteHex } from '@/theme/palette';

type Props = {
  onBackPress: () => void;
};

export const AuthFlowHeader = memo(function AuthFlowHeader({ onBackPress }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const paletteKey = isDark ? 'dark' : 'light';
  const iconColor = paletteHex.ritual.ink[paletteKey];

  return (
    <View className="flex-row items-center px-5 pb-2">
      <AuthIconButton
        onPress={onBackPress}
        accessibilityLabel={t('screens.otp.backA11y')}
      >
        <FontAwesome
          name="chevron-left"
          size={17}
          color={iconColor}
          importantForAccessibility="no"
        />
      </AuthIconButton>
    </View>
  );
});
