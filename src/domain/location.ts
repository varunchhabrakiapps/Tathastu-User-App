/** User-selected service area captured during sign-in. */
export type UserLocation = {
  label: string;
  latitude?: number;
  longitude?: number;
  source: 'gps' | 'manual';
  /** Result of the service-area availability check. */
  isServiceSupported?: boolean;
  /** Launch area name when supported (e.g. Mumbai). */
  serviceAreaName?: string | null;
};

export function hasUserLocation(
  location: UserLocation | null | undefined,
): boolean {
  return Boolean(location?.label?.trim());
}
