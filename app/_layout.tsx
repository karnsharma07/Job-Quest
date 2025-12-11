import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorScheme === 'dark' ? 'white' : 'black',
      }}
    >
      {/* Define your tabs here */}
    </Tabs>
  );
}
