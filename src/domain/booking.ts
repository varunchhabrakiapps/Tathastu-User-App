/**
 * Booking list domain — display model for the Bookings tab.
 *
 * Resolved from API DTOs (or the stub catalog) into copy-ready strings; keep this a calm
 * presentation shape so screens/components never reach into raw API objects. The richer
 * counterpart to {@link UpcomingBookingPreview} (the single Home anchor glance).
 */

/** Modality of the ceremony — mirrors `BookingPreviewServiceMode` value space. */
export type BookingServiceMode = 'video_call' | 'home_visit';

/** Lifecycle of a booking — drives status pill + upcoming/past timeline split. */
export type BookingLifecycleStatus =
  | 'confirmed'
  | 'scheduled'
  | 'completed'
  | 'cancelled';

/** Coarse timeline bucket the segmented filter switches between. */
export type BookingTimeline = 'upcoming' | 'past';

export type Booking = {
  id: string;
  /** Links back to the ritual catalog (detail / re-book) — not required for list display. */
  ritualId: string;
  ritualName: string;
  mode: BookingServiceMode;
  status: BookingLifecycleStatus;
  /** Source of truth for scheduling — relative groups + glance lines derive from this. */
  startAtISO: string;
  panditName: string;
  /** Home visits: short locality line (e.g. “Bandra West, Mumbai”). `null` for video. */
  locationLine: string | null;
};
