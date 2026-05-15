import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Props = {
  greetingName: string;
};

/** Editorial grounding under the header — calm hierarchy, onboarding-consistent type scale. */
export const GreetingSection = memo(function GreetingSection({
  greetingName,
}: Props) {
  const { t } = useTranslation();

  return (
    <View className="gap-2">
      <Text
        accessibilityRole="header"
        numberOfLines={1}
        className="font-medium leading-loose text-login-display text-ritual-ink dark:text-ritual-ink-dark"
      >
        {t('screens.home.greeting', { name: greetingName })}
      </Text>
      <Text
        accessibilityRole="text"
        numberOfLines={3}
        className="font-normal text-login-body text-ritual-inkMuted dark:text-ritual-inkMuted-dark"
      >
        {t('screens.home.supportingLine')}
      </Text>
    </View>
  );
});
