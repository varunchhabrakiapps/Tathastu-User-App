/**
 * Central place for development-only feature toggles.
 * Add new flags here with short docs on what they do when on vs off.
 */

/**
 * When `true` (flip the right-hand side to `true` while developing): every
 * **cold start** opens the unauthenticated stack on **Onboarding**, as if
 * onboarding had never been completed. You can still tap Continue and reach
 * **Login** for this session; the next full app launch shows Onboarding again.
 * While enabled, completing onboarding does **not** write to persistence, so
 * storage matches this repeat flow.
 *
 * When `false` (release and the default in dev): `useOnboardingHydration` reads
 * `@tathastu/onboarding-completed` from storage. If the user finished
 * onboarding before, the initial auth route is **Login**; otherwise
 * **Onboarding** (`RootNavigator` `authInitialRoute`).
 */
export const DEV_ALWAYS_SHOW_ONBOARDING = __DEV__ && true;
