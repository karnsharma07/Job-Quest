import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  const theme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme === 'dark' ? 'white' : 'black',
      }}
    >
      {/* Add your tab screens here */}
    </Tabs>
  );
}
