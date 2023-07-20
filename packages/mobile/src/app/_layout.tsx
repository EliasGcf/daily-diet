import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { AuthProvider } from '@hooks/useAuth';

import { queryClient } from '@lib/react-query';

import { theme } from '@shared/theme';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [canRedirect, setCanRedirect] = useState(false);

  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider canRedirect={canRedirect}>
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1 }} onLayout={() => setCanRedirect(true)}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.white },
            }}
          />
        </View>
      </QueryClientProvider>
    </AuthProvider>
  );
}
