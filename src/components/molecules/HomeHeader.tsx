import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { AvatarButton } from '@/components/atoms/AvatarButton';
import { TathastuMark } from '@/components/atoms/TathastuMark';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

type Props = {
  onProfilePress: () => void;
};

/** Native-weight home chrome — subtle mark left, calm profile affordance right. */
export const HomeHeader = memo(function HomeHeader({ onProfilePress }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = hexToRgba(
    paletteHex.ritual.ink[isDark ? 'dark' : 'light'],
    isDark ? 0.78 : 0.82,
  );

  return (
    <View className="flex-row items-center justify-between pb-6">
      <TathastuMark accessibilityLabel={t('screens.login.brandMarkA11y')} />
      <AvatarButton
        accessibilityLabel={t('screens.home.profileActionA11y')}
        onPress={onProfilePress}
      >
        <FontAwesome
          name="user"
          size={19}
          color={iconColor}
          importantForAccessibility="no-hide-descendants"
        />
      </AvatarButton>
    </View>
  );
});
