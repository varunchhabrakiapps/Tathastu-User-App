import { useTranslation } from 'react-i18next';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextHeading } from '@/components/atoms/TextHeading';
import { TextMuted } from '@/components/atoms/TextMuted';
import { useAuth } from '@/context/AuthContext';

/** Placeholder settings shell — extend with list rows and navigation later. */
export function SettingsScreen() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

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
      edges={['top']}
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
