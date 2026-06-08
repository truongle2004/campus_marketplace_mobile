import { useEffect } from "react";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { AppLoadingScreen } from "@/components/layout/app-loading-screen";
import { env } from "@/config/env";
import { stripeConfig } from "@/config/stripe";
import { useAppStartup } from "@/hooks/use-app-startup";
import { useColorScheme } from "@/hooks/use-color-scheme";

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  anchor: "(app)/(tabs)",
};

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { isReady: isStartupReady } = useAppStartup();
  const isAppReady = isStartupReady && isAuthLoaded;

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return <AppLoadingScreen />;
  }

  return (
    <StripeProvider
      publishableKey={stripeConfig.publishableKey}
      merchantIdentifier={stripeConfig.merchantIdentifier}
      urlScheme={stripeConfig.urlScheme}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isSignedIn === true}>
            <Stack.Screen name="(app)" />
          </Stack.Protected>
          <Stack.Protected guard={isSignedIn === false}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </StripeProvider>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={env.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <RootNavigator />
    </ClerkProvider>
  );
}
