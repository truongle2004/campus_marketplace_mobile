import type { AuthCheck } from "@/types/auth";

export const permissions = {
  createListing: {
    permission: "org:listings:create",
  } satisfies AuthCheck,
} as const;
