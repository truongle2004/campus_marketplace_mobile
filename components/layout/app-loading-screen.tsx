import { ActivityIndicator, StyleSheet } from "react-native";

import { Image } from "expo-image";

import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

const appIcon = require("@/assets/images/icon.png");

export function AppLoadingScreen() {
  const tintColor = useThemeColor({}, "tint");

  return (
    <ThemedView style={styles.container}>
      <Image source={appIcon} style={styles.icon} contentFit="contain" />
      <ActivityIndicator size="large" color={tintColor} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  icon: {
    width: 120,
    height: 120,
  },
});
