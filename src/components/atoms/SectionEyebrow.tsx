import { Text } from 'react-native';

import { cn } from '@/utils/cn';

type Props = {
  /** Visible section title — caller passes translated copy. */
  label: string;
  className?: string;
};

/** Uppercase ritual section label — onboarding/login metadata rhythm. */
export function SectionEyebrow({ label, className }: Props) {
  return (
    <Text
      accessibilityRole="header"
      className={cn(
        'mb-2 text-login-label font-semibold uppercase tracking-[0.12em] text-ritual-inkMuted dark:text-ritual-inkMuted-dark',
        className,
      )}
    >
      {label}
    </Text>
  );
}
