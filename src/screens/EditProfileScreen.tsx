import { View } from 'react-native';

import { RitualText } from '@/components/atoms/RitualText';
import { LabeledTextField } from '@/components/atoms/LabeledTextField';
import { PrimaryGlassButton } from '@/components/atoms/PrimaryGlassButton';
import { ProfileAvatar } from '@/components/atoms/ProfileAvatar';
import { LoginAuthSurface } from '@/components/molecules/LoginAuthSurface';
import { ProfileSectionCard } from '@/components/molecules/ProfileSectionCard';
import { ProfileStackScrollLayout } from '@/components/templates/ProfileStackScrollLayout';
import { useEditProfileForm } from '@/hooks/useEditProfileForm';
import { initialsFromDisplayName } from '@/utils/profileDisplay';

/** Edit display name (feeds the Home greeting) + a calm preview of profile detail coming later. */
export function EditProfileScreen() {
  const { t, name, onChangeName, onSave, canSave, isSaving, maxNameLength, mobileDisplay } =
    useEditProfileForm();

  return (
    <ProfileStackScrollLayout
      title={t('screens.editProfile.title')}
      backAccessibilityLabel={t('screens.profile.stackBackA11y')}
    >
      <RitualText variant="inkMuted" className="mb-7 text-login-body leading-relaxed">
        {t('screens.editProfile.subtitle')}
      </RitualText>

      <View className="mb-7 items-center">
        <ProfileAvatar
          initials={initialsFromDisplayName(name)}
          accessibilityLabel={t('screens.profile.avatarA11y')}
          size={84}
        />
      </View>

      <LoginAuthSurface>
        <View className="gap-5 px-5">
          <View>
            <LabeledTextField
              tone="ritual"
              label={t('screens.editProfile.nameLabel')}
              placeholder={t('screens.editProfile.namePlaceholder')}
              value={name}
              onChangeText={onChangeName}
              maxLength={maxNameLength}
              autoComplete="name"
              textContentType="name"
              accessibilityLabel={t('screens.editProfile.nameLabel')}
              returnKeyType="done"
              onSubmitEditing={onSave}
            />
            <RitualText variant="inkMuted" className="mt-2 text-login-label leading-snug">
              {t('screens.editProfile.nameHelper')}
            </RitualText>
          </View>

          <View>
            <LabeledTextField
              tone="ritual"
              label={t('screens.editProfile.mobileLabel')}
              value={mobileDisplay}
              editable={false}
              accessibilityLabel={t('screens.editProfile.mobileLabel')}
            />
            <RitualText variant="inkMuted" className="mt-2 text-login-label leading-snug">
              {t('screens.editProfile.mobileLockedHint')}
            </RitualText>
          </View>
        </View>
      </LoginAuthSurface>

      <PrimaryGlassButton
        label={t('screens.editProfile.save')}
        onPress={onSave}
        disabled={!canSave}
        loading={isSaving}
        className="mt-7"
      />

      <ProfileSectionCard title={t('screens.editProfile.comingSoonTitle')} className="mt-8">
        <View className="px-4 py-4">
          <RitualText variant="inkMuted" className="text-login-body leading-relaxed">
            {t('screens.editProfile.comingSoonBody')}
          </RitualText>
        </View>
      </ProfileSectionCard>
    </ProfileStackScrollLayout>
  );
}
