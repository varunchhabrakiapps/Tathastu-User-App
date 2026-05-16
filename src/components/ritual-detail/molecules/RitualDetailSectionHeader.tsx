import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { paletteHex } from '@/theme/palette';

type Props = PropsWithChildren<{
  eyebrow: string;
  title?: string;
}>;

/** Section lead — aligned with {@link SectionGhostHeader} on Home (login-body title + muted support). */
export function RitualDetailSectionHeader({ eyebrow, title, children }: Props) {
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const titleColor = paletteHex.ritual.ink[key];
  const descriptionColor = paletteHex.ritual.inkMuted[key];

  return (
    <View className="gap-2.5">
      <View className="gap-1">
        <Text
          accessibilityRole="header"
          style={{ color: titleColor }}
          className="font-semibold text-login-body tracking-[-0.01em]"
        >
          {eyebrow}
        </Text>
        {title ? (
          <Text
            accessibilityRole="text"
            style={{ color: descriptionColor }}
            className="font-normal text-[13px] leading-[19px]"
          >
            {title}
          </Text>
        ) : null}
      </View>
      {children}
    </View>
  );
}
