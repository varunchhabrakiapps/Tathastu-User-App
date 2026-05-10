import { useTranslation } from 'react-i18next';

import { TabScreenScaffold } from '@/components/templates/TabScreenScaffold';

export function BookingsScreen() {
  const { t } = useTranslation();

  return (
    <TabScreenScaffold
      title={t('screens.bookings.title')}
      subtitle={t('screens.bookings.subtitle')}
    />
  );
}
