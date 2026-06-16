import { useMemo } from 'react';

import { useAuth } from '@/context/AuthContext';
import { formatLoginMobileForDisplay } from '@/utils/mobile';
import { initialsFromDisplayName } from '@/utils/profileDisplay';

import { useHomeGreetingName } from './useHomeGreetingName';

export type ProfileHubSummary = {
  /** Saved display name, or the warm Home fallback ("Friend") when none is set yet. */
  greetingName: string;
  /** Trimmed display name as stored ('' when the member hasn't added one). */
  displayName: string;
  /** True once the member has saved a real display name. */
  hasName: boolean;
  /** Initials from the saved name, or a neutral dot when none is set. */
  avatarInitials: string;
  /** Empty when no subscriber digits are stored yet. */
  mobileDisplayLine: string;
};

/**
 * Read-only identity fragments for the hub — naming mirrors Home greeting until API-backed profiles ship.
 */
export function useProfileHubSummary(): ProfileHubSummary {
  const { user } = useAuth();
  const greetingName = useHomeGreetingName();

  return useMemo(() => {
    const displayName = user?.displayName?.trim() ?? '';
    const hasName = displayName.length > 0;
    const digits = user?.mobileNumber ?? '';
    const mobileDisplayLine = digits ? formatLoginMobileForDisplay(digits) : '';

    return {
      greetingName,
      displayName,
      hasName,
      avatarInitials: initialsFromDisplayName(displayName),
      mobileDisplayLine,
    };
  }, [greetingName, user?.displayName, user?.mobileNumber]);
}
