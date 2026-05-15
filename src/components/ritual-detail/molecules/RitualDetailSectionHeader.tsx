import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

type Props = PropsWithChildren<{
  eyebrow: string;
  title?: string;
}>;

/**
 * Section lead — tone matches `SectionGhostHeader` (home): warm accent label, calm display title.
 * Avoids shouty all-caps chrome; reads as editorial, family-trustworthy.
 */
export function RitualDetailSectionHeader({ eyebrow, title, children }: Props) {
  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-[13px] font-semibold leading-[19px] tracking-[-0.01em] text-ritual-primary dark:text-ritual-primary-dark">
          {eyebrow}
        </Text>
        {title ? (
          <Text className="font-semibold text-[22px] leading-[27px] tracking-[-0.02em] text-ritual-ink dark:text-ritual-ink-dark">
            {title}
          </Text>
        ) : null}
      </View>
      {children}
    </View>
  );
}
