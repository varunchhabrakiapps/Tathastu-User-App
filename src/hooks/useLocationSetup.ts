import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { UserLocation } from '@/domain/location';
import { useAuth } from '@/context/AuthContext';
import { fetchCurrentUserLocation } from '@/services/location/currentLocation';
import { checkServiceAreaAvailability } from '@/services/location/serviceAreaAvailability';

type LocationSetupError = 'permissionDenied' | 'fetchFailed' | 'checkFailed' | null;
type LocationSetupPhase = 'idle' | 'fetching' | 'checking';

/**
 * Location gate orchestration: GPS → availability API → persist + enter app.
 */
export function useLocationSetup() {
  const { t } = useTranslation();
  const { setLocation } = useAuth();
  const [phase, setPhase] = useState<LocationSetupPhase>('idle');
  const [error, setError] = useState<LocationSetupError>(null);

  const onUseCurrentLocation = useCallback(async () => {
    if (phase !== 'idle') {
      return;
    }
    setError(null);
    setPhase('fetching');
    try {
      const location = await fetchCurrentUserLocation();
      if (location.latitude === undefined || location.longitude === undefined) {
        setError('fetchFailed');
        return;
      }

      setPhase('checking');
      let availability;
      try {
        availability = await checkServiceAreaAvailability({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      } catch {
        setError('checkFailed');
        return;
      }

      const label = availability.supported
        ? (availability.areaName ?? t('screens.locationSetup.gpsLocationLabel'))
        : t('screens.locationSetup.gpsLocationLabel');

      const nextLocation: UserLocation = {
        ...location,
        label,
        isServiceSupported: availability.supported,
        serviceAreaName: availability.areaName,
      };
      await setLocation(nextLocation);
    } catch (err) {
      if (err instanceof Error && err.message === 'PERMISSION_DENIED') {
        setError('permissionDenied');
      } else {
        setError('fetchFailed');
      }
    } finally {
      setPhase('idle');
    }
  }, [phase, setLocation, t]);

  const isBusy = phase !== 'idle';
  const statusText =
    phase === 'fetching'
      ? t('screens.locationSetup.statusFetching')
      : phase === 'checking'
        ? t('screens.locationSetup.statusChecking')
        : null;

  return {
    onUseCurrentLocation,
    isBusy,
    phase,
    statusText,
    error,
  };
}
