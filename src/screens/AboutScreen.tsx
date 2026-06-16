import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { RitualText } from '@/components/atoms/RitualText';
import { ProfileNavRow } from '@/components/molecules/ProfileNavRow';
import { ProfileSectionCard } from '@/components/molecules/ProfileSectionCard';
import { ProfileStackScrollLayout } from '@/components/templates/ProfileStackScrollLayout';
import { TathastuMark } from '@/components/atoms/TathastuMark';

import { APP_MARKETING_VERSION } from '@/constants/appVersion';

/** Trust + story + version — ritual brand tone, calm rather than heavy marketing. */
export function AboutScreen() {
  const { t } = useTranslation();

  return (
    <ProfileStackScrollLayout
      title={t('screens.about.title')}
      backAccessibilityLabel={t('screens.profile.stackBackA11y')}
    >
      <View className="mb-7 items-center gap-4">
        <TathastuMark accessibilityLabel={t('screens.login.brandMarkA11y')} />
        <RitualText variant="inkMuted" className="text-center text-login-body leading-relaxed">
          {t('screens.about.lead')}
        </RitualText>
      </View>

      <ProfileSectionCard title={t('screens.about.missionTitle')}>
        <View className="gap-3 px-4 py-5">
          <RitualText className="text-login-body font-medium leading-snug">
            {t('product.positioning')}
          </RitualText>
          <RitualText variant="inkMuted" className="text-login-body leading-relaxed">
            {t('product.mission')}
          </RitualText>
        </View>
      </ProfileSectionCard>

      <ProfileSectionCard caption={t('screens.about.madeWith')}>
        <ProfileNavRow
          icon="info-circle"
          label={t('screens.about.versionCaption')}
          value={APP_MARKETING_VERSION}
          isLast
        />
      </ProfileSectionCard>
    </ProfileStackScrollLayout>
  );
}
