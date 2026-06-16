import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type {
  ProfileRowIconGlyph,
  ProfileRowIconTone,
} from '@/components/atoms/ProfileRowIcon';
import { useWishlist } from '@/context/WishlistContext';
import { useNotificationPreferences } from '@/hooks/useNotificationPreferences';
import { useProfileHubRoutes } from '@/hooks/useProfileHubRoutes';
import { useProfileHubSummary } from '@/hooks/useProfileHubSummary';
import { useSignOut } from '@/hooks/useSignOut';
import { useThemePreference } from '@/hooks/useThemePreference';
import { useUpcomingBookingPreview } from '@/hooks/useUpcomingBookingPreview';

export type ProfileHubRow = {
  key: string;
  icon: ProfileRowIconGlyph;
  label: string;
  value?: string;
  onPress?: () => void;
  accessibilityHint?: string;
  tone?: ProfileRowIconTone;
};

export type ProfileHubSection = {
  key: string;
  title: string;
  caption?: string;
  rows: ProfileHubRow[];
};

export type ProfileHubIdentity = {
  name: string;
  nameIsPlaceholder: boolean;
  avatarInitials: string;
  avatarAccessibilityLabel: string;
  mobileLine: string;
  supportingLine: string;
  editLabel: string;
  editAccessibilityLabel: string;
  onEdit: () => void;
};

export type ProfileHubModel = {
  identity: ProfileHubIdentity;
  sections: ProfileHubSection[];
};

/**
 * Render-ready Profile hub view-model — folds identity, saved/booking glances, preference state,
 * support links, and sign-out into structured sections so the screen stays declarative wiring only.
 */
export function useProfileHubModel(): ProfileHubModel {
  const { t } = useTranslation();
  const summary = useProfileHubSummary();
  const routes = useProfileHubRoutes();
  const requestSignOut = useSignOut();
  const { wishlistCount } = useWishlist();
  const nextBooking = useUpcomingBookingPreview();
  const { preference } = useThemePreference();
  const { anyEnabled } = useNotificationPreferences();

  const mobileLine = summary.mobileDisplayLine || t('screens.profile.mobilePlaceholder');

  const identity = useMemo<ProfileHubIdentity>(
    () => ({
      name: summary.hasName ? summary.displayName : t('screens.profile.namePrompt'),
      nameIsPlaceholder: !summary.hasName,
      avatarInitials: summary.avatarInitials,
      avatarAccessibilityLabel: t('screens.profile.avatarA11y'),
      mobileLine,
      supportingLine: t('screens.profile.identitySupportingLine'),
      editLabel: t('screens.profile.editAction'),
      editAccessibilityLabel: t('screens.profile.editA11y'),
      onEdit: routes.openEditProfile,
    }),
    [mobileLine, routes.openEditProfile, summary.avatarInitials, summary.displayName, summary.hasName, t],
  );

  const sections = useMemo<ProfileHubSection[]>(
    () => [
      {
        key: 'journey',
        title: t('screens.profile.sections.journey'),
        rows: [
          {
            key: 'saved',
            icon: 'heart-o',
            label: t('screens.profile.journey.saved'),
            value:
              wishlistCount > 0
                ? t('screens.profile.journey.savedValue', { count: wishlistCount })
                : t('screens.profile.journey.savedEmpty'),
            onPress: routes.openSavedRituals,
            accessibilityHint: t('screens.profile.journey.savedHint'),
          },
          {
            key: 'bookings',
            icon: 'calendar-o',
            label: t('screens.profile.journey.bookings'),
            value: nextBooking
              ? t('screens.profile.journey.bookingsNext', { ritual: nextBooking.ritualName })
              : t('screens.profile.journey.bookingsEmpty'),
            onPress: routes.openBookings,
            accessibilityHint: t('screens.profile.journey.bookingsHint'),
          },
        ],
      },
      {
        key: 'preferences',
        title: t('screens.profile.sections.preferences'),
        rows: [
          {
            key: 'notifications',
            icon: 'bell-o',
            label: t('screens.profile.preferences.notifications'),
            value: anyEnabled
              ? t('screens.profile.preferences.notificationsValueOn')
              : t('screens.profile.preferences.notificationsValueOff'),
            onPress: routes.openNotifications,
            accessibilityHint: t('screens.profile.preferences.notificationsHint'),
          },
          {
            key: 'appearance',
            icon: 'adjust',
            label: t('screens.profile.preferences.appearance'),
            value: t(`screens.profile.appearanceValue.${preference}`),
            onPress: routes.openSettings,
            accessibilityHint: t('screens.profile.preferences.appearanceHint'),
          },
        ],
      },
      {
        key: 'support',
        title: t('screens.profile.sections.support'),
        rows: [
          {
            key: 'help',
            icon: 'question-circle-o',
            label: t('screens.profile.support.help'),
            onPress: routes.openHelp,
            accessibilityHint: t('screens.profile.support.helpHint'),
          },
          {
            key: 'contact',
            icon: 'envelope-o',
            label: t('screens.profile.support.contact'),
            onPress: routes.openContactSupport,
            accessibilityHint: t('screens.profile.support.contactHint'),
          },
          {
            key: 'legal',
            icon: 'shield',
            label: t('screens.profile.support.legal'),
            onPress: routes.openLegalInfo,
            accessibilityHint: t('screens.profile.support.legalHint'),
          },
          {
            key: 'about',
            icon: 'info-circle',
            label: t('screens.profile.support.about'),
            onPress: routes.openAbout,
            accessibilityHint: t('screens.profile.support.aboutHint'),
          },
        ],
      },
      {
        key: 'account',
        title: t('screens.profile.sections.account'),
        caption: t('screens.profile.account.signedInAs', {
          mobile: summary.mobileDisplayLine || '—',
        }),
        rows: [
          {
            key: 'signOut',
            icon: 'sign-out',
            label: t('screens.profile.account.signOut'),
            onPress: requestSignOut,
            accessibilityHint: t('screens.profile.account.signOutHint'),
            tone: 'destructive',
          },
        ],
      },
    ],
    [
      anyEnabled,
      nextBooking,
      preference,
      requestSignOut,
      routes.openAbout,
      routes.openBookings,
      routes.openContactSupport,
      routes.openHelp,
      routes.openLegalInfo,
      routes.openNotifications,
      routes.openSavedRituals,
      routes.openSettings,
      summary.mobileDisplayLine,
      t,
      wishlistCount,
    ],
  );

  return { identity, sections };
}
