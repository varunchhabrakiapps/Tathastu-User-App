import type { ComponentProps } from 'react';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';

import type { BookingServiceMode } from '@/domain/booking';

/**
 * Presentation mapping for bookings — modality → glyph / i18n keys in one place so cards and
 * tags never scatter magic strings. (Status → label keys stay co-located in `BookingStatusPill`.)
 */
type FontAwesomeGlyph = ComponentProps<typeof FontAwesome>['name'];

export function bookingModeGlyph(mode: BookingServiceMode): FontAwesomeGlyph {
  return mode === 'home_visit' ? 'home' : 'video-camera';
}

export function bookingModeLabelKey(mode: BookingServiceMode): string {
  return mode === 'home_visit'
    ? 'screens.bookings.mode.homeVisit'
    : 'screens.bookings.mode.video';
}

export function bookingModeA11yKey(mode: BookingServiceMode): string {
  return mode === 'home_visit'
    ? 'screens.bookings.mode.homeVisitA11y'
    : 'screens.bookings.mode.videoA11y';
}
