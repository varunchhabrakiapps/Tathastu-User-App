import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { RitualText } from '@/components/atoms/RitualText';
import { PrimaryGlassButton } from '@/components/atoms/PrimaryGlassButton';
import { ProfileSectionCard } from '@/components/molecules/ProfileSectionCard';
import { ProfileStackScrollLayout } from '@/components/templates/ProfileStackScrollLayout';
import { useContactSupportMail } from '@/hooks/useContactSupportMail';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';

const FAQ_KEYS = ['bookings', 'payments', 'pandits', 'privacy'] as const;

/** Help — calm FAQ answers plus a direct line to a real person. */
export function HelpScreen() {
  const { t } = useTranslation();
  const { openFeedbackMail } = useContactSupportMail();
  const { rowDivider } = useRitualSemanticColors();

  return (
    <ProfileStackScrollLayout
      title={t('screens.help.title')}
      backAccessibilityLabel={t('screens.profile.stackBackA11y')}
    >
      <RitualText variant="inkMuted" className="mb-7 text-login-body leading-relaxed">
        {t('screens.help.lead')}
      </RitualText>

      <ProfileSectionCard title={t('screens.help.faqTitle')}>
        {FAQ_KEYS.map((key, index) => (
          <View
            key={key}
            className="px-4 py-4"
            style={
              index < FAQ_KEYS.length - 1
                ? { borderBottomWidth: 1, borderBottomColor: rowDivider }
                : undefined
            }
          >
            <RitualText className="text-login-body font-medium">
              {t(`screens.help.faq.${key}Q`)}
            </RitualText>
            <RitualText variant="inkMuted" className="mt-1.5 text-login-body leading-relaxed">
              {t(`screens.help.faq.${key}A`)}
            </RitualText>
          </View>
        ))}
      </ProfileSectionCard>

      <ProfileSectionCard>
        <View className="gap-3 px-4 py-5">
          <RitualText className="text-login-body font-medium">{t('screens.help.contactTitle')}</RitualText>
          <RitualText variant="inkMuted" className="text-login-body leading-relaxed">
            {t('screens.help.contactBody')}
          </RitualText>
          <PrimaryGlassButton
            label={t('screens.help.contactCta')}
            onPress={openFeedbackMail}
            className="mt-1"
          />
        </View>
      </ProfileSectionCard>
    </ProfileStackScrollLayout>
  );
}
