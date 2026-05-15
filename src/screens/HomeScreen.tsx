import type { NativeBottomTabNavigationProp } from '@bottom-tabs/react-navigation';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

import { GreetingBlock } from '@/components/molecules/GreetingBlock';
import { HomeHeader } from '@/components/molecules/HomeHeader';
import { TrendingRitualsSection } from '@/components/organisms/TrendingRitualsSection';
import { UpcomingBookingSection } from '@/components/organisms/UpcomingBookingSection';
import { HomeContainer } from '@/components/templates/HomeContainer';
import { useHomeBookingRoutes } from '@/hooks/useHomeBookingRoutes';
import { useHomeRitualRoutes } from '@/hooks/useHomeRitualRoutes';
import { useHomeGreetingName } from '@/hooks/useHomeGreetingName';
import { useUpcomingBookingPreview } from '@/hooks/useUpcomingBookingPreview';
import type { RootTabParamList } from '@/navigation/types';
import { authScreen } from '@/theme/tokens';

type HomeTabsNavigation = NativeBottomTabNavigationProp<RootTabParamList>;

type HomeFeedRow = { id: 'greeting' } | { id: 'trending' } | { id: 'upcoming' };

const HOME_FEED_ROWS: HomeFeedRow[] = [
  { id: 'greeting' },
  { id: 'upcoming' },
  { id: 'trending' },
];

export function HomeScreen() {
  const navigation = useNavigation<HomeTabsNavigation>();
  const greetingName = useHomeGreetingName();
  const previewBooking = useUpcomingBookingPreview();
  const { openBookingsList, openBookingDetail } = useHomeBookingRoutes();
  const { openRitualDetail, openRitualList } = useHomeRitualRoutes();

  const onProfilePress = useCallback(() => {
    navigation.navigate('Profile', { screen: 'ProfileHub' });
  }, [navigation]);

  const listExtraData = useMemo(
    () => ({ greetingName, bookingId: previewBooking?.id ?? null }),
    [greetingName, previewBooking?.id],
  );

  const renderItem = useCallback<ListRenderItem<HomeFeedRow>>(
    ({ item }) => {
      if (item.id === 'greeting') {
        return <GreetingBlock greetingName={greetingName} />;
      }
      if (item.id === 'upcoming') {
        return (
          <UpcomingBookingSection
            booking={previewBooking}
            onViewAllBookings={openBookingsList}
            onOpenBookingDetail={openBookingDetail}
          />
        );
      }

      if (item.id === 'trending') {
        return <TrendingRitualsSection onViewAll={openRitualList} onOpenRitualDetail={openRitualDetail} />;
      }
      return null
    },
    [greetingName, previewBooking, openBookingsList, openBookingDetail, openRitualDetail, openRitualList],
  );

  return (
    <HomeContainer>
      <View className="min-h-0 flex-1">
        <View style={layoutStyles.headerInset}>
          <HomeHeader onProfilePress={onProfilePress} />
        </View>
        <FlatList
          data={HOME_FEED_ROWS}
          extraData={listExtraData}
          keyExtractor={(row) => row.id}
          renderItem={renderItem}
          style={layoutStyles.list}
          contentContainerStyle={layoutStyles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      </View>
    </HomeContainer>
  );
}

const layoutStyles = StyleSheet.create({
  headerInset: {
    paddingHorizontal: authScreen.insetX,
  },
  list: { flex: 1 },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: authScreen.insetX,
    paddingBottom: authScreen.scrollBottom,
  },
});
