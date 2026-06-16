import { memo, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { BookingStatusPill } from '@/components/atoms/BookingStatusPill';
import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { BOOKING_CARD_LEADING_SIZE } from '@/constants/bookingsLayout';
import { RITUAL_CORNER_RADIUS } from '@/constants/ritualLayout';
import type { Booking } from '@/domain/booking';
import { hexToRgba } from '@/theme/colorUtils';
import { useGhostCardShadow } from '@/theme/ghostCardShadow';
import { paletteHex } from '@/theme/palette';
import { bookingModeGlyph, bookingModeLabelKey } from '@/utils/bookingDisplay';
import { cn } from '@/utils/cn';

type FontAwesomeGlyph = ComponentProps<typeof FontAwesome>['name'];

type Props = {
  booking: Booking;
  /** Pre-composed “when” glance line (e.g. “Today · 6:30 PM”) from `useBookingsList`. */
  whenLine: string;
  onPress: () => void;
};

/** Glyph on the warm leading ring — light/dark mirrors `FontAwesomeCircleIcon` defaults. */
const LEADING_GLYPH_DARK = '#fffbeb';

type MetaLineProps = {
  glyph: FontAwesomeGlyph;
  text: string;
  textColor: string;
  glyphColor: string;
  multiline?: boolean;
};

function MetaLine({ glyph, text, textColor, glyphColor, multiline = false }: MetaLineProps) {
  return (
    <View className={cn('flex-row gap-2.5', multiline ? 'items-start' : 'items-center')}>
      <View className={cn('w-[18px] items-center', multiline && 'mt-[2px]')}>
        <FontAwesome
          name={glyph}
          size={11}
          color={glyphColor}
          importantForAccessibility="no-hide-descendants"
        />
      </View>
      <Text
        numberOfLines={multiline ? 2 : 1}
        style={{ color: textColor }}
        className="flex-1 font-normal text-login-label leading-[17px]"
      >
        {text}
      </Text>
    </View>
  );
}

/**
 * Booking list tile — warm mode ring + status pill, on the shared ghost glass chrome (matching
 * {@link UpcomingBookingCard}). Pure presentation: copy + when-line arrive resolved via props.
 */
export const BookingListCard = memo(function BookingListCard({ booking, whenLine, onPress }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const key = isDark ? 'dark' : 'light';

  const titleColor = paletteHex.ritual.ink[key];
  const metaBase = paletteHex.ritual.inkMuted[key];
  const eyebrowColor = metaBase;
  const metaText = isDark ? metaBase : hexToRgba(metaBase, 0.92);
  const glyphColor = isDark ? hexToRgba(metaBase, 0.95) : hexToRgba(metaBase, 0.55);
  const leadingGlyphColor = isDark ? LEADING_GLYPH_DARK : paletteHex.warm.deep;

  const modeLabel = t(bookingModeLabelKey(booking.mode));
  const statusLabel = t(`screens.bookings.status.${booking.status}`);
  const panditLine = t('screens.bookings.card.withPandit', { name: booking.panditName });

  const a11yLabel = t('screens.bookings.card.a11yLabel', {
    ritual: booking.ritualName,
    mode: modeLabel,
    status: statusLabel,
    when: whenLine,
    pandit: booking.panditName,
  });

  const ghostShadow = useGhostCardShadow();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityHint={t('screens.bookings.card.openDetailHint')}
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
          <View className="flex-row items-start gap-3.5 px-4 py-3.5">
            <View
              pointerEvents="none"
              importantForAccessibility="no-hide-descendants"
              className="shrink-0 items-center justify-center rounded-full border border-warm-muted/55 bg-warm/18 dark:border-warm-dark/45 dark:bg-warm/22"
              style={{ width: BOOKING_CARD_LEADING_SIZE, height: BOOKING_CARD_LEADING_SIZE }}
            >
              <FontAwesome
                name={bookingModeGlyph(booking.mode)}
                size={18}
                color={leadingGlyphColor}
                importantForAccessibility="no-hide-descendants"
              />
            </View>

            <View className="min-w-0 flex-1 gap-2.5">
              <View className="flex-row items-start justify-between gap-2.5">
                <View className="min-w-0 flex-1">
                  <Text
                    numberOfLines={1}
                    style={{ color: eyebrowColor }}
                    className="font-medium uppercase text-login-label"
                  >
                    {modeLabel}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{ color: titleColor }}
                    className="mt-1 font-semibold text-[16px] leading-[21px] tracking-[-0.018em]"
                  >
                    {booking.ritualName}
                  </Text>
                </View>
                <View className="shrink-0 pt-0.5">
                  <BookingStatusPill status={booking.status} />
                </View>
              </View>

              <View className="gap-1.5">
                <MetaLine
                  glyph="calendar"
                  text={whenLine}
                  textColor={metaText}
                  glyphColor={glyphColor}
                />
                <MetaLine
                  glyph="user-o"
                  text={panditLine}
                  textColor={metaText}
                  glyphColor={glyphColor}
                />
                {booking.locationLine ? (
                  <MetaLine
                    glyph="map-marker"
                    text={booking.locationLine}
                    textColor={metaText}
                    glyphColor={glyphColor}
                    multiline
                  />
                ) : null}
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
