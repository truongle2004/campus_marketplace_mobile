import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { Show } from "@clerk/expo";
import { UserButton } from "@clerk/expo/native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { permissions } from "@/config/permissions";
import { Colors } from "@/constants/theme";
import { ListingCard } from "@/features/home/components/listing-card";
import { categories, featuredListings } from "@/features/home/data/listings";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";

export function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const textColor = useThemeColor({}, "text");
  const tintColor = Colors[colorScheme].tint;
  const inputBackground = useThemeColor(
    { light: "#F1F5F9", dark: "#1C1F22" },
    "background",
  );
  const inputBorder = useThemeColor(
    { light: "#E2E8F0", dark: "#2A2D30" },
    "icon",
  );
  const chipBackground = useThemeColor(
    { light: "#E8F4F8", dark: "#1E3A44" },
    "background",
  );

  const filteredListings =
    selectedCategory === "All"
      ? featuredListings
      : featuredListings.filter(
          (listing) => listing.category === selectedCategory,
        );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <ThemedText type="title">Campus Marketplace</ThemedText>
              <ThemedText style={styles.subtitle}>
                Buy and sell with students near you
              </ThemedText>
            </View>
            <View style={styles.userButton}>
              <UserButton />
            </View>
          </View>

          <Show when={permissions.createListing}>
            <Link href="/sell" asChild>
              <Pressable
                style={[styles.sellButton, { backgroundColor: tintColor }]}
              >
                <ThemedText
                  type="defaultSemiBold"
                  lightColor="#fff"
                  darkColor="#fff"
                >
                  Sell an item
                </ThemedText>
              </Pressable>
            </Link>
          </Show>

          <TextInput
            placeholder="Search listings..."
            placeholderTextColor={Colors[colorScheme].icon}
            style={[
              styles.searchInput,
              {
                color: textColor,
                backgroundColor: inputBackground,
                borderColor: inputBorder,
              },
            ]}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categories.map((category) => {
              const selected = category === selectedCategory;

              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selected ? tintColor : chipBackground,
                      borderColor: selected ? tintColor : inputBorder,
                    },
                  ]}
                >
                  <ThemedText
                    type="defaultSemiBold"
                    lightColor={selected ? "#fff" : undefined}
                    darkColor={selected ? "#fff" : undefined}
                    style={!selected ? styles.chipText : undefined}
                  >
                    {category}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.section}>
            <ThemedText type="subtitle">Featured listings</ThemedText>
            {filteredListings.length === 0 ? (
              <ThemedText style={styles.empty}>
                No listings in this category yet.
              </ThemedText>
            ) : (
              filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 8,
  },
  userButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
  },
  sellButton: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  subtitle: {
    opacity: 0.7,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  categories: {
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipText: {
    opacity: 0.9,
  },
  section: {
    gap: 12,
  },
  empty: {
    opacity: 0.7,
  },
});
