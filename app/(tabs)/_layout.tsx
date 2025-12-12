import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { COLORS } from '../../src/constants/theme'; 

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary, 
        tabBarInactiveTintColor: COLORS.textSub,
        tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.border,
            height: 60, 
            paddingBottom: 8,
            paddingTop: 8,
        },
        headerShown: false, 
      }}>
      
      {/* 1. Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* 2. Saved Jobs Tab */}
      <Tabs.Screen
        name="saved-jobs" 
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />

      {/* 3. Notifications Tab */}
      <Tabs.Screen
        name="notifications" 
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />

      {/* 4. Application Tracker Tab */}
      <Tabs.Screen
        name="application-tracker" 
        options={{
          title: 'Tracker',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
        }}
      />

      {/* --- HIDDEN FILES --- */}
      
      <Tabs.Screen 
        name="explore" 
        options={{ href: null }}
      />
      <Tabs.Screen 
        name="job-list" 
        options={{ href: null }}
      />
    </Tabs>
  );
}