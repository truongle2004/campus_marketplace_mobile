import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AuthLoading } from "@/components/auth/auth-loading";
import { stripeConfig } from "@/config/stripe";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { env } from "@/config/env";

export const unstable_settings = {
  anchor: "(app)/(tabs)",
};

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <AuthLoading />;
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
