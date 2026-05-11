import { memo } from 'react';
import { View } from 'react-native';

export type OnboardingGraphicVariant = 'onDemand' | 'homeCeremony' | 'digital';

type Props = {
  variant: OnboardingGraphicVariant;
  accessibilityLabel: string;
};

/**
 * Abstract placeholder artwork per slide until marketing assets ship.
 */
export const OnboardingSlideGraphic = memo(function OnboardingSlideGraphic({
  variant,
  accessibilityLabel,
}: Props) {
  return (
    <View
      className="h-36 w-full items-center justify-center rounded-2xl border border-border bg-surface-elevated dark:border-border-dark dark:bg-surface-elevated-dark"
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      {variant === 'onDemand' ? <OnDemandShapes /> : null}
      {variant === 'homeCeremony' ? <HomeCeremonyShapes /> : null}
      {variant === 'digital' ? <DigitalShapes /> : null}
    </View>
  );
});

function OnDemandShapes() {
  return (
    <View className="h-full w-full items-center justify-center px-8">
      <View className="w-full flex-row items-center justify-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <View
            key={`cal-${i}`}
            className="h-11 flex-1 max-w-[3.25rem] rounded-lg border border-accent/25 bg-accent-soft/50 dark:border-accent-dark/30 dark:bg-accent-soft-dark/40"
            style={{ opacity: 0.5 + i * 0.14 }}
          />
        ))}
      </View>
      <View className="mt-3 flex-row items-center gap-3">
        <View className="h-2.5 w-2.5 rounded-full bg-warm-muted dark:bg-warm-dark" />
        <View className="h-2 w-20 rounded-full bg-ink-muted/25 dark:bg-ink-muted-ondark/35" />
        <View className="h-7 w-7 rounded-full border-2 border-accent/40 bg-accent-soft dark:border-accent-dark/50 dark:bg-accent-soft-dark/50" />
      </View>
    </View>
  );
}

function HomeCeremonyShapes() {
  return (
    <View className="h-full w-full items-center justify-center px-10">
      <View className="w-full rounded-t-2xl border-2 border-warm-muted/45 bg-warm-subtle/80 px-4 pb-1 pt-5 dark:border-warm-dark/35 dark:bg-warm/15">
        <View className="mb-2.5 h-2 w-[66%] self-center rounded-full bg-warm-muted/50 dark:bg-warm-muted/40" />
        <View className="h-14 w-full rounded-xl border border-border bg-surface dark:border-border-dark dark:bg-surface-dark" />
      </View>
      <View className="-mt-2 h-9 w-[72%] rounded-b-2xl border-2 border-t-0 border-warm/35 bg-warm-subtle dark:border-warm-dark/35 dark:bg-surface-dark" />
    </View>
  );
}

function DigitalShapes() {
  return (
    <View className="h-full w-full items-center justify-center px-12">
      <View className="h-[7.25rem] w-[5.5rem] rounded-2xl border-2 border-primary/25 bg-primary-soft/80 p-2 dark:border-primary-dark/35 dark:bg-primary-soft-dark/50">
        <View className="flex-1 rounded-xl bg-surface dark:bg-surface-dark">
          <View className="mt-3.5 items-center px-1">
            <View className="h-12 w-12 rounded-full border-2 border-accent/40 bg-accent-soft dark:border-accent-dark/45 dark:bg-accent-soft-dark/60" />
            <View className="mt-2.5 h-1.5 w-14 rounded-full bg-ink-muted/30 dark:bg-ink-muted-ondark/40" />
            <View className="mt-2 h-1.5 w-9 rounded-full bg-ink-muted/20 dark:bg-ink-muted-ondark/25" />
          </View>
        </View>
      </View>
      <View className="absolute bottom-5 right-9 h-7 w-7 rounded-full border border-warm-muted/50 bg-warm-subtle/90 dark:border-warm-dark/40 dark:bg-warm/20" />
      <View className="absolute right-12 top-7 h-2.5 w-2.5 rounded-full bg-accent dark:bg-accent-dark" />
    </View>
  );
}
