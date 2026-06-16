import { useCallback } from 'react';

import { useServiceAreaCapture } from '@/hooks/useServiceAreaCapture';

/**
 * Location gate orchestration: GPS → availability API → persist + enter app.
 */
export function useLocationSetup() {
  const capture = useServiceAreaCapture();

  const onUseCurrentLocation = useCallback(() => {
    void capture.captureFromGps();
  }, [capture]);

  return {
    onUseCurrentLocation,
    isBusy: capture.isBusy,
    phase: capture.phase,
    statusText: capture.statusText,
    error: capture.error,
  };
}
