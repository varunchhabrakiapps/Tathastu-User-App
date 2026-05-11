import { memo } from 'react';
import { Text, View } from 'react-native';

export type MarketingHeroCopyProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  body?: string;
  /** Teal = default marketing; `warm` = saffron / amber accents on ritual heroes. */
  accentTone?: 'teal' | 'warm';
};

/**
 * Light-on-gradient typography block for auth and onboarding heroes.
 */
export const MarketingHeroCopy = memo(function MarketingHeroCopy({
  badge,
  title,
  subtitle,
  body,
  accentTone = 'teal',
}: MarketingHeroCopyProps) {
  const badgeClass =
    accentTone === 'warm'
      ? 'mb-3 self-center rounded-full border border-warm-muted/55 bg-warm/15 px-3 py-1 text-xs font-medium tracking-wide text-warm-on-dark dark:border-warm-dark/45 dark:bg-warm/25 dark:text-amber-50'
      : 'mb-3 self-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/90';

  const subtitleClass =
    accentTone === 'warm'
      ? 'mt-2 text-center text-lg font-medium text-warm-muted/95 dark:text-warm-dark/95'
      : 'mt-2 text-center text-lg font-medium text-teal-100/95';

  const bodyClass =
    accentTone === 'warm'
      ? 'mt-4 text-center text-base leading-relaxed text-orange-50/90 dark:text-warm-on-dark/88'
      : 'mt-4 text-center text-base leading-relaxed text-white/85';

  return (
    <View>
      {badge ? (
        <Text accessibilityRole="text" className={badgeClass}>
          {badge}
        </Text>
      ) : null}

      <Text
        accessibilityRole="header"
        className="text-center text-4xl font-bold tracking-tight text-white"
      >
        {title}
      </Text>

      {subtitle ? <Text className={subtitleClass}>{subtitle}</Text> : null}

      {body ? <Text className={bodyClass}>{body}</Text> : null}
    </View>
  );
});
