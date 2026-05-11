import { useEffect, useState } from 'react';

import { getOnboardingCompleted } from '@/services/onboardingStorage';

/**
 * Loads persisted onboarding completion before rendering auth routes.
 * Used by the root navigator only — do not call `useNavigation` here.
 */
export function useOnboardingHydration() {
  const [isReady, setIsReady] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const completed = await getOnboardingCompleted();
      if (!cancelled) {
        setHasCompletedOnboarding(completed);
        setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { isReady, hasCompletedOnboarding };
}
