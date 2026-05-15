import type { ImageSourcePropType } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { RitualDetailCard } from '@/components/ritual-detail/molecules/RitualDetailCard';
import { RitualDetailSectionHeader } from '@/components/ritual-detail/molecules/RitualDetailSectionHeader';
import { RitualDetailDeliverables } from '@/components/ritual-detail/organisms/RitualDetailDeliverables';
import { RitualDetailSampleVideo } from '@/components/ritual-detail/organisms/RitualDetailSampleVideo';
import { RitualDetailStepList } from '@/components/ritual-detail/organisms/RitualDetailStepList';

import type { RitualDetailBookingVM, RitualDetailNarrativeVM } from '@/domain/ritualDetail';
import { authScreen } from '@/theme/tokens';

type Props = {
  narrative: RitualDetailNarrativeVM;
  booking: RitualDetailBookingVM;
  videoThumbnailSource: ImageSourcePropType;
};

/**
 * Editorial column — rhythm matches home insets (`authScreen.insetX`); slight lift into hero
 * curve for magazine-style flow.
 */
export function RitualDetailSections({
  narrative,
  booking,
  videoThumbnailSource,
}: Props) {
  return (
    <View className="-mt-2 gap-11 pb-10 pt-4" style={styles.inset}>
      <RitualDetailSectionHeader eyebrow={narrative.overviewEyebrow}>
        <RitualDetailCard className="gap-4 px-5 py-5">
          <Text className="text-[16px] font-medium leading-[24px] text-ritual-ink dark:text-ritual-ink-dark">
            {narrative.description}
          </Text>
          <Text className="text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
            {narrative.explanation}
          </Text>
        </RitualDetailCard>
      </RitualDetailSectionHeader>

      <RitualDetailSectionHeader eyebrow={narrative.howEyebrow} title={narrative.howTitle}>
        <RitualDetailStepList steps={narrative.steps} />
      </RitualDetailSectionHeader>

      <RitualDetailDeliverables
        eyebrow={booking.deliverablesEyebrow}
        lines={booking.deliverableLines}
      />

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

const styles = StyleSheet.create({
  inset: {
    paddingHorizontal: authScreen.insetX,
  },
});
