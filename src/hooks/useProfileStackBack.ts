import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

/** Pop the profile nested stack — no-op when there is nothing to go back to. */
export function useProfileStackBack() {
  const navigation = useNavigation();

  return useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);
}
