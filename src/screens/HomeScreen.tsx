import { useTranslation } from 'react-i18next';

import { TabScreenScaffold } from '@/components/templates/TabScreenScaffold';

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <TabScreenScaffold
      title={t('screens.home.title')}
      subtitle={t('screens.home.subtitle')}
    />
  );
}
