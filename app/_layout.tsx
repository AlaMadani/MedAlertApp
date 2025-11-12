// MedAlertNative/app/_layout.tsx

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* This screen links to our tab bar layout */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* This screen is our new detail page */}
      <Stack.Screen name="medicine-detail" />
    </Stack>
  );
}