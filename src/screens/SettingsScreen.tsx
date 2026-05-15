import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { useSettingsScreen } from '@/hooks/useSettingsScreen';
import type { ThemePreference } from '@/hooks/useThemePreference';

const THEME_CHOICES: { value: ThemePreference; labelKey: string }[] = [
  { value: 'light', labelKey: 'screens.settings.themeLight' },
  { value: 'dark', labelKey: 'screens.settings.themeDark' },
  { value: 'system', labelKey: 'screens.settings.themeSystem' },
];

/** Account + appearance — ritual backdrop/cards consistent with profile hub. */
export function SettingsScreen() {
  const {
    t,
    signedInMobileDisplay,
    requestSignOut,
    preference,
    setPreference,
    isReady,
  } = useSettingsScreen();

  const sectionSurface =
    'overflow-hidden rounded-[18px] border border-ritual-borderSoft bg-ritual-surface/95 dark:border-ritual-borderSoft-dark dark:bg-ritual-surface-dark/95';

  const rowActive =
    'active:bg-ritual-surfaceSecondary/65 dark:active:bg-ritual-surfaceSecondary-dark/55';

  return (
    <OnboardingScreenBackdrop>
      <SafeAreaView edges={['bottom']} className="flex-1">
        <ScrollView className="flex-1 bg-transparent" keyboardShouldPersistTaps="handled">
          <View className="px-5 pb-10 pt-4">
            <View className="mb-8 gap-2">
              <Text className="font-medium leading-snug text-login-display text-ritual-ink dark:text-ritual-ink-dark">
                {t('screens.settings.title')}
              </Text>
              <Text className="text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
                {t('screens.settings.subtitle')}
              </Text>
            </View>

            <Text className="mb-2 text-login-label font-semibold uppercase tracking-[0.12em] text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
              {t('screens.settings.sectionAccount')}
            </Text>
            <View className={`mb-8 ${sectionSurface}`}>
              <Text className="border-b border-ritual-borderSoft px-4 py-3.5 text-login-body text-ritual-ink dark:border-ritual-borderSoft-dark dark:text-ritual-ink-dark">
                {t('screens.settings.signedInAs', {
                  mobile: signedInMobileDisplay,
                })}
              </Text>
              <Pressable
                onPress={requestSignOut}
                accessibilityRole="button"
                accessibilityLabel={t('screens.settings.signOut')}
                className={`px-4 py-3.5 ${rowActive}`}
              >
                <Text className="text-login-body font-medium text-warm-deep dark:text-warm-dark">
                  {t('screens.settings.signOut')}
                </Text>
              </Pressable>
            </View>

            <Text className="mb-2 text-login-label font-semibold uppercase tracking-[0.12em] text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
              {t('screens.settings.sectionAppearance')}
            </Text>
            <View className={`mb-8 ${sectionSurface}`}>
              <Text className="border-b border-ritual-borderSoft px-4 py-3.5 text-login-body font-medium text-ritual-ink dark:border-ritual-borderSoft-dark dark:text-ritual-ink-dark">
                {t('screens.settings.theme')}
              </Text>
              {!isReady ? (
                <View className="items-center px-4 py-8">
                  <ActivityIndicator />
                </View>
              ) : (
                <View
                  accessibilityRole="radiogroup"
                  accessibilityLabel={t('screens.settings.themeOptionsA11y')}
                >
                  {THEME_CHOICES.map(({ value, labelKey }, index) => {
                    const selected = preference === value;
                    const isLast = index === THEME_CHOICES.length - 1;
                    return (
                      <Pressable
                        key={value}
                        accessibilityRole="radio"
                        accessibilityState={{ selected }}
                        onPress={() => {
                          setPreference(value);
                        }}
                        className={`flex-row items-center justify-between px-4 py-3.5 ${rowActive} ${
                          !isLast ? 'border-b border-ritual-borderSoft dark:border-ritual-borderSoft-dark' : ''
                        }`}
                      >
                        <Text className="text-login-body text-ritual-ink dark:text-ritual-ink-dark">
                          {t(labelKey)}
                        </Text>
                        <View
                          className={`h-5 w-5 rounded-full border-2 ${
                            selected
                              ? 'border-ritual-primary dark:border-ritual-primary-dark'
                              : 'border-ritual-borderSoft dark:border-ritual-borderSoft-dark'
                          } items-center justify-center`}
                        >
                          {selected ? (
                            <View className="h-2.5 w-2.5 rounded-full bg-ritual-primary dark:bg-ritual-primary-dark" />
                          ) : null}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>

            <Text className="mb-2 text-login-label font-semibold uppercase tracking-[0.12em] text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
              {t('screens.settings.sectionGeneral')}
            </Text>
            <View className={sectionSurface}>
              <Text className="px-4 py-3.5 text-login-body text-ritual-ink dark:text-ritual-ink-dark">
                {t('screens.settings.placeholderRow')}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </OnboardingScreenBackdrop>
  );
}
