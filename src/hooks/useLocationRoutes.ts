import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

import type { RootStackParamList } from '@/navigation/types';

function findRootStack(
  navigation: NavigationProp<ParamListBase>,
): StackNavigationProp<RootStackParamList> | undefined {
  let current: NavigationProp<ParamListBase> | undefined = navigation;

  while (current) {
    const routeNames = current.getState()?.routeNames ?? [];
    if (routeNames.includes('ManualLocation') || routeNames.includes('Main')) {
      return current as StackNavigationProp<RootStackParamList>;
    }
    current = current.getParent() as NavigationProp<ParamListBase> | undefined;
  }

  return undefined;
}

/** Root-stack hops for service-area flows from tabs or nested profile screens. */
export function useLocationRoutes() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const openManualLocation = useCallback(() => {
    findRootStack(navigation)?.navigate('ManualLocation');
  }, [navigation]);

  return { openManualLocation };
}
