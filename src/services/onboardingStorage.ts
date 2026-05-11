import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tathastu/onboarding-completed';

export async function getOnboardingCompleted(): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw === '1';
  } catch {
    return false;
  }
}

export async function setOnboardingCompleted(): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, '1');
}
