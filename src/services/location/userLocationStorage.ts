import AsyncStorage from '@react-native-async-storage/async-storage';

import type { UserLocation } from '@/domain/location';

const STORAGE_KEY = '@tathastu/user-location';

export async function loadUserLocation(): Promise<UserLocation | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return coerceUserLocation(raw);
  } catch {
    return null;
  }
}

export async function persistUserLocation(location: UserLocation): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(location));
}

export async function clearUserLocation(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

function coerceUserLocation(raw: string | null): UserLocation | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<UserLocation>;
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }
    if (typeof parsed.label !== 'string' || !parsed.label.trim()) {
      return null;
    }
    if (parsed.source !== 'gps' && parsed.source !== 'manual') {
      return null;
    }

    const location: UserLocation = {
      label: parsed.label.trim(),
      source: parsed.source,
    };

    if (typeof parsed.latitude === 'number' && Number.isFinite(parsed.latitude)) {
      location.latitude = parsed.latitude;
    }
    if (typeof parsed.longitude === 'number' && Number.isFinite(parsed.longitude)) {
      location.longitude = parsed.longitude;
    }
    if (typeof parsed.isServiceSupported === 'boolean') {
      location.isServiceSupported = parsed.isServiceSupported;
    }
    if (typeof parsed.serviceAreaName === 'string') {
      location.serviceAreaName = parsed.serviceAreaName;
    } else if (parsed.serviceAreaName === null) {
      location.serviceAreaName = null;
    }

    return location;
  } catch {
    return null;
  }
}
