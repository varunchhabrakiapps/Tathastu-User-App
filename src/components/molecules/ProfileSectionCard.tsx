import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

import { SectionEyebrow } from '@/components/atoms/SectionEyebrow';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { cn } from '@/utils/cn';

type Props = PropsWithChildren<{
  /** Uppercase ritual section label (translated). Omit for an unlabeled group. */
  title?: string;
  /** Muted helper line under the grouped surface (e.g. signed-in number, footnotes). */
  caption?: string;
  className?: string;
}>;

/**
 * Grouped settings-style surface for the Profile hub — eyebrow + crisp ritual card holding
 * full-bleed rows with hairline dividers. Pairs the calm editorial type scale with iOS-familiar grouping.
 */
export function ProfileSectionCard({ title, caption, children, className }: Props) {
  const { inkMuted, sectionSurface, sectionBorder } = useRitualSemanticColors();

  return (
    <View className={cn('mb-7', className)}>
      {title ? <SectionEyebrow label={title} /> : null}
      <View
        className="overflow-hidden rounded-[20px]"
        style={{
          backgroundColor: sectionSurface,
          borderWidth: 1,
          borderColor: sectionBorder,
        }}
      >
        {children}
      </View>
      {caption ? (
        <Text
          style={{ color: inkMuted }}
          className="mt-2.5 px-1 text-login-label leading-snug"
        >
          {caption}
        </Text>
      ) : null}
    </View>
  );
}
