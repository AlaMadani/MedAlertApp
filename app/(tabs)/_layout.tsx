import { Tabs } from 'expo-router';
import { Calendar, Home, List, Plus, Settings } from 'lucide-react-native'; // We installed this!
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // Example color
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        headerShown: false, // We will add custom headers in each screen
      }}
    >
      <Tabs.Screen
        name="index" // This links to app/(tabs)/index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="add" // This links to app/(tabs)/add.tsx
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <Plus color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="list" // This links to app/(tabs)/list.tsx
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <List color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="schedule" // This links to app/(tabs)/schedule.tsx
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings" // This links to app/(tabs)/settings.tsx
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}