import { memo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'nativewind';

import { FontAwesomeCircleIcon } from '@/components/atoms/FontAwesomeCircleIcon';
import {
  SECTION_GHOST_HEADER_LEADING_SIZE,
  SectionGhostHeader,
} from '@/components/molecules/SectionGhostHeader';
import { paletteHex } from '@/theme/palette';

type Props = {
  title: string;
  description: string;
  resultLabel: string;
};

/** Scrolls with the catalog — editorial title block that merges with the tab canvas. */
export const ExploreCatalogIntro = memo(function ExploreCatalogIntro({
  title,
  description,
  resultLabel,
}: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <View className="pb-5 pt-1" accessibilityRole="none">
      <SectionGhostHeader
        leading={
          <FontAwesomeCircleIcon
            name="compass"
            circleSize={SECTION_GHOST_HEADER_LEADING_SIZE}
            accessibilityLabel={t('screens.explore.sectionLeadingA11y')}
          />
        }
        title={title}
        description={description}
        className="mb-0"
      />
      <Text
        accessibilityRole="text"
        style={{ color: paletteHex.ritual.inkMuted[k] }}
        className="mt-2 pl-[42px] font-medium text-[12px] leading-[16px]"
      >
        {resultLabel}
      </Text>
    </View>
  );
});
