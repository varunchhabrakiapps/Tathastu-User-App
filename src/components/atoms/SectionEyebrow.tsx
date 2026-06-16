import { Text } from 'react-native';

import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { cn } from '@/utils/cn';

type Props = {
  /** Visible section title — caller passes translated copy. */
  label: string;
  className?: string;
};

/** Uppercase ritual section label — onboarding/login metadata rhythm. */
export function SectionEyebrow({ label, className }: Props) {
  const { inkMuted } = useRitualSemanticColors();

  return (
    <Text
      accessibilityRole="header"
      style={{ color: inkMuted }}
      className={cn(
        'mb-2 text-login-label font-semibold uppercase tracking-[0.12em]',
        className,
      )}
    >
      {label}
    </Text>
  );
}
