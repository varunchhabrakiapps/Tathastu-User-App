import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import type { BookingLifecycleStatus } from '@/domain/booking';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

type Props = {
  status: BookingLifecycleStatus;
};

/** Destructive tone — no semantic red in the ritual palette, so kept local to the pill. */
const DANGER = { light: '#DC2626', dark: '#F87171' } as const;

function toneFor(status: BookingLifecycleStatus, key: 'light' | 'dark'): string {
  switch (status) {
    case 'confirmed':
    case 'completed':
      return paletteHex.ritual.success[key];
    case 'scheduled':
      return paletteHex.ritual.primary[key];
    case 'cancelled':
      return DANGER[key];
    default:
      return paletteHex.ritual.inkMuted[key];
  }
}

/**
 * Whisper status chip — a tinted dot + label keyed by lifecycle. Decorative for screen readers
 * (the parent booking card composes status into its full accessibility label).
 */
export const BookingStatusPill = memo(function BookingStatusPill({ status }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';

  const tone = toneFor(status, key);
  const background = hexToRgba(tone, key === 'dark' ? 0.2 : 0.12);

  return (
    <View
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      className="flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1"
      style={{ backgroundColor: background }}
    >
      <View style={[styles.dot, { backgroundColor: tone }]} />
      <Text
        style={{ color: tone }}
        className="font-semibold text-[11px] leading-[14px] tracking-[0.01em]"
      >
        {t(`screens.bookings.status.${status}`)}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
