import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthContext';
import type { ProfileStackParamList } from '@/navigation/types';
import { formatLoginMobileForDisplay } from '@/utils/mobile';

/** Generous cap — names stay on one calm line without truncating most cultures. */
const MAX_NAME_LENGTH = 40;

type EditProfileNav = StackNavigationProp<ProfileStackParamList, 'EditProfile'>;

/**
 * Edit-profile orchestration — local draft of the display name, persistence via Auth, and
 * dismissal. Keeps validation + navigation side effects out of the presentational screen.
 */
export function useEditProfileForm() {
  const { t } = useTranslation();
  const navigation = useNavigation<EditProfileNav>();
  const { user, updateProfile } = useAuth();

  const initialName = user?.displayName?.trim() ?? '';
  const [name, setName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);

  const trimmed = name.trim();
  const isDirty = trimmed !== initialName;
  const canSave = isDirty && !isSaving;

  const mobileDisplay = useMemo(() => {
    const digits = user?.mobileNumber;
    return digits ? formatLoginMobileForDisplay(digits) : '—';
  }, [user?.mobileNumber]);

  const onSave = useCallback(async () => {
    if (isSaving || !isDirty) {
      return;
    }
    setIsSaving(true);
    try {
      await updateProfile({ displayName: trimmed });
      navigation.goBack();
    } catch {
      setIsSaving(false);
    }
  }, [isDirty, isSaving, navigation, trimmed, updateProfile]);

  return {
    t,
    name,
    onChangeName: setName,
    onSave,
    canSave,
    isSaving,
    maxNameLength: MAX_NAME_LENGTH,
    mobileDisplay,
  };
}
