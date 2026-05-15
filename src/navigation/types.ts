import type { NavigatorScreenParams } from '@react-navigation/native';

export type ProfileStackParamList = {
  ProfileHub: undefined;
  Settings: undefined;
  Help: undefined;
  Notifications: undefined;
  LegalInfo: undefined;
  About: undefined;
};

/** Core journeys — avoid utility-first tabs like Help or Settings here. */
export type RootTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Explore: { momentCategoryId?: string };
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  OtpVerification: { mobile: string };
  Main: NavigatorScreenParams<RootTabParamList>;
  BookingDetail: { bookingId: string };
  RitualDetail: { ritualId: string };
  BuildCustomRitual: undefined;
  Search: undefined;
};
