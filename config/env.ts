export const env = {
  apiUrl: process.env.EXPO_API_URL ?? "http://192.168.100.180:3000",
  stripePublishableKey: process.env.EXPO_PUBLISHABLE_KEY ?? "",
} as const;
