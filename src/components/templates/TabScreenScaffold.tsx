import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextHeading } from '@/components/atoms/TextHeading';
import { TextMuted } from '@/components/atoms/TextMuted';

type Props = PropsWithChildren<{ title: string; subtitle?: string }>;

/** Centered layout for primary tabs: themed surface + title + muted subtitle slot. */
export function TabScreenScaffold({ title, subtitle, children }: Props) {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white dark:bg-slate-950">
      <View className="flex-1 items-center justify-center px-5">
        <TextHeading>{title}</TextHeading>
        {subtitle ? <TextMuted>{subtitle}</TextMuted> : null}
        {children}
      </View>
    </SafeAreaView>
  );
}
