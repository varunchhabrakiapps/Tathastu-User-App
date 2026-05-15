import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

type Props = PropsWithChildren<{
  eyebrow: string;
  title?: string;
}>;

/** Editorial section chrome — accent eyebrow + optional display title (ritual detail screen). */
export function RitualDetailSectionHeader({ eyebrow, title, children }: Props) {
  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-login-label font-semibold uppercase tracking-[0.12em] text-ritual-primary dark:text-ritual-primary-dark">
          {eyebrow}
        </Text>
        {title ? (
          <Text className="font-medium text-login-display text-ritual-ink dark:text-ritual-ink-dark">
            {title}
          </Text>
        ) : null}
      </View>
      {children}
    </View>
  );
}
