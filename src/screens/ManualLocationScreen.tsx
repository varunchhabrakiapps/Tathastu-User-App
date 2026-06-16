import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ManualLocationScrollBody } from '@/components/organisms/ManualLocationScrollBody';
import { AuthScreen } from '@/components/templates/AuthScreen';
import { useManualLocationScreen } from '@/hooks/useManualLocationScreen';

/** Service-area picker — search, GPS refresh, or choose a supported neighbourhood. */
export function ManualLocationScreen() {
  const { t } = useTranslation();
  const vm = useManualLocationScreen();

  return (
    <AuthScreen
      hasBackHeader
      onBackPress={vm.onBackPress}
      backAccessibilityLabel={t('screens.manualLocation.backA11y')}
    >
      <View className="px-5 pt-2">
        <ManualLocationScrollBody
          filteredAreas={vm.filteredAreas}
          popularCities={vm.popularCities}
          currentAreaId={vm.currentAreaId}
          currentLabel={vm.currentLabel}
          selectedMetroLabel={vm.selectedMetroLabel}
          searchQuery={vm.searchQuery}
          isSearching={vm.isSearching}
          isBusy={vm.isBusy}
          statusText={vm.statusText}
          error={vm.error}
          onSearchChange={vm.onSearchChange}
          onUseCurrentLocation={vm.onUseCurrentLocation}
          onSelectArea={vm.onSelectArea}
        />
      </View>
    </AuthScreen>
  );
}
