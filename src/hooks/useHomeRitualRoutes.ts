import type { NativeBottomTabNavigationProp } from '@bottom-tabs/react-navigation';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

import type { MomentCategoryId } from '@/domain/momentCategory';
import type { RootStackParamList, RootTabParamList } from '@/navigation/types';

type TabsNav = NativeBottomTabNavigationProp<RootTabParamList>;

function getRootNavigator(navigation: TabsNav): StackNavigationProp<RootStackParamList> | undefined {
  return navigation.getParent<StackNavigationProp<RootStackParamList>>();
}

/** Ritual discovery routes from Home (tabs + root stack detail). */
export function useHomeRitualRoutes() {
  const tabNavigation = useNavigation<TabsNav>();

  const openRitualDetail = useCallback(
    (ritualId: string) => {
      const rootNavigation = getRootNavigator(tabNavigation);
      rootNavigation?.navigate('RitualDetail', { ritualId });
    },
    [tabNavigation],
  );

  const openRitualList = useCallback(() => {
    tabNavigation.navigate('Explore', {});
  }, [tabNavigation]);

  const openExploreForMoment = useCallback(
    (momentCategoryId: MomentCategoryId) => {
      tabNavigation.navigate('Explore', { momentCategoryId });
    },
    [tabNavigation],
  );

  const openBuildCustomRitual = useCallback(() => {
    const rootNavigation = getRootNavigator(tabNavigation);
    rootNavigation?.navigate('BuildCustomRitual');
  }, [tabNavigation]);

  const openSearch = useCallback(() => {
    const rootNavigation = getRootNavigator(tabNavigation);
    rootNavigation?.navigate('Search');
  }, [tabNavigation]);

  return {
    openRitualDetail,
    openRitualList,
    openExploreForMoment,
    openBuildCustomRitual,
    openSearch,
  };
}
