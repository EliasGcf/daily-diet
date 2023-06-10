import { SplashScreen, Slot } from 'expo-router';

import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';
import { useFonts } from 'expo-font';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  if (!fontsLoaded) return <SplashScreen />;

  return <Slot />;
}
