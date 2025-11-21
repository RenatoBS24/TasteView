import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size ?? 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="restaurants"
        options={{
          title: 'Restaurantes',
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size ?? 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú 3D',
          tabBarIcon: ({ color, size }) => <Ionicons name="cube" size={size ?? 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size ?? 24} color={color} />,
        }}
      />
       <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notificaciones',
          tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={size ?? 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size ?? 24} color={color} />,
        }}
      />
     
    </Tabs>
  );
}
