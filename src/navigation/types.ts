import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  OtpVerification: { mobile: string };
  Main: undefined;
  BookingDetail: { bookingId: string };
};

export type ProfileStackParamList = {
  ProfileHub: undefined;
  Settings: undefined;
  Help: undefined;
};

/** Core journeys — avoid utility-first tabs like Help or Settings here. */
export type RootTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Explore: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};
