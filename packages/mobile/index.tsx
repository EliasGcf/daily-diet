import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

export function App() {
  // @ts-ignore
  const ctx = require.context("./src/app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
