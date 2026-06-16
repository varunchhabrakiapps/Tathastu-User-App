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

/** City nicknames and neighbourhood tokens for manual location search. */
export const SERVICE_AREA_SEARCH_ALIASES: Record<string, readonly string[]> = {
  'delhi-ncr': ['gurgaon', 'gurugram', 'ncr', 'delhi', 'noida', 'sector'],
  bengaluru: ['bangalore', 'bengaluru', 'indiranagar', 'blr'],
  mumbai: ['mumbai', 'bandra', 'bombay'],
  pune: ['pune', 'koregaon'],
};

/** Featured metros on the manual picker — order controls chip layout. */
export const POPULAR_SERVICE_AREA_IDS = [
  'delhi-ncr',
  'bengaluru',
  'mumbai',
  'pune',
] as const satisfies readonly string[];

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

/** Representative coordinates for a manual area pick (centroid of launch bounds). */
export function serviceAreaCenter(area: SupportedServiceArea): {
  latitude: number;
  longitude: number;
} {
  return {
    latitude: (area.bounds.latitudeMin + area.bounds.latitudeMax) / 2,
    longitude: (area.bounds.longitudeMin + area.bounds.longitudeMax) / 2,
  };
}

/** Best-effort id for highlighting the user's current service area in pickers. */
export function resolveServiceAreaId(
  latitude: number | undefined,
  longitude: number | undefined,
  serviceAreaName: string | null | undefined,
): string | null {
  if (latitude !== undefined && longitude !== undefined) {
    return matchSupportedServiceArea(latitude, longitude)?.id ?? null;
  }
  if (serviceAreaName) {
    return (
      SUPPORTED_SERVICE_AREAS.find((area) => area.name === serviceAreaName)?.id ?? null
    );
  }
  return null;
}

type SearchableArea = {
  area: SupportedServiceArea;
  label: string;
  metroLabel: string;
};

/** Case-insensitive filter for manual location search (label, metro, aliases). */
export function filterServiceAreasByQuery<T extends SearchableArea>(
  areas: readonly T[],
  query: string,
): T[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [...areas];
  }

  return areas.filter((option) => {
    const tokens = [
      option.label,
      option.metroLabel,
      option.area.name,
      ...(SERVICE_AREA_SEARCH_ALIASES[option.area.id] ?? []),
    ];
    return tokens.some((token) => token.toLowerCase().includes(normalized));
  });
}
