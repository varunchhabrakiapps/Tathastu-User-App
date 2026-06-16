import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { AppButton } from '@/components/atoms/AppButton';
import { GlassDismissButton } from '@/components/atoms/GlassDismissButton';
import { LiquidGlassMaterial } from '@/components/atoms/LiquidGlassMaterial';
import { SectionEyebrow } from '@/components/atoms/SectionEyebrow';
import { WishlistToggleButton } from '@/components/atoms/WishlistToggleButton';
import {
  RITUAL_PREVIEW_CORNER_RADIUS,
  RITUAL_PREVIEW_COVER_MAX_HEIGHT,
  RITUAL_PREVIEW_COVER_RATIO,
  RITUAL_PREVIEW_FOOTER_HEIGHT,
  RITUAL_PREVIEW_HANDLE_HEIGHT,
  RITUAL_PREVIEW_MAX_HEIGHT_FRACTION,
  RITUAL_PREVIEW_MAX_WIDTH,
} from '@/constants/exploreLayout';
import { QUICK_PREVIEW_MOTION } from '@/constants/quickPreviewMotion';
import { trendingRitualCoverSource } from '@/constants/trendingRitualCovers';
import type { TrendingRitualId } from '@/domain/trendingRitual';
import type { RitualQuickPreview } from '@/hooks/useExploreRitualPreview';
import { useRitualQuickPreviewSheetMotion } from '@/hooks/useRitualQuickPreviewSheetMotion';
import { hexToRgba } from '@/theme/colorUtils';
import { paletteHex } from '@/theme/palette';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SCRIM_COLOR = 'rgba(17,13,10,0.62)';

type Props = {
  preview: RitualQuickPreview | null;
  onClose: () => void;
  onOpenDetail: (id: TrendingRitualId) => void;
};

/**
 * Long-press quick preview — chrome glass card (ritual detail language), compact hero,
 * scrollable body, sticky price + CTA footer. Drag down to dismiss with scale + fade.
 */
export const RitualQuickPreviewSheet = memo(function RitualQuickPreviewSheet({
  preview,
  onClose,
  onOpenDetail,
}: Props) {
  const { t } = useTranslation();
  const [data, setData] = useState<RitualQuickPreview | null>(null);
  const [rendered, setRendered] = useState(false);

  const finishClose = useCallback(() => {
    setRendered(false);
    onClose();
  }, [onClose]);

  const { panGesture, backdropStyle, cardStyle, close } = useRitualQuickPreviewSheetMotion({
    isOpen: preview !== null,
    onDismissComplete: finishClose,
  });

  useEffect(() => {
    if (preview) {
      setData(preview);
      setRendered(true);
    } else {
      setRendered(false);
    }
  }, [preview]);

  return (
    <Modal
      visible={rendered}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={close}
    >
      <GestureHandlerRootView style={styles.flex}>
        <View style={styles.center}>
          <AnimatedPressable
            accessibilityRole="button"
            accessibilityLabel={t('screens.explore.preview.dragHintA11y')}
            onPress={close}
            style={[styles.backdrop, backdropStyle]}
          />
          {data ? (
            <Animated.View style={[cardStyle, styles.cardShell]}>
              <GestureDetector gesture={panGesture}>
                <QuickPreviewCard data={data} onClose={close} onOpenDetail={onOpenDetail} />
              </GestureDetector>
            </Animated.View>
          ) : null}
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
});

type CardProps = {
  data: RitualQuickPreview;
  onClose: () => void;
  onOpenDetail: (id: TrendingRitualId) => void;
};

const QuickPreviewCard = memo(function QuickPreviewCard({ data, onClose, onOpenDetail }: CardProps) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { width, height } = useWindowDimensions();
  const k = colorScheme === 'dark' ? 'dark' : 'light';

  const cardWidth = Math.min(width - 32, RITUAL_PREVIEW_MAX_WIDTH);
  const maxCardHeight = Math.round(height * RITUAL_PREVIEW_MAX_HEIGHT_FRACTION);
  const coverHeight = Math.min(Math.round(cardWidth * RITUAL_PREVIEW_COVER_RATIO), RITUAL_PREVIEW_COVER_MAX_HEIGHT);
  const scrollMaxHeight = Math.max(
    96,
    maxCardHeight - coverHeight - RITUAL_PREVIEW_HANDLE_HEIGHT - RITUAL_PREVIEW_FOOTER_HEIGHT,
  );

  const coverSource = useMemo(() => trendingRitualCoverSource(data.id), [data.id]);

  const { copy } = data;
  const mutedColor = paletteHex.ritual.inkMuted[k];
  const inkColor = paletteHex.ritual.ink[k];
  const primaryColor = paletteHex.ritual.primary[k];
  const checkColor = paletteHex.accent[k];
  const heroScrim = paletteHex.ritual.ink.light;

  const iosShadow =
    k === 'dark'
      ? { shadowColor: paletteHex.ritual.primary.dark }
      : { shadowColor: hexToRgba(paletteHex.ritual.primary.light, 0.35) };

  return (
    <View
      accessibilityViewIsModal
      accessibilityLabel={t('screens.explore.preview.sheetA11y', { ritual: copy.title })}
      style={[
        styles.card,
        { width: cardWidth, maxHeight: maxCardHeight },
        Platform.OS === 'ios' ? iosShadow : styles.cardShadowAndroid,
      ]}
      className="relative"
    >
      <LiquidGlassMaterial
        preset="chrome"
        elevated
        borderRadius={RITUAL_PREVIEW_CORNER_RADIUS}
        className="overflow-hidden"
      >
        <View className="items-center pb-1 pt-2.5">
          <View
            style={styles.dragHandle}
            className="rounded-full bg-ritual-borderSoft/80 dark:bg-ritual-borderSoft-dark/70"
          />
        </View>

        <View style={{ height: coverHeight }} className="overflow-hidden">
          <Image source={coverSource} resizeMode="cover" style={StyleSheet.absoluteFill} accessible={false} />
          <LinearGradient
            pointerEvents="none"
            colors={[hexToRgba(heroScrim, 0), hexToRgba(heroScrim, 0.08), hexToRgba(heroScrim, 0.88)]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
          />

          <View pointerEvents="none" className="absolute inset-x-0 bottom-0 px-4 pb-3.5 pt-10">
            <Text
              accessibilityRole="header"
              numberOfLines={2}
              className="font-semibold text-[20px] leading-[25px] tracking-[-0.02em] text-white"
              style={styles.heroTitleShadow}
            >
              {copy.title}
            </Text>
            <Text
              numberOfLines={1}
              className="mt-0.5 font-medium text-[12px] leading-[16px] tracking-[0.02em] text-white/88"
              style={styles.heroSubtitleShadow}
            >
              {copy.cardSubtitle}
            </Text>
          </View>
        </View>

        <ScrollView
          style={[styles.scrollBody, { maxHeight: scrollMaxHeight }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ color: inkColor }} className="font-normal text-[15px] leading-[23px]">
            {copy.description}
          </Text>

          <View className="mt-3.5 flex-row items-center gap-2 self-start rounded-full border border-ritual-borderSoft/50 px-3 py-1.5 dark:border-ritual-borderSoft-dark/40">
            <FontAwesome name="line-chart" size={11} color={primaryColor} importantForAccessibility="no" />
            <Text numberOfLines={1} style={{ color: mutedColor }} className="font-medium text-[11px] leading-[14px]">
              {copy.socialProof}
            </Text>
          </View>

          <View className="mt-5">
            <SectionEyebrow label={t('screens.explore.preview.highlightsTitle')} />
            <View className="gap-2.5 rounded-[18px] border border-ritual-borderSoft/35 px-3.5 py-3.5 dark:border-ritual-borderSoft-dark/30">
              {copy.highlights.map((line, index) => (
                <View key={`${index}-${line.slice(0, 24)}`} className="flex-row items-start gap-2.5">
                  <View className="mt-0.5 h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-ritual-surfaceSecondary/90 dark:bg-ritual-surfaceSecondary-dark/80">
                    <FontAwesome name="check" size={10} color={checkColor} importantForAccessibility="no" />
                  </View>
                  <Text style={{ color: inkColor }} className="flex-1 font-normal text-[13px] leading-[19px]">
                    {line}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View className="border-t border-ritual-borderSoft/35 px-4 pb-4 pt-3.5 dark:border-ritual-borderSoft-dark/30">
          <View className="mb-3.5 flex-row items-center justify-between gap-3">
            <View className="min-w-0 flex-1">
              <Text style={{ color: primaryColor }} className="font-semibold text-[20px] leading-[24px]">
                {copy.priceGlance}
              </Text>
              <Text numberOfLines={2} style={{ color: mutedColor }} className="mt-0.5 font-normal text-[11px] leading-[15px]">
                {copy.priceNote}
              </Text>
            </View>
            <WishlistToggleButton ritualId={data.id} ritualTitle={copy.title} />
          </View>

          <AppButton
            variant="solid"
            label={t('screens.explore.preview.viewDetails')}
            accessibilityLabel={t('screens.explore.preview.viewDetailsA11y', { ritual: copy.title })}
            onPress={() => onOpenDetail(data.id)}
          />
        </View>
      </LiquidGlassMaterial>

      <View style={styles.dismissAnchor} pointerEvents="box-none">
        <GlassDismissButton
          onHero
          accessibilityLabel={t('screens.explore.preview.closeA11y')}
          onPress={onClose}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: SCRIM_COLOR,
  },
  cardShell: {
    width: '100%',
    maxWidth: RITUAL_PREVIEW_MAX_WIDTH,
    alignSelf: 'center',
  },
  card: {
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.28,
    shadowRadius: 36,
    elevation: 18,
  },
  cardShadowAndroid: {
    elevation: 12,
  },
  dragHandle: {
    width: QUICK_PREVIEW_MOTION.dragHandleWidth,
    height: QUICK_PREVIEW_MOTION.dragHandleHeight,
  },
  dismissAnchor: {
    position: 'absolute',
    top: RITUAL_PREVIEW_HANDLE_HEIGHT + 6,
    right: 10,
    zIndex: 30,
  },
  scrollBody: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  heroTitleShadow: {
    textShadowColor: 'rgba(0,0,0,0.42)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  heroSubtitleShadow: {
    textShadowColor: 'rgba(0,0,0,0.36)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 4,
  },
});
