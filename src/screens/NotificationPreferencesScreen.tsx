import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';

/** Placeholder for booking & ritual reminders — copy sets expectations until push prefs ship. */
export function NotificationPreferencesScreen() {
  const { t } = useTranslation();

  return (
    <OnboardingScreenBackdrop>
      <SafeAreaView edges={['bottom']} className="flex-1">
        <ScrollView className="flex-1 bg-transparent" keyboardShouldPersistTaps="handled">
          <View className="px-5 pb-10 pt-4">
            <Text className="mb-4 text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
              {t('screens.notifications.lead')}
            </Text>

            <LoginAuthSurface>
              <View className="px-4">
                <Text className="text-login-body leading-relaxed text-ritual-ink dark:text-ritual-ink-dark">
                  {t('screens.notifications.body')}
                </Text>
              </View>
            </LoginAuthSurface>
          </View>
        </ScrollView>
      </SafeAreaView>
    </OnboardingScreenBackdrop>
  );
}
