import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Props = {
  greetingName: string;
};

/** Editorial grounding under the header — calm hierarchy, onboarding-consistent type scale. */
export const GreetingBlock = memo(function GreetingBlock({ greetingName }: Props) {
  const { t } = useTranslation();

  return (
    <View className="gap-2">
      <Text
        accessibilityRole="header"
        numberOfLines={2}
        className="font-medium leading-snug text-login-display text-ritual-ink dark:text-ritual-ink-dark"
      >
        {t('screens.home.greeting', { name: greetingName })}
      </Text>
      <Text
        accessibilityRole="text"
        numberOfLines={4}
        className="font-normal text-login-body text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
      >
        {t('screens.home.supportingLine')}
      </Text>
    </View>
  );
});
