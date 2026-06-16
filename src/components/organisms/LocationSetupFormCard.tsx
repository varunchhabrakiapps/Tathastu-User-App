import { memo, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';

import { RitualPrimaryButton } from '@/components/atoms/RitualPrimaryButton';
import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { hexToRgba } from '@/theme/colorUtils';

type Props = {
  onUseCurrentLocation: () => void;
  onEnterManualLocation: () => void;
  isBusy: boolean;
  statusText: string | null;
  error: 'permissionDenied' | 'fetchFailed' | 'checkFailed' | null;
};

export const LocationSetupFormCard = memo(function LocationSetupFormCard({
  onUseCurrentLocation,
  onEnterManualLocation,
  isBusy,
  statusText,
  error,
}: Props) {
  const { t } = useTranslation();
  const { ink, inkMuted, warmAccent } = useRitualSemanticColors();

  const errorText =
    error === 'permissionDenied'
      ? t('screens.locationSetup.errorPermissionDenied')
      : error === 'fetchFailed'
        ? t('screens.locationSetup.errorFetchFailed')
        : error === 'checkFailed'
          ? t('screens.locationSetup.errorCheckFailed')
          : null;

  return (
    <View className="gap-4">
      <LoginAuthSurface>
        <View className="gap-4 px-4">
          <RitualPrimaryButton
            label={t('screens.locationSetup.useCurrentLocation')}
            iconName="crosshairs"
            onPress={onUseCurrentLocation}
            loading={isBusy}
            disabled={isBusy}
            accessibilityLabel={t('screens.locationSetup.useCurrentLocationA11y')}
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

          <View className="flex-row items-center gap-3">
            <View className="h-px flex-1 opacity-40" style={{ backgroundColor: inkMuted }} />
            <Text style={{ color: inkMuted }} className="text-login-metadata font-medium uppercase">
              {t('screens.locationSetup.orDivider')}
            </Text>
            <View className="h-px flex-1 opacity-40" style={{ backgroundColor: inkMuted }} />
          </View>

          <ManualLocationLink
            label={t('screens.locationSetup.enterManually')}
            iconName="map-o"
            onPress={onEnterManualLocation}
            disabled={isBusy}
            accessibilityLabel={t('screens.locationSetup.enterManuallyA11y')}
          />

          {errorText ? (
            <Text accessibilityRole="alert" style={{ color: warmAccent }} className="text-login-body">
              {errorText}
            </Text>
          ) : null}
        </View>
      </LoginAuthSurface>

      <Text
        accessibilityRole="text"
        style={{ color: inkMuted }}
        className="px-1 text-center text-login-legal leading-5"
      >
        {t('screens.locationSetup.permissionHint')}
      </Text>
    </View>
  );
});

type ManualLocationLinkProps = {
  label: string;
  iconName: ComponentProps<typeof FontAwesome>['name'];
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
};

function ManualLocationLink({
  label,
  iconName,
  onPress,
  disabled,
  accessibilityLabel,
}: ManualLocationLinkProps) {
  const { ink, inkMuted, primary } = useRitualSemanticColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: Boolean(disabled) }}
      className={disabled ? 'opacity-45' : ''}
    >
      <View className="flex-row items-center justify-center gap-2 py-1">
        <FontAwesome
          name={iconName}
          size={14}
          color={hexToRgba(primary, 0.92)}
          importantForAccessibility="no"
        />
        <Text style={{ color: ink }} className="text-login-body font-semibold">
          {label}
        </Text>
        <FontAwesome
          name="angle-right"
          size={14}
          color={hexToRgba(inkMuted, 0.85)}
          importantForAccessibility="no"
        />
      </View>
    </Pressable>
  );
}
