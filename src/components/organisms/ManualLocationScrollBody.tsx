import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { RitualText } from '@/components/atoms/RitualText';
import { SectionEyebrow } from '@/components/atoms/SectionEyebrow';
import { LocationSearchBar } from '@/components/molecules/LocationSearchBar';
import { PopularCityChip } from '@/components/molecules/PopularCityChip';
import { ProfileSectionCard } from '@/components/molecules/ProfileSectionCard';
import { SelectedLocationCard } from '@/components/molecules/SelectedLocationCard';
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
  currentLabel: string | null;
  selectedMetroLabel: string | null;
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
  currentLabel,
  selectedMetroLabel,
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
  const { inkMuted, warmAccent } = useRitualSemanticColors();

  const errorText =
    error === 'permissionDenied'
      ? t('screens.locationSetup.errorPermissionDenied')
      : error === 'fetchFailed'
        ? t('screens.locationSetup.errorFetchFailed')
        : error === 'checkFailed'
          ? t('screens.locationSetup.errorCheckFailed')
          : null;

  return (
    <View className="gap-7 pb-10">
      <View className="gap-1.5">
        <RitualText accessibilityRole="header" className="text-login-display font-medium">
          {t('screens.manualLocation.title')}
        </RitualText>
        <RitualText variant="inkMuted" className="text-login-body leading-relaxed">
          {t('screens.manualLocation.subtitle')}
        </RitualText>
      </View>

      <View className="gap-3">
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

      {currentLabel && !isSearching ? (
        <SelectedLocationCard label={currentLabel} metroLabel={selectedMetroLabel} />
      ) : null}

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
      <View className="items-center gap-2 px-2 py-6">
        <RitualText variant="inkMuted" className="text-center text-login-body">
          {t('screens.manualLocation.noResults')}
        </RitualText>
      </View>
    );
  }

  return (
    <ProfileSectionCard title={t('screens.manualLocation.searchResultsTitle')}>
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
    </ProfileSectionCard>
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
    <View className="gap-2">
      <SectionEyebrow label={t('screens.manualLocation.popularCitiesTitle')} />
      <View className="flex-row flex-wrap gap-2.5">
        {popularCities.map((city) => (
          <PopularCityChip
            key={city.areaId}
            label={city.label}
            selected={city.areaId === currentAreaId}
            disabled={isBusy}
            onPress={() => onSelectArea(city.areaId, city.label)}
            accessibilityLabel={t('screens.manualLocation.selectAreaA11y', {
              area: city.label,
            })}
          />
        ))}
      </View>
      <RitualText variant="inkMuted" className="px-0.5 text-login-label leading-snug">
        {t('screens.manualLocation.popularCitiesCaption')}
      </RitualText>
    </View>
  );
});
