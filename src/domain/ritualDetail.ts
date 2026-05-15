/** View-models for {@link useRitualDetailScreen} — presentational layers import shapes only. */
export type RitualDetailStepVM = {
  stepNumber: number;
  title: string;
  body: string;
};

/** Copy bundle for overview + how-it-works + sample video. */
export type RitualDetailNarrativeVM = {
  overviewEyebrow: string;
  /** Opening prose — what this ritual is. */
  description: string;
  /** Deeper “why / what to expect” copy. */
  explanation: string;
  howEyebrow: string;
  howTitle: string;
  steps: RitualDetailStepVM[];
  videoEyebrow: string;
  videoTitle: string;
  videoBody: string;
  videoCtaLabel: string;
  videoDisabledHint: string;
  videoThumbnailAccessibilityLabel: string;
};

/** Deliverables list + pricing copy for sticky booking CTA. */
export type RitualDetailBookingVM = {
  deliverablesEyebrow: string;
  deliverableLines: string[];
  priceEyebrow: string;
  priceAmount: string;
  priceNote: string;
  bookCtaLabel: string;
  bookAccessibilityHint: string;
};
