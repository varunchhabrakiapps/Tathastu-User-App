import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';

type Props = {
  greetingName: string;
};

/** Editorial grounding under the header — calm hierarchy, onboarding-consistent type scale. */
export const GreetingBlock = memo(function GreetingBlock({ greetingName }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const headingColor = paletteHex.ritual.ink[key];
  const bodyColor = paletteHex.ritual.inkMuted[key];

  return (
    <View className="gap-2">
      <Text
        accessibilityRole="header"
        numberOfLines={2}
        style={{ color: headingColor }}
        className="font-medium leading-snug text-login-display"
      >
        {t('screens.home.greeting', { name: greetingName })}
      </Text>
      <Text
        accessibilityRole="text"
        numberOfLines={4}
        style={{ color: bodyColor }}
        className="font-normal text-login-body -mt-2"
      >
        {t('screens.home.supportingLine')}
      </Text>
    </View>
  );
});
