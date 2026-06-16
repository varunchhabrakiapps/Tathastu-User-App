/** Bounding box for a launch service area (dummy filter until a real API ships). */
export type ServiceAreaBounds = {
  latitudeMin: number;
  latitudeMax: number;
  longitudeMin: number;
  longitudeMax: number;
};

export type SupportedServiceArea = {
  id: string;
  name: string;
  bounds: ServiceAreaBounds;
};

/** Currently supported metros — mirrored in {@link checkServiceAreaAvailability}. */
export const SUPPORTED_SERVICE_AREAS: readonly SupportedServiceArea[] = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    bounds: {
      latitudeMin: 18.89,
      latitudeMax: 19.27,
      longitudeMin: 72.77,
      longitudeMax: 73.05,
    },
  },
  {
    id: 'pune',
    name: 'Pune',
    bounds: {
      latitudeMin: 18.44,
      latitudeMax: 18.64,
      longitudeMin: 73.75,
      longitudeMax: 73.95,
    },
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    bounds: {
      latitudeMin: 12.85,
      latitudeMax: 13.15,
      longitudeMin: 77.45,
      longitudeMax: 77.75,
    },
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    bounds: {
      latitudeMin: 28.4,
      latitudeMax: 28.85,
      longitudeMin: 76.95,
      longitudeMax: 77.45,
    },
  },
] as const;

export type ServiceAreaCheckRequest = {
  latitude: number;
  longitude: number;
};

export type ServiceAreaCheckResponse = {
  supported: boolean;
  /** Matched launch area when supported; null otherwise. */
  areaName: string | null;
  areaId: string | null;
};

function isInsideBounds(
  latitude: number,
  longitude: number,
  bounds: ServiceAreaBounds,
): boolean {
  return (
    latitude >= bounds.latitudeMin &&
    latitude <= bounds.latitudeMax &&
    longitude >= bounds.longitudeMin &&
    longitude <= bounds.longitudeMax
  );
}

/** Pure filter — shared by the dummy API and tests. */
export function matchSupportedServiceArea(
  latitude: number,
  longitude: number,
): SupportedServiceArea | null {
  return (
    SUPPORTED_SERVICE_AREAS.find((area) =>
      isInsideBounds(latitude, longitude, area.bounds),
    ) ?? null
  );
}
