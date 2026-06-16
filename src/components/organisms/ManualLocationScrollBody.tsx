import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { RitualText } from '@/components/atoms/RitualText';
import { LocationAreasPanel } from '@/components/molecules/LocationAreasPanel';
import { LocationSearchBar } from '@/components/molecules/LocationSearchBar';
import { ServiceAreaOptionRow } from '@/components/molecules/ServiceAreaOptionRow';
import { UseCurrentLocationButton } from '@/components/molecules/UseCurrentLocationButton';
import type {
  ManualLocationAreaOption,
  PopularCityOption,
} from '@/hooks/useManualLocationScreen';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';

type Props = {
  filteredAreas: ManualLocationAreaOption[];
  popularCities: PopularCityOption[];
  currentAreaId: string | null;
  searchQuery: string;
  isSearching: boolean;
  isBusy: boolean;
  statusText: string | null;
  error: 'permissionDenied' | 'fetchFailed' | 'checkFailed' | null;
  onSearchChange: (text: string) => void;
  onUseCurrentLocation: () => void;
  onSelectArea: (areaId: string, displayLabel?: string) => void;
};

export const ManualLocationScrollBody = memo(function ManualLocationScrollBody({
  filteredAreas,
  popularCities,
  currentAreaId,
  searchQuery,
  isSearching,
  isBusy,
  statusText,
  error,
  onSearchChange,
  onUseCurrentLocation,
  onSelectArea,
}: Props) {
  const { t } = useTranslation();
  const { inkMuted } = useRitualSemanticColors();

  const errorText =
    error === 'permissionDenied'
      ? t('screens.locationSetup.errorPermissionDenied')
      : error === 'fetchFailed'
        ? t('screens.locationSetup.errorFetchFailed')
        : error === 'checkFailed'
          ? t('screens.locationSetup.errorCheckFailed')
          : null;

  return (
    <View className="gap-5 pb-10">
      <View className="gap-1">
        <RitualText accessibilityRole="header" className="text-login-display font-medium">
          {t('screens.manualLocation.title')}
        </RitualText>
        <RitualText variant="inkMuted" className="text-login-body leading-snug">
          {t('screens.manualLocation.subtitle')}
        </RitualText>
      </View>

      <View className="gap-2">
        <LocationSearchBar value={searchQuery} onChangeText={onSearchChange} />

        <UseCurrentLocationButton
          label={t('screens.manualLocation.useCurrentLocation')}
          onPress={onUseCurrentLocation}
          loading={isBusy}
          disabled={isBusy}
          accessibilityLabel={t('screens.manualLocation.useCurrentLocationA11y')}
          accessibilityHint={t('screens.locationSetup.permissionHint')}
        />

        {statusText ? (
          <Text
            accessibilityLiveRegion="polite"
            style={{ color: inkMuted }}
            className="text-center text-login-metadata"
          >
            {statusText}
          </Text>
        ) : null}

        {errorText ? (
          <RitualText variant="destructive" accessibilityRole="alert" className="text-center text-login-body">
            {errorText}
          </RitualText>
        ) : null}
      </View>

      {isSearching ? (
        <SearchResultsSection
          filteredAreas={filteredAreas}
          currentAreaId={currentAreaId}
          isBusy={isBusy}
          onSelectArea={onSelectArea}
        />
      ) : (
        <PopularCitiesSection
          popularCities={popularCities}
          currentAreaId={currentAreaId}
          isBusy={isBusy}
          onSelectArea={onSelectArea}
        />
      )}

      <RitualText variant="inkMuted" className="px-1 text-center text-login-legal leading-5">
        {t('screens.manualLocation.footnote')}
      </RitualText>
    </View>
  );
});

type SearchResultsProps = {
  filteredAreas: ManualLocationAreaOption[];
  currentAreaId: string | null;
  isBusy: boolean;
  onSelectArea: (areaId: string, displayLabel?: string) => void;
};

const SearchResultsSection = memo(function SearchResultsSection({
  filteredAreas,
  currentAreaId,
  isBusy,
  onSelectArea,
}: SearchResultsProps) {
  const { t } = useTranslation();

  if (filteredAreas.length === 0) {
    return (
      <View className="items-center px-2 py-5">
        <RitualText variant="inkMuted" className="text-center text-login-body">
          {t('screens.manualLocation.noResults')}
        </RitualText>
      </View>
    );
  }

  return (
    <LocationAreasPanel>
      {filteredAreas.map((row, index) => (
        <ServiceAreaOptionRow
          key={row.area.id}
          label={row.label}
          metroLabel={row.metroLabel}
          selected={row.area.id === currentAreaId}
          disabled={isBusy}
          isLast={index === filteredAreas.length - 1}
          onPress={() => onSelectArea(row.area.id)}
          accessibilityLabel={t('screens.manualLocation.selectAreaA11y', {
            area: row.label,
          })}
        />
      ))}
    </LocationAreasPanel>
  );
});

type PopularCitiesProps = {
  popularCities: PopularCityOption[];
  currentAreaId: string | null;
  isBusy: boolean;
  onSelectArea: (areaId: string, displayLabel?: string) => void;
};

const PopularCitiesSection = memo(function PopularCitiesSection({
  popularCities,
  currentAreaId,
  isBusy,
  onSelectArea,
}: PopularCitiesProps) {
  const { t } = useTranslation();

  return (
    <LocationAreasPanel>
      {popularCities.map((city, index) => (
        <ServiceAreaOptionRow
          key={city.areaId}
          label={city.label}
          metroLabel=""
          compact
          selected={city.areaId === currentAreaId}
          disabled={isBusy}
          isLast={index === popularCities.length - 1}
          onPress={() => onSelectArea(city.areaId, city.label)}
          accessibilityLabel={t('screens.manualLocation.selectAreaA11y', {
            area: city.label,
          })}
        />
      ))}
    </LocationAreasPanel>
  );
});
