import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "No native splash screen registered for given view controller. Call 'SplashScreen.show' for given view controller first.",
]);

export function App() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const ctx = require.context('./src/app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
