import { useTranslation } from 'react-i18next';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';

/**
 * Help stack leaf — ritual backdrop; navigator supplies the screen title so body stays editorial copy only.
 */
export function HelpScreen() {
  const { t } = useTranslation();

  return (
    <OnboardingScreenBackdrop>
      <SafeAreaView edges={['bottom']} className="flex-1">
        <ScrollView className="flex-1 bg-transparent" keyboardShouldPersistTaps="handled">
          <Text className="px-5 pb-10 pt-4 text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
            {t('screens.help.subtitle')}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </OnboardingScreenBackdrop>
  );
}
