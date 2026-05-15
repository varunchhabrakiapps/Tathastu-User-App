import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextHeading } from '@/components/atoms/TextHeading';
import { TextMuted } from '@/components/atoms/TextMuted';
import { useAuth } from '@/context/AuthContext';
import type { ProfileStackParamList } from '@/navigation/types';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { useColorScheme } from 'nativewind';

type Navigation = StackNavigationProp<ProfileStackParamList, 'ProfileHub'>;

function ProfileDestinationRow({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const glyph = hexToRgba(
    paletteHex.ritual.inkMuted[isDark ? 'dark' : 'light'],
    isDark ? 0.72 : 0.65,
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-3.5 active:bg-surface-elevated dark:active:bg-surface-elevated-dark"
    >
      <Text className="text-base text-ink dark:text-ink-ondark">{label}</Text>
      <FontAwesome name="chevron-right" size={13} color={glyph} />
    </Pressable>
  );
}

/**
 * Primary destination for Profile tab — nests settings & help off the main tab strip.
 */
export function ProfileHubScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Navigation>();
  const { user } = useAuth();

  const mobileLine = user?.mobileNumber ?? '—';

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      className="flex-1 bg-canvas dark:bg-canvas-dark"
      accessibilityRole="none"
    >
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="px-4 pb-10 pt-4">
          <View className="mb-8">
            <TextHeading centered={false}>{t('screens.profile.title')}</TextHeading>
            <TextMuted centered={false}>{t('screens.profile.subtitle')}</TextMuted>
          </View>

          <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-ondark">
            {t('screens.profile.sectionAccount')}
          </Text>
          <View className="mb-6 overflow-hidden rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
            <Text className="border-b border-border px-4 py-3.5 text-base text-ink dark:border-border-dark dark:text-ink-ondark">
              {t('screens.settings.signedInAs', {
                mobile: mobileLine,
              })}
            </Text>
          </View>

          <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-ondark">
            {t('screens.profile.sectionSupport')}
          </Text>
          <View className="overflow-hidden rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
            <View className="border-b border-border dark:border-border-dark">
              <ProfileDestinationRow
                label={t('screens.profile.openSettings')}
                onPress={() => navigation.navigate('Settings')}
              />
            </View>
            <ProfileDestinationRow
              label={t('screens.profile.openHelp')}
              onPress={() => navigation.navigate('Help')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
