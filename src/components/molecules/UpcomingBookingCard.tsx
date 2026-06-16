import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import type { BookingPreviewServiceMode, UpcomingBookingPreview } from '@/domain/bookingPreview';
import { hexToRgba } from '@/theme/colorUtils';
import { useGhostCardShadow } from '@/theme/ghostCardShadow';
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
 * Compact upcoming ritual tile — {@link LiquidGlassMaterial} chrome (matches auth / icon glass depth).
 */
export const UpcomingBookingCard = memo(function UpcomingBookingCard({ booking, onPress }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const k = isDark ? 'dark' : 'light';
  const titleColor = paletteHex.ritual.ink[k];
  const metaBase = paletteHex.ritual.inkMuted[k];
  const timingColor = isDark ? metaBase : hexToRgba(metaBase, 0.93);
  const togetherColor = isDark ? metaBase : hexToRgba(metaBase, 0.85);
  const glyphCalendar = isDark ? metaBase : hexToRgba(metaBase, 0.55);
  const glyphMode = isDark ? hexToRgba(metaBase, 0.95) : hexToRgba(metaBase, 0.48);

  const combinedA11y = `${booking.ritualName}. ${booking.timingGlanceLine}. ${booking.togetherGlanceLine}`;
  const ghostShadow = useGhostCardShadow();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={t('screens.home.upcomingBooking.openDetailHint')}
      accessibilityLabel={combinedA11y}
      onPress={onPress}
      className="self-stretch active:opacity-[0.98]"
      style={[styles.shadowBase, ghostShadow]}
    >
      {({ pressed }) => (
        <LiquidGlassMaterial
          preset="ghost"
          borderRadius={RITUAL_CORNER_RADIUS}
          className={cn('rounded-[18px]', pressed && 'opacity-[0.98]')}
        >
          <View className="px-4 py-3">
            <View className="gap-2.5">
              <Text
                accessibilityRole="header"
                numberOfLines={2}
                style={{ color: titleColor }}
                className="font-semibold text-[17px] leading-snug tracking-[-0.02em]"
              >
                {booking.ritualName}
              </Text>

              <View className="gap-2 pt-px">
                <View className="flex-row items-center gap-2.5">
                  <View className="w-[20px] items-center">
                    <FontAwesome
                      name="calendar"
                      size={9}
                      color={glyphCalendar}
                      importantForAccessibility="no-hide-descendants"
                    />
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{ color: timingColor }}
                    className="flex-1 font-normal text-login-label tracking-[0.01em]"
                  >
                    {booking.timingGlanceLine}
                  </Text>
                </View>

                <View className="flex-row items-start gap-2.5">
                  <View className="mt-[2px] w-[20px] items-center">
                    <ModeIcon mode={booking.mode} color={glyphMode} />
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{ color: togetherColor }}
                    className="flex-1 font-normal text-login-label leading-[18px]"
                  >
                    {booking.togetherGlanceLine}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LiquidGlassMaterial>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  shadowBase: {
    borderRadius: RITUAL_CORNER_RADIUS,
  },
});
