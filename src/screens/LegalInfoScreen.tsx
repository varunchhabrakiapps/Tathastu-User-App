import { useTranslation } from 'react-i18next';

import { RitualText } from '@/components/atoms/RitualText';
import { ProfileNavRow } from '@/components/molecules/ProfileNavRow';
import { ProfileSectionCard } from '@/components/molecules/ProfileSectionCard';
import { ProfileStackScrollLayout } from '@/components/templates/ProfileStackScrollLayout';
import { useLegalInfoActions } from '@/hooks/useLegalInfoActions';

/** Terms & Privacy — same URLs as the login footer; grouped ritual card with a privacy reassurance. */
export function LegalInfoScreen() {
  const { t } = useTranslation();
  const { openTerms, openPrivacy } = useLegalInfoActions();
  const externalHint = t('screens.login.legal.opensExternal');

  return (
    <ProfileStackScrollLayout
      title={t('screens.legalInfo.title')}
      backAccessibilityLabel={t('screens.profile.stackBackA11y')}
    >
      <RitualText variant="inkMuted" className="mb-7 text-login-body leading-relaxed">
        {t('screens.legalInfo.lead')}
      </RitualText>

      <ProfileSectionCard caption={t('screens.legalInfo.privacyNote')}>
        <ProfileNavRow
          icon="file-text-o"
          label={t('screens.login.legal.terms')}
          onPress={openTerms}
          accessibilityHint={externalHint}
        />
        <ProfileNavRow
          icon="lock"
          label={t('screens.login.legal.privacy')}
          onPress={openPrivacy}
          accessibilityHint={externalHint}
          isLast
        />
      </ProfileSectionCard>
    </ProfileStackScrollLayout>
  );
}
