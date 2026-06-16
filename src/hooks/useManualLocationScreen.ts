import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import {
  filterServiceAreasByQuery,
  POPULAR_SERVICE_AREA_IDS,
  resolveServiceAreaId,
  SUPPORTED_SERVICE_AREAS,
  type SupportedServiceArea,
} from '@/domain/serviceArea';
import { useAuth } from '@/context/AuthContext';
import { useServiceAreaCapture } from '@/hooks/useServiceAreaCapture';
import type { RootStackParamList } from '@/navigation/types';

export type ManualLocationAreaOption = {
  area: SupportedServiceArea;
  label: string;
  metroLabel: string;
};

export type PopularCityOption = {
  areaId: string;
  label: string;
};

/** Manual service-area picker — search, GPS refresh, popular metros, persist + dismiss. */
export function useManualLocationScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const capture = useServiceAreaCapture();
  const [searchQuery, setSearchQuery] = useState('');

  const currentAreaId = useMemo(
    () =>
      resolveServiceAreaId(
        user?.location?.latitude,
        user?.location?.longitude,
        user?.location?.serviceAreaName,
      ),
    [user?.location?.latitude, user?.location?.longitude, user?.location?.serviceAreaName],
  );

  const areas = useMemo<ManualLocationAreaOption[]>(
    () =>
      SUPPORTED_SERVICE_AREAS.map((area) => ({
        area,
        label: t(`screens.manualLocation.areas.${area.id}`),
        metroLabel: area.name,
      })),
    [t],
  );

  const filteredAreas = useMemo(
    () => filterServiceAreasByQuery(areas, searchQuery),
    [areas, searchQuery],
  );

  const popularCities = useMemo<PopularCityOption[]>(
    () =>
      POPULAR_SERVICE_AREA_IDS.map((areaId) => ({
        areaId,
        label: t(`screens.manualLocation.popularCities.${areaId}`),
      })),
    [t],
  );

  const selectedMetroLabel = useMemo(() => {
    if (!currentAreaId) {
      return null;
    }
    return areas.find((row) => row.area.id === currentAreaId)?.metroLabel ?? null;
  }, [areas, currentAreaId]);

  const isSearching = searchQuery.trim().length > 0;

  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onUseCurrentLocation = useCallback(async () => {
    if (capture.isBusy) {
      return;
    }
    const hadLocation = Boolean(user?.location?.label?.trim());
    const saved = await capture.captureFromGps();
    if (saved && hadLocation) {
      navigation.goBack();
    }
  }, [capture, navigation, user?.location?.label]);

  const onSelectArea = useCallback(
    async (areaId: string, displayLabel?: string) => {
      if (capture.isBusy) {
        return;
      }
      const option = areas.find((row) => row.area.id === areaId);
      if (!option) {
        return;
      }

      const hadLocation = Boolean(user?.location?.label?.trim());
      const saved = await capture.saveManualArea(
        option.area,
        displayLabel ?? option.label,
      );
      if (!saved) {
        return;
      }

      // First-time setup remounts the root stack to Main — no back navigation needed.
      if (hadLocation) {
        navigation.goBack();
      }
    },
    [areas, capture, navigation, user?.location?.label],
  );

  const onSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  return {
    areas,
    filteredAreas,
    popularCities,
    currentAreaId,
    currentLabel: user?.location?.label ?? null,
    selectedMetroLabel,
    searchQuery,
    isSearching,
    onBackPress,
    onUseCurrentLocation,
    onSelectArea,
    onSearchChange,
    isBusy: capture.isBusy,
    statusText: capture.statusText,
    error: capture.error,
  };
}
