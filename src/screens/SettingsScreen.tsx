import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextHeading } from '@/components/atoms/TextHeading';
import { TextMuted } from '@/components/atoms/TextMuted';
import { useAuth } from '@/context/AuthContext';
import { useThemePreference, type ThemePreference } from '@/hooks/useThemePreference';

const THEME_CHOICES: { value: ThemePreference; labelKey: string }[] = [
  { value: 'light', labelKey: 'screens.settings.themeLight' },
  { value: 'dark', labelKey: 'screens.settings.themeDark' },
  { value: 'system', labelKey: 'screens.settings.themeSystem' },
];

/** Placeholder settings shell — extend with list rows and navigation later. */
export function SettingsScreen() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { preference, setPreference, isReady } = useThemePreference();

  const onSignOut = () => {
    Alert.alert(
      t('screens.settings.signOut'),
      t('screens.settings.signOutConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('screens.settings.signOut'),
          style: 'destructive',
          onPress: () => {
            logout().catch(() => {});
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      className="flex-1 bg-canvas dark:bg-canvas-dark"
    >
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="px-4 pb-8 pt-4">
          <View className="mb-6">
            <TextHeading centered={false}>{t('screens.settings.title')}</TextHeading>
            <TextMuted centered={false}>{t('screens.settings.subtitle')}</TextMuted>
          </View>

          <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-ondark">
            {t('screens.settings.sectionAccount')}
          </Text>
          <View className="mb-6 overflow-hidden rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
            <Text className="border-b border-border px-4 py-3.5 text-base text-ink dark:border-border-dark dark:text-ink-ondark">
              {t('screens.settings.signedInAs', {
                mobile: user?.mobileNumber ?? '—',
              })}
            </Text>
            <Pressable
              onPress={onSignOut}
              accessibilityRole="button"
              accessibilityLabel={t('screens.settings.signOut')}
              className="px-4 py-3.5 active:bg-surface-elevated dark:active:bg-surface-elevated-dark"
            >
              <Text className="text-base font-medium text-warm-deep dark:text-warm-dark">
                {t('screens.settings.signOut')}
              </Text>
            </Pressable>
          </View>

          <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-ondark">
            {t('screens.settings.sectionAppearance')}
          </Text>
          <View className="mb-6 overflow-hidden rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
            <Text className="border-b border-border px-4 py-3.5 text-base font-medium text-ink dark:border-border-dark dark:text-ink-ondark">
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
                        void setPreference(value);
                      }}
                      className={`flex-row items-center justify-between px-4 py-3.5 active:bg-surface-elevated dark:active:bg-surface-elevated-dark ${
                        !isLast ? 'border-b border-border dark:border-border-dark' : ''
                      }`}
                    >
                      <Text className="text-base text-ink dark:text-ink-ondark">{t(labelKey)}</Text>
                      <View
                        className={`h-5 w-5 rounded-full border-2 ${
                          selected
                            ? 'border-primary dark:border-primary-dark'
                            : 'border-border dark:border-border-dark'
                        } items-center justify-center`}
                      >
                        {selected ? (
                          <View className="h-2.5 w-2.5 rounded-full bg-primary dark:bg-primary-dark" />
                        ) : null}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-ondark">
            {t('screens.settings.sectionGeneral')}
          </Text>
          <View className="overflow-hidden rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
            <Text className="px-4 py-3.5 text-base text-ink dark:text-ink-ondark">
              {t('screens.settings.placeholderRow')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
