import type { NativeBottomTabNavigationProp } from '@bottom-tabs/react-navigation';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

import { GreetingBlock } from '@/components/molecules/GreetingBlock';
import { HomeHeader } from '@/components/molecules/HomeHeader';
import { HomeSearchBar } from '@/components/molecules/HomeSearchBar';
import { BrowseByMomentSection } from '@/components/organisms/BrowseByMomentSection';
import { BuildCustomRitualSection } from '@/components/organisms/BuildCustomRitualSection';
import { TestimonialsSection } from '@/components/organisms/TestimonialsSection';
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

type HomeFeedRow =
  | { id: 'greeting' }
  | { id: 'trending' }
  | { id: 'upcoming' }
  | { id: 'search' }
  | { id: 'browseMoments' }
  | { id: 'buildCustomRitual' }
  | { id: 'testimonials' };

const HOME_FEED_ROWS: HomeFeedRow[] = [
  { id: 'greeting' },
  { id: 'upcoming' },
  { id: 'search' },
  { id: 'trending' },
  { id: 'browseMoments' },
  { id: 'buildCustomRitual' },
  { id: 'testimonials' },
];

export function HomeScreen() {
  const navigation = useNavigation<HomeTabsNavigation>();
  const greetingName = useHomeGreetingName();
  const previewBooking = useUpcomingBookingPreview();
  const { openBookingsList, openBookingDetail } = useHomeBookingRoutes();
  const {
    openRitualDetail,
    openRitualList,
    openExploreForMoment,
    openBuildCustomRitual,
    openSearch,
  } = useHomeRitualRoutes();

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

      if (item.id === 'search') {
        return (
          <View style={layoutStyles.searchRail}>
            <HomeSearchBar onPress={openSearch} />
          </View>
        );
      }

      if (item.id === 'trending') {
        return <TrendingRitualsSection onViewAll={openRitualList} onOpenRitualDetail={openRitualDetail} />;
      }
      if (item.id === 'browseMoments') {
        return <BrowseByMomentSection onSelectMoment={openExploreForMoment} />;
      }
      if (item.id === 'buildCustomRitual') {
        return <BuildCustomRitualSection onOpenBuilder={openBuildCustomRitual} />;
      }
      if (item.id === 'testimonials') {
        return <TestimonialsSection />;
      }
      return null;
    },
    [
      greetingName,
      previewBooking,
      openBookingsList,
      openBookingDetail,
      openRitualDetail,
      openRitualList,
      openExploreForMoment,
      openBuildCustomRitual,
      openSearch,
    ],
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
          nestedScrollEnabled
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
  searchRail: {
    marginTop: 16,
    marginBottom: 4,
    paddingHorizontal: authScreen.insetX,
  },
  list: { flex: 1 },
  listContent: {
    flexGrow: 1,
    paddingBottom: authScreen.scrollBottom + authScreen.homeFeedExtraBottom,
  },
});
