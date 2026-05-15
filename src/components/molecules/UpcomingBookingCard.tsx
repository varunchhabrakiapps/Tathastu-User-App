import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import type { BookingPreviewServiceMode, UpcomingBookingPreview } from '@/domain/bookingPreview';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

type Props = {
  booking: UpcomingBookingPreview;
  onPress: () => void;
};

function ModeIcon({
  mode,
  color,
}: {
  mode: BookingPreviewServiceMode;
  color: string;
}) {
  const name = mode === 'home_visit' ? 'home' : 'video-camera';
  return (
    <FontAwesome
      name={name}
      size={9}
      color={color}
      importantForAccessibility="no-hide-descendants"
    />
  );
}

/**
 * Compact upcoming ritual tile — soft layered warmth, minimal chrome, tactile press.
 */
export const UpcomingBookingCard = memo(function UpcomingBookingCard({ booking, onPress }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const inkMutedCore = paletteHex.ritual.inkMuted[isDark ? 'dark' : 'light'];
  const glyphMuted = hexToRgba(inkMutedCore, isDark ? 0.55 : 0.52);
  const glyphSofter = hexToRgba(inkMutedCore, isDark ? 0.48 : 0.46);

  const combinedA11y = `${booking.ritualName}. ${booking.timingGlanceLine}. ${booking.togetherGlanceLine}`;

  const iosShadowStyle = isDark ? styles.tileShadowIosDark : styles.tileShadowIosLight;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={t('screens.home.upcomingBooking.openDetailHint')}
      accessibilityLabel={combinedA11y}
      onPress={onPress}
      className="overflow-hidden rounded-[18px]"
      style={Platform.OS === 'ios' ? iosShadowStyle : styles.tileShadowAndroid}
    >
      {({ pressed }) => (
        <View className={cn('overflow-hidden rounded-[18px]', pressed && 'opacity-[0.98]')}>
          <View className="relative overflow-hidden rounded-[18px]">
            <View className="absolute inset-0 bg-ritual-surfaceSecondary/65 dark:bg-ritual-surfaceSecondary-dark/48" />
            <View className="relative rounded-[18px] bg-ritual-surface/76 px-4 py-3 dark:bg-ritual-surface-dark/68">
              <View className="gap-2.5">
                <Text
                  accessibilityRole="header"
                  numberOfLines={2}
                  className="font-semibold text-[17px] leading-snug tracking-[-0.02em] text-ritual-ink dark:text-ritual-ink-dark"
                >
                  {booking.ritualName}
                </Text>

                <View className="gap-2 pt-px">
                  <View className="flex-row items-center gap-2.5">
                    <View className="w-[20px] items-center">
                      <FontAwesome
                        name="calendar"
                        size={9}
                        color={glyphMuted}
                        importantForAccessibility="no-hide-descendants"
                      />
                    </View>
                    <Text
                      numberOfLines={1}
                      className="flex-1 font-normal text-login-label tracking-[0.01em] text-ritual-inkMuted/93 dark:text-ritual-inkMuted-dark/93"
                    >
                      {booking.timingGlanceLine}
                    </Text>
                  </View>

                  <View className="flex-row items-start gap-2.5">
                    <View className="mt-[2px] w-[20px] items-center">
                      <ModeIcon mode={booking.mode} color={glyphSofter} />
                    </View>
                    <Text
                      numberOfLines={2}
                      className="flex-1 font-normal text-login-label leading-[18px] text-ritual-inkMuted/85 dark:text-ritual-inkMuted-dark/86"
                    >
                      {booking.togetherGlanceLine}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  tileShadowIosLight: {
    shadowColor: paletteHex.ritual.primary.light,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.068,
    shadowRadius: 16,
    elevation: 0,
  },
  tileShadowIosDark: {
    shadowColor: paletteHex.canvas.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 0,
  },
  tileShadowAndroid: {
    elevation: 1,
  },
});
