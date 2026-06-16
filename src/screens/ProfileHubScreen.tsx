import { View } from 'react-native';

import { LocationHeaderChip } from '@/components/molecules/LocationHeaderChip';
import { ProfileIdentityHero } from '@/components/molecules/ProfileIdentityHero';
import { ProfileNavRow } from '@/components/molecules/ProfileNavRow';
import { ProfileSectionCard } from '@/components/molecules/ProfileSectionCard';
import { ProfileHubScrollLayout } from '@/components/templates/ProfileHubScrollLayout';
import { useProfileHubModel } from '@/hooks/useProfileHubModel';

/**
 * Primary destination for the Profile tab — ritual backdrop, premium identity slab, then calm
 * grouped sections (journey · preferences · support · account). Composition only; the view-model
 * lives in {@link useProfileHubModel}.
 */
export function ProfileHubScreen() {
  const { identity, sections } = useProfileHubModel();

  return (
    <ProfileHubScrollLayout>
      <View className="flex-1 px-5 pt-4">
        <View className="mb-4">
          <LocationHeaderChip accessibilityLabelKey="screens.profile.locationA11y" />
        </View>
        <View className="mb-7">
          <ProfileIdentityHero {...identity} />
        </View>

        {sections.map((section) => (
          <ProfileSectionCard key={section.key} title={section.title} caption={section.caption}>
            {section.rows.map((row, index) => (
              <ProfileNavRow
                key={row.key}
                icon={row.icon}
                label={row.label}
                value={row.value}
                onPress={row.onPress}
                accessibilityHint={row.accessibilityHint}
                tone={row.tone}
                isLast={index === section.rows.length - 1}
              />
            ))}
          </ProfileSectionCard>
        ))}
      </View>
    </ProfileHubScrollLayout>
  );
}
