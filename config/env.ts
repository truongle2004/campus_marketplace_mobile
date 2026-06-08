export const env = {
  apiUrl: process.env.EXPO_API_URL ?? "http://192.168.100.180:8080",
  stripePublishableKey: process.env.EXPO_PUBLISHABLE_KEY ?? "",
  clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "",
} as const;
