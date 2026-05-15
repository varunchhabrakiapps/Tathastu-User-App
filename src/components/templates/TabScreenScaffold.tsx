import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextHeading } from '@/components/atoms/TextHeading';
import { TextMuted } from '@/components/atoms/TextMuted';

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
  safeAreaEdges?: readonly Edge[];
}>;

/** Centered layout for primary tabs / stack shells: canvas background + semantic typography. */
export function TabScreenScaffold({
  title,
  subtitle,
  children,
  safeAreaEdges = ['top'],
}: Props) {
  return (
    <SafeAreaView
      edges={safeAreaEdges}
      className="flex-1 bg-canvas dark:bg-canvas-dark"
      accessibilityRole="none"
    >
      <View className="flex-1 items-center justify-center px-5">
        <TextHeading>{title}</TextHeading>
        {subtitle ? <TextMuted>{subtitle}</TextMuted> : null}
        {children}
      </View>
    </SafeAreaView>
  );
}
