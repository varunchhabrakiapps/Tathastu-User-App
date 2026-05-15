import { Linking } from 'react-native';

/** Opens HTTPS/mailto URLs when the OS can handle them — failures are swallowed (caller may log later). */
export async function openExternalUrl(url: string): Promise<boolean> {
  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      return false;
    }
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}
