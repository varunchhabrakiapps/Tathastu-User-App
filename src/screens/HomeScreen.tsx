import type { NativeBottomTabNavigationProp } from '@bottom-tabs/react-navigation';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { GreetingSection } from '@/components/molecules/GreetingSection';
import { HomeHeader } from '@/components/molecules/HomeHeader';
import { HomeContainer } from '@/components/templates/HomeContainer';
import { useHomeGreetingName } from '@/hooks/useHomeGreetingName';
import type { RootTabParamList } from '@/navigation/types';

export function HomeScreen() {
  const navigation = useNavigation<NativeBottomTabNavigationProp<RootTabParamList>>();
  const greetingName = useHomeGreetingName();

  const onProfilePress = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  return (
    <HomeContainer>
      <HomeHeader onProfilePress={onProfilePress} />
      <GreetingSection greetingName={greetingName} />
    </HomeContainer>
  );
}
