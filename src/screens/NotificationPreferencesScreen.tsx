import { useTranslation } from 'react-i18next';

import { RitualText } from '@/components/atoms/RitualText';
import { ProfileSectionCard } from '@/components/molecules/ProfileSectionCard';
import { ProfileToggleRow } from '@/components/molecules/ProfileToggleRow';
import { ProfileStackScrollLayout } from '@/components/templates/ProfileStackScrollLayout';
import { useNotificationPreferences } from '@/hooks/useNotificationPreferences';

/** Calm, on-device notification controls — essentials default on, marketing-leaning nudges off. */
export function NotificationPreferencesScreen() {
  const { t } = useTranslation();
  const { preferences, setPreference } = useNotificationPreferences();

  return (
    <ProfileStackScrollLayout
      title={t('screens.notifications.title')}
      backAccessibilityLabel={t('screens.profile.stackBackA11y')}
    >
      <RitualText variant="inkMuted" className="mb-7 text-login-body leading-relaxed">
        {t('screens.notifications.lead')}
      </RitualText>

      <ProfileSectionCard title={t('screens.notifications.sectionReminders')}>
        <ProfileToggleRow
          icon="calendar-check-o"
          label={t('screens.notifications.bookingReminders')}
          description={t('screens.notifications.bookingRemindersDesc')}
          value={preferences.bookingReminders}
          onValueChange={(next) => setPreference('bookingReminders', next)}
        />
        <ProfileToggleRow
          icon="video-camera"
          label={t('screens.notifications.livePoojaAlerts')}
          description={t('screens.notifications.livePoojaAlertsDesc')}
          value={preferences.livePoojaAlerts}
          onValueChange={(next) => setPreference('livePoojaAlerts', next)}
          isLast
        />
      </ProfileSectionCard>

      <ProfileSectionCard
        title={t('screens.notifications.sectionFromUs')}
        caption={t('screens.notifications.footnote')}
      >
        <ProfileToggleRow
          icon="leaf"
          label={t('screens.notifications.ritualTips')}
          description={t('screens.notifications.ritualTipsDesc')}
          value={preferences.ritualTips}
          onValueChange={(next) => setPreference('ritualTips', next)}
        />
        <ProfileToggleRow
          icon="gift"
          label={t('screens.notifications.offers')}
          description={t('screens.notifications.offersDesc')}
          value={preferences.offers}
          onValueChange={(next) => setPreference('offers', next)}
          isLast
        />
      </ProfileSectionCard>
    </ProfileStackScrollLayout>
  );
}
