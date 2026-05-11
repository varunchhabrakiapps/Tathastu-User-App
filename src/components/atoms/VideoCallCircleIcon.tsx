import { memo } from 'react';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';

type Props = {
  accessibilityLabel: string;
};

/** Preset: live / remote video ritual heading mark. */
export const VideoCallCircleIcon = memo(function VideoCallCircleIcon({
  accessibilityLabel,
}: Props) {
  return (
    <FontAwesomeCircleIcon
      name="video-camera"
      accessibilityLabel={accessibilityLabel}
    />
  );
});
