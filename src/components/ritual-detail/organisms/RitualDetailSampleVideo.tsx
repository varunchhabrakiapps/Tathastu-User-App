import type { ImageSourcePropType } from 'react-native';
import { Image, Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';
import { useColorScheme } from 'nativewind';

import { RitualDetailCard } from '@/components/ritual-detail/molecules/RitualDetailCard';
import { RitualDetailSectionHeader } from '@/components/ritual-detail/molecules/RitualDetailSectionHeader';
import { paletteHex } from '@/theme/palette';

import { cn } from '@/utils/cn';

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  thumbnailSource: ImageSourcePropType;
  thumbnailAccessibilityLabel: string;
  ctaLabel: string;
  disabledHint: string;
  onPlayPress?: () => void;
};

/** Sample-recording preview — poster, play affordance, copy (wire `onPlayPress` when clips ship). */
export function RitualDetailSampleVideo({
  eyebrow,
  title,
  body,
  thumbnailSource,
  thumbnailAccessibilityLabel,
  ctaLabel,
  disabledHint,
  onPlayPress,
}: Props) {
  const { colorScheme } = useColorScheme();
  const key = colorScheme === 'dark' ? 'dark' : 'light';
  const playColor = paletteHex.ritual.primary[key];
  const disabled = !onPlayPress;

  return (
    <View className="gap-3">
      <RitualDetailSectionHeader eyebrow={eyebrow} title={title} />

      <RitualDetailCard contentClassName="none" className="overflow-hidden">
        <View className="w-full" style={{ aspectRatio: 16 / 9 }}>
          <Image
            source={thumbnailSource}
            accessibilityLabel={thumbnailAccessibilityLabel}
            accessibilityRole="image"
            className="absolute inset-0 h-full w-full"
            resizeMode="cover"
          />
          <View
            className={cn(
              'absolute inset-0 items-center justify-center',
              disabled ? 'bg-black/38' : 'bg-black/28',
            )}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={ctaLabel}
              accessibilityHint={disabled ? disabledHint : undefined}
              accessibilityState={{ disabled }}
              disabled={disabled}
              onPress={onPlayPress}
              className={cn(
                'h-16 w-16 items-center justify-center rounded-full bg-ritual-surface/95 dark:bg-ritual-surface-dark/95',
                !disabled && 'active:opacity-90',
              )}
            >
              <FontAwesome name="play-circle" size={44} color={playColor} />
            </Pressable>
          </View>
        </View>

        <View className="gap-1.5 px-4 py-3">
          <Text className="text-login-body leading-relaxed text-ritual-ink dark:text-ritual-ink-dark">
            {body}
          </Text>
          {disabled ? (
            <Text className="text-[12px] font-medium leading-[17px] text-ritual-inkMuted dark:text-ritual-inkMuted-dark">
              {disabledHint}
            </Text>
          ) : null}
        </View>
      </RitualDetailCard>
    </View>
  );
}
