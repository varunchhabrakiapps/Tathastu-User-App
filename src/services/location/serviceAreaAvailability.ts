import axios from 'axios';

import {
  matchSupportedServiceArea,
  type ServiceAreaCheckRequest,
  type ServiceAreaCheckResponse,
} from '@/domain/serviceArea';

const MOCK_API_DELAY_MS = 650;
const MOCK_API_BASE = 'https://api.tathastu.local/v1';

/**
 * Dummy availability endpoint — simulates a network round-trip then applies the
 * local supported-area filter. Swap the URL for a real backend when ready.
 */
export async function checkServiceAreaAvailability(
  request: ServiceAreaCheckRequest,
): Promise<ServiceAreaCheckResponse> {
  try {
    await axios.post(`${MOCK_API_BASE}/service-area/check`, request, {
      timeout: 5_000,
      validateStatus: () => true,
    });
  } catch {
    // Expected offline / unreachable host — fall through to local filter after delay.
  }

  await new Promise<void>((resolve) => {
    setTimeout(resolve, MOCK_API_DELAY_MS);
  });

  const matched = matchSupportedServiceArea(request.latitude, request.longitude);

  return {
    supported: matched !== null,
    areaName: matched?.name ?? null,
    areaId: matched?.id ?? null,
  };
}
