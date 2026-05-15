import type { NativeBottomTabNavigationProp } from '@bottom-tabs/react-navigation';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { GreetingBlock } from '@/components/molecules/GreetingBlock';
import { HomeHeader } from '@/components/molecules/HomeHeader';
import { UpcomingBookingSection } from '@/components/organisms/UpcomingBookingSection';
import { HomeContainer } from '@/components/templates/HomeContainer';
import { useHomeBookingRoutes } from '@/hooks/useHomeBookingRoutes';
import { useHomeGreetingName } from '@/hooks/useHomeGreetingName';
import { useUpcomingBookingPreview } from '@/hooks/useUpcomingBookingPreview';
import type { RootTabParamList } from '@/navigation/types';
import { authScreen } from '@/theme/tokens';

type HomeTabsNavigation = NativeBottomTabNavigationProp<RootTabParamList>;

export function HomeScreen() {
  const navigation = useNavigation<HomeTabsNavigation>();
  const greetingName = useHomeGreetingName();
  const previewBooking = useUpcomingBookingPreview();
  const { openBookingsList, openBookingDetail } = useHomeBookingRoutes();

  const onProfilePress = useCallback(() => {
    navigation.navigate('Profile', { screen: 'ProfileHub' });
  }, [navigation]);

  return (
    <HomeContainer>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={layoutStyles.scrollContent}
      >
        <HomeHeader onProfilePress={onProfilePress} />
        <GreetingBlock greetingName={greetingName} />
        <UpcomingBookingSection
          booking={previewBooking}
          onViewAllBookings={openBookingsList}
          onOpenBookingDetail={openBookingDetail}
        />
      </ScrollView>
    </HomeContainer>
  );
}

const layoutStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: authScreen.scrollBottom,
  },
});
