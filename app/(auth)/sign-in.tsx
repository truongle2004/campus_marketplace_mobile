import { AuthView } from "@clerk/expo/native";
import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed/themed-view";

export default function SignInScreen() {
  return (
    <ThemedView style={styles.container}>
      <AuthView mode="signInOrUp" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
