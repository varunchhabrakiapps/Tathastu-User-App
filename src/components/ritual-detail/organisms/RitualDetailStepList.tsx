import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { RitualDetailCard } from '@/components/ritual-detail/molecules/RitualDetailCard';

import type { RitualDetailStepVM } from '@/domain/ritualDetail';
import { cn } from '@/utils/cn';

type Props = {
  steps: RitualDetailStepVM[];
};

/**
 * Single calm ladder — one elevated surface with hairline rails (not three heavy cards).
 */
export function RitualDetailStepList({ steps }: Props) {
  const { t } = useTranslation();

  return (
    <RitualDetailCard className="gap-0 overflow-hidden px-0 py-0">
      {steps.map((step, index) => (
        <View
          key={step.stepNumber}
          className={cn(
            'flex-row gap-3 px-4 py-4',
            index < steps.length - 1 &&
              'border-b border-ritual-borderSoft/35 dark:border-ritual-borderSoft-dark/30',
          )}
        >
          <View className="mt-0.5 h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ritual-surfaceSecondary dark:bg-ritual-surfaceSecondary-dark">
            <Text className="text-[14px] font-bold text-ritual-primary dark:text-ritual-primary-dark">
              {step.stepNumber}
            </Text>
          </View>
          <View className="min-w-0 flex-1 gap-1.5 pt-0.5">
            <Text className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
              {t('screens.ritualDetail.narrative.stepBadge', { n: step.stepNumber })}
            </Text>
            <Text className="text-[16px] font-semibold leading-[22px] text-ritual-ink dark:text-ritual-ink-dark">
              {step.title}
            </Text>
            <Text className="text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
              {step.body}
            </Text>
          </View>
        </View>
      ))}
    </RitualDetailCard>
  );
}
