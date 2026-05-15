/** Display-only preview for upcoming booking home anchor — mapped from API DTOs later. */
export type BookingPreviewStatus =
  | 'confirmed'
  | 'upcoming_tomorrow'
  | 'today'
  | 'starting_soon';

export type BookingPreviewServiceMode = 'home_visit' | 'video_call';

export type UpcomingBookingPreview = {
  id: string;
  ritualName: string;
  /** Single calm line, e.g. “Tomorrow · 6:30 AM” — composed in mapper from API datetimes. */
  timingGlanceLine: string;
  /** Flowing modality + pandit line, e.g. “Live video with …” */
  togetherGlanceLine: string;
  mode: BookingPreviewServiceMode;
  /** Retained for future status treatments / API mapping — not required for home glance UI. */
  status: BookingPreviewStatus;
};
