import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RequirePermission } from "@/components/auth/require-permission";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { permissions } from "@/config/permissions";

export default function SellScreen() {
  return (
    <RequirePermission check={permissions.createListing}>
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.content}>
          <ThemedText type="title">Sell an item</ThemedText>
          <View style={styles.card}>
            <ThemedText>
              This screen requires the{" "}
              <ThemedText type="defaultSemiBold">
                org:listings:create
              </ThemedText>{" "}
              permission in Clerk.
            </ThemedText>
          </View>
        </SafeAreaView>
      </ThemedView>
    </RequirePermission>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  card: {
    gap: 8,
  },
});
