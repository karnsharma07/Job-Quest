import { useColorScheme as _useColorScheme } from 'react-native';

/**
 * Hook to get current color scheme: 'light' | 'dark'
 */
export const useColorScheme = () => {
  return _useColorScheme();
};
