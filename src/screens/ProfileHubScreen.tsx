import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { ProfileIdentityHero } from '@/components/molecules/ProfileIdentityHero';
import { ProfileNavRow } from '@/components/molecules/ProfileNavRow';
import { ProfileHubScrollLayout } from '@/components/templates/ProfileHubScrollLayout';
import { useProfileHubRoutes } from '@/hooks/useProfileHubRoutes';
import { useProfileHubSummary } from '@/hooks/useProfileHubSummary';

type HubMenuRow = {
  key: string;
  label: string;
  onPress: () => void;
  accessibilityHint?: string;
};

/**
 * Primary destination for Profile tab — ritual backdrop + auth-style slab; utilities only (no tab duplicates).
 */
export function ProfileHubScreen() {
  const { t } = useTranslation();
  const summary = useProfileHubSummary();
  const routes = useProfileHubRoutes();

  const mobileLine =
    summary.mobileDisplayLine || t('screens.profile.mobilePlaceholder');

  const menuRows: HubMenuRow[] = useMemo(
    () => [
      { key: 'settings', label: t('screens.profile.openSettings'), onPress: routes.openSettings },
      {
        key: 'notifications',
        label: t('screens.profile.openNotifications'),
        onPress: routes.openNotifications,
      },
      { key: 'help', label: t('screens.profile.openHelp'), onPress: routes.openHelp },
      {
        key: 'contact',
        label: t('screens.profile.contactSupport'),
        onPress: routes.openContactSupport,
        accessibilityHint: t('screens.profile.contactSupportA11yHint'),
      },
      { key: 'legal', label: t('screens.profile.openLegal'), onPress: routes.openLegalInfo },
      { key: 'about', label: t('screens.profile.openAbout'), onPress: routes.openAbout },
    ],
    [routes, t],
  );

  return (
    <ProfileHubScrollLayout>
      <View className="flex-1 px-5 pb-6 pt-4">
        <View className="mb-7 gap-2">
          <Text className="font-medium leading-snug text-login-display text-ritual-ink dark:text-ritual-ink-dark">
            {t('screens.profile.title')}
          </Text>
          <Text className="text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
            {t('screens.profile.subtitle')}
          </Text>
        </View>

        <LoginAuthSurface>
          <View className="gap-5 px-4">
            <ProfileIdentityHero
              greetingName={summary.greetingName}
              avatarInitials={summary.avatarInitials}
              mobileLine={mobileLine}
              supportingLine={t('screens.profile.identitySupportingLine')}
            />

            <View className="h-px bg-ritual-borderSoft/75 dark:bg-ritual-borderSoft-dark/75" />

            <View className="-mx-4">
              {menuRows.map((row, index) => (
                <ProfileNavRow
                  key={row.key}
                  label={row.label}
                  onPress={row.onPress}
                  isLast={index === menuRows.length - 1}
                  accessibilityHint={row.accessibilityHint}
                />
              ))}
            </View>
          </View>
        </LoginAuthSurface>
      </View>
    </ProfileHubScrollLayout>
  );
}
