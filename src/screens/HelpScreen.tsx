import { useTranslation } from 'react-i18next';

import { TabScreenScaffold } from '@/components/templates/TabScreenScaffold';

export function HelpScreen() {
  const { t } = useTranslation();

  return (
    <TabScreenScaffold
      title={t('screens.help.title')}
      subtitle={t('screens.help.subtitle')}
    />
  );
}
