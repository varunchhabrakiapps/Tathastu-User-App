import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useLocationSetup } from '@/hooks/useLocationSetup';
import type { RootStackParamList } from '@/navigation/types';

/** Wires location capture to navigation (screen-level orchestration). */
export function useLocationSetupScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setup = useLocationSetup();

  const onEnterManualLocation = useCallback(() => {
    if (setup.isBusy) {
      return;
    }
    navigation.navigate('ManualLocation');
  }, [navigation, setup.isBusy]);

  return {
    onEnterManualLocation,
    ...setup,
  };
}
