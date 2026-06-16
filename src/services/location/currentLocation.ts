import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

import type { UserLocation } from '@/domain/location';

const LOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15_000,
  maximumAge: 10_000,
} as const;

if (Platform.OS === 'ios') {
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  });
}

async function requestAndroidLocationPermission(): Promise<boolean> {
  const fine = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const alreadyGranted = await PermissionsAndroid.check(fine);
  if (alreadyGranted) {
    return true;
  }
  const result = await PermissionsAndroid.request(fine);
  return result === PermissionsAndroid.RESULTS.GRANTED;
}

async function requestIosLocationPermission(): Promise<boolean> {
  return new Promise((resolve) => {
    Geolocation.requestAuthorization(
      () => resolve(true),
      () => resolve(false),
    );
  });
}

async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    return requestAndroidLocationPermission();
  }
  if (Platform.OS === 'ios') {
    return requestIosLocationPermission();
  }
  return false;
}

function readCurrentPosition(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          source: 'gps',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label: '',
        });
      },
      (error) => reject(error),
      LOCATION_OPTIONS,
    );
  });
}

/** Requests OS permission (when needed) and resolves the device coordinates. */
export async function fetchCurrentUserLocation(): Promise<UserLocation> {
  const permitted = await requestLocationPermission();
  if (!permitted) {
    throw new Error('PERMISSION_DENIED');
  }
  return readCurrentPosition();
}
