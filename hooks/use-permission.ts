import { useAuth } from "@clerk/expo";

import type { AuthCheck } from "@/types/auth";

export function usePermission(check: AuthCheck) {
  const { isLoaded, has } = useAuth();

  return {
    isLoaded,
    allowed: isLoaded ? has(check) : false,
  };
}
