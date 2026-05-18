import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExploreSearchBar } from '@/components/molecules/ExploreSearchBar';
import { ExploreRitualCatalog } from '@/components/organisms/ExploreRitualCatalog';
import { HomeContainer } from '@/components/templates/HomeContainer';
import { useWishlist } from '@/context/WishlistContext';
import { isMomentCategoryId } from '@/domain/momentCategory';
import { useExploreRitualCatalog, type ExploreMomentFilter } from '@/hooks/useExploreRitualCatalog';
import { useExploreRitualRoutes } from '@/hooks/useExploreRitualRoutes';
import type { RootTabParamList } from '@/navigation/types';
import { authScreen } from '@/theme/tokens';

type ExploreRoute = RouteProp<RootTabParamList, 'Explore'>;

/** Ritual catalog — moment filters, wishlist hearts, thumb-friendly bottom search. */
export function ExploreScreen() {
  const { t } = useTranslation();
  const route = useRoute<ExploreRoute>();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const { wishlistCount } = useWishlist();
  const { openRitualDetail } = useExploreRitualRoutes();

  const {
    rituals,
    momentFilter,
    setMomentFilter,
    isEmpty,
    hasActiveFilters,
  } = useExploreRitualCatalog({
    initialMomentCategoryId: route.params?.momentCategoryId,
    query,
  });

  const headerDescription = useMemo(
    () => exploreDescriptionForRoute(t, route.params?.momentCategoryId, momentFilter),
    [t, route.params?.momentCategoryId, momentFilter],
  );

  const searchRailHeight = 56;
  const listBottomInset =
    authScreen.scrollBottom + insets.bottom + searchRailHeight + authScreen.homeFeedExtraBottom / 3;

  const onOpenRitualDetail = useCallback(
    (ritualId: string) => {
      openRitualDetail(ritualId);
    },
    [openRitualDetail],
  );

  return (
    <HomeContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="min-h-0 flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <View className="min-h-0 flex-1">
          <ExploreRitualCatalog
            headerDescription={headerDescription}
            rituals={rituals}
            momentFilter={momentFilter}
            onSelectMomentFilter={setMomentFilter}
            isEmpty={isEmpty}
            hasActiveFilters={hasActiveFilters}
            wishlistCount={wishlistCount}
            listBottomInset={listBottomInset}
            onOpenRitualDetail={onOpenRitualDetail}
          />
        </View>

        <View
          style={[styles.searchDock, { paddingBottom: Math.max(insets.bottom, 10) }]}
          accessibilityRole="none"
        >
          <ExploreSearchBar value={query} onChangeText={setQuery} />
        </View>
      </KeyboardAvoidingView>
    </HomeContainer>
  );
}

function exploreDescriptionForRoute(
  t: TFunction,
  routeMoment: string | undefined,
  activeFilter: ExploreMomentFilter,
): string {
  const momentKey =
    activeFilter !== 'all'
      ? activeFilter
      : routeMoment && isMomentCategoryId(routeMoment)
        ? routeMoment
        : null;

  if (momentKey) {
    const momentLabel = t(`screens.home.browseByMoment.moments.${momentKey}.headline`);
    return t('screens.explore.subtitleWithMoment', { moment: momentLabel });
  }
  return t('screens.explore.subtitle');
}

const styles = StyleSheet.create({
  searchDock: {
    paddingHorizontal: authScreen.insetX,
    paddingTop: 10,
  },
});
