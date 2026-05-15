import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { OnboardingScreenBackdrop } from '@/components/molecules/OnboardingScreenBackdrop';
import { ProfileNavRow } from '@/components/molecules/ProfileNavRow';

import { useLegalInfoActions } from '@/hooks/useLegalInfoActions';

/** Terms & Privacy — same URLs as login footer; ritual slab for clarity off-profile. */
export function LegalInfoScreen() {
  const { t } = useTranslation();
  const { openTerms, openPrivacy } = useLegalInfoActions();
  const externalHint = t('screens.login.legal.opensExternal');

  return (
    <OnboardingScreenBackdrop>
      <SafeAreaView edges={['bottom']} className="flex-1">
        <View className="flex-1 px-5 pb-10 pt-4">
          <Text className="mb-7 text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
            {t('screens.legalInfo.lead')}
          </Text>

          <LoginAuthSurface>
            <View className="-mx-4">
              <ProfileNavRow
                label={t('screens.login.legal.terms')}
                onPress={openTerms}
                accessibilityHint={externalHint}
              />
              <ProfileNavRow
                label={t('screens.login.legal.privacy')}
                onPress={openPrivacy}
                accessibilityHint={externalHint}
                isLast
              />
            </View>
          </LoginAuthSurface>
        </View>
      </SafeAreaView>
    </OnboardingScreenBackdrop>
  );
}
