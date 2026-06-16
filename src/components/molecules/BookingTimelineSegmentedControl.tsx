import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type NativeSyntheticEvent,
} from 'react-native';
import SegmentedControl, {
  type FontStyle,
  type NativeSegmentedControlIOSChangeEvent,
} from '@react-native-segmented-control/segmented-control';
import { useColorScheme } from 'nativewind';

import type { BookingTimeline } from '@/domain/booking';
import type { BookingTimelineCounts } from '@/hooks/useBookingsList';
import { paletteHex } from '@/theme/palette';
import { radii } from '@/theme/tokens';
import { cn } from '@/utils/cn';

type Props = {
  value: BookingTimeline;
  counts: BookingTimelineCounts;
  onChange: (value: BookingTimeline) => void;
};

const SEGMENTS: ReadonlyArray<{ id: BookingTimeline; labelKey: string }> = [
  { id: 'upcoming', labelKey: 'screens.bookings.filters.upcoming' },
  { id: 'past', labelKey: 'screens.bookings.filters.past' },
];

/** Native control fonts — themed per appearance (hoisted so JSX stays literal-free). */
const NATIVE_IDLE_FONT: Record<'light' | 'dark', FontStyle> = {
  light: { color: paletteHex.ritual.inkMuted.light, fontSize: 13 },
  dark: { color: paletteHex.ritual.inkMuted.dark, fontSize: 13 },
};
const NATIVE_ACTIVE_FONT: Record<'light' | 'dark', FontStyle> = {
  light: { color: paletteHex.ritual.primary.light, fontSize: 13, fontWeight: '600' },
  dark: { color: paletteHex.ritual.primary.dark, fontSize: 13, fontWeight: '600' },
};

/**
 * Two-way timeline switch (Upcoming · Past) with live counts.
 *
 * iOS renders the native `UISegmentedControl` for an at-home platform feel; Android (and any
 * other platform) falls back to a themed control built on the app's selection language.
 */
export const BookingTimelineSegmentedControl = memo(
  function BookingTimelineSegmentedControl(props: Props) {
    return Platform.OS === 'ios' ? (
      <NativeTimelineControl {...props} />
    ) : (
      <FallbackTimelineControl {...props} />
    );
  },
);

/** iOS — native `UISegmentedControl`, tinted to the ritual palette and pinned to the app theme. */
const NativeTimelineControl = memo(function NativeTimelineControl({
  value,
  counts,
  onChange,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const key = isDark ? 'dark' : 'light';

  const values = SEGMENTS.map((segment) => {
    const label = t(segment.labelKey);
    const count = counts[segment.id];
    return count > 0 ? `${label} · ${count}` : label;
  });
  const selectedIndex = Math.max(
    0,
    SEGMENTS.findIndex((segment) => segment.id === value),
  );

  const handleChange = useCallback(
    (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
      const next = SEGMENTS[event.nativeEvent.selectedSegmentIndex];
      if (next) onChange(next.id);
    },
    [onChange],
  );

  // Track blends with the ritual canvas; only the selected pill reads as a surface lift.
  const selectedPillColor = isDark
    ? paletteHex.ritual.surface.dark
    : paletteHex.ritual.surface.light;

  return (
    <View style={styles.nativeClip} accessibilityRole="none">
      <SegmentedControl
        values={values}
        selectedIndex={selectedIndex}
        onChange={handleChange}
        // Pin appearance to the in-app theme (may differ from the OS theme via the theme toggle).
        appearance={key}
        backgroundColor={paletteHex.ritual.canvas[key]}
        tintColor={selectedPillColor}
        fontStyle={NATIVE_IDLE_FONT[key]}
        activeFontStyle={NATIVE_ACTIVE_FONT[key]}
        style={styles.nativeControl}
        accessibilityLabel={t('screens.bookings.filters.tablistA11y')}
      />
    </View>
  );
});

/** Android / other — themed pill control mirroring the app's selection language. */
const FallbackTimelineControl = memo(function FallbackTimelineControl({
  value,
  counts,
  onChange,
}: Props) {
  const { t } = useTranslation();

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={t('screens.bookings.filters.tablistA11y')}
      className="flex-row gap-1 rounded-full border border-ritual-borderSoft/50 p-1 dark:border-ritual-borderSoft-dark/45"
    >
      {SEGMENTS.map((segment) => (
        <FallbackSegment
          key={segment.id}
          label={t(segment.labelKey)}
          count={counts[segment.id]}
          selected={value === segment.id}
          onPress={() => onChange(segment.id)}
        />
      ))}
    </View>
  );
});

type FallbackSegmentProps = {
  label: string;
  count: number;
  selected: boolean;
  onPress: () => void;
};

const FallbackSegment = memo(function FallbackSegment({
  label,
  count,
  selected,
  onPress,
}: FallbackSegmentProps) {
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const color = selected ? paletteHex.ritual.primary[key] : paletteHex.ritual.inkMuted[key];

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={cn(
        'flex-1 flex-row items-center justify-center rounded-full py-2 active:opacity-90',
        selected && 'bg-ritual-primary/12 dark:bg-ritual-primary-dark/20',
      )}
    >
      <Text
        style={{ color }}
        className={cn('text-[13px] leading-[17px]', selected ? 'font-semibold' : 'font-medium')}
      >
        {label}
      </Text>
      {count > 0 ? (
        <Text
          style={{ color }}
          className="ml-1.5 font-semibold text-[12px] leading-[16px] opacity-80"
        >
          {count}
        </Text>
      ) : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  /** Clips the native track so any system fill respects the pill radius. */
  nativeClip: {
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  nativeControl: {
    height: 32,
    borderRadius: radii.full,
  },
});
