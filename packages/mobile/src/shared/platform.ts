import { Platform as RNPlatform } from 'react-native';

export const Platform = {
  ...RNPlatform,
  OS: RNPlatform.OS as 'ios' | 'android',
};
