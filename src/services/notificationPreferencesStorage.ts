import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tathastu/notification-preferences';

/** Toggle identities — extend alongside the Notifications screen + i18n copy. */
export type NotificationPreferenceKey =
  | 'bookingReminders'
  | 'livePoojaAlerts'
  | 'ritualTips'
  | 'offers';

export type NotificationPreferences = Record<NotificationPreferenceKey, boolean>;

/** Calm defaults — essential ritual reminders on, marketing-leaning nudges off. */
const DEFAULT_PREFERENCES: NotificationPreferences = {
  bookingReminders: true,
  livePoojaAlerts: true,
  ritualTips: false,
  offers: false,
};

export function defaultNotificationPreferences(): NotificationPreferences {
  return { ...DEFAULT_PREFERENCES };
}

export async function loadNotificationPreferences(): Promise<NotificationPreferences> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return coerceNotificationPreferences(raw);
  } catch {
    return defaultNotificationPreferences();
  }
}

export async function persistNotificationPreferences(
  preferences: NotificationPreferences,
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    return true;
  } catch {
    return false;
  }
}

/** Merge stored booleans over defaults so new keys (and corrupt blobs) degrade gracefully. */
function coerceNotificationPreferences(raw: string | null): NotificationPreferences {
  const base = defaultNotificationPreferences();
  if (!raw) {
    return base;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<Record<NotificationPreferenceKey, unknown>>;
    if (!parsed || typeof parsed !== 'object') {
      return base;
    }
    (Object.keys(base) as NotificationPreferenceKey[]).forEach((key) => {
      if (typeof parsed[key] === 'boolean') {
        base[key] = parsed[key] as boolean;
      }
    });
    return base;
  } catch {
    return base;
  }
}
