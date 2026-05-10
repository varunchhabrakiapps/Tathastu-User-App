import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextHeading } from '@/components/atoms/TextHeading';
import { TextMuted } from '@/components/atoms/TextMuted';

/** Placeholder settings shell — extend with list rows and navigation later. */
export function SettingsScreen() {
  const { t } = useTranslation();

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
