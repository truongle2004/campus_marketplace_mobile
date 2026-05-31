import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import type { Listing } from "@/features/home/data/listings";
import { useThemeColor } from "@/hooks/use-theme-color";

type Props = {
  listing: Listing;
};

export function ListingCard({ listing }: Props) {
  const borderColor = useThemeColor(
    { light: "#E2E8F0", dark: "#2A2D30" },
    "icon",
  );

  return (
    <ThemedView
      style={[styles.card, { borderColor }]}
      lightColor="#F8FAFC"
      darkColor="#1C1F22"
    >
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold">{listing.title}</ThemedText>
        <ThemedText type="defaultSemiBold">${listing.price}</ThemedText>
      </View>
      <ThemedText style={styles.meta}>
        {listing.category} · {listing.location}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  meta: {
    opacity: 0.7,
  },
});
