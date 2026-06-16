import { LocationSetupScrollBody } from '@/components/organisms/LocationSetupScrollBody';
import { AuthScreen } from '@/components/templates/AuthScreen';
import { useLocationSetupScreen } from '@/hooks/useLocationSetupScreen';

export function LocationSetupScreen() {
  const vm = useLocationSetupScreen();

  return (
    <AuthScreen>
      <LocationSetupScrollBody
        onUseCurrentLocation={vm.onUseCurrentLocation}
        onEnterManualLocation={vm.onEnterManualLocation}
        isBusy={vm.isBusy}
        statusText={vm.statusText}
        error={vm.error}
      />
    </AuthScreen>
  );
}
