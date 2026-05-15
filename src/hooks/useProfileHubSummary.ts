import { useMemo } from 'react';

import { useAuth } from '@/context/AuthContext';
import { formatLoginMobileForDisplay } from '@/utils/mobile';
import { initialsFromDisplayName } from '@/utils/profileDisplay';

import { useHomeGreetingName } from './useHomeGreetingName';

export type ProfileHubSummary = {
  greetingName: string;
  avatarInitials: string;
  /** Empty when no subscriber digits are stored yet. */
  mobileDisplayLine: string;
};

/**
 * Read-only profile fragments for the hub — naming mirrors Home greeting until API-backed profiles ship.
 */
export function useProfileHubSummary(): ProfileHubSummary {
  const { user } = useAuth();
  const greetingName = useHomeGreetingName();

  return useMemo(() => {
    const digits = user?.mobileNumber ?? '';
    const mobileDisplayLine = digits ? formatLoginMobileForDisplay(digits) : '';

    return {
      greetingName,
      avatarInitials: initialsFromDisplayName(greetingName),
      mobileDisplayLine,
    };
  }, [greetingName, user?.mobileNumber]);
}
