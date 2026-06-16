import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

import { EXPLORE_SORT_OPTIONS, type ExploreSortOption } from '@/domain/exploreSort';
import { useExploreSortSheetMotion } from '@/hooks/useExploreSortSheetMotion';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';
import { cn } from '@/utils/cn';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  visible: boolean;
  selected: ExploreSortOption;
  onSelect: (option: ExploreSortOption) => void;
  onClose: () => void;
};

/**
 * Bottom sheet for catalog sort — slides up over a dimmed scrim; drag down to dismiss.
 */
export const ExploreSortSheet = memo(function ExploreSortSheet({
  visible,
  selected,
  onSelect,
  onClose,
}: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [rendered, setRendered] = useState(false);

  const finishClose = useCallback(() => {
    setRendered(false);
    onClose();
  }, [onClose]);

  const { panGesture, backdropStyle, sheetStyle, close } = useExploreSortSheetMotion({
    isOpen: visible,
    onDismissComplete: finishClose,
  });

  useEffect(() => {
    if (visible) {
      setRendered(true);
      return;
    }

    if (rendered) {
      close();
    }
  }, [visible, rendered, close]);

  const onPick = useCallback(
    (option: ExploreSortOption) => {
      onSelect(option);
      close();
    },
    [onSelect, close],
  );

  return (
    <Modal
      visible={rendered}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={close}
    >
      <GestureHandlerRootView style={styles.flex}>
        <View style={styles.flex}>
          <AnimatedPressable
            accessibilityRole="button"
            accessibilityLabel={t('screens.explore.sort.closeA11y')}
            onPress={close}
            style={[styles.backdrop, backdropStyle]}
          />
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[sheetStyle, { paddingBottom: Math.max(insets.bottom, 16) }]}
              className="absolute inset-x-0 bottom-0 rounded-t-[28px] border border-ritual-borderSoft/70 bg-ritual-surface px-5 pt-3 dark:border-ritual-borderSoft-dark/55 dark:bg-ritual-surface-dark"
            >
              <View className="mb-4 items-center">
                <View className="h-1 w-10 rounded-full bg-ritual-borderSoft dark:bg-ritual-borderSoft-dark" />
              </View>

              <Text
                accessibilityRole="header"
                className="mb-3 font-semibold text-[17px] leading-[22px] text-ritual-ink dark:text-ritual-ink-dark"
              >
                {t('screens.explore.sort.sheetTitle')}
              </Text>

              <View accessibilityRole="radiogroup" accessibilityLabel={t('screens.explore.sort.sheetA11y')}>
                {EXPLORE_SORT_OPTIONS.map((option) => (
                  <SortOptionRow
                    key={option}
                    label={t(`screens.explore.sort.options.${option}`)}
                    selected={selected === option}
                    onPress={() => onPick(option)}
                  />
                ))}
              </View>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
});

type RowProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const SortOptionRow = memo(function SortOptionRow({ label, selected, onPress }: RowProps) {
  const { colorScheme } = useColorScheme();
  const k = colorScheme === 'dark' ? 'dark' : 'light';
  const checkColor = paletteHex.accent[k];

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={cn(
        'mb-2 flex-row items-center justify-between rounded-[16px] border px-4 py-3.5 active:opacity-90',
        selected
          ? 'border-ritual-primary/30 bg-ritual-primary/10 dark:border-ritual-primary-dark/35 dark:bg-ritual-primary-dark/14'
          : 'border-ritual-borderSoft/60 bg-ritual-surfaceSecondary/50 dark:border-ritual-borderSoft-dark/45 dark:bg-ritual-surfaceSecondary-dark/40',
      )}
    >
      <Text
        style={{ color: selected ? paletteHex.ritual.primary[k] : paletteHex.ritual.ink[k] }}
        className="flex-1 font-medium text-[15px] leading-[20px]"
      >
        {label}
      </Text>
      {selected ? (
        <FontAwesome name="check" size={14} color={checkColor} importantForAccessibility="no" />
      ) : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: hexToRgba(paletteHex.ritual.ink.light, 1),
  },
});
