import { useTranslation } from 'react-i18next';

import { TabScreenScaffold } from '@/components/templates/TabScreenScaffold';

/** Discovery / editorial ritual journeys — scaffold until Explore is populated. */
export function ExploreScreen() {
  const { t } = useTranslation();

  return (
    <TabScreenScaffold
      title={t('screens.explore.title')}
      subtitle={t('screens.explore.subtitle')}
    />
  );
}
