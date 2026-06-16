import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { RootStackParamList } from '@/navigation/types';

/** Manual location screen — placeholder wiring until city picker ships. */
export function useManualLocationScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return { onBackPress };
}
