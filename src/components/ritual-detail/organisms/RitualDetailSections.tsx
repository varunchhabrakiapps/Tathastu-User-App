import type { ImageSourcePropType } from 'react-native';
import { Text, View } from 'react-native';

import { RitualDetailCard } from '@/components/ritual-detail/molecules/RitualDetailCard';
import { RitualDetailSectionHeader } from '@/components/ritual-detail/molecules/RitualDetailSectionHeader';
import { RitualDetailDeliverables } from '@/components/ritual-detail/organisms/RitualDetailDeliverables';
import { RitualDetailSampleVideo } from '@/components/ritual-detail/organisms/RitualDetailSampleVideo';
import { RitualDetailStepList } from '@/components/ritual-detail/organisms/RitualDetailStepList';

import type { RitualDetailBookingVM, RitualDetailNarrativeVM } from '@/domain/ritualDetail';

type Props = {
  narrative: RitualDetailNarrativeVM;
  booking: RitualDetailBookingVM;
  videoThumbnailSource: ImageSourcePropType;
};

/** Scroll body below the hero — overview, how-it-works, deliverables, sample video. */
export function RitualDetailSections({
  narrative,
  booking,
  videoThumbnailSource,
}: Props) {
  return (
    <View className="gap-10 px-6 pb-14 pt-10">
      <RitualDetailSectionHeader eyebrow={narrative.overviewEyebrow}>
        <RitualDetailCard className="gap-4">
          <Text className="text-login-body leading-relaxed text-ritual-ink dark:text-ritual-ink-dark">
            {narrative.description}
          </Text>
          <Text className="text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
            {narrative.explanation}
          </Text>
        </RitualDetailCard>
      </RitualDetailSectionHeader>

      <View className="gap-3">
        <RitualDetailSectionHeader eyebrow={narrative.howEyebrow} title={narrative.howTitle} />
        <RitualDetailStepList steps={narrative.steps} />
      </View>

      <RitualDetailDeliverables eyebrow={booking.deliverablesEyebrow} lines={booking.deliverableLines} />

      <RitualDetailSampleVideo
        eyebrow={narrative.videoEyebrow}
        title={narrative.videoTitle}
        body={narrative.videoBody}
        thumbnailSource={videoThumbnailSource}
        thumbnailAccessibilityLabel={narrative.videoThumbnailAccessibilityLabel}
        ctaLabel={narrative.videoCtaLabel}
        disabledHint={narrative.videoDisabledHint}
      />
    </View>
  );
}
