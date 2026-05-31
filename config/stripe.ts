import { env } from "@/config/env";

export const stripeConfig = {
  publishableKey: env.stripePublishableKey,
  merchantIdentifier: "merchant.identifier",
  urlScheme: "stripeexpo",
} as const;
