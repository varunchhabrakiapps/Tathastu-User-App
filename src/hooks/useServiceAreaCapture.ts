import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { UserLocation } from '@/domain/location';
import {
  serviceAreaCenter,
  type SupportedServiceArea,
} from '@/domain/serviceArea';
import { useAuth } from '@/context/AuthContext';
import { fetchCurrentUserLocation } from '@/services/location/currentLocation';
import { checkServiceAreaAvailability } from '@/services/location/serviceAreaAvailability';

type ServiceAreaCaptureError = 'permissionDenied' | 'fetchFailed' | 'checkFailed' | null;
type ServiceAreaCapturePhase = 'idle' | 'fetching' | 'checking';

/**
 * Shared GPS + manual service-area persistence — onboarding gate and in-app picker.
 */
export function useServiceAreaCapture() {
  const { t } = useTranslation();
  const { setLocation } = useAuth();
  const [phase, setPhase] = useState<ServiceAreaCapturePhase>('idle');
  const [error, setError] = useState<ServiceAreaCaptureError>(null);

  const saveManualArea = useCallback(
    async (area: SupportedServiceArea, label: string): Promise<boolean> => {
      const { latitude, longitude } = serviceAreaCenter(area);
      const nextLocation: UserLocation = {
        label,
        latitude,
        longitude,
        source: 'manual',
        isServiceSupported: true,
        serviceAreaName: area.name,
      };
      return setLocation(nextLocation);
    },
    [setLocation],
  );

  const captureFromGps = useCallback(async (): Promise<boolean> => {
    if (phase !== 'idle') {
      return false;
    }
    setError(null);
    setPhase('fetching');
    try {
      const location = await fetchCurrentUserLocation();
      if (location.latitude === undefined || location.longitude === undefined) {
        setError('fetchFailed');
        return false;
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
        return false;
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
      return true;
    } catch (err) {
      if (err instanceof Error && err.message === 'PERMISSION_DENIED') {
        setError('permissionDenied');
      } else {
        setError('fetchFailed');
      }
      return false;
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
    captureFromGps,
    saveManualArea,
    isBusy,
    phase,
    statusText,
    error,
  };
}
