import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import { PrimaryGlassButton } from '@/components/atoms/PrimaryGlassButton';
import type { BookingTimeline } from '@/domain/booking';
import { paletteHex } from '@/theme/palette';

type Props = {
  variant: BookingTimeline;
  onExplore: () => void;
};

/**
 * Calm empty state — invites a first booking on the Upcoming tab, reassures on Past.
 * Copy + leading glyph swap by timeline; only Upcoming surfaces the Explore CTA.
 */
export const BookingsEmptyState = memo(function BookingsEmptyState({ variant, onExplore }: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const titleColor = paletteHex.ritual.ink[key];
  const bodyColor = paletteHex.ritual.inkMuted[key];

  const isUpcoming = variant === 'upcoming';
  const base = isUpcoming ? 'screens.bookings.empty.upcoming' : 'screens.bookings.empty.past';

  return (
    <View className="items-center pt-12" accessibilityRole="none">
      <FontAwesomeCircleIcon
        name={isUpcoming ? 'calendar-plus-o' : 'calendar-check-o'}
        circleSize={64}
        accessibilityLabel={t('screens.bookings.empty.leadingA11y')}
      />
      <Text
        accessibilityRole="header"
        style={{ color: titleColor }}
        className="mt-5 text-center font-semibold text-login-body"
      >
        {t(`${base}.title`)}
      </Text>
      <Text
        style={{ color: bodyColor }}
        className="mt-2 max-w-[300px] text-center font-normal text-[13px] leading-[19px]"
      >
        {t(`${base}.body`)}
      </Text>

      {isUpcoming ? (
        <View className="mt-7 w-full max-w-[260px]">
          <PrimaryGlassButton
            label={t('screens.bookings.empty.upcoming.cta')}
            accessibilityLabel={t('screens.bookings.empty.upcoming.ctaA11y')}
            onPress={onExplore}
            tint="warm"
          />
        </View>
      ) : null}
    </View>
  );
});
