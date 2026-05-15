import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { RitualDetailCard } from '@/components/ritual-detail/molecules/RitualDetailCard';

import type { RitualDetailStepVM } from '@/domain/ritualDetail';

type Props = {
  steps: RitualDetailStepVM[];
};

/** Numbered “how it works” ladder — one card per step. */
export function RitualDetailStepList({ steps }: Props) {
  const { t } = useTranslation();

  return (
    <View className="gap-3">
      {steps.map((step) => (
        <RitualDetailCard key={step.stepNumber} className="gap-2">
          <Text className="text-login-label font-semibold uppercase tracking-[0.08em] text-ritual-primary dark:text-ritual-primary-dark">
            {t('screens.ritualDetail.narrative.stepBadge', { n: step.stepNumber })}
          </Text>
          <Text className="text-[16px] font-semibold leading-[22px] text-ritual-ink dark:text-ritual-ink-dark">
            {step.title}
          </Text>
          <Text className="text-login-body leading-relaxed text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
            {step.body}
          </Text>
        </RitualDetailCard>
      ))}
    </View>
  );
}
