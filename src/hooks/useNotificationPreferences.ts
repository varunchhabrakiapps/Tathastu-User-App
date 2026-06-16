import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  defaultNotificationPreferences,
  loadNotificationPreferences,
  persistNotificationPreferences,
  type NotificationPreferenceKey,
  type NotificationPreferences,
} from '@/services/notificationPreferencesStorage';

export type UseNotificationPreferences = {
  /** AsyncStorage hydration finished. */
  isReady: boolean;
  preferences: NotificationPreferences;
  setPreference: (key: NotificationPreferenceKey, value: boolean) => void;
  /** True when at least one channel is enabled — drives the hub "On / Muted" glance. */
  anyEnabled: boolean;
};

/**
 * On-device notification preferences — optimistic local writes that persist immediately.
 * Swap the storage service for an API sync when push registration lands.
 */
export function useNotificationPreferences(): UseNotificationPreferences {
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    defaultNotificationPreferences,
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const loaded = await loadNotificationPreferences();
      if (!cancelled) {
        setPreferences(loaded);
        setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setPreference = useCallback((key: NotificationPreferenceKey, value: boolean) => {
    setPreferences((prev) => {
      const next = { ...prev, [key]: value };
      void persistNotificationPreferences(next);
      return next;
    });
  }, []);

  const anyEnabled = useMemo(() => Object.values(preferences).some(Boolean), [preferences]);

  return { isReady, preferences, setPreference, anyEnabled };
}
