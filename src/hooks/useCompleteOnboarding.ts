import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';

import type { RootStackParamList } from '@/navigation/types';
import { setOnboardingCompleted } from '@/services/onboardingStorage';

/**
 * Persists onboarding completion and replaces the stack with Login.
 * Intended for the onboarding route only (requires stack navigation context).
 */
export function useCompleteOnboarding() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isCompleting, setIsCompleting] = useState(false);

  const completeOnboarding = useCallback(() => {
    setIsCompleting(true);
    (async () => {
      try {
        await setOnboardingCompleted();
        navigation.replace('Login');
      } catch {
        setIsCompleting(false);
      }
    })();
  }, [navigation]);

  return { completeOnboarding, isCompleting };
}
