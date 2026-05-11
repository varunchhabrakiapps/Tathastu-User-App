import type { ImageSourcePropType } from 'react-native';

/**
 * Login hero sizing — aligned with onboarding hero math but slightly shorter so story + auth breathe.
 */
export const LOGIN_HERO_ART = {
  maxHeight: 276,
  widthFactor: 0.82,
  minHeight: 212,
  windowHeightFactor: 0.3,
  heightScale: 1,
} as const;

/** Bundled login hero — wide brand illustration (spiritual-tech narrative). */
export const LOGIN_HERO_SOURCE: ImageSourcePropType = require('../../assets/images/login/login-graphic.png');
