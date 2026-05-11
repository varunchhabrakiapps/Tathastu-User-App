import { useTranslation } from 'react-i18next';
import {
  InputAccessoryView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

import { RitualPhoneField } from '@/components/atoms/RitualPhoneField';

const LOGIN_PHONE_INPUT_ACCESSORY_ID = 'loginPhoneInputAccessory';

type Props = {
  label: string;
  prefix: string;
  placeholder: string;
  value: string;
  maxLength?: number;
  onChangeText: (text: string) => void;
  onSubmitPrimary: () => void;
  editable: boolean;
  errorText: string | null;
  accessibilityLabel: string;
};

/**
 * India mobile — phone pad, iOS accessory Done, IME done where available.
 */
export function PhoneInput({
  label,
  prefix,
  placeholder,
  value,
  maxLength = 10,
  onChangeText,
  onSubmitPrimary,
  editable,
  errorText,
  accessibilityLabel,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      {Platform.OS === 'ios' ? (
        <InputAccessoryView nativeID={LOGIN_PHONE_INPUT_ACCESSORY_ID}>
          <View className="flex-row items-center justify-end bg-ritual-canvas/98 px-3 py-2.5 dark:bg-ritual-canvas-dark/98">
            <Pressable
              onPress={onSubmitPrimary}
              accessibilityRole="button"
              accessibilityLabel={t('common.done')}
              hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
            >
              <Text className="text-base font-semibold text-ritual-primary dark:text-ritual-primary-dark">
                {t('common.done')}
              </Text>
            </Pressable>
          </View>
        </InputAccessoryView>
      ) : null}

      <RitualPhoneField
        label={label}
        prefix={prefix}
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="phone-pad"
        autoComplete="tel"
        textContentType="telephoneNumber"
        editable={editable}
        errorText={errorText}
        accessibilityLabel={accessibilityLabel}
        returnKeyType="done"
        blurOnSubmit
        onSubmitEditing={onSubmitPrimary}
        inputAccessoryViewID={
          Platform.OS === 'ios' ? LOGIN_PHONE_INPUT_ACCESSORY_ID : undefined
        }
      />
    </>
  );
}
