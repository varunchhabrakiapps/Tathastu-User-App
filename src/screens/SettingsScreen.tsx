import { ActivityIndicator, Pressable, View } from 'react-native';

import { RitualText } from '@/components/atoms/RitualText';
import { ProfileNavRow } from '@/components/molecules/ProfileNavRow';
import { ProfileSectionCard } from '@/components/molecules/ProfileSectionCard';
import { ProfileStackScrollLayout } from '@/components/templates/ProfileStackScrollLayout';
import { useSettingsScreen } from '@/hooks/useSettingsScreen';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import type { ThemePreference } from '@/hooks/useThemePreference';

const THEME_CHOICES: { value: ThemePreference; labelKey: string }[] = [
  { value: 'light', labelKey: 'screens.settings.themeLight' },
  { value: 'dark', labelKey: 'screens.settings.themeDark' },
  { value: 'system', labelKey: 'screens.settings.themeSystem' },
];

/** Account + appearance — ritual cards consistent with the Profile hub. */
export function SettingsScreen() {
  const { t, signedInMobileDisplay, requestSignOut, preference, setPreference, isReady } =
    useSettingsScreen();
  const { primary, borderSoft, rowDivider, rowPressHighlight } = useRitualSemanticColors();

  return (
    <ProfileStackScrollLayout
      title={t('screens.settings.title')}
      backAccessibilityLabel={t('screens.profile.stackBackA11y')}
    >
      <RitualText variant="inkMuted" className="mb-7 text-login-body leading-relaxed">
        {t('screens.settings.subtitle')}
      </RitualText>

      <ProfileSectionCard title={t('screens.settings.sectionAccount')}>
        <ProfileNavRow
          icon="mobile"
          label={t('screens.settings.signedInAs', { mobile: signedInMobileDisplay })}
        />
        <ProfileNavRow
          icon="sign-out"
          label={t('screens.settings.signOut')}
          onPress={requestSignOut}
          accessibilityHint={t('screens.profile.account.signOutHint')}
          tone="destructive"
          isLast
        />
      </ProfileSectionCard>

      <ProfileSectionCard title={t('screens.settings.sectionAppearance')}>
        {!isReady ? (
          <View className="items-center px-4 py-8">
            <ActivityIndicator color={primary} />
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
                  style={({ pressed }) => [
                    !isLast ? { borderBottomWidth: 1, borderBottomColor: rowDivider } : undefined,
                    pressed ? { backgroundColor: rowPressHighlight } : undefined,
                  ]}
                  className="flex-row items-center justify-between px-4 py-3.5"
                >
                  <RitualText className="text-login-body">{t(labelKey)}</RitualText>
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 9999,
                      borderWidth: 2,
                      borderColor: selected ? primary : borderSoft,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {selected ? (
                      <View
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: 9999,
                          backgroundColor: primary,
                        }}
                      />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ProfileSectionCard>

      <ProfileSectionCard title={t('screens.settings.sectionGeneral')}>
        <ProfileNavRow icon="ellipsis-h" label={t('screens.settings.placeholderRow')} isLast />
      </ProfileSectionCard>
    </ProfileStackScrollLayout>
  );
}
