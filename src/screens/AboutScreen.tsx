import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';

import { APP_MARKETING_VERSION } from '@/constants/appVersion';

/** Trust + version — ritual brand tone, no heavy marketing. */
export function AboutScreen() {
  const { t } = useTranslation();

  return (
    <OnboardingScreenBackdrop>
      <SafeAreaView edges={['bottom']} className="flex-1">
        <ScrollView className="flex-1 bg-transparent" keyboardShouldPersistTaps="handled">
          <View className="px-5 pb-10 pt-4">
            <Text className="mb-7 text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
              {t('screens.about.lead')}
            </Text>

            <LoginAuthSurface>
              <View className="px-4">
                <Text className="text-login-label font-semibold uppercase tracking-[0.12em] text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
                  {t('screens.about.versionCaption')}
                </Text>
                <Text className="mt-2 text-login-display font-medium text-ritual-ink dark:text-ritual-ink-dark">
                  {APP_MARKETING_VERSION}
                </Text>
              </View>
            </LoginAuthSurface>
          </View>
        </ScrollView>
      </SafeAreaView>
    </OnboardingScreenBackdrop>
  );
}
