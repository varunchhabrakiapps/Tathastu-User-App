import { useTranslation } from 'react-i18next';
import {
  InputAccessoryView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

import { LabeledTextField } from '@/components/atoms/LabeledTextField';

const LOGIN_MOBILE_INPUT_ACCESSORY_ID = 'loginMobileInputAccessory';

type Props = {
  label: string;
  prefix: string;
  placeholder: string;
  value: string;
  maxLength?: number;
  onChangeText: (text: string) => void;
  /** Continue / keyboard Done / IME action — dismiss + validation live in the caller hook. */
  onSubmitPrimary: () => void;
  editable: boolean;
  errorText: string | null;
  accessibilityLabel: string;
  inputClassName?: string;
};

/**
 * Indian mobile entry: phone pad, Done via IME where available, iOS accessory toolbar
 * (phone-pad has no Return key on iOS — `returnKeyType` alone is insufficient there).
 */
export function LoginMobileNumberField({
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
  inputClassName,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      {Platform.OS === 'ios' ? (
        <InputAccessoryView nativeID={LOGIN_MOBILE_INPUT_ACCESSORY_ID}>
          <View className="flex-row items-center justify-end border-t border-border bg-canvas px-3 py-2 dark:border-border-dark dark:bg-canvas-dark">
            <Pressable
              onPress={onSubmitPrimary}
              accessibilityRole="button"
              accessibilityLabel={t('common.done')}
              hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
            >
              <Text className="text-base font-semibold text-primary dark:text-primary-dark">
                {t('common.done')}
              </Text>
            </Pressable>
          </View>
        </InputAccessoryView>
      ) : null}

      <LabeledTextField
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
        inputClassName={inputClassName}
        returnKeyType="done"
        blurOnSubmit
        onSubmitEditing={onSubmitPrimary}
        inputAccessoryViewID={
          Platform.OS === 'ios' ? LOGIN_MOBILE_INPUT_ACCESSORY_ID : undefined
        }
      />
    </>
  );
}
