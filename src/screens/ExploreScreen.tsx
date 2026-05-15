import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { RouteProp, useRoute } from '@react-navigation/native';

import { TabScreenScaffold } from '@/components/templates/TabScreenScaffold';
import { isMomentCategoryId } from '@/domain/momentCategory';
import type { RootTabParamList } from '@/navigation/types';

type ExploreRoute = RouteProp<RootTabParamList, 'Explore'>;

/** Discovery / editorial ritual journeys — scaffold until Explore is populated. */
export function ExploreScreen() {
  const { t } = useTranslation();
  const route = useRoute<ExploreRoute>();
  const subtitle = exploreSubtitleForRoute(t, route.params?.momentCategoryId);

  return <TabScreenScaffold title={t('screens.explore.title')} subtitle={subtitle} />;
}

function exploreSubtitleForRoute(t: TFunction, rawMoment: string | undefined): string {
  if (rawMoment && isMomentCategoryId(rawMoment)) {
    const momentLabel = t(`screens.home.browseByMoment.moments.${rawMoment}.headline`);
    return t('screens.explore.subtitleWithMoment', { moment: momentLabel });
  }
  return t('screens.explore.subtitle');
}
