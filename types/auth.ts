export type AuthCheck =
  | { role: string }
  | { permission: string }
  | { feature: string }
  | { plan: string };
