import { memo } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static';

import { IconButton } from '@/components/atoms/IconButton';
import { useRitualSemanticColors } from '@/hooks/useRitualSemanticColors';
import { hexToRgba } from '@/theme/colorUtils';

type Props = {
  title: string;
  onBackPress: () => void;
  backAccessibilityLabel: string;
};

/**
 * Custom chrome for profile nested stack — mirrors {@link AuthFlowHeader} back affordance
 * with an editorial title block (no React Navigation default header).
 */
export const ProfileStackHeader = memo(function ProfileStackHeader({
  title,
  onBackPress,
  backAccessibilityLabel,
}: Props) {
  const { ink, isDark } = useRitualSemanticColors();
  const iconColor = hexToRgba(ink, isDark ? 0.78 : 0.82);

  return (
    <View className="px-5 pb-4">
      <IconButton
        onPress={onBackPress}
        accessibilityLabel={backAccessibilityLabel}
        className="self-start"
      >
        <FontAwesome
          name="angle-left"
          size={22}
          color={iconColor}
          importantForAccessibility="no-hide-descendants"
        />
      </IconButton>
      <Text
        accessibilityRole="header"
        numberOfLines={2}
        style={{ color: ink }}
        className="mt-3 font-medium leading-snug text-login-display"
      >
        {title}
      </Text>
    </View>
  );
});
