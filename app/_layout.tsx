import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="add-review" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="restaurant-register" options={{ headerShown: false }} />
        <Stack.Screen name="restaurant-menu-manager" options={{ headerShown: false }} />
        <Stack.Screen name="restaurant-details" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="favorites" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
